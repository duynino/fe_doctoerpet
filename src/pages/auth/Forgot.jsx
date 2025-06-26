import React, { useState } from "react";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Snackbar,
    Alert,
    IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiInstance from "../../axios/index";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = async () => {
        // Giả lập gửi email thành công
        try {
            // const response = await axios.post("http://localhost:8080/auth/forgotPassword", { email });
            // console.log("Email sent successfully:", response.data);
            // setSubmitted(true);
            // toast.success(response.data);
            const response = await ApiInstance.post("/auth/forgotPassword", { email });
            console.log("Email sent successfully:", response.data);
            setSubmitted(true);
            toast.success(response.data);
        } catch (error) {
            console.error("Error sending email:", error.response.data);
            setSubmitted(false);
            toast.error(error.response.data);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <HeaderPage />
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "70vh",
                        py: 1,
                    }}
                >
                    <Paper elevation={3} sx={{ padding: 2, width: "100%", borderRadius: 2 }}>
                        <Typography
                            variant="h5"
                            align="center"
                            fontWeight="bold"
                            color="primary"
                            gutterBottom
                        >
                            Đặt lại mật khẩu
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="textSecondary"
                            sx={{ mb: 3 }}
                        >
                            Nhập email để đặt lại mật khẩu của bạn.
                        </Typography>

                        {!submitted ? (
                            <>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    autoFocus
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        mt: 2,
                                        py: 1.2,
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Gửi liên kết đặt lại
                                </Button>
                            </>
                        ) : (
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                sx={{ textAlign: "center" }}
                            >
                                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                                <Typography variant="h6" color="success.main" fontWeight="bold">
                                    Liên kết đã được gửi!
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    Vui lòng kiểm tra hộp thư của bạn.
                                </Typography>
                            </Grid>
                        )}
                    </Paper>
                </Box>

                {/* Snackbar thông báo thành công */}
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                        Email đã được gửi thành công!
                    </Alert>
                </Snackbar>
            </Container>
            <FooterPage />
        </div>
    );
};

export default ForgotPassword;
