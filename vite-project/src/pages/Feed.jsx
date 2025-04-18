import React, { useEffect, useState } from 'react';
import { getPosts, getComments } from '../api';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const [postsRes, commentsRes] = await Promise.all([getPosts(), getComments()]);
    const commentMap = {};
    commentsRes.data.forEach(comment => {
      commentMap[comment.postId] = (commentMap[comment.postId] || 0) + 1;
    });

    const enrichedPosts = postsRes.data
      .sort((a, b) => b.id - a.id)
      .map(post => ({
        ...post,
        commentCount: commentMap[post.id] || 0,
      }));

    setPosts(enrichedPosts);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2>📰 Live Feed</h2>
      {posts.map(post => (
        <PostCard key={post.id} post={post} commentCount={post.commentCount} />
      ))}
    </div>
  );
};

export default Feed;
