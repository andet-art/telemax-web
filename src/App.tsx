import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./components/FAQ";
import Cart from "./pages/cart";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Checkout from "./pages/Checkout"; // ✅ Import Checkout page
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} /> {/* ✅ Correct placement */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment/>}/>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
