
import AdminUserForm from "./admin-user-form";

export default function AdminNewUser() {

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Create New User</h1>

            <AdminUserForm />
        </div>
    )
}