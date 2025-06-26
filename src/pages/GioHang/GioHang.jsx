import React from "react";
import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid,
    Button,
    
} from "@mui/material";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import DeleteIcon from "@mui/icons-material/Delete";

// Adjust the path as necessary
import imageProduct from "../../assets/imageProduct/food/Today_Dinner.jpg"; 
import imageProduct2 from "../../assets/imageProduct/food/Royal_Canin_Kitten.png";
import imageProduct3 from "../../assets/imageProduct/food/Smartheart_Puppy.jpg";

const products = [
    {
        id: 1,
        name: "Today Dinner (1 kg) Hạt cho mèo",
        image: imageProduct,
        quantity: 1,
        price: 85000,
    },
    {
        id: 2,
        name: "Royal Canin Kitten 400g",
        image: imageProduct2,
        quantity: 1,
        price: 115000,
    },
    {
        id: 3,
        name: "Smartheart Pupp 1,5 kg",
        image: imageProduct3,
        quantity: 1,
        price: 115000,
    },
];

const GioHang = () => {
    return (
        <>
            <HeaderPage />
            <Container sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
                    <Grid item xs={12} size={7}>
                        <Typography variant="h6">Danh sách sản phẩm trong giỏ hàng</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Hình Ảnh</TableCell>
                                        <TableCell>Tên Sản Phẩm</TableCell>
                                        <TableCell>Giá</TableCell>
                                        <TableCell>Số Lượng</TableCell>
                                        <TableCell>Tổng Giá</TableCell>
                                        <TableCell>Thao Tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{ width: "100px", height: "auto" }}
                                                />
                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>
                                                {product.price.toLocaleString("vi-VN")} VND
                                            </TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>
                                                {(product.price * product.quantity).toLocaleString(
                                                    "vi-VN"
                                                )}{" "}
                                                VND
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: "flex", gap: "8px" }}>
                                                    <Button>
                                                        <DeleteIcon style={{ color:"#f44336" }}/>
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} size={4}>
                        <Box sx={{ padding: "1rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                                Thông tin đơn hàng
                            </Typography>
                            <Typography variant="body1">
                                Tổng số lượng sản phẩm:{" "}
                                {products.reduce((total, product) => total + product.quantity, 0)}
                            </Typography>
                            <Typography variant="body1">
                                Tổng giá trị đơn hàng:{" "}
                                {products
                                    .reduce(
                                        (total, product) => total + product.price * product.quantity,
                                        0
                                    )
                                    .toLocaleString("vi-VN")}{" "}
                                VND
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: "1rem" }}>
                                Phương thức thanh toán: Thanh toán khi nhận hàng
                            </Typography>
                            <Box sx={{ marginTop: "1rem" }}>
                                <Button
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#f44336",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Đặt Hàng
                                </Button>
                            </Box>    
                        </Box>
                    </Grid>   
                </Grid>
            </Container>
            <FooterPage />
        </>
    );
};
export default GioHang;
