"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function ProductCRUD({ products = [], setProducts = () => {} }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    hsnSac: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.category) errors.category = "Category is required";
    if (!form.hsnSac) errors.hsnSac = "HSN/SAC Code is required"; // ✅ added validation
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      category: "",
      hsnSac: "",
      description: "",
    });
    setFormErrors({});
    setIsEditing(false);
  };

  const handleAdd = () => {
    if (!validateForm()) return;
    setProducts([...products, { ...form, id: Date.now() }]);
    resetForm();
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    document
      .getElementById("product-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdate = () => {
    if (!validateForm()) return;
    setProducts(products.map((p) => (p.id === form.id ? { ...form } : p)));
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.hsnSac && p.hsnSac.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-1.5">
        <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
        Product Management
      </h2>

      {/* Form */}
      <div
        id="product-form"
        className="bg-gradient-to-br from-blue-50 to-indigo-50 border rounded-md p-4 shadow-sm mb-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold text-gray-700 flex items-center gap-1.5">
            {isEditing ? (
              <>
                <Edit className="w-4 h-4 text-blue-600" /> Update Product
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-blue-600" /> Add New Product
              </>
            )}
          </h3>
          {isEditing && (
            <button
              onClick={resetForm}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Cancel
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              📦 Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              } text-sm`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              🏷️ Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.category ? "border-red-500" : "border-gray-300"
              } text-sm`}
            />
            {formErrors.category && (
              <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
            )}
          </div>

          {/* HSN/SAC Code */}
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              🔢 HSN / SAC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="hsnSac"
              placeholder="e.g., 8517 (for telecom)"
              value={form.hsnSac}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                formErrors.hsnSac ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.hsnSac && (
              <p className="text-red-500 text-xs mt-1">{formErrors.hsnSac}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-3">
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            📝 Description
          </label>
          <textarea
            name="description"
            placeholder="Write product description..."
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows="2"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={isEditing ? handleUpdate : handleAdd}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-1.5 text-sm"
        >
          {isEditing ? (
            <>
              <Edit className="w-3 h-3" /> Update Product
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" /> Add Product
            </>
          )}
        </button>
      </div>

      {/* Product Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse rounded-md shadow-sm">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="p-3 text-left text-sm">Name</th>
              <th className="p-3 text-left text-sm">Category</th>
              <th className="p-3 text-left text-sm">HSN/SAC Code</th>
              <th className="p-3 text-left text-sm">Description</th>
              <th className="p-3 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="bg-white border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-sm">{p.name}</td>
                  <td className="p-3 text-sm">{p.category}</td>
                  <td className="p-3 text-sm">{p.hsnSac}</td>
                  <td className="p-3 text-sm">{p.description || "-"}</td>
                  <td className="p-3 flex gap-1.5">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-3 text-center text-gray-500 text-sm"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
