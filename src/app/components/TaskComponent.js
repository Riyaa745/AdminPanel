"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Filter, Check } from "lucide-react";

export default function TaskComponent({
  tasks,
  setTasks,
  departments = [],
  employees = [],
}) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const defaultTaskForm = {
    title: "",
    description: "",
    departmentId: "",
    employeeId: "",
    employeeName: "",
    priority: "Normal",
    dueDate: new Date().toISOString().split("T")[0],
    completed: false,
  };

  const [taskForm, setTaskForm] = useState(defaultTaskForm);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "employeeId") {
      const emp = employees.find((e) => e.id === parseInt(value));
      const dept = departments.find((d) => d.name === emp?.department)?.id;
      setTaskForm({
        ...taskForm,
        employeeId: value,
        employeeName: emp?.name || "",
        departmentId: dept || "",
      });
    } else {
      setTaskForm({ ...taskForm, [name]: value });
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), ...taskForm };
    setTasks([...tasks, newTask]);
    setTaskForm(defaultTaskForm);
    setShowTaskForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({ ...task });
    setShowTaskForm(true);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((t) =>
      t.id === editingTask.id ? { ...t, ...taskForm } : t
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setTaskForm(defaultTaskForm);
    setShowTaskForm(false);
  };

  const handleDeleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.employeeName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" ||
      task.departmentId === parseInt(filterDepartment);

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-3 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
          <Plus className="h-5 w-5" /> Tasks
        </h2>
        <button
          onClick={() => setShowTaskForm(!showTaskForm)}
          className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
        >
          <Plus className="mr-1 h-3 w-3" /> New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
        />
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

      {/* Task Form */}
      {showTaskForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h3>
            <button
              onClick={() => {
                setShowTaskForm(false);
                setEditingTask(null);
                setTaskForm(defaultTaskForm);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            className="space-y-3"
          >
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskForm.title}
              onChange={handleTaskFormChange}
              required
              className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={taskForm.description}
              onChange={handleTaskFormChange}
              className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
              rows="2"
            />
            <select
              name="employeeId"
              value={taskForm.employeeId}
              onChange={handleTaskFormChange}
              required
              className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
            >
              <option value="">Assign Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.department})
                </option>
              ))}
            </select>
            {/* Department auto-selected */}
            <select
              name="priority"
              value={taskForm.priority}
              onChange={handleTaskFormChange}
              className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleTaskFormChange}
              className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-indigo-300 text-sm"
            />
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowTaskForm(false);
                  setEditingTask(null);
                  setTaskForm(defaultTaskForm);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
              >
                {editingTask ? "Update" : "Add"} Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <h3 className="text-base font-semibold">
            Tasks ({filteredTasks.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Title
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Employee
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Department
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Priority
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Due Date
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const emp = employees.find(
                    (e) => e.id === parseInt(task.employeeId)
                  );
                  const dept =
                    departments.find(
                      (d) => d.id === parseInt(task.departmentId)
                    )?.name ||
                    emp?.department ||
                    "-";
                  return (
                    <tr key={task.id} className="hover:bg-gray-50 transition">
                      <td className="p-2 text-sm">{task.title}</td>
                      <td className="p-2 text-sm">{emp?.name || "-"}</td>
                      <td className="p-2 text-sm">{dept}</td>
                      <td className="p-2 text-sm">{task.priority}</td>
                      <td className="p-2 text-sm">{task.dueDate}</td>
                      <td className="p-2">
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                            task.completed
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="p-2 flex gap-1.5">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="p-0.5 rounded hover:bg-gray-100"
                        >
                          <Edit className="h-3 w-3 text-indigo-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-0.5 rounded hover:bg-gray-100"
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </button>
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="p-0.5 rounded hover:bg-gray-100"
                        >
                          <Check className="h-3 w-3 text-green-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-3 text-center text-gray-500 text-sm"
                  >
                    No tasks found. Add some tasks to get started.
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
