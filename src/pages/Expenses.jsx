import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
} from "recharts";
import { Trash2, Edit2, Plus } from "lucide-react";


const CATEGORY_COLORS = {
  Groceries: "#06B6D4", // teal-400
  Bills: "#10B981",     // green-500
  Transport: "#F59E0B", // amber-500
  Shopping: "#8B5CF6",  // violet-500
  Other: "#EF4444",     // red-500
};

const DEFAULT_CATEGORIES = Object.keys(CATEGORY_COLORS);

export default function Expenses() {
  // initial example data
  const [expenses, setExpenses] = useState(() => [
    { id: 1, name: "Groceries", amount: 120, date: "2025-11-25", category: "Groceries" },
    { id: 2, name: "Electricity Bill", amount: 60, date: "2025-11-20", category: "Bills" },
    { id: 3, name: "Gas", amount: 45, date: "2025-11-18", category: "Transport" },
    { id: 4, name: "Internet", amount: 30, date: "2025-11-15", category: "Bills" },
  ]);

  // Form state for adding
  const [form, setForm] = useState({ name: "", amount: "", category: DEFAULT_CATEGORIES[0] });

  // Drawer (edit) state
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null); // expense being edited

  // Derived values
  const totalExpenses = useMemo(
    () => expenses.reduce((acc, e) => acc + Number(e.amount || 0), 0),
    [expenses]
  );

  // pieData: aggregated by category
  const pieData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      const cat = e.category || "Other";
      map[cat] = (map[cat] || 0) + Number(e.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  // Add expense
  const addExpense = () => {
    if (!form.name || !form.amount) return;
    const newExpense = {
      id: Date.now(),
      name: form.name,
      amount: Number(form.amount),
      date: new Date().toISOString().split("T")[0],
      category: form.category || "Other",
    };
    setExpenses((s) => [newExpense, ...s]);
    setForm({ name: "", amount: "", category: DEFAULT_CATEGORIES[0] });
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses((s) => s.filter((e) => e.id !== id));
    // If deleting currently edited item, close drawer
    if (editing && editing.id === id) {
      setEditing(null);
      setDrawerOpen(false);
    }
  };

  // Open drawer for edit
  const openEdit = (expense) => {
    setEditing(expense);
    setDrawerOpen(true);
  };

  // Save edited expense
  const saveEdit = (updated) => {
    setExpenses((s) => s.map((e) => (e.id === updated.id ? updated : e)));
    setEditing(null);
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-teal-700">Expenses</h1>

        {/* Add quick form inline on wide and stacked on small */}
        <div className="flex gap-3 items-center">
          <div className="hidden md:flex gap-2 items-center bg-white p-2 rounded-lg shadow">
            <input
              className="px-3 py-2 border rounded-lg w-40 outline-none"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="px-3 py-2 border rounded-lg w-28 outline-none"
              placeholder="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <select
              className="px-3 py-2 border rounded-lg outline-none"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {DEFAULT_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={addExpense}
              className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow hover:bg-teal-700"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          {/* On mobile, show small add button that opens a quick add modal (reuse drawer) */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setEditing(null);
                setDrawerOpen(true);
              }}
              className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow hover:bg-teal-700"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Summary + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Expenses" value={`Rs.${totalExpenses}`} />
            <StatCard title="Expenses Count" value={expenses.length} />
            <StatCard title="Avg per Item" value={`Rs.${Math.round(totalExpenses / Math.max(1, expenses.length))}`} />
          </div>

          {/* Recent list */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Expenses</h2>
            <div className="divide-y">
              {expenses.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <div className="text-sm text-gray-400">{item.date}</div>
                    </div>
                    <CategoryBadge name={item.category} />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="font-semibold text-teal-600">Rs.{item.amount}</div>
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 rounded-md hover:bg-gray-100"
                      aria-label="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteExpense(item.id)}
                      className="p-2 rounded-md hover:bg-red-50 text-red-500"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {expenses.length === 0 && (
                <div className="py-8 text-center text-gray-400">No expenses yet — add one!</div>
              )}
            </div>
          </div>
        </div>

        {/* Pie chart card */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Category Breakdown</h2>
          <div className="flex-1">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={pieData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    labelLine={false}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={CATEGORY_COLORS[entry.name] || "#94A3B8"} />
                    ))}
                  </Pie>
                  <ReTooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-400">No data</div>
            )}

            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ background: CATEGORY_COLORS[d.name] || "#94A3B8" }} />
                  <div className="text-sm text-gray-700">{d.name} <span className="text-gray-400">(${d.value})</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer (Edit / Quick Add) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <Drawer onClose={() => { setDrawerOpen(false); setEditing(null); }}>
            <EditForm
              initial={editing}
              categories={DEFAULT_CATEGORIES}
              onCancel={() => {
                setDrawerOpen(false);
                setEditing(null);
              }}
              onSave={(payload) => {
                if (editing) {
                  // update existing
                  saveEditedExpense(payload, setExpenses);
                } else {
                  // add new (from drawer)
                  const newItem = {
                    id: Date.now(),
                    name: payload.name,
                    amount: Number(payload.amount),
                    date: new Date().toISOString().split("T")[0],
                    category: payload.category,
                  };
                  setExpenses((s) => [newItem, ...s]);
                }
                setDrawerOpen(false);
                setEditing(null);
              }}
            />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Helper components ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-teal-600 mt-2">{value}</div>
    </div>
  );
}

function CategoryBadge({ name }) {
  const color = CATEGORY_COLORS[name] || "#94A3B8";
  return (
    <span
      className="text-xs font-semibold px-2 py-1 rounded-full"
      style={{
        background: `Rs.{color}20`, // small opacity
        color,
      }}
    >
      {name}
    </span>
  );
}

/* Drawer wrapper */
function Drawer({ children, onClose }) {
  return (
    <>
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white z-60 shadow-2xl p-6 overflow-auto"
      >
        {children}
      </motion.aside>
    </>
  );
}

/* Edit / Add form inside Drawer */
function EditForm({ initial = null, categories = [], onCancel, onSave }) {
  const [state, setState] = useState(() => {
    if (initial) {
      return { id: initial.id, name: initial.name, amount: initial.amount, category: initial.category };
    }
    return { name: "", amount: "", category: categories[0] || "Other" };
  });

  useEffect(() => {
    if (initial) {
      setState({ id: initial.id, name: initial.name, amount: initial.amount, category: initial.category });
    } else {
      setState({ name: "", amount: "", category: categories[0] || "Other" });
    }
  }, [initial, categories]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{initial ? "Edit Expense" : "Add Expense"}</h3>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">Close</button>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-600">Name</label>
        <input
          className="w-full border px-3 py-2 rounded-lg"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          placeholder="e.g. Groceries"
        />

        <label className="text-sm font-medium text-gray-600">Amount</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded-lg"
          value={state.amount}
          onChange={(e) => setState((s) => ({ ...s, amount: e.target.value }))}
          placeholder="e.g. 25"
        />

        <label className="text-sm font-medium text-gray-600">Category</label>
        <select
          className="w-full border px-3 py-2 rounded-lg"
          value={state.category}
          onChange={(e) => setState((s) => ({ ...s, category: e.target.value }))}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              if (!state.name || !state.amount) return;
              // save
              const payload = {
                id: state.id,
                name: state.name,
                amount: Number(state.amount),
                category: state.category,
                date: new Date().toISOString().split("T")[0],
              };
              onSave(payload);
            }}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700"
          >
            Save
          </button>

          <button onClick={onCancel} className="px-4 py-2 rounded-lg border">Cancel</button>
        </div>
      </div>

      <div className="mt-auto text-sm text-gray-400 pt-6">
        <div>Tip: Use categories to analyze spending.</div>
      </div>
    </div>
  );
}

/* helper for saving edit (updates state) */
function saveEditedExpense(payload, setExpenses) {
  setExpenses((s) => s.map((e) => (e.id === payload.id ? { ...e, ...payload } : e)));
}
