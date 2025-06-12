import React from "react";
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    Facebook,
    Instagram,
    Twitter,
    YouTube,
    LocationOn,
    Call,
    Mail,
    ChevronRight,
} from "@mui/icons-material";

const FooterPage = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: "#0098E6", color: "white", mt: 4 }}>
            <Box sx={{ px: { xs: 2, md: 4 }, py: 3, maxWidth: "lg", mx: "auto" }}>
                <Grid container columns={12} spacing={4}>
                    {/* Giới thiệu */}
                    <Grid columnSpan={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Giới thiệu
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                            {`Công ty TNHH DoctorPet Việt Nam Giấy chứng nhận 
                            Đăng ký Kinh doanh số 0315530794 do Sở Kế hoạch 
                            và Đầu tư Thành phố Hà Nội cấp ngày 01/01/2025. 
                            Đại diện: Group 6 - Doctor Pet.`}
                        </Typography>
                        <br />
                        <Box
                            component="img"
                            src="https://theme.hstatic.net/1000356051/1001056962/14/logo_bct.jpg?v=275"
                            alt="BCT logo"
                            sx={{ width: 200, mb: 2 }}
                        />
                        <Stack direction="row" spacing={2}>
                            <IconButton sx={{ bgcolor: "grey.800", color: "white" }}>
                                <Facebook />
                            </IconButton>
                            <IconButton sx={{ bgcolor: "grey.800", color: "white" }}>
                                <YouTube />
                            </IconButton>
                            <IconButton sx={{ bgcolor: "grey.800", color: "white" }}>
                                <Instagram />
                            </IconButton>
                            <IconButton sx={{ bgcolor: "grey.800", color: "white" }}>
                                <Twitter />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {/* Liên kết */}
                    <Grid columnSpan={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Liên kết
                        </Typography>
                        <List dense>
                            {[
                                "Liên lạc",
                                "Giới thiệu",
                                "Điều khoản dịch vụ",
                                "Chính sách đổi trả",
                                "Điều khoản sử dụng",
                                "Chính sách vận chuyển",
                                "Phương thức thanh toán",
                                "Chính sách giải quyết khiếu nại",
                                "Chính sách bảo mật thông tin cá nhân",
                            ].map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemIcon sx={{ minWidth: "30px", color: "white" }}>
                                        <ChevronRight />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Liên hệ */}
                    <Grid columnSpan={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Liên hệ
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <LocationOn sx={{ mt: "4px" }} />
                            <Box
                                sx={{
                                    maxWidth: "300px",
                                    whiteSpace: "pre-line",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                <Typography variant="subtitle2">Doctor Pet Hoà Lạc</Typography>
                                <Typography variant="body2">
                                    Khu Công nghệ cao Hòa Lạc, Km29 Đại lộ Thăng Long, huyện Thạch
                                    Thất, Hà Nội
                                </Typography>
                                <Typography variant="body2">
                                    Giờ mở cửa: 8h00 - 22h00 (Thứ 2 - Chủ nhật)
                                </Typography>
                                <Typography variant="body2">Ngày lễ: 8h00 - 22h00</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                            <Call />
                            <Box>
                                <Typography variant="body2">Mua hàng: 0902.848.949</Typography>
                                <Typography variant="body2">Công việc: 0888.848.949</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                            <Mail />
                            <Typography variant="body2">doctorpet@gmail.com</Typography>
                        </Stack>
                    </Grid>

                    {/* Fanpage */}
                    <Grid columnSpan={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Fanpage
                        </Typography>
                        <Stack spacing={2}>
                            <Box
                                component="img"
                                src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/334674063_184955604239543_3829518219076107631_n.png"
                                alt="Fanpage 1"
                                sx={{ width: "100%" }}
                            />
                            <Box
                                component="img"
                                src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/309200098_188166263739869_301917195656713441_n.jpg"
                                alt="Fanpage 2"
                                sx={{ width: "100%" }}
                            />
                            <Box
                                component="img"
                                src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/356373371_638466971642696_6487395064445962787_n.jpg"
                                alt="Fanpage 3"
                                sx={{ width: "100%" }}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ backgroundColor: "black", py: 2 }}>
                <Typography align="center" variant="body2">
                    © 2025 Doctor Pet. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default FooterPage;
