import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle, X, Pencil } from "lucide-react";

const CATEGORY_COLORS = {
  Groceries: "from-teal-400 to-teal-600",
  Household: "from-green-400 to-green-600",
  Electronics: "from-yellow-400 to-yellow-600",
  Clothing: "from-purple-400 to-purple-600",
  Other: "from-red-400 to-red-600",
};
const DEFAULT_CATEGORIES = Object.keys(CATEGORY_COLORS);

export default function ShoppingPremiumList() {
  const [items, setItems] = useState([
    { id: 1, text: "Milk", bought: false, category: "Groceries" },
    { id: 2, text: "Detergent", bought: false, category: "Household" },
    { id: 3, text: "T-shirt", bought: false, category: "Clothing" },
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ text: "", category: DEFAULT_CATEGORIES[0] });

  const saveItem = () => {
    if (!form.text.trim()) return;
    if (editing) {
      setItems((s) =>
        s.map((it) =>
          it.id === editing.id
            ? { ...it, text: form.text.trim(), category: form.category }
            : it
        )
      );
    } else {
      const id = Date.now();
      setItems((s) => [
        { id, text: form.text.trim(), category: form.category, bought: false },
        ...s,
      ]);
    }
    setForm({ text: "", category: DEFAULT_CATEGORIES[0] });
    setEditing(null);
    setDrawerOpen(false);
  };

  const deleteItem = (id) => setItems((s) => s.filter((it) => it.id !== id));
  const toggleBought = (id) =>
    setItems((s) => s.map((it) => (it.id === id ? { ...it, bought: !it.bought } : it)));
  const openEdit = (item) => {
    setEditing(item);
    setForm({ text: item.text, category: item.category });
    setDrawerOpen(true);
  };
  const openAdd = () => {
    setEditing(null);
    setForm({ text: "", category: DEFAULT_CATEGORIES[0] });
    setDrawerOpen(true);
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-teal-700">Shopping List</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-200">
        {items.length === 0 && (
          <div className="text-gray-500 text-center py-8">No items yet. Add some!</div>
        )}

        {items.map((item) => (
          <motion.div
            key={item.id}
            className="flex justify-between items-center py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleBought(item.id)}>
                <CheckCircle
                  size={22}
                  className={item.bought ? "text-teal-600" : "text-gray-300"}
                />
              </button>
              <div>
                <p className={`font-medium ${item.bought ? "line-through text-gray-400" : ""}`}>
                  {item.text}
                </p>
                <CategoryBadge name={item.category} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(item)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Pencil size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <Drawer onClose={() => setDrawerOpen(false)}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {editing ? "Edit Item" : "Add Item"}
              </h3>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setEditing(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Item name"
                className="w-full border rounded-lg px-3 py-2"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
              />
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {DEFAULT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                onClick={saveItem}
                className="w-full bg-teal-700 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                Save
              </button>
            </div>
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryBadge({ name }) {
  const gradient = CATEGORY_COLORS[name] || "from-gray-400 to-gray-600";
  return (
    <span
      className={`inline-block text-xs font-semibold px-3 py-1 mt-1 rounded-full bg-linear-to-r ${gradient} text-white`}
    >
      {name}
    </span>
  );
}

function Drawer({ children, onClose }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />
      <motion.aside
        initial={{ y: "100%", x: 0 }}
        animate={{ y: 0, x: 0 }}
        exit={{ y: "100%", x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 md:top-0 md:right-0 md:bottom-0 md:w-96 bg-white/90 backdrop-blur-md z-60 p-6 rounded-t-xl md:rounded-l-xl shadow-2xl"
      >
        {children}
      </motion.aside>
    </>
  );
}
