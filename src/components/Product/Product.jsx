import React from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import imageProduct from "../../assets/imageProduct/food/Catrang.webp"; // Adjust the path as necessary

const product = {
    productid: 1,
    name: "Fall Limited Edition Sneakers",
    price: 115000,
    quantity: 3,
    category: "Sneakers",
    supplier: "Sneaker Company",
    description:
        "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    imageurl: imageProduct, // Ensure this path is correct
};

const Product = () => {
    const [quantity, setQuantity] = React.useState(1);
    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const navigate = useNavigate();

    const handleOrder = () => {
        navigate('/giohang')
    }

    return (
        <Container>
            <Card>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={6} size={6}>
                        <Box
                            sx={{
                                width: "100%",
                                overflow: "hidden",
                                padding: 2,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product.imageurl}
                                alt={product.name}
                                sx={{
                                    width: "80%",
                                    height: "auto",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={8} md={6} size={6}>
                        <CardContent sx={{ marginTop: 8 }}>
                            <Typography variant="h5" fontWeight={600}>
                                {product.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {product.supplier}
                            </Typography>
                            <Typography variant="body2" sx={{ my: 2 }}>
                                {product.description}
                            </Typography>

                            <Typography variant="h5" color="primary">
                                {product.price.toLocaleString("vi-VN")} ₫{" "}
                                {/* <span style={{ color: "grey", textDecoration: "line-through" }}>
                  {product.price.toLocaleString("vi-VN")} ₫
                </span> */}
                                <span
                                    style={{
                                        backgroundColor: "#FFB74D",
                                        padding: "2px 6px",
                                        borderRadius: 4,
                                        marginLeft: 4,
                                    }}
                                >
                                    50%
                                </span>
                            </Typography>

                            <Box display="flex" alignItems="center" my={2}>
                                <IconButton onClick={handleDecrease}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h6">{quantity}</Typography>
                                <IconButton onClick={handleIncrease}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} sm={6} md={6} size={6}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        onClick={() => alert(`Added ${quantity} items to cart`)}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} size={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleOrder}
                                    >
                                        Mua ngay
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default Product;
