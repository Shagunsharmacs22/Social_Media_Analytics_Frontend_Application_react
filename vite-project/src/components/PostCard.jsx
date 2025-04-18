import React from 'react';
import './Card.css';

const PostCard = ({ post, commentCount }) => {
  const imageUrl = `https://picsum.photos/seed/${post.id}/400/200`;

  return (
    <div className="card">
      <img src={imageUrl} alt="Post" className="card-img" />
      <div className="card-content">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className="comment-count">💬 Comments: {commentCount}</p>
      </div>
    </div>
  );
};

export default PostCard;
