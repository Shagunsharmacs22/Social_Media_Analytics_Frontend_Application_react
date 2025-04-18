import React, { useEffect, useState } from 'react';
import { getPosts, getComments } from '../api';
import PostCard from '../components/PostCard';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [postsRes, commentsRes] = await Promise.all([getPosts(), getComments()]);

      const commentCounts = {};
      commentsRes.data.forEach(comment => {
        commentCounts[comment.postId] = (commentCounts[comment.postId] || 0) + 1;
      });

      const maxCount = Math.max(...Object.values(commentCounts));

      const trending = postsRes.data
        .filter(post => commentCounts[post.id] === maxCount)
        .map(post => ({
          ...post,
          commentCount: commentCounts[post.id],
        }));

      setTrendingPosts(trending);
    };

    loadData();
  }, []);

  return (
    <div className="container">
      <h2>🔥 Trending Posts</h2>
      {trendingPosts.map(post => (
        <PostCard key={post.id} post={post} commentCount={post.commentCount} />
      ))}
    </div>
  );
};

export default TrendingPosts;
