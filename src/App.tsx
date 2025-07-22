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
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import CustomImageCustomizer from "./pages/CustomImageCustomizer";


// Import CustomizePage
import CustomizePage from "./pages/CustomizePage";

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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/customize-image/:id" element={<CustomImageCustomizer />} />


          {/* New route for customizing pipes */}
          <Route path="/customize/:id" element={<CustomizePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
