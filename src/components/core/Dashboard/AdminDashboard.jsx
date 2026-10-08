import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/apis";

export default function AdminDashboard() {
  const { token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      if (response.data.success) setItems(response.data.data || []);
    } catch (error) {
      toast.error("Could not load categories");
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const createCategory = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        categories.CREATE_CATEGORY_API,
        { name: name.trim(), description: description.trim() },
        { Authorization: `Bearer ${token}` }
      );
      if (!response.data.success) throw new Error(response.data.message);
      toast.success("Category created");
      setName("");
      setDescription("");
      loadCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Could not create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-richblack-5">
      <h1 className="text-3xl font-semibold">Admin Console</h1>
      <p className="mt-2 text-richblack-300">Manage course categories used across LearnSphere.</p>

      <form onSubmit={createCategory} className="mt-8 max-w-2xl rounded-xl bg-richblack-800 p-6">
        <label className="block text-sm text-richblack-200">Category name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 w-full rounded-lg bg-richblack-700 p-3" placeholder="Web Development" />
        <label className="mt-4 block text-sm text-richblack-200">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full rounded-lg bg-richblack-700 p-3" rows={4} placeholder="Courses related to modern web development" />
        <button disabled={loading} className="mt-4 rounded-lg bg-yellow-50 px-5 py-2 font-semibold text-richblack-900">
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Existing Categories</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item._id} className="rounded-xl border border-richblack-700 bg-richblack-800 p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="mt-1 text-sm text-richblack-300">{item.description || "No description"}</p>
              <p className="mt-3 text-xs text-richblack-400">{item.courses?.length || 0} linked courses</p>
            </div>
          ))}
          {!items.length && <p className="text-richblack-400">No categories yet.</p>}
        </div>
      </div>
    </div>
  );
}
