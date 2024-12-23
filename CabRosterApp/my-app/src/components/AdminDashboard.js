import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState({
        PendingUsers: [],
        ApprovedUsers: [],
        RejectedUsers: [],
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch all users data
    useEffect(() => {
        fetchUsers();
    }, []);

    var resp = axios.get("https://localhost:7160/api/Admin/get-all-users");

    const fetchUsers = () => {
        axios
            .get("https://localhost:7160/api/Admin/get-all-users")
            .then((response) => {
                setUsers({
                    PendingUsers: response.data.PendingUsers,
                    ApprovedUsers: response.data.ApprovedUsers,
                    RejectedUsers: response.data.RejectedUsers,
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users!", error.response || error);
                setLoading(false);
            });

            var resp = axios.get("https://localhost:7160/api/Admin/get-all-users");

            console.log(resp);
    };

    // Handle Approve User
    const handleApproveUser = (userId) => {
        axios
            .post(`https://localhost:7160/api/Admin/approve-user/${userId}`)
            .then((response) => {
                alert(response.data.Message);
                fetchUsers();
            })
            .catch((error) => {
                console.error("Error approving the user", error);
            });
    };

    // Handle Reject User
    const handleRejectUser = (userId) => {
        axios
            .post(`https://localhost:7160/api/Admin/reject-user/${userId}`)
            .then((response) => {
                alert(response.data.Message);
                fetchUsers();
            })
            .catch((error) => {
                console.error("Error rejecting the user", error);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            {/* Pending Users Container */}
            <div className="container-box">
                <h3>Pending Users</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.PendingUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>{user.MobileNumber}</td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleApproveUser(user.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRejectUser(user.id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Approved Users Container */}
            <div className="container-box">
                <h3>Approved Users</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.ApprovedUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>{user.MobileNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rejected Users Container */}
            <div className="container-box">
                <h3>Rejected Users</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.RejectedUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>{user.MobileNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
