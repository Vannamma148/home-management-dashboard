import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";

import Home from "./pages/Home";
import FamilyMembers from "./pages/FamilyMembers";
import Events from "./pages/Events";
import ShoppingList from "./pages/ShoppingList";
import Expenses from "./pages/Expenses";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Settings from "./pages/Settings";

// Simple auth check (replace with real auth)
const isAuthenticated = () => localStorage.getItem("loggedIn") === "true";

// Protected wrapper
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages (no sidebar/navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Dashboard Pages (inside Main layout) */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/family" element={<FamilyMembers />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/shopping" element={<ShoppingList />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Main>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
