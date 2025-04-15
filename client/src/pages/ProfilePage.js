import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get('/users/profile');
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {profile && (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Admin:</strong> {profile.isAdmin ? 'Yes' : 'No'}</p>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;