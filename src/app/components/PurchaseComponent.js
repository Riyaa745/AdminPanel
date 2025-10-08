"use client";
import { useState, useEffect } from "react";
import { Plus, X, Trash2, Search, ChevronDown, FileText } from "lucide-react";

export default function PurchaseComponent({
  products,
  setProducts,
  purchases,
  setPurchases,
}) {
  const [showForm, setShowForm] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Business state (you should set this according to your business location)
  const BUSINESS_STATE = "Maharashtra";
  const BUSINESS_STATE_CODE = "27";

  const [form, setForm] = useState({
    invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    challanNo: "",
    challanDate: "",
    poNo: "",
    deliveryDate: "",
    lrNo: "",
    dueDate: "",
    reverseCharge: false,
    ewayBillNo: "",
    vendorId: "",
    vendorName: "",
    vendorCompany: "",
    vendorEmail: "",
    vendorPhone: "",
    vendorAddress: "",
    vendorGstin: "",
    vendorState: "",
    vendorStateCode: "",
    vendorBankDetails: "",
    subtotal: 0,
    cgstTotal: 0,
    sgstTotal: 0,
    igstTotal: 0,
    totalTax: 0,
    grandTotal: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const [productRows, setProductRows] = useState([
    {
      id: 1,
      productId: "",
      productName: "",
      category: "",
      hsn: "",
      quantity: "",
      rate: "",
      gst: "",
      taxableValue: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: 0,
    },
  ]);

  // ✅ Load vendors from localStorage
  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem("vendors")) || [];
    setVendors(storedVendors);
  }, []);

  // ✅ Calculate row totals and overall bill totals
  useEffect(() => {
    const calculateRowTotals = (row) => {
      const quantity = Number(row.quantity) || 0;
      const rate = Number(row.rate) || 0;
      const gst = Number(row.gst) || 0;

      const taxableValue = quantity * rate;
      let cgst = 0,
        sgst = 0,
        igst = 0;

      // Check if vendor state matches business state
      if (form.vendorState === BUSINESS_STATE) {
        cgst = (taxableValue * gst) / 100 / 2;
        sgst = (taxableValue * gst) / 100 / 2;
      } else {
        igst = (taxableValue * gst) / 100;
      }

      const total = taxableValue + cgst + sgst + igst;

      return {
        ...row,
        taxableValue,
        cgst,
        sgst,
        igst,
        total,
      };
    };

    const updatedRows = productRows.map(calculateRowTotals);

    // Calculate overall totals
    const subtotal = updatedRows.reduce(
      (sum, row) => sum + row.taxableValue,
      0
    );
    const cgstTotal = updatedRows.reduce((sum, row) => sum + row.cgst, 0);
    const sgstTotal = updatedRows.reduce((sum, row) => sum + row.sgst, 0);
    const igstTotal = updatedRows.reduce((sum, row) => sum + row.igst, 0);
    const totalTax = cgstTotal + sgstTotal + igstTotal;
    const grandTotal = subtotal + totalTax;

    setForm((prev) => ({
      ...prev,
      subtotal,
      cgstTotal,
      sgstTotal,
      igstTotal,
      totalTax,
      grandTotal,
    }));
  }, [productRows, form.vendorState]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVendorChange = (e) => {
    const vendor = vendors.find((v) => v.id === Number(e.target.value));
    setSelectedVendor(vendor || null);

    if (vendor) {
      setForm((prev) => ({
        ...prev,
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorCompany: vendor.company,
        vendorEmail: vendor.email,
        vendorPhone: vendor.phone,
        vendorAddress: vendor.address || "",
        vendorGstin: vendor.gstin || "",
        vendorState: vendor.state || "",
        vendorStateCode: vendor.stateCode || "",
        vendorBankDetails: vendor.bankDetails || "",
      }));
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...productRows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };

    // If product is selected, auto-fill details
    if (field === "productId" && value) {
      const product = products.find((p) => p.id === Number(value));
      if (product) {
        updatedRows[index] = {
          ...updatedRows[index],
          productName: product.name,
          category: product.category || "",
          hsn: product.hsn || "",
          gst: product.gst || "",
        };
      }
    }

    setProductRows(updatedRows);
  };

  const addProductRow = () => {
    setProductRows([
      ...productRows,
      {
        id: Date.now(),
        productId: "",
        productName: "",
        category: "",
        hsn: "",
        quantity: "",
        rate: "",
        gst: "",
        taxableValue: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        total: 0,
      },
    ]);
  };

  const removeProductRow = (index) => {
    if (productRows.length > 1) {
      const updatedRows = [...productRows];
      updatedRows.splice(index, 1);
      setProductRows(updatedRows);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.vendorId ||
      productRows.some((row) => !row.productId || !row.quantity || !row.rate)
    ) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ Update product stock
    const updatedProducts = [...products];
    productRows.forEach((row) => {
      const productIndex = updatedProducts.findIndex(
        (p) => p.id === Number(row.productId)
      );
      if (productIndex !== -1) {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          stock:
            (updatedProducts[productIndex].stock || 0) + Number(row.quantity),
        };
      }
    });
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // ✅ Create new purchase
    const newPurchase = {
      id: Date.now(),
      invoiceNo: form.invoiceNo,
      invoiceDate: form.invoiceDate,
      challanNo: form.challanNo,
      challanDate: form.challanDate,
      poNo: form.poNo,
      deliveryDate: form.deliveryDate,
      lrNo: form.lrNo,
      dueDate: form.dueDate,
      reverseCharge: form.reverseCharge,
      ewayBillNo: form.ewayBillNo,
      vendorName: form.vendorName,
      vendorCompany: form.vendorCompany,
      vendorEmail: form.vendorEmail,
      vendorPhone: form.vendorPhone,
      vendorAddress: form.vendorAddress,
      vendorGstin: form.vendorGstin,
      vendorState: form.vendorState,
      vendorStateCode: form.vendorStateCode,
      vendorBankDetails: form.vendorBankDetails,
      products: productRows.map((row) => ({
        productName: row.productName,
        category: row.category,
        hsn: row.hsn,
        quantity: Number(row.quantity),
        rate: Number(row.rate),
        gst: row.gst,
        taxableValue: row.taxableValue,
        cgst: row.cgst,
        sgst: row.sgst,
        igst: row.igst,
        total: row.total,
      })),
      subtotal: form.subtotal,
      cgstTotal: form.cgstTotal,
      sgstTotal: form.sgstTotal,
      igstTotal: form.igstTotal,
      totalTax: form.totalTax,
      grandTotal: form.grandTotal,
      date: form.date,
    };

    const updatedPurchases = [...purchases, newPurchase];
    setPurchases(updatedPurchases);
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));

    // ✅ Reset form
    setForm({
      invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      challanNo: "",
      challanDate: "",
      poNo: "",
      deliveryDate: "",
      lrNo: "",
      dueDate: "",
      reverseCharge: false,
      ewayBillNo: "",
      vendorId: "",
      vendorName: "",
      vendorCompany: "",
      vendorEmail: "",
      vendorPhone: "",
      vendorAddress: "",
      vendorGstin: "",
      vendorState: "",
      vendorStateCode: "",
      vendorBankDetails: "",
      subtotal: 0,
      cgstTotal: 0,
      sgstTotal: 0,
      igstTotal: 0,
      totalTax: 0,
      grandTotal: 0,
      date: new Date().toISOString().split("T")[0],
    });
    setProductRows([
      {
        id: 1,
        productId: "",
        productName: "",
        category: "",
        hsn: "",
        quantity: "",
        rate: "",
        gst: "",
        taxableValue: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        total: 0,
      },
    ]);
    setShowForm(false);
    setSelectedVendor(null);
  };

  const handleDelete = (id) => {
    const updatedPurchases = purchases.filter((p) => p.id !== id);
    setPurchases(updatedPurchases);
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku?.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Purchases</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 transition text-sm"
        >
          <Plus className="mr-1 h-3 w-3" /> New Purchase
        </button>
      </div>

      {/* Purchase Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Add New Purchase
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Bill Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-blue-50 rounded-lg">
              <h4 className="md:col-span-2 text-md font-semibold text-blue-800">
                Bill Header
              </h4>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Invoice No.*
                </label>
                <input
                  type="text"
                  name="invoiceNo"
                  value={form.invoiceNo}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Invoice Date*
                </label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={form.invoiceDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Challan No.
                </label>
                <input
                  type="text"
                  name="challanNo"
                  value={form.challanNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Challan Date
                </label>
                <input
                  type="date"
                  name="challanDate"
                  value={form.challanDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  PO No.
                </label>
                <input
                  type="text"
                  name="poNo"
                  value={form.poNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Delivery Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  L.R. No.
                </label>
                <input
                  type="text"
                  name="lrNo"
                  value={form.lrNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="reverseCharge"
                  checked={form.reverseCharge}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-gray-700 text-sm font-medium">
                  Reverse Charge
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  E-Way Bill No.
                </label>
                <input
                  type="text"
                  name="ewayBillNo"
                  value={form.ewayBillNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>
            </div>

            {/* Vendor Selection Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-blue-50 rounded-lg">
              <h4 className="md:col-span-2 text-md font-semibold text-blue-800">
                Vendor Details
              </h4>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Select Vendor*
                </label>
                <select
                  name="vendorId"
                  value={form.vendorId}
                  onChange={handleVendorChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white shadow-sm"
                >
                  <option value="">Select a vendor</option>
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} - {v.company}
                    </option>
                  ))}
                </select>
              </div>

              {selectedVendor && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      value={form.vendorName}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.vendorCompany}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.vendorEmail}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={form.vendorPhone}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      Address
                    </label>
                    <textarea
                      value={form.vendorAddress}
                      readOnly
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      GSTIN
                    </label>
                    <input
                      type="text"
                      value={form.vendorGstin}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      State
                    </label>
                    <input
                      type="text"
                      value={form.vendorState}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                      Bank Details
                    </label>
                    <textarea
                      value={form.vendorBankDetails}
                      readOnly
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Product Section */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="text-md font-semibold text-blue-800 mb-3">
                Products
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-left">Category</th>
                      <th className="p-2 text-left">HSN</th>
                      <th className="p-2 text-left">Qty</th>
                      <th className="p-2 text-left">Rate</th>
                      <th className="p-2 text-left">GST %</th>
                      <th className="p-2 text-left">Taxable Value</th>
                      <th className="p-2 text-left">CGST</th>
                      <th className="p-2 text-left">SGST</th>
                      <th className="p-2 text-left">IGST</th>
                      <th className="p-2 text-left">Total</th>
                      <th className="p-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productRows.map((row, index) => (
                      <tr key={row.id} className="border-b border-gray-200">
                        <td className="p-2">
                          <select
                            value={row.productId}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "productId",
                                e.target.value
                              )
                            }
                            required
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                          >
                            <option value="">Select Product</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={row.category}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={row.hsn}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.quantity}
                            onChange={(e) =>
                              handleRowChange(index, "quantity", e.target.value)
                            }
                            required
                            min="1"
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.rate}
                            onChange={(e) =>
                              handleRowChange(index, "rate", e.target.value)
                            }
                            required
                            min="0"
                            step="0.01"
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.gst}
                            onChange={(e) =>
                              handleRowChange(index, "gst", e.target.value)
                            }
                            min="0"
                            step="0.01"
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.taxableValue.toFixed(2)}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.cgst.toFixed(2)}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.sgst.toFixed(2)}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.igst.toFixed(2)}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={row.total.toFixed(2)}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="p-2">
                          {productRows.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeProductRow(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  type="button"
                  onClick={addProductRow}
                  className="mt-3 flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 transition text-sm"
                >
                  <Plus className="mr-1 h-3 w-3" /> Add Product
                </button>
              </div>
            </div>

            {/* Totals Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-blue-50 rounded-lg">
              <h4 className="md:col-span-2 text-md font-semibold text-blue-800">
                Bill Totals
              </h4>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Subtotal
                </label>
                <input
                  type="number"
                  value={form.subtotal.toFixed(2)}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  CGST Total
                </label>
                <input
                  type="number"
                  value={form.cgstTotal.toFixed(2)}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  SGST Total
                </label>
                <input
                  type="number"
                  value={form.sgstTotal.toFixed(2)}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  IGST Total
                </label>
                <input
                  type="number"
                  value={form.igstTotal.toFixed(2)}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Total Tax
                </label>
                <input
                  type="number"
                  value={form.totalTax.toFixed(2)}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Grand Total
                </label>
                <input
                  type="number"
                  value={form.grandTotal.toFixed(2)}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50 font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition text-sm"
              >
                Save Purchase
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Purchases Table */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Purchase History
        </h3>
        {purchases.length === 0 ? (
          <p className="text-gray-500 text-sm">No purchases recorded.</p>
        ) : (
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-sm text-gray-700 border-collapse rounded-lg">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <tr>
                  <th className="p-2 text-left text-sm font-medium">
                    Invoice No.
                  </th>
                  <th className="p-2 text-left text-sm font-medium">Date</th>
                  <th className="p-2 text-left text-sm font-medium">Vendor</th>
                  <th className="p-2 text-left text-sm font-medium">
                    Products
                  </th>
                  <th className="p-2 text-left text-sm font-medium">Total</th>
                  <th className="p-2 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, idx) => (
                  <tr
                    key={purchase.id}
                    className={`transition hover:bg-gray-50 ${
                      idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                    }`}
                  >
                    <td className="p-2 text-sm">{purchase.invoiceNo}</td>
                    <td className="p-2 text-sm">{purchase.date}</td>
                    <td className="p-2 text-sm">{purchase.vendorName}</td>
                    <td className="p-2 text-sm">
                      {purchase.products.length} items
                    </td>
                    <td className="p-2 font-semibold text-sm">
                      ₹{purchase.grandTotal.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDelete(purchase.id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
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
