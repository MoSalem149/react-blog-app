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

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const handleAddPost = () => {
    navigate("/post/new");
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
      {loading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <span className="h-16 w-16 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-700"></span>
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white py-20 text-center shadow-sm">
          <p className="text-2xl text-neutral-500">
            No posts yet. Create your first post!
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))
      )}

      {user && (
        <button
          onClick={handleAddPost}
          className="fixed bottom-8 right-8 flex h-24 w-24 items-center justify-center rounded-full border border-neutral-700 bg-neutral-700 text-6xl font-light text-white shadow-2xl transition hover:scale-105"
          title="Add New Post"
        >
          +
        </button>
      )}
    </div>
  );
}
