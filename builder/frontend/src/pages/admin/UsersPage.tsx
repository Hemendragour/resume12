import UserTable from "../../features/admin/components/UserTable";

export default function UsersPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-heading">User Management</h1>

        <p className="text-nav-text">Manage all registered users.</p>
      </div>

      <UserTable />
    </div>
  );
}
