import { useEffect, useState } from "react";
import "./AdminUsers.css";
import { changeRole, getUsers, deleteUser } from "../api/user";
import Spinner from "./Spinner";
import { toast } from "react-toastify"
import type { ApiResponse } from "../api/types";
import type { User, UserRole } from "../types/user";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token")

  const fetchUsers = async () => {
    try{
      if(!token){
        throw new Error("No authentication token found");
      }
      const data : ApiResponse<User[]> = await getUsers(token);

      if (data.success && data.data) setUsers(data.data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id : string, newRole: UserRole) => {
    try{
      if(!token){
        throw new Error("No authentication token found");
      }
      const data : ApiResponse<User> = await changeRole(token, id, newRole);

      if (data.success) {
        toast.success("Role updated successfully")
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleDelete = async (id : string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try{
      if(!token){
        throw new Error("No authentication token found");
      }
      const data : ApiResponse<null> = await deleteUser(token, id);

      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success("User deleted")
      } else {
        toast.error(data.message || "Failed to delete user")
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="admin-users-container">
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as UserRole)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;