import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/loginpage";
import ForgotPasswordPage from './pages/forgotpasswordpage';
import SignUp from './pages/signuppage';
import ExploreLebanon from "./components/abouLeb";
import ChangePasswordPage from "./pages/changepasswordpage";
import EventsPage from "./pages/EventsPage";
import Beirut from "./pages/beirut";
import FavoritesPage from "./pages/favoritepage";
import { AuthProvider } from "./context/authContext";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signuppage" element={<SignUp />} />
          <Route path="/aboutLebanon" element={<ExploreLebanon />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/beirut" element={<Beirut />} />
          <Route
           path="/favorites"
           element={<FavoritesPage />}
          //  element={<PrivateRoute><FavoritesPage /></PrivateRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) {
//   return children; }
// };


export default App;
