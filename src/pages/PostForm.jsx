import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";
import { UserContext } from "../providers/UserContext";
import { toast } from "react-toastify";

export default function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = id && id !== "new";

  useEffect(() => {
    if (!user) {
      toast.error("Please login to create or edit posts");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const res = await api.get(`/posts/${id}`);
          const post = res.data;

          if (post.userId !== user?.id) {
            toast.error("You can only edit your own posts");
            navigate("/");
            return;
          }

          setFormData({
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
          });
        } catch {
          toast.error("Failed to fetch post");
          navigate("/");
        }
      };

      fetchPost();
    }
  }, [isEditMode, id, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        await api.put(`/posts/${id}`, formData);
        toast.success("Post updated successfully!");
      } else {
        const newPost = {
          ...formData,
          authorName: user.name,
          userId: user.id,
        };
        await api.post("/posts", newPost);
        toast.success("Post created successfully!");
      }

      navigate("/");
    } catch {
      toast.error(
        isEditMode ? "Failed to update post" : "Failed to create post",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-300 bg-white p-10 shadow-sm">
        <h2 className="mb-12 text-center text-6xl font-black text-neutral-800">
          {isEditMode ? "Edit Post" : "New Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full rounded-2xl border border-neutral-300 px-6 py-5 text-xl outline-none transition focus:border-neutral-500"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="h-36 w-full rounded-2xl border border-neutral-300 px-6 py-5 text-xl outline-none transition focus:border-neutral-500"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            className="w-full rounded-2xl border border-neutral-300 px-6 py-5 text-xl outline-none transition focus:border-neutral-500"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />

          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="h-64 w-full rounded-3xl border border-neutral-200 object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:justify-center">
            <button
              type="submit"
              className="rounded-2xl bg-neutral-200 px-14 py-4 text-3xl font-bold text-neutral-800 transition hover:-translate-y-1"
              disabled={loading}
            >
              {loading ? "Loading..." : isEditMode ? "Update Post" : "Add Post"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-2xl border border-neutral-300 px-14 py-4 text-3xl font-bold text-neutral-600 transition hover:bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
