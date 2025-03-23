
import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/loginpage";
import ForgotPasswordPage from './pages/forgotpasswordpage';
import SignUp from './pages/signuppage';
import ExploreLebanon from "./components/abouLeb";
import ChangePasswordPage from "./pages/changepasswordpage";
import EventsPage from "./pages/EventsPage";
import Beirut from "./pages/beirut";
 import Sidon from "./pages/sidon";
 import Byblos from "./pages/byblos";
 import Sour from "./pages/sour";
 import Baalbak from "./pages/baalbak";
 import Batroun from "./pages/batroun";
import FavoritesPage from "./pages/favoritepage";
import { AuthProvider } from "./context/authContext";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import AdminLogin from './pages/AdminLogin';
import Accountpage from "./pages/accountpage";
import EmailVerificationPage from "./components/EmailVerificationPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddEvent from "./components/AddEvent";
import AddListing from "./components/AddListing";
import CityCategory from "./components/CityCategory";  // Import your CityCategory component


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signuppage" element={<SignUp />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/aboutLebanon" element={<ExploreLebanon />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/events" element={<EventsPage />} />
         
          {/* City Routes */}
          <Route path="/beirut" element={<Beirut />} />
          <Route path="/sidon" element={<Sidon />} />
          <Route path="/byblos" element={<Byblos />} />
          <Route path="/sour" element={<Sour />} />
          <Route path="/baalbak" element={<Baalbak />} />
          <Route path="/batroun" element={<Batroun />} />

          {/* City Category Route */}
          <Route path="/:city/:category" element={<CityCategory />} />
         
          <Route path="/account" element={<Accountpage />}/>
         
          <Route
           path="/favorites"
           element={<FavoritesPage />}
          //  element={<PrivateRoute><FavoritesPage /></PrivateRoute>}
          />
          <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          <Route path="/admin/add-event" element={<AddEvent />} />
          <Route path="/admin/add-listing" element={<AddListing />} />
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