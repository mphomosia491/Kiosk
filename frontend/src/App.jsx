import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wallet from "./pages/Wallet";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route 
            path="/" 
            element=
            {
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
              } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
            path="/cart" 
            element=
            {
              <ProtectedRoute>
                  <Cart />
              </ProtectedRoute>
            } 
        />
        <Route 
            path="/checkout" 
            element=
            {
              <ProtectedRoute>
                  <Checkout />
              </ProtectedRoute>
            } 
        />
        <Route 
            path="/wallet" 
            element=
            {
              <ProtectedRoute>
                  <Wallet />
              </ProtectedRoute>
            } 
        />
      </Routes>
    </BrowserRouter>
  );
    
}

export default App;