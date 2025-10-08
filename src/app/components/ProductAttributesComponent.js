"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function ProductAttributesComponent({
  attributes = [],
  setAttributes = () => {},
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", value: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert comma-separated input into array of trimmed values
    const valuesArray = formData.value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v);

    if (!valuesArray.length) return;

    if (formData.id) {
      // Update existing attribute
      setAttributes(
        attributes.map((a) =>
          a.id === formData.id
            ? { ...a, name: formData.name, values: valuesArray }
            : a
        )
      );
    } else {
      // Add new attribute
      setAttributes([
        ...attributes,
        { id: Date.now(), name: formData.name, values: valuesArray },
      ]);
    }

    setFormData({ id: null, name: "", value: "" });
    setShowForm(false);
  };

  const handleEdit = (attr) => {
    setFormData({
      id: attr.id,
      name: attr.name,
      value: attr.values ? attr.values.join(", ") : "",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAttributes(attributes.filter((a) => a.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Product Attributes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-indigo-600 text-white px-3 py-1.5 rounded-md shadow-sm hover:bg-indigo-700 text-sm"
        >
          <Plus className="mr-1 h-3 w-3" /> Add Attribute
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-md shadow-sm p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-semibold">
              {formData.id ? "Edit Attribute" : "Add Attribute"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setFormData({ id: null, name: "", value: "" });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter attribute name (e.g., Size, Color)"
              className="flex-1 border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              required
            />
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Enter values (comma separated e.g., XL, L, M)"
              className="flex-1 border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 text-sm"
            >
              {formData.id ? "Update" : "Save"}
            </button>
          </form>
        </div>
      )}

      {/* Attribute List */}
      <table className="w-full border-collapse bg-white rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 text-sm">ID</th>
            <th className="p-2 text-sm">Attribute</th>
            <th className="p-2 text-sm">Values</th>
            <th className="p-2 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(attributes) && attributes.length > 0 ? (
            attributes.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2 text-sm">{a.id}</td>
                <td className="p-2 text-sm">{a.name}</td>
                <td className="p-2 text-sm">{(a.values || []).join(", ")}</td>
                <td className="p-2 flex gap-1.5">
                  <button
                    onClick={() => handleEdit(a)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-2 text-center text-gray-500 text-sm">
                No attributes added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
