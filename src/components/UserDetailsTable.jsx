import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore'; // for real-time updates
import { db } from '../firebase'; // ✅ import your Firestore instance
import '../stylesheets/UserDetailsTable.css'; 

const UserDetailsTable = () => {
    const [usersData, setUsersData] = useState([]);

    // Fetch Firestore data when component mounts
    useEffect(() => {
        // Reference to your Firestore collection
        const usersCollectionRef = collection(db, "user-data");

        // Real-time snapshot listener
        const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsersData(users);
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    const handleViewProfile = (userName) => {
        alert(`Viewing profile for ${userName}`);
    };

    return (
        <div className="user-details-container top-margin">
            <section className="registered-users">
                <p className='registered-users-title'>Registered Users</p>
                <p className="subtitle">Active citizen reporters in the system</p>
                
                <div className="table-card">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Credits</th>
                                <th>Reports</th>
                                <th>Join Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.length > 0 ? (
                                usersData.map((user) => (
                                    <tr key={user.id}>
                                        <td className="user-cell">
                                            <div className="user-info">
                                                <div className="user-avatar">👤</div>
                                                <div>
                                                    <div className="name">{user.name}</div>
                                                    <div className="id">{user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className="badge credit-badge">
                                                {user.credits}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge report-badge">
                                                {user.reports} reports
                                            </span>
                                        </td>
                                        <td>{user.joinDate}</td>
                                        <td>
                                            <button 
                                                className="action-btn"
                                                onClick={() => handleViewProfile(user.name)}
                                            >
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                        Loading user data...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default UserDetailsTable;
