import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Lấy token từ URL (ví dụ: http://your-site.com/reset-password?token=abc123)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setError("Vui lòng điền đầy đủ cả hai trường.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu không khớp.");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/auth/resetPassword?token=${token}`, {
                newPassword,
            });

            setSuccess(true);
            toast.success("Đổi mật khẩu thành công!");
            setTimeout(() => {
                navigate("/login"); // Chuyển hướng về trang đăng nhập sau 1 giây
            }, 1000);
        } catch (err) {
            const message = err.response?.data?.message;
            toast.error(message);
        }
    };

    return (
        <>
            <HeaderPage />
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "70vh",
                    }}
                >
                    <Paper elevation={3} sx={{ padding: 4, width: "100%", borderRadius: 2 }}>
                        <Typography
                            variant="h5"
                            align="center"
                            fontWeight="bold"
                            color="primary"
                            gutterBottom
                        >
                            Đặt lại mật khẩu
                        </Typography>

                        {success ? (
                            <Box textAlign="center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
                                    alt="Success"
                                    style={{ width: 80, marginBottom: 16 }}
                                />
                                <Typography variant="h6" color="success.main" fontWeight="bold">
                                    Thành công!
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Mật khẩu của bạn đã được thay đổi.
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <TextField
                                    label="Mật khẩu mới"
                                    type="password"
                                    fullWidth
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    autoFocus
                                />
                                <TextField
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    fullWidth
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                />

                                {error && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        mt: 3,
                                        py: 1.2,
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Đặt lại mật khẩu
                                </Button>
                            </>
                        )}
                    </Paper>
                </Box>

                <ToastContainer position="top-right" autoClose={3000} />
            </Container>

            <FooterPage />
        </>
    );
};

export default ResetPasswordPage;
