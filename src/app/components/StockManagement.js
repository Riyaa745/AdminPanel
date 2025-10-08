"use client";
import { useState, useEffect } from "react";
import { Trash2, Package, Edit, Save, X } from "lucide-react";

export default function StockManagement() {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [initialStock, setInitialStock] = useState({});
  const [editingProductId, setEditingProductId] = useState(null);
  const [editInitialStockValue, setEditInitialStockValue] = useState("");

  // Load products, purchases, and initial stock from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    const savedInitialStock =
      JSON.parse(localStorage.getItem("initialStock")) || {};

    setProducts(savedProducts);
    setPurchases(savedPurchases);
    setInitialStock(savedInitialStock);
  }, []);

  // Handle initial stock editing
  const handleEditInitialStock = (productId, currentValue) => {
    setEditingProductId(productId);
    setEditInitialStockValue(currentValue);
  };

  // Save initial stock changes
  const handleSaveInitialStock = (productId) => {
    const updatedInitialStock = {
      ...initialStock,
      [productId]: Number(editInitialStockValue) || 0,
    };

    setInitialStock(updatedInitialStock);
    localStorage.setItem("initialStock", JSON.stringify(updatedInitialStock));
    setEditingProductId(null);
    setEditInitialStockValue("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditInitialStockValue("");
  };

  // Update stock in products list
  const handleUpdateStock = () => {
    const updatedProducts = products.map((p) => {
      const purchasedQty = purchases
        .filter((pu) => pu.productName === p.name)
        .reduce((sum, pu) => sum + Number(pu.quantity || 0), 0);

      const baseStock = initialStock[p.id] || 0;
      return { ...p, stock: baseStock + purchasedQty };
    });

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    alert("Stock updated successfully!");
  };

  // Delete a purchase
  const handleDeletePurchase = (id) => {
    const updatedPurchases = purchases.filter((p) => p.id !== id);
    setPurchases(updatedPurchases);
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));

    // After deleting a purchase, we need to update the stock display
    handleUpdateStock();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-1.5">
        <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
        Stock Management
      </h2>

      {/* Stock Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-blue-600" /> Current Stock Levels
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="p-3 text-left rounded-tl-lg text-sm font-medium">
                  Product
                </th>
                <th className="p-3 text-left text-sm font-medium">Category</th>
                <th className="p-3 text-left text-sm font-medium">SKU</th>
                <th className="p-3 text-left text-sm font-medium">
                  Initial Stock
                </th>
                <th className="p-3 text-left text-sm font-medium">Purchased</th>
                <th className="p-3 text-left text-sm font-medium">
                  Current Stock
                </th>
                <th className="p-3 text-left rounded-tr-lg text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length > 0 ? (
                products.map((p) => {
                  const purchasedQty = purchases
                    .filter((pu) => pu.productName === p.name)
                    .reduce((sum, pu) => sum + Number(pu.quantity || 0), 0);

                  const currentStock = (initialStock[p.id] || 0) + purchasedQty;

                  return (
                    <tr key={p.id} className="transition hover:bg-gray-50">
                      <td className="p-3 text-sm font-medium text-gray-900">
                        {p.name}
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {p.category}
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {p.sku || "-"}
                      </td>
                      <td className="p-3">
                        {editingProductId === p.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editInitialStockValue}
                              onChange={(e) =>
                                setEditInitialStockValue(e.target.value)
                              }
                              className="w-20 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm bg-white shadow-sm"
                            />
                            <button
                              onClick={() => handleSaveInitialStock(p.id)}
                              className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
                            >
                              <Save className="w-3 h-3" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-sm"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {initialStock[p.id] || 0}
                            </span>
                            <button
                              onClick={() =>
                                handleEditInitialStock(
                                  p.id,
                                  initialStock[p.id] || 0
                                )
                              }
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {purchasedQty}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                          {currentStock}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleUpdateStock()}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition text-sm shadow-sm"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-500 text-sm bg-gray-50"
                  >
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleUpdateStock}
            className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition text-sm shadow-sm"
          >
            Update All Stock
          </button>
        </div>
      </div>

      {/* Purchases History */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Purchases History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="p-3 text-left rounded-tl-lg text-sm font-medium">
                  Date
                </th>
                <th className="p-3 text-left text-sm font-medium">Product</th>
                <th className="p-3 text-left text-sm font-medium">Vendor</th>
                <th className="p-3 text-left text-sm font-medium">Quantity</th>
                <th className="p-3 text-left text-sm font-medium">Rate</th>
                <th className="p-3 text-left text-sm font-medium">Total</th>
                <th className="p-3 text-left rounded-tr-lg text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {purchases.length > 0 ? (
                purchases.map((pu) => (
                  <tr key={pu.id} className="transition hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-900">{pu.date}</td>
                    <td className="p-3 text-sm font-medium text-gray-900">
                      {pu.productName}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {pu.vendorName}
                    </td>
                    <td className="p-3 text-sm text-gray-600">{pu.quantity}</td>
                    <td className="p-3 text-sm text-gray-600">₹{pu.rate}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                        ₹{pu.total}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeletePurchase(pu.id)}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-500 text-sm bg-gray-50"
                  >
                    No purchases recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
