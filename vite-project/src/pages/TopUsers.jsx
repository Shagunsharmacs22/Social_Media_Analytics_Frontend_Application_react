import React, { useEffect, useState } from 'react';
import { getUsers, getPosts, getComments } from '../api';
import UserCard from '../components/UserCard';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        getUsers(), getPosts(), getComments()
      ]);

      const userCommentCount = {};
      commentsRes.data.forEach(comment => {
        const post = postsRes.data.find(p => p.id === comment.postId);
        if (post) {
          userCommentCount[post.userId] = (userCommentCount[post.userId] || 0) + 1;
        }
      });

      const sortedUsers = usersRes.data
        .map(user => ({
          ...user,
          commentCount: userCommentCount[user.id] || 0,
        }))
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 5);

      setTopUsers(sortedUsers);
    };

    loadData();
  }, []);

  return (
    <div className="container">
      <h2>Top 5 Users</h2>
      {topUsers.map(user => (
        <UserCard key={user.id} user={user} totalComments={user.commentCount} />
      ))}
    </div>
  );
};

export default TopUsers;
