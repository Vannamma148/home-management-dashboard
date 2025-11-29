import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Main from "./components/Main";

import Home from "./pages/Home";
import FamilyMembers from "./pages/FamilyMembers";
import Events from "./pages/Events";
import ShoppingList from "./pages/ShoppingList";
import Expenses from "./pages/Expenses";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Dashboard wrapper */}
        <Route
          path="/"
          element={
           
              <Main />
           
          }
        >
          <Route index element={<Home />} />
          <Route path="family" element={<FamilyMembers />} />
          <Route path="events" element={<Events />} />
          <Route path="shopping" element={<ShoppingList />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="Home" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
