import { useForm } from "react-hook-form";

export default function AdminNewUser() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="admin-new-user">
            <h1 className="admin-new-user-title">Create New User</h1>

            
        </div>
    )
}