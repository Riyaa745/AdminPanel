// data.js
export const menuData = [
  { title: "INBOND", items: ["Purchase", "Production", "Products"] },
  { title: "Inventory", items: ["Stock management"] },
  {
    title: "Vendor",
  },
  {
    title: "Outbound",
    items: ["Quotation", "Proforma invoice", "Tax invoice", "Order status"],
  },
    { title: "Administration" },
  { title: "Human resource" },
  { title: "Task" },
   { title: "Our Products" },
  {
    title: "Setting",
    items: ["Product Attributes"],
  },
  { title: "Account" },
];

export const kpiData = [
  { title: "Total Purchases", value: 1520, color: "text-blue-600" },
  { title: "Total Shipments", value: 985, color: "text-orange-500" },
  { title: "Pending Tasks", value: 47, color: "text-green-600" },
  { title: "Active Employees", value: 120, color: "text-indigo-500" },
  { title: "Products in Stock", value: 3200, color: "text-teal-500" },
  { title: "Orders Completed", value: 875, color: "text-purple-500" },
];

export const chartData = [
  { day: "Mon", purchases: 200, shipments: 180, tasks: 25 },
  { day: "Tue", purchases: 250, shipments: 200, tasks: 30 },
  { day: "Wed", purchases: 180, shipments: 160, tasks: 22 },
  { day: "Thu", purchases: 300, shipments: 250, tasks: 35 },
  { day: "Fri", purchases: 270, shipments: 220, tasks: 28 },
  { day: "Sat", purchases: 150, shipments: 120, tasks: 15 },
  { day: "Sun", purchases: 100, shipments: 80, tasks: 10 },
];

export const movementData = [
  {
    date: "2025-09-10",
    type: "Purchase",
    product: "Laptop",
    employee: "Alice",
    department: "IT",
    status: "Received",
  },
  {
    date: "2025-09-11",
    type: "Production",
    product: "Mouse",
    employee: "Bob",
    department: "Manufacturing",
    status: "In Progress",
  },
  {
    date: "2025-09-11",
    type: "Shipment",
    product: "Keyboard",
    employee: "Charlie",
    department: "Logistics",
    status: "Shipped",
  },
  {
    date: "2025-09-12",
    type: "Purchase",
    product: "Monitor",
    employee: "David",
    department: "IT",
    status: "Received",
  },
  {
    date: "2025-09-12",
    type: "Production",
    product: "Chair",
    employee: "Eve",
    department: "Manufacturing",
    status: "In Progress",
  },
  {
    date: "2025-09-12",
    type: "Shipment",
    product: "Table",
    employee: "Frank",
    department: "Logistics",
    status: "Shipped",
  },
];

export const trackingData = [
  {
    date: "2025-09-10",
    product: "Laptop",
    employee: "Alice",
    department: "IT",
    status: "In Stock",
  },
  {
    date: "2025-09-11",
    product: "Mouse",
    employee: "Bob",
    department: "Manufacturing",
    status: "Low Stock",
  },
  {
    date: "2025-09-11",
    product: "Keyboard",
    employee: "Charlie",
    department: "Logistics",
    status: "Out of Stock",
  },
  {
    date: "2025-09-12",
    product: "Monitor",
    employee: "David",
    department: "IT",
    status: "In Stock",
  },
  {
    date: "2025-09-12",
    product: "Chair",
    employee: "Eve",
    department: "Manufacturing",
    status: "Low Stock",
  },
  {
    date: "2025-09-12",
    product: "Table",
    employee: "Frank",
    department: "Logistics",
    status: "In Stock",
  },
];

// Human Resource Data

// Task Management Data
export const taskData = [
  {
    type: "Bug Fix",
    product: "Website",
    employee: "Alice",
    status: "Completed",
  },
  {
    type: "Feature",
    product: "Mobile App",
    employee: "Bob",
    status: "In Progress",
  },
  {
    type: "Testing",
    product: "Backend API",
    employee: "Charlie",
    status: "Pending",
  },
  {
    type: "Deployment",
    product: "Server",
    employee: "David",
    status: "Completed",
  },
  {
    type: "Design",
    product: "Landing Page",
    employee: "Eve",
    status: "In Progress",
  },
  {
    type: "Research",
    product: "New Module",
    employee: "Frank",
    status: "Pending",
  },
];
