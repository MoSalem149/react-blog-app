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
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="badge badge-ghost">✍️ {post.authorName}</span>
        </div>

        {isOwner && (
          <div className="card-actions justify-end mt-4">
            <button onClick={handleEdit} className="btn btn-sm btn-primary">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-sm btn-error">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
