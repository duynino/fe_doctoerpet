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

const Product = () => {
    const [quantity, setQuantity] = React.useState(0);
    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };

    return (
        <Container>
            <Card>
                <Grid container spacing={2}>
                    <Grid size={6} item xs={12} sm={4} md={6}>
                        <Box
                            sx={{
                                width: "90%",
                                aspectRatio: "4/3", // hoặc "16/9", "1/1", v.v.
                                overflow: "hidden",
                                paddingLeft: "2%",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={"/src/assets/imageShop/img_slider_home_circle_1.png"}
                                alt="Sneaker"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6} item xs={2} sm={2} md={6}>
                        <CardContent>
                            <Typography variant="h5" component="div" fontWeight={600}>
                                Fall Limited Edition Sneakers
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Sneaker Company
                            </Typography>
                            <Typography variant="body2" sx={{ marginY: 2 }}>
                                These low-profile sneakers are your perfect casual wear companion.
                                Featuring a durable rubber outer sole, they'll withstand everything
                                the weather can offer.
                            </Typography>
                            <Typography variant="h5" color="primary">
                                $125.00{" "}
                                <span style={{ color: "grey", textDecoration: "line-through" }}>
                                    $250.00
                                </span>
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

                            <Box display="flex" alignItems="center" marginY={2}>
                                <IconButton onClick={handleDecrease}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h6">{quantity}</Typography>
                                <IconButton onClick={handleIncrease}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <Button variant="contained" color="primary" fullWidth>
                                Add To Cart
                            </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default Product;
