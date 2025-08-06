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
            // 1. Đăng nhập
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                username,
                password,
            });

            const { token, accountResponse } = response.data;

            // 2. Lưu token và account
            localStorage.setItem("token", token);
            localStorage.setItem("account", JSON.stringify(accountResponse));
            toast.success("Đăng nhập thành công!");

            // 3. Lấy danh sách sự kiện
            const scheduleResponse = await ApiInstance.get("/schedule/");
            const fetchedEvents = Array.isArray(scheduleResponse?.data)
                ? scheduleResponse.data?.map((event) => ({
                      ...event,
                      start: new Date(event.start),
                      end: new Date(event.end),
                  }))
                : []; // Nếu dữ liệu không phải là mảng, trả về mảng rỗng

            // 4. Lọc sự kiện trong 3 ngày tới
            const today = new Date();
            const threeDaysLater = new Date();
            threeDaysLater.setDate(today.getDate() + 3);

            const upcomingEvents = fetchedEvents?.filter((event) => {
                const eventStart = new Date(event.start);
                return eventStart >= today && eventStart <= threeDaysLater;
            });

            // 5. Hiển thị toast nếu có sự kiện sắp diễn ra
            if (upcomingEvents.length > 0) {
                upcomingEvents.forEach((event) => {
                    const startTime = new Date(event.start);
                    toast.info(
                        `Nhắc nhở: ${
                            event.title
                        } vào lúc ${startTime.toLocaleTimeString()} ngày ${startTime.toLocaleDateString()}`
                    );
                });
            }

            // 6. Điều hướng sau khi login
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
