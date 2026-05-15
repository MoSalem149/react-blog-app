import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../providers/UserContext";

export default function PostCard({ post, onDelete }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const isOwner = user && user.id === post.userId;

  const handleEdit = () => {
    navigate(`/post/${post.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post.id);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-neutral-300 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:flex-row">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="h-48 w-full rounded-2xl border border-neutral-200 object-cover md:w-56"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="mb-4 text-4xl font-black text-neutral-800">
            {post.title}
          </h2>
          <div className="mb-5 h-0.5 w-full bg-neutral-300"></div>
          <p className="text-lg leading-relaxed text-neutral-500">
            {post.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-lg text-neutral-600">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-xl">
              ✍️
            </div>
            <span>{post.authorName}</span>
          </div>

          {isOwner && (
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="rounded-xl border border-neutral-400 px-5 py-2 font-semibold transition hover:bg-neutral-100"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl border border-red-300 px-5 py-2 font-semibold text-red-500 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
