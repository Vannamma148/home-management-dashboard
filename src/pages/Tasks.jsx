import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle, X, Calendar, Users } from "lucide-react";

export default function Tasks() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [members] = useState(["John", "Jane", "Aarav", "Guest"]);

  const [tasks, setTasks] = useState([
    {
      title: "Buy groceries",
      assignedTo: "Jane",
      priority: "High",
      dueDate: "2025-11-29",
      completed: false,
    },
    {
      title: "Pay electricity bill",
      assignedTo: "John",
      priority: "Medium",
      dueDate: "2025-11-30",
      completed: false,
    },
    {
      title: "Clean living room",
      assignedTo: "Aarav",
      priority: "Low",
      dueDate: "2025-12-01",
      completed: false,
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    priority: "Low",
    assignedTo: "",
    dueDate: "",
  });

  const addTask = () => {
    if (!form.title || !form.assignedTo || !form.dueDate) return;

    setTasks([form, ...tasks]);
    setForm({
      title: "",
      priority: "Low",
      assignedTo: "",
      dueDate: "",
    });
    setDrawerOpen(false);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-teal-700">Tasks</h1>

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl shadow hover:bg-teal-700"
        >
          <Plus size={18} /> Add Task
        </button>
      </header>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`rounded-xl shadow p-5 border-l-8 
              ${task.priority === "High" ? "border-red-400" : ""}
              ${task.priority === "Medium" ? "border-yellow-400" : ""}
              ${task.priority === "Low" ? "border-teal-400" : ""}
              bg-white hover:shadow-md transition`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>

              {/* Complete button */}
              <button onClick={() => toggleComplete(index)}>
                <CheckCircle
                  size={26}
                  className={`${
                    task.completed ? "text-teal-600" : "text-gray-300"
                  }`}
                />
              </button>
            </div>

            {/* Assigned & Due */}
            <div className="text-sm mt-3 space-y-1">
              <p className="flex items-center gap-2 text-gray-600">
                <Users size={16} /> Assigned to:{" "}
                <span className="font-medium text-gray-800">
                  {task.assignedTo}
                </span>
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} /> Due:{" "}
                <span className="font-medium text-gray-800">{task.dueDate}</span>
              </p>
            </div>

            {/* Priority Badge */}
            <span
              className={`mt-3 inline-block px-3 py-1 rounded-full text-white text-sm
                ${
                  task.priority === "High"
                    ? "bg-red-500"
                    : task.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-teal-600"
                }`}
            >
              {task.priority}
            </span>

            {/* Delete */}
            <button
              onClick={() => deleteTask(index)}
              className="mt-4 text-red-500 hover:bg-red-100 p-2 rounded-lg float-right"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Right Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isDrawerOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-6 z-50"
      >
        <button
          className="mb-6 p-2 bg-teal-100 text-teal-700 rounded-xl"
          onClick={() => setDrawerOpen(false)}
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-gray-700 mb-6">Add New Task</h2>

        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Task title"
            className="border rounded-lg p-3 w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Assign */}
          <select
            className="border rounded-lg p-3 w-full"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          >
            <option value="">Assign to</option>
            {members.map((m, i) => (
              <option key={i}>{m}</option>
            ))}
          </select>

          {/* Priority */}
          <select
            className="border rounded-lg p-3 w-full"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            className="border rounded-lg p-3 w-full"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />

          {/* Add Button */}
          <button
            onClick={addTask}
            className="bg-teal-600 text-white w-full py-3 rounded-lg shadow hover:bg-teal-700"
          >
            Add Task
          </button>
        </div>
      </motion.div>
    </div>
  );
}
