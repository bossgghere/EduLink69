import React, { useState } from "react";

export default function PostModal({ open, onClose, onPost }) {
  const [image, setImage] = useState(null);      // { url: ..., type: ... } or null
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  if (!open) return null;

  // Use FileReader to convert file to base64 for real persistence
  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file || null);
    if (!file) {
      setImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImage({ url: evt.target.result, type: file.type.startsWith("video") ? "video" : "image" });
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!image) return alert("Please select an image or video!");
    const newPost = {
      media: image,
      description,
    };
    onPost(newPost);
    setFile(null);
    setImage(null);
    setDescription("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-6 rounded-2xl w-full max-w-xl max-h-[90vh] shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl text-center font-bold">Create a Post</h2>

        {/* File Upload */}
        <div className="gap-10"></div>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="border border-gray-300 p-3 sm:p-4 rounded-lg text-base sm:text-lg"
        />

        {/* Preview */}
        {image && (
          <div className="mt-2">
            {image.type === "video" ? (
              <video
                controls
                className="w-full max-h-60 rounded-lg"
                src={image.url}
              />
            ) : (
              <img
                src={image.url}
                alt="preview"
                className="w-full max-h-60 object-contain rounded-lg"
              />
            )}
          </div>
        )}
        <div className="gap-10"></div>
        {/* Description */}
        <textarea
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a description..."
          className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full text-base sm:text-lg"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-base sm:text-lg"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base sm:text-lg"
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
