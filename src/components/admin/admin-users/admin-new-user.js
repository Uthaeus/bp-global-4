
import AdminUserForm from "./admin-user-form";

export default function AdminNewUser() {

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="admin-new-user">
            <h1 className="admin-new-user-title">Create New User</h1>

            <AdminUserForm />
        </div>
    )
}