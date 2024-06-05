import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import Button from "../ui/button";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const navigate = useNavigate();

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
    });
    return users;
}

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { type: 'validate', message: 'Passwords do not match' });
      return;
    }
    if (data.password.length < 6) {
      setError('password', { type: 'validate', message: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const users = await getUsers();
      const existingUser = users.find(u => u.email === data.email);
      if (existingUser) {
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const newUser = {
          ...existingUser,
          instantiated_at: formattedDate
        }

        await setDoc(doc(db, "users", user.uid), newUser);

        // delete existing user
        await deleteDoc(doc(db, "users", existingUser.id));

        // update orders associated with existing user
        const orders = await getDocs(collection(db, "orders"));
        orders.forEach(async (order) => {
          if (order.data().uid === existingUser.id) {
            await updateDoc(doc(db, "orders", order.id), {
              uid: user.uid
            });
          }
        });
      }

      navigate('/');
    } catch (error) {
      console.log('register error:', error);
    }
  };

  return (
    <div className="auth">
      <h1 className="auth-title">Register</h1>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            autoFocus={true}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">Email is required</span>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">{ errors.password.message }</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <span className="text-danger">{ errors.confirmPassword.message }</span>
          )}
        </div>

        <Button text="Register" className="mb-4" />

        <p className="auth-form-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
