import { useState } from "react";
import { Plus, User, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Members() {
  const [members, setMembers] = useState([
    { name: "John Doe", role: "Father", phone: "9876543210" },
    { name: "Jane Doe", role: "Mother", phone: "9123456780" },
    { name: "Aarav", role: "Son", phone: "9000001111" },
  ]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "Member",
    phone: "",
  });

  const addMember = () => {
    if (!form.name || !form.phone) return;

    setMembers([...members, form]);
    setForm({ name: "", role: "Member", phone: "" });
    setDrawerOpen(false);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-teal-700">Members</h1>

        <button
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl shadow hover:bg-teal-700"
          onClick={() => setDrawerOpen(true)}
        >
          <Plus size={18} /> Add Member
        </button>
      </header>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="text-teal-700" size={30} />
              </div>

              <div>
                <p className="text-xl font-semibold text-gray-700">
                  {member.name}
                </p>
                <p className="text-teal-600 font-medium">{member.role}</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm"> {member.phone}</p>

            <button
              onClick={() => removeMember(index)}
              className="self-end text-red-500 hover:bg-red-100 p-2 rounded-lg"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Right Drawer (Add Member) */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isDrawerOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-6 z-50"
      >
        {/* Close button */}
        <button
          className="mb-6 p-2 bg-teal-100 text-teal-700 rounded-xl"
          onClick={() => setDrawerOpen(false)}
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-gray-700 mb-6">Add New Member</h2>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Role */}
          <select
            className="border rounded-lg p-3"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Father</option>
            <option>Mother</option>
            <option>Son</option>
            <option>Daughter</option>
            <option>Roommate</option>
            <option>Grandparent</option>
            <option>Other</option>
          </select>

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            className="border rounded-lg p-3"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button
            onClick={addMember}
            className="bg-teal-600 text-white w-full py-3 rounded-lg shadow hover:bg-teal-700"
          >
            Add Member
          </button>
        </div>
      </motion.div>
    </div>
  );
}
