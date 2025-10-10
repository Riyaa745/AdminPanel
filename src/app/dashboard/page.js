"use client";
import { useState, useEffect } from "react";
import ProductCRUD from "../components/ProductCRUD";
import PurchaseComponent from "../components/PurchaseComponent";
import VendorComponent from "../components/VendorComponent";
import StockManagement from "../components/StockManagement";
import HumanResourceComponent from "../components/HumanResource";
import TaskComponent from "../components/TaskComponent";
import ProductAttributesComponent from "../components/ProductAttributesComponent";

import { Search, Menu, Package2 } from "lucide-react";
import {
  menuData,
  kpiData,
  chartData,
  movementData,
  trackingData,
} from "../data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  package2,
  User,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  Package,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Ship,
  Warehouse,
  ClipboardCheck,
  FileText,
  Mail,
  Inbox,
  Send,
  Archive,
  Trash2,
  CircleUser,
  SettingsIcon,
} from "lucide-react";

export default function Dashboard() {
  const [active, setActive] = useState("INBOND");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  // Shared state for all components including Vendors
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [vendors, setVendors] = useState([]); // ✅ Added vendors state
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load all data from localStorage only on client side
  useEffect(() => {
    if (isClient) {
      setProducts(JSON.parse(localStorage.getItem("products")) || []);
      setPurchases(JSON.parse(localStorage.getItem("purchases")) || []);
      setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
      setDepartments(JSON.parse(localStorage.getItem("departments")) || []);
      setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
      setAttributes(JSON.parse(localStorage.getItem("attributes")) || []);
      setVendors(JSON.parse(localStorage.getItem("vendors")) || []); // ✅ Load vendors
    }
  }, [isClient]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("purchases", JSON.stringify(purchases));
    }
  }, [purchases, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("departments", JSON.stringify(departments));
    }
  }, [departments, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("attributes", JSON.stringify(attributes));
    }
  }, [attributes, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("vendors", JSON.stringify(vendors)); // ✅ Save vendors
    }
  }, [vendors, isClient]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSection = (sectionTitle) =>
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));

  // Menu icons
  const getMenuItemIcon = (itemName) => {
    switch (itemName) {
      case "Dashboard":
        return <Home className="w-3 h-3" />;
      case "INBOND":
        return <Ship className="w-3 h-3" />;
      case "Inventory":
        return <Package className="w-3 h-3" />;
      case "Human resource":
        return <Users className="w-3 h-3" />;
      case "Task":
        return <ClipboardList className="w-3 h-3" />;
      case "Product Attributes":
        return <Package className="w-3 h-3" />;
      case "Mail":
        return <Mail className="w-3 h-3" />;
      case "Reports":
        return <BarChart3 className="w-3 h-3" />;
      case "Settings":
        return <Settings className="w-3 h-3" />;
      case "Help & Support":
        return <HelpCircle className="w-3 h-3" />;
      case "Logout":
        return <LogOut className="w-3 h-3" />;
      case "Stock Management":
        return <ClipboardCheck className="w-3 h-3" />;
      case "Inventory Reports":
        return <FileText className="w-3 h-3" />;
      case "Inbox":
        return <Inbox className="w-3 h-3" />;
      case "Sent":
        return <Send className="w-3 h-3" />;
      case "Archived":
        return <Archive className="w-3 h-3" />;
      case "Trash":
        return <Trash2 className="w-3 h-3" />;
      case "Outbound":
        return <Warehouse className="w-3 h-3" />;
      case "Account":
        return <Users className="w-3 h-3" />;
      case "Our Products":
        return <Package2 className="w-3 h-3" />;
      case "Administration":
        return <User className="w-3 h-3" />;
      case "Vendor":
        return <CircleUser className="w-3 h-3" />;
      case "Setting":
        return <SettingsIcon className="w-3 h-3" />;
    }
  };

  // KPI cards
  const renderKpiCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {kpiData.map((kpi, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 
                     p-3 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-xs font-medium text-gray-500">{kpi.title}</h3>
          <p className={`text-lg font-bold mt-1.5 ${kpi.color}`}>
            {kpi.value.toLocaleString()}
          </p>
          <span className="inline-block mt-1.5 text-xs text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full">
            +0% vs Last Week
          </span>
        </div>
      ))}
    </div>
  );

  // Chart
  const renderChart = () => (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Inventory Overview
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
            }}
          />
          <Bar dataKey="purchases" fill="#3b82f6" radius={[3, 3, 0, 0]} />
          <Bar dataKey="shipments" fill="#f97316" radius={[3, 3, 0, 0]} />
          <Bar dataKey="tasks" fill="#10b981" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // Table
  const renderTable = (data, columns) => (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
      <div className="min-w-[400px]">
        <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-1">
          <thead>
            <tr className="text-left text-gray-600">
              {columns.map((col, idx) => (
                <th key={idx} className="p-2 font-semibold text-sm">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="bg-white shadow-sm rounded-md hover:shadow-md transition"
              >
                {columns.map((col, i) => (
                  <td key={i} className="p-2 text-sm">
                    {row[col.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Mail
  const renderMailContent = () => (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Mail - {active}
      </h3>
      <div className="space-y-3">
        <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">System Notification</h4>
            <span className="text-xs text-gray-500">Today, 10:30 AM</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Your weekly inventory report is ready for review.
          </p>
        </div>
      </div>
    </div>
  );

  // Content switcher
  const renderContent = () => {
    switch (active) {
      case "INBOND":
        return (
          <div className="space-y-4">
            {renderKpiCards()}
            {renderChart()}
            {renderTable(movementData, [
              "Date",
              "Type",
              "Product",
              "Employee",
              "Department",
              "Status",
            ])}
            {renderTable(trackingData, [
              "Date",
              "Product",
              "Employee",
              "Department",
              "Status",
            ])}
          </div>
        );

      case "Products":
        return (
          <ProductCRUD
            products={products}
            setProducts={setProducts}
            attributes={attributes}
          />
        );

      case "Vendor":
        return (
          <VendorComponent 
            vendors={vendors} 
            setVendors={setVendors} // ✅ Pass vendors state and setter
          />
        );

      case "Purchase":
        return (
          <PurchaseComponent
            products={products}
            setProducts={setProducts}
            purchases={purchases}
            setPurchases={setPurchases}
          />
        );

      case "Inventory":
        return renderTable(trackingData, [
          "Product",
          "Employee",
          "Department",
          "Status",
        ]);

      case "Stock management":
        return <StockManagement />;

      case "Human resource":
        return (
          <HumanResourceComponent
            employees={employees}
            setEmployees={setEmployees}
            departments={departments}
            setDepartments={setDepartments}
          />
        );

      case "Task":
        return (
          <TaskComponent
            tasks={tasks}
            setTasks={setTasks}
            employees={employees}
          />
        );

      case "Product Attributes":
        return (
          <ProductAttributesComponent
            attributes={attributes}
            setAttributes={setAttributes}
          />
        );

      case "Inbox":
      case "Sent":
      case "Archived":
      case "Trash":
        return renderMailContent();

      default:
        return (
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{active}</h3>
            <p className="text-gray-600 text-sm">
              Overview of {active.toLowerCase()}.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-56 bg-[#1a2a47] shadow-sm p-3 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-white font-bold text-base">
              <img
                src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757675093/dashboard_i3dym3.png"
                alt="Logo"
                className="h-6"
              />
              <p>Admin Dashboard</p>
            </div>
            <div className="text-xs text-white mt-1.5 text-center">
              <p>admin@gmail.com</p>
            </div>
          </div>
          <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-1.5">
          {menuData.map((section, idx) => (
            <div key={idx}>
              <button
                onClick={() => {
                  if (section.items) {
                    toggleSection(section.title);
                  } else {
                    setActive(section.title);
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full text-left p-1.5 rounded text-sm font-medium flex items-center gap-1.5 ${active === section.title && !section.items
                  ? "bg-blue-500 text-white"
                  : "text-white hover:bg-gray-100 hover:text-black"
                  } transition-colors`}
              >
                {getMenuItemIcon(section.title)}
                <span className="flex-1">{section.title}</span>
                {section.items &&
                  (openSections[section.title] ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  ))}
              </button>
              {section.items && openSections[section.title] && (
                <ul className="ml-3 space-y-0.5 mt-1">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => {
                          setActive(item);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left p-1.5 rounded text-sm flex items-center gap-1.5 ${active === item
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-gray-100 hover:text-black"
                          } transition-colors`}
                      >
                        {getMenuItemIcon(item)}
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Fixed Top Navbar */}
      <div className="fixed top-0 left-0 right-0 md:left-56 bg-[#C7D3FA] p-3 shadow-sm  flex items-center justify-between gap-1.5 z-40 h-14">
        <div className="flex items-center gap-2">
          <button className="md:hidden text-black" onClick={toggleSidebar}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base  text-black font-bold truncate">{active}</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1 max-w-[140px] sm:max-w-[180px]">
            <input
              type="text"
              placeholder="Search products"
              className="p-1 pl-7 rounded-md w-full bg-black text-white placeholder-white text-xs border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
              size={12}
            />
          </div>
          <button className="p-1 rounded-md hover:bg-black transition">
            <Bell className="w-4 h-4 text-black  hover:text-white" />
          </button>
          <button className="flex items-center gap-1 p-1 rounded-md hover:bg-gray-900 transition">
            <User className="w-4 h-4 text-black hover:text-white" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-56 pt-16 min-h-screen px-3 pb-3 md:px-4 md:pb-4">
        {renderContent()}
      </main>
    </div>
  );
}