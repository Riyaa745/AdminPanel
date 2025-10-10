"use client";
import { useState, Fragment, useEffect } from "react";
import { Plus, Edit, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

export default function VendorComponent({ vendors, setVendors }) {
  const [form, setForm] = useState({
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
    company: "",
    state: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [expandedVendor, setExpandedVendor] = useState(null);

  // ✅ Save vendors to localStorage whenever vendors change
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
      company: "",
      state: "",
    });
    setShowForm(false);
  };

  const handleEdit = (vendor) => {
    setForm(vendor);
    setShowForm(true);
    setExpandedVendor(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setVendors(vendors.filter((v) => v.id !== id));
      if (expandedVendor === id) {
        setExpandedVendor(null);
      }
    }
  };

  const resetForm = () => {
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
      company: "",
      state: "",
    });
    setShowForm(false);
  };

  const toggleVendorExpand = (vendorId) => {
    setExpandedVendor(expandedVendor === vendorId ? null : vendorId);
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
              onClick={resetForm}
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
                Name <span className="text-red-500">*</span>
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
                Company
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
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
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                State
              </label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>

            {/* GST Related */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                GSTIN <span className="text-red-500">*</span>
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
                onClick={resetForm}
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border-collapse">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left hidden md:table-cell">Company</th>
                  <th className="p-2 text-left hidden lg:table-cell">GSTIN</th>
                  <th className="p-2 text-left hidden lg:table-cell">PAN</th>
                  <th className="p-2 text-left hidden xl:table-cell">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left hidden xl:table-cell">State</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <Fragment key={vendor.id}>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 font-medium">{vendor.name}</td>
                      <td className="p-2 hidden md:table-cell">{vendor.company || "-"}</td>
                      <td className="p-2 hidden lg:table-cell">{vendor.gstin}</td>
                      <td className="p-2 hidden lg:table-cell">{vendor.pan || "-"}</td>
                      <td className="p-2 hidden xl:table-cell">{vendor.email || "-"}</td>
                      <td className="p-2">{vendor.phone || "-"}</td>
                      <td className="p-2 hidden xl:table-cell">{vendor.state || "-"}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleVendorExpand(vendor.id)}
                            className="p-1 text-green-600 hover:text-green-800 transition"
                            title="View Details"
                          >
                            {expandedVendor === vendor.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(vendor)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(vendor.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedVendor === vendor.id && (
                      <tr className="bg-gray-50">
                        <td colSpan="8" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <strong className="text-gray-700">Company:</strong>
                              <p className="mt-1">{vendor.company || "Not provided"}</p>
                            </div>
                            <div>
                              <strong className="text-gray-700">GSTIN:</strong>
                              <p className="mt-1">{vendor.gstin}</p>
                            </div>
                            <div>
                              <strong className="text-gray-700">PAN:</strong>
                              <p className="mt-1">{vendor.pan || "Not provided"}</p>
                            </div>
                            <div>
                              <strong className="text-gray-700">Email:</strong>
                              <p className="mt-1">{vendor.email || "Not provided"}</p>
                            </div>
                            <div>
                              <strong className="text-gray-700">Alt. Phone:</strong>
                              <p className="mt-1">{vendor.altPhone || "Not provided"}</p>
                            </div>
                            <div>
                              <strong className="text-gray-700">State:</strong>
                              <p className="mt-1">{vendor.state || "Not provided"}</p>
                            </div>
                            <div>
                              <strong className="text-gray-700">Bank Account:</strong>
                              <p className="mt-1">{vendor.bankAccount || "Not provided"}</p>
                            </div>
                            <div>
                              <strong className="text-gray-700">IFSC Code:</strong>
                              <p className="mt-1">{vendor.ifsc || "Not provided"}</p>
                            </div>
                            <div className="md:col-span-2 lg:col-span-3">
                              <strong className="text-gray-700">Address:</strong>
                              <p className="mt-1">{vendor.address || "Not provided"}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}