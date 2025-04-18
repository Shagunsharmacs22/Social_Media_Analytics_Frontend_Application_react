import React from 'react';
import './Card.css';

const UserCard = ({ user, totalComments }) => {
  const avatarUrl = `https://i.pravatar.cc/150?img=${user.id}`;

  return (
    <div className="card user-card">
      <img src={avatarUrl} alt={user.name} className="avatar" />
      <div className="card-content">
        <h3>{user.name}</h3>
        <p>📬 Email: {user.email}</p>
        <p className="comment-count">💬 Total Comments: {totalComments}</p>
      </div>
    </div>
  );
};

export default UserCard;
