import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import { CarProvider } from "./contexts/CarContext";
import { SearchProvider } from "./contexts/SearchContext";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <SearchProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </SearchProvider>
      </CarProvider>
    </AuthProvider>
  );
}

export default App;
