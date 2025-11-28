import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  ListTodo,
  Wallet,
  ShoppingBag,
  Calendar,
  Settings,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden lg:flex flex-col bg-white/80 backdrop-blur-xl shadow-xl
        w-64 p-5 h-screen fixed top-16 left-0 z-50 "
      >
        <SidebarContent />
      </aside>

      {/* MOBILE SLIDE SIDEBAR */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden bg-white/90 backdrop-blur-xl shadow-xl 
        w-64 p-5 h-screen fixed top-0 left-0 z-50 "
      >
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 p-2 rounded-xl bg-teal-500 text-teal-100"
        >
          <X />
        </button>

        <SidebarContent />
      </motion.aside>
    </>
  );
}

/* Sidebar inner content */
function SidebarContent() {
  return (
    <>
      <h2 className="text-3xl font-extrabold bg-linear-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent mb-10">
        AVHome
      </h2>

      <nav className="flex flex-col gap-2 text-gray-700 font-semibold">
        <NavItem icon={<Home size={20} />} text="Dashboard" to="/" />
        <NavItem icon={<Users size={20} />} text="Members" to="/family" />
        <NavItem icon={<ListTodo size={20} />} text="Tasks" to="/tasks" />
        <NavItem icon={<ShoppingBag size={20} />} text="Shopping" to="/shopping" />
        <NavItem icon={<Wallet size={20} />} text="Expenses" to="/expenses" />
        <NavItem icon={<Calendar size={20} />} text="Calendar" to="/events" />
        <NavItem icon={<Settings size={20} />} text="Settings" to="/settings" />
      </nav>
    </>
  );
}

function NavItem({ icon, text, to }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 p-3 rounded-xl transition-all
        ${active
         ? "bg-linear-to-r from-teal-400 to-teal-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
        }
      `}
    >
      {icon}
      {text}
    </Link>
  );
}
