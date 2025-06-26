import React, { useState } from "react";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import { Container, TextField, Button, Typography, Box, Link, Alert } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ApiInstance from "../../axios/index";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn reload trang khi submit form

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { username, password });
            // const response = await ApiInstance.post("/auth/login", { username, password });
            const { token, accountResponse } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("account", JSON.stringify(accountResponse));
            toast.success("Đăng nhập thành công!");
            // Có thể chuyển hướng sau khi đăng nhập thành công:
            // ví dụ: window.location.href = "/dashboard";
            navigate("/");
        } catch (err) {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu.");
            console.error("Lỗi đăng nhập:", err);

            if (err.response) {
                console.error("Server phản hồi:", err.response.data);
            } else if (err.request) {
                console.error("Không nhận được phản hồi từ server");
            } else {
                console.error("Lỗi:", err.message);
            }
        }
    };

    return (
        <div>
            <HeaderPage />
            <Container maxWidth="sm" sx={{ my: 5 }}>
                <Box sx={{ p: 4, borderRadius: 1, boxShadow: 3 }}>
                    <Typography variant="h5" align="center" color="text.primary" fontWeight="bold">
                        Đăng nhập
                    </Typography>

                    {/* Hiển thị lỗi nếu có */}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Tên người dùng hoặc email"
                            type="text"
                            name="username"
                            required
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            required
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Đăng nhập
                        </Button>
                    </form>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 2,
                        }}
                    >
                        <Typography variant="body2">
                            Quên mật khẩu?{" "}
                            <Link href="/forgot-password" color="primary">
                                Khôi phục mật khẩu
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Khách hàng mới?{" "}
                            <Link href="/register" color="primary">
                                Tạo tài khoản của bạn
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
            <FooterPage />
        </div>
    );
};

export default Login;
