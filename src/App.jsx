import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './App.css'
import HomePage from "./pages/homepage/homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import ProductSearch from "./pages/ProductSearchList/ProducTSearch";
import ForgotPassword from "./pages/auth/Forgot";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import ProfilePet from "./components/Hosothucung/ProfilePet";

function App() {
    return (
        <div>
            <Routes>
                {/* Đường dẫn Homepage */}
                <Route path="/" element={<HomePage />} />

                {/* Đường dẫn cho các trang login */}
                <Route path="/login" element={<Login />} />

                {/* Đường dẫn cho các trang register */}
                <Route path="/register" element={<Register />} />

                {/* Đường dẫn cho trang quên mật khẩu */}
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Đường dẫn cho trang reset mật khẩu */}
                <Route path="/auth/resetPassword" element={<ResetPasswordPage />} />

                {/* Đường dẫn cho trang thông tin thú cưng */}
                <Route path="/petProfile" element={<ProfilePet />} />

                {/* Đường dẫn cho trang chi tiết sản phẩm */}
                <Route path="/productDetail" element={<ProductDetail />} />

                <Route path="/productSearch" element={<ProductSearch />} />
            </Routes>

            <ToastContainer />
        </div>
    );
}

export default App;
