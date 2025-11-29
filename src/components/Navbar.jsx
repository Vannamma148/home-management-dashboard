  import { Menu, Bell, Search, LogOut } from "lucide-react";
  import { useAuth } from "../components/AuthContext";

  export default function Navbar({ toggleSidebar }) {
    const { logout } = useAuth();

    return (
      <header
        className="
          w-full h-16 fixed top-0 left-0 z-30
          bg-teal-500 dark:bg-teal-600/80
          backdrop-blur-xl 
          shadow-md flex items-center justify-between
          px-4
        "
      >
        {/* LEFT: Mobile Hambuger */}
        <button
          className="lg:hidden p-2 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-white"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* LOGO */}
        <h1
          className="
            text-xl font-extrabold
            bg-linear-to-r from-gray-200 to-white 
            bg-clip-text text-transparent hidden md:block
          "
        >
          Home Management Dashboard
        </h1>

        {/* SEARCH BAR */}
        <div
          className="
            hidden md:flex items-center 
            bg-gray-200 dark:bg-teal-800
            px-4 py-2 rounded-xl w-1/4 shadow-inner
          "
        >
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-100" />
          <input
            placeholder="Search..."
            className="ml-2 bg-transparent outline-none w-full dark:text-white"
          />
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Bell
            className="
              w-6 h-6 cursor-pointer text-teal-700 dark:text-white
            "
          />

         

          {/* User Avatar */}
          <div
            className="
              w-9 h-9 bg-teal-600 dark:bg-teal-500 rounded-full
              flex items-center justify-center text-white
              cursor-pointer font-semibold
            "
          >
            U
          </div>
           {/* Logout Button */}
          <button
            onClick={logout}
            className="
              flex items-center gap-2 px-3 py-2 
              bg-orange-600 hover:bg-red-600 
              text-white rounded-xl font-semibold 
              shadow-sm transition-all
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>
    );
  }
