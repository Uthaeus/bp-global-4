import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { UserContext } from '../store/user-context';

function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            reset({ email: user.email, name: user.name });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {

        console.log(data);

        // TODO: Send email
        reset();
        navigate('/');
    }

    return (
        <div className="contact">
            <h2 className="contact-title mb-5">Contact Us</h2>

            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                autoFocus={true}
                                {...register("name")}
                            />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="error">This field is required</span>}
                        </div>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="message">Message*</label>
                    <textarea
                        id="message"
                        className="form-control"
                        rows="5"
                        {...register("message", { required: true })}
                    />
                    {errors.message && <span className="error">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
}

export default Contact;