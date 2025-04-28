import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './views/auth/Login';
import SignupPage from './views/auth/Signup';
import Home from './views/Home';
import Cart from './views/Cart';
import ProtectedRoute from './utils/ProtectedRoute';
import Myorders from './views/MyOrders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Myorders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
