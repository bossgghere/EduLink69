import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import PostFeed, { initialPosts } from "../components/PostFeed";

// Utility to load/store posts (with base64 image data) in localStorage
function loadPosts() {
  try {
    const data = localStorage.getItem('posts');
    if (data) return JSON.parse(data);
  } catch { /* ignore error */ }
  return initialPosts || [];
}

export default function Home() {
  const [posts, setPosts] = useState(loadPosts());

  // Whenever posts change, write to localStorage
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // Add new post (image is handled as base64)
  function handleAddPost(newPost) {
    setPosts((prev) => [
      ...prev,
      {
        ...newPost,
        id: Date.now(),
        user: "You",
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function handleLike(id) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  function handleComment(id, text) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, text] }
          : post
      )
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-30 px-4 sm:px-8 lg:px-16 py-3 sm:py-4">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-extrabold">EduLink</h1>
          <div className="flex gap-2 sm:gap-4 lg:gap-6 text-2xl sm:text-3xl lg:text-4xl">
            <button className="p-2 sm:p-3 hover:bg-white/60 rounded-full">🔔</button>
            <button className="p-2 sm:p-3 hover:bg-white/60 rounded-full">🔍</button>
            <button className="p-2 sm:p-3 hover:bg-white/60 rounded-full">💬</button>
          </div>
        </div>
      </div>

      {/* Layout below header */}
      <div className="flex pt-[64px] sm:pt-[76px] h-full w-full">
        {/* Sidebar with PostModal control */}
        <div>
          <SideNav onAddPost={handleAddPost} />
        </div>

        {/* Feed Area */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto p-4 sm:p-6 lg:p-10">
          <PostFeed
            posts={posts}
            onLike={handleLike}
            onComment={handleComment}
          />
        </div>
      </div>
    </div>
  );
}
