"use client";
import { useState } from "react";
import {
  Plus,
  User,
  Users,
  Building,
  Edit,
  Trash2,
  Phone,
  MapPin,
  DollarSign,
  X,
  Search,
  Filter,
} from "lucide-react";

export default function HumanResourceComponent({
  employees,
  setEmployees,
  departments,
  setDepartments,
}) {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    departmentId: "",
    position: "",
    salary: "",
    dateHired: new Date().toISOString().split("T")[0],
  });

  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    description: "",
  });

  // Employee form change
  const handleEmployeeFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  // Department form change
  const handleDepartmentFormChange = (e) => {
    const { name, value } = e.target;
    setDepartmentForm({ ...departmentForm, [name]: value });
  };

  // Add employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(),
      ...employeeForm,
      department:
        departments.find((d) => d.id === parseInt(employeeForm.departmentId))
          ?.name || "Unassigned",
    };
    setEmployees([...employees, newEmployee]);
    resetEmployeeForm();
  };

  // Edit employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setEmployeeForm({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      departmentId:
        departments.find((d) => d.name === employee.department)?.id || "",
      position: employee.position,
      salary: employee.salary,
      dateHired: employee.dateHired,
    });
    setShowEmployeeForm(true);
  };

  // Update employee
  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map((emp) =>
      emp.id === editingEmployee.id
        ? {
            ...emp,
            ...employeeForm,
            department:
              departments.find(
                (d) => d.id === parseInt(employeeForm.departmentId)
              )?.name || "Unassigned",
          }
        : emp
    );
    setEmployees(updatedEmployees);
    resetEmployeeForm();
  };

  // Delete employee
  const handleDeleteEmployee = (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // Add department
  const handleAddDepartment = (e) => {
    e.preventDefault();
    const newDepartment = { id: Date.now(), ...departmentForm };
    setDepartments([...departments, newDepartment]);
    setDepartmentForm({ name: "", description: "" });
    setShowDepartmentForm(false);
  };

  // Delete department
  const handleDeleteDepartment = (id) => {
    if (employees.some((emp) => emp.departmentId === id)) {
      alert("Cannot delete department with assigned employees.");
      return;
    }
    if (confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((dept) => dept.id !== id));
    }
  };

  // Reset employee form
  const resetEmployeeForm = () => {
    setEmployeeForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      departmentId: "",
      position: "",
      salary: "",
      dateHired: new Date().toISOString().split("T")[0],
    });
    setEditingEmployee(null);
    setShowEmployeeForm(false);
  };

  // Filter employees
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" ||
      employee.departmentId === parseInt(filterDepartment);

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-1.5">
          <Users className="h-5 w-5" /> Human Resources
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDepartmentForm(!showDepartmentForm)}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
          >
            <Building className="mr-1 h-3 w-3" /> New Department
          </button>
          <button
            onClick={() => setShowEmployeeForm(!showEmployeeForm)}
            className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
          >
            <Plus className="mr-1 h-3 w-3" /> New Employee
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Employees</p>
              <h3 className="text-xl font-bold">{employees.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-full">
              <Building className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Departments</p>
              <h3 className="text-xl font-bold">{departments.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-full">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg. Salary</p>
              <h3 className="text-xl font-bold">
                ₹
                {employees.length
                  ? Math.round(
                      employees.reduce(
                        (sum, emp) => sum + Number(emp.salary || 0),
                        0
                      ) / employees.length
                    )
                  : 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border rounded-md focus:ring-2 focus:ring-indigo-300 text-sm"
            />
          </div>
          <div className="flex gap-1.5 items-center">
            <Filter className="h-3 w-3 text-gray-500" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employee Form */}
      {showEmployeeForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </h3>
            <button
              onClick={resetEmployeeForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form
            onSubmit={
              editingEmployee ? handleUpdateEmployee : handleAddEmployee
            }
            className="space-y-3"
          >
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={employeeForm.name}
                onChange={handleEmployeeFormChange}
                required
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={employeeForm.email}
                onChange={handleEmployeeFormChange}
                required
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Phone</label>
              <input
                type="tel"
                name="phone"
                value={employeeForm.phone}
                onChange={handleEmployeeFormChange}
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              />
            </div>
            {/* Address */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Address
              </label>
              <textarea
                name="address"
                value={employeeForm.address}
                onChange={handleEmployeeFormChange}
                rows="2"
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              />
            </div>
            {/* Department */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Department
              </label>
              <select
                name="departmentId"
                value={employeeForm.departmentId}
                onChange={handleEmployeeFormChange}
                required
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Position */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={employeeForm.position}
                onChange={handleEmployeeFormChange}
                required
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              />
            </div>
            {/* Salary */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Salary (₹)
              </label>
              <input
                type="number"
                name="salary"
                value={employeeForm.salary}
                onChange={handleEmployeeFormChange}
                required
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              />
            </div>
            {/* Date Hired */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Date Hired
              </label>
              <input
                type="date"
                name="dateHired"
                value={employeeForm.dateHired}
                onChange={handleEmployeeFormChange}
                required
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={resetEmployeeForm}
                className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
              >
                {editingEmployee ? "Update" : "Add"} Employee
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <h3 className="text-base font-semibold flex items-center gap-1.5">
            <User className="h-4 w-4" /> Employees ({filteredEmployees.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Employee
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Position
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Department
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Contact
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Salary
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Date Hired
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition">
                    <td className="p-2">
                      <p className="font-medium text-sm">{employee.name}</p>
                      <p className="text-xs text-gray-500">{employee.email}</p>
                    </td>
                    <td className="p-2 text-sm">{employee.position}</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {employee.department}
                      </span>
                    </td>
                    <td className="p-2 text-sm">
                      <p className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {employee.phone || "-"}
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {employee.address || "-"}
                      </p>
                    </td>
                    <td className="p-2 font-medium text-sm">
                      ₹{employee.salary}
                    </td>
                    <td className="p-2 text-sm">{employee.dateHired}</td>
                    <td className="p-2 flex gap-1.5 mt-3">
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Edit className="h-3 w-3 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Trash2 className="h-3 w-3 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center text-gray-500 text-sm"
                  >
                    No employees found. Add some employees to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Form */}
      {showDepartmentForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold">Add New Department</h3>
            <button
              onClick={() => setShowDepartmentForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleAddDepartment} className="space-y-3">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Department Name
              </label>
              <input
                type="text"
                name="name"
                value={departmentForm.name}
                onChange={handleDepartmentFormChange}
                required
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={departmentForm.description}
                onChange={handleDepartmentFormChange}
                rows="2"
                className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-300 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowDepartmentForm(false)}
                className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
              >
                Add Department
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Departments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base font-semibold flex items-center gap-1.5">
            <Building className="h-4 w-4" /> Departments ({departments.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Department
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Description
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50 transition">
                  <td className="p-2 text-sm">{dept.name}</td>
                  <td className="p-2 text-sm">{dept.description}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteDepartment(dept.id)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Trash2 className="h-3 w-3 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
