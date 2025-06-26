import React, { useState } from "react";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import { Container, TextField, Button, Typography, Box, Link } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ApiInstance from "../../axios/index";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

     const handleSubmit = () => {
    //     try {
    //         const response = ApiInstance.post("/auth/register", formData);
    //         console.log("Đăng ký thành công:", response.data);
    //         toast.success("Đăng ký thành công!");
    //         navigate("/login"); // Chuyển hướng đến trang đăng nhập
    //         // 3. Reset form
    //         setFormData({
    //             username: "",
    //             email: "",
    //             password: "",
    //         });
    //     } catch (error) {
    //         console.error("Lỗi đăng ký:", error.response);
    //         // 5. Xử lý lỗi từ server
    //         if (error.response && error.response.data.message) {
    //             toast.error(error.response.data.message); // Ví dụ: "Email đã tồn tại"
    //         } else {
    //             //toast.error("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
    //             toast.error(error.response.data);
    //         }
    //     }

        // 2. Gửi dữ liệu lên server
        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                username: username,
                email: email,
                password: password,
            })
            .then((response) => {
                console.log("Đăng ký thành công:", response.data);
                toast.success("Đăng ký thành công!");
                navigate("/login"); // Chuyển hướng đến trang đăng nhập
                // 3. Reset form
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.error("Lỗi đăng ký:", error.response);

                // 5. Xử lý lỗi từ server
                if (error.response && error.response.data.message) {
                    toast.error(error.response.data.message); // Ví dụ: "Email đã tồn tại"
                } else {
                    //toast.error("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
                    toast.error(error.response.data);
                }
            });
    };
    return (
        <div>
            <HeaderPage />
            <Container maxWidth="sm" sx={{ my: 5 }}>
                <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Tạo tài khoản
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Mật khẩu"
                        type="password"
                        name="password"
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
                        onClick={handleSubmit}
                    >
                        Đăng ký
                    </Button>

                    <Link
                        href="/login"
                        underline="none"
                        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Quay lại đăng nhập
                        </Typography>
                    </Link>
                </Box>
            </Container>
            <FooterPage />
        </div>
    );
};

export default Register;
