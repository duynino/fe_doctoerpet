import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import { toast } from "react-toastify";

const ContactForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    return (
        <>
            <Box>
                <HeaderPage />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                    p: 4,
                    bgcolor: "#f9fafb",
                    minHeight: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Roboto, sans-serif",
                }}
            >
                {/* Left section */}
                <Box sx={{ flex: "1 1 400px", maxWidth: 600, minWidth: 320 }}>
                    <Typography component="h2" variant="h4" fontWeight="700" mb={2}>
                        Đồng Hành Cùng Bạn Chăm Sóc Thú Cưng -{" "}
                        <Box component="span" sx={{ color: "#0098E6", fontWeight: 700 }}>
                            Liên Hệ Ngay
                        </Box>{" "}
                        Hôm Nay!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={3} maxWidth={500}>
                        Bạn có câu hỏi? Cần được tư vấn phù hợp với nhu cầu riêng? Đội ngũ của chúng
                        tôi luôn sẵn sàng hỗ trợ bạn từng bước!
                    </Typography>

                    <List sx={{ maxWidth: 500, p: 0 }}>
                        <ListItem sx={{ p: "4px 0" }}>
                            <ListItemIcon sx={{ color: "#0098E6", minWidth: 32 }}>
                                <CheckCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gợi ý sản phẩm và giải pháp phù hợp với từng giống loài, độ tuổi và tình trạng sức khỏe của thú cưng." />
                        </ListItem>

                        <ListItem sx={{ p: "4px 0" }}>
                            <ListItemIcon sx={{ color: "#0098E6", minWidth: 32 }}>
                                <CheckCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Theo dõi thông tin thú cưng, lịch sử tiêm vaccine, tình trạng bệnh lý." />
                        </ListItem>

                        <ListItem sx={{ p: "4px 0" }}>
                            <ListItemIcon sx={{ color: "#0098E6", minWidth: 32 }}>
                                <CheckCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nhắc nhở tự động khi đăng nhập – giúp bạn không bao giờ quên lịch chăm sóc bé cưng." />
                        </ListItem>
                    </List>
                </Box>

                {/* Right section - Form */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: "1 1 320px",
                        maxWidth: 400,
                        minWidth: 320,
                        borderRadius: 3,
                        p: 4,
                        bgcolor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                >
                    <Box component="form" noValidate autoComplete="off">
                        <Typography variant="subtitle2" fontWeight={600} mb={0.7}>
                            Email của bạn
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Nhập email của bạn"
                            variant="outlined"
                            type="email"
                            margin="normal"
                            size="small"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />

                        <Typography variant="subtitle2" fontWeight={600} mb={0.7}>
                            Tên của bạn
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Nhập tên của bạn"
                            variant="outlined"
                            margin="normal"
                            size="small"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <Typography variant="subtitle2" fontWeight={600} mb={0.7}>
                            Mô tả vấn đề của bạn
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Nhập mô tả vấn đề của bạn"
                            variant="outlined"
                            multiline
                            rows={5}
                            margin="normal"
                            size="small"
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                backgroundColor: "#0098E6",
                                fontWeight: 700,
                                fontSize: 16,
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#007bb5",
                                },
                            }}
                            onClick={() => {
                                toast.success("Cảm ơn bạn đã gửi thông tin!");
                                // Here you can add the logic to handle form submission
                                setFormData({
                                    name: "",
                                    email: "",
                                    message: "",
                                });
                            }}
                        >
                            Gửi
                        </Button>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            fontStyle="italic"
                        >
                            *Thông tin của bạn được bảo mật với chúng tôi.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <Box>
                <FooterPage />
            </Box>
        </>
    );
};

export default ContactForm;
