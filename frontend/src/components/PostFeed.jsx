import React, { useState } from "react";

const randomNames = ["Parvez", "Alex", "Mona", "Priya", "Chris", "Sam"];
const randomImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
];

export const initialPosts = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  media: { url: randomImages[i % randomImages.length], type: "image" },
  description: [
    "A beautiful lake view!",
    "Adventure in the wild 🌲",
    "Sunny vibes ☀️",
    "Coding & coffee ☕",
  ][i],
  likes: Math.floor(Math.random() * 20),
  comments: ["Awesome!", "So nice!", "🔥🔥🔥"].slice(
    0,
    Math.floor(Math.random() * 3)
  ),
  createdAt: new Date(Date.now() - Math.random() * 10000000).toISOString(),
  user: randomNames[Math.floor(Math.random() * randomNames.length)],
}));

export default function PostFeed({ posts, onLike, onComment }) {
  const [commentText, setCommentText] = useState({});

  const handleComment = (id) => {
    if (!commentText[id]?.trim()) return;
    onComment(id, commentText[id]);
    setCommentText((ct) => ({ ...ct, [id]: "" }));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 bg-gray-50">
      {[...posts].reverse().map((post) => (
        <div
          key={post.id}
          className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl card-glass rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center font-bold text-xl sm:text-2xl lg:text-3xl uppercase">
              {post.user ? post.user[0] : "U"}
            </div>
            <div>
              <div className="font-bold text-lg sm:text-xl lg:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">{post.user || "You"}</div>
              <div className="text-gray-600 text-sm sm:text-base lg:text-lg">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Media (image/video adaptive height) */}
          {post.media && (
            post.media.type === "video" ? (
              <video
                controls
                className="w-full rounded-xl mt-2 object-contain max-h-[60vh]"
              >
                <source src={post.media.url} />
              </video>
            ) : (
              <img
                src={post.media.url}
                alt="post"
                className="w-full rounded-xl mt-2 object-contain max-h-[60vh]"
              />
            )
          )}

          {/* Description */}
          <div className="text-base sm:text-lg lg:text-2xl font-medium text-gray-800 leading-relaxed break-words">
            {post.description}
          </div>

          {/* Like + Comments count */}
          <div className="flex items-center gap-6 sm:gap-10 text-base sm:text-lg lg:text-xl font-semibold">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 text-red-500 hover:scale-110 transition-transform"
            >
              ❤️ {post.likes}
            </button>
            <span className="text-gray-600">
              {post.comments.length} comments
            </span>
          </div>

          {/* Comments */}
          {post.comments.length > 0 && (
            <div className="flex flex-col gap-2 sm:gap-3 mt-2 break-words">
              {post.comments.map((comment, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl p-2 sm:p-3 text-sm sm:text-base lg:text-lg text-gray-800"
                >
                  {comment}
                </div>
              ))}
            </div>
          )}

          {/* Add comment */}
          <div className="flex gap-2 sm:gap-3 mt-4">
            <input
              className="flex-1 border border-gray-300 bg-gray-50 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add a comment..."
              value={commentText[post.id] || ""}
              onChange={(e) =>
                setCommentText((ct) => ({ ...ct, [post.id]: e.target.value }))
              }
              onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base lg:text-lg font-semibold transition-all"
              onClick={() => handleComment(post.id)}
            >
              Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
