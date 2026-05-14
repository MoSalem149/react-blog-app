import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { toast } from "react-toastify";
import { UserContext } from "../providers/UserContext";
import { useNavigate } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch {
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  // Navigate to add post
  const handleAddPost = () => {
    navigate("/post/new");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Blog Posts</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-100">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                No posts yet. Create your first post!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Floating Add Button - Only show if logged in */}
      {user && (
        <button
          onClick={handleAddPost}
          className="btn btn-circle btn-primary btn-lg fixed bottom-8 right-8 shadow-lg"
          title="Add New Post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
