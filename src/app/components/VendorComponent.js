"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function VendorComponent() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    altPhone: "", // ✅ added alternative number
    address: "",
    gstin: "",
    pan: "",
    bankAccount: "",
    ifsc: "",
  });
  const [showForm, setShowForm] = useState(false);

  // Load vendors
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vendors")) || [];
    setVendors(stored);
  }, []);

  // Save vendors
  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.gstin) {
      alert("Name and GSTIN are required!");
      return;
    }

    if (form.id === null) {
      setVendors([...vendors, { ...form, id: Date.now() }]);
    } else {
      setVendors(vendors.map((v) => (v.id === form.id ? { ...form } : v)));
    }

    setForm({
      id: null,
      name: "",
      email: "",
      phone: "",
      altPhone: "",
      address: "",
      gstin: "",
      pan: "",
      bankAccount: "",
      ifsc: "",
    });
    setShowForm(false);
  };

  const handleEdit = (vendor) => {
    setForm(vendor);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Add Vendor Button */}
      {!showForm && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Vendors</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:from-blue-700 hover:to-indigo-700 transition text-sm"
          >
            <Plus className="w-3 h-3" /> Add Vendor
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {form.id ? "Edit Vendor" : "Add Vendor"}
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {/* Basic Details */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Vendor Name"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Alternative Phone
              </label>
              <input
                type="text"
                name="altPhone"
                value={form.altPhone}
                onChange={handleChange}
                placeholder="Alternative Number"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>

            {/* GST Related */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                GSTIN
              </label>
              <input
                type="text"
                name="gstin"
                value={form.gstin}
                onChange={handleChange}
                placeholder="GST Number"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                PAN
              </label>
              <input
                type="text"
                name="pan"
                value={form.pan}
                onChange={handleChange}
                placeholder="PAN Number"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>

            {/* Bank Details */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Bank Account
              </label>
              <input
                type="text"
                name="bankAccount"
                value={form.bankAccount}
                onChange={handleChange}
                placeholder="Account Number"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifsc"
                value={form.ifsc}
                onChange={handleChange}
                placeholder="IFSC"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                rows={2}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 text-sm"
              >
                {form.id ? "Update Vendor" : "Add Vendor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Vendor List */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Vendor List
        </h3>
        {vendors.length === 0 ? (
          <p className="text-gray-500 text-sm">No vendors added yet.</p>
        ) : (
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-sm text-gray-700 border-collapse">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">GSTIN</th>
                  <th className="p-2 text-left">PAN</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Alt. Phone</th>
                  <th className="p-2 text-left">Bank</th>
                  <th className="p-2 text-left">IFSC</th>
                  <th className="p-2 text-left">Address</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="p-2">{vendor.name}</td>
                    <td className="p-2">{vendor.gstin}</td>
                    <td className="p-2">{vendor.pan}</td>
                    <td className="p-2">{vendor.email}</td>
                    <td className="p-2">{vendor.phone}</td>
                    <td className="p-2">{vendor.altPhone}</td>
                    <td className="p-2">{vendor.bankAccount}</td>
                    <td className="p-2">{vendor.ifsc}</td>
                    <td className="p-2">{vendor.address}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(vendor)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(vendor.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
