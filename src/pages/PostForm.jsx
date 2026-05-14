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

  // Determine if in edit mode based on URL params
  const isEditMode = id && id !== "new";

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to create or edit posts");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch post data if editing
  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const res = await api.get(`/posts/${id}`);
          const post = res.data;

          // Check if user owns this post
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
        // Update existing post
        await api.put(`/posts/${id}`, formData);
        toast.success("Post updated successfully!");
      } else {
        // Create new post
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              {isEditMode ? "Edit Post" : "Create New Post"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter post title"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter post description"
                  className="textarea textarea-bordered h-32"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  className="input input-bordered"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
                {formData.imageUrl && (
                  <div className="mt-4">
                    <label className="label">
                      <span className="label-text">Image Preview</span>
                    </label>
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="form-control mt-6 flex flex-row gap-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : isEditMode ? (
                    "Update Post"
                  ) : (
                    "Create Post"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
