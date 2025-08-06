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
import { useParams } from "react-router-dom";
import axios from "axios";


const Product = () => {
    const { id } = useParams(); 
    const [product, setProduct] = React.useState(null);
    const handleLinkPage = () => {
        window.open('https://www.facebook.com/profile.php?id=61576901769986', '_blank');
    }

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/detail/${id}`);
            setProduct(response.data);
            console.log("Fetched product:", response.data);
        }catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    React.useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <Container>
            <Card>
                <Grid container spacing={2}>
                    <Grid item size={{ sm: 6, md: 6 }}>
                        <Box
                            sx={{
                                width: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product?.imageURL}
                                alt={product?.name}
                                sx={{
                                    width: "80%",
                                    height: "auto",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item size={{ xs: 12, sm: 8, md: 6 }}>
                        <CardContent sx={{ marginTop: 8 }}>
                            <Typography variant="h5" fontWeight={600}>
                                {product?.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {product?.category?.name}
                            </Typography>
                            <Typography variant="body2" sx={{ my: 2 }}>
                                {product?.description}
                            </Typography>

                            <Typography variant="h5" color="primary">
                                {product?.price?.toLocaleString("vi-VN")} ₫{" "}
                            </Typography>

                            <Box display="flex" alignItems="center" my={2}>
                                <Typography variant="h6">{product?.quantity}</Typography>
                            </Box>
                            <Grid container spacing={2} mt={2}>
                                <Grid item size={{ xs: 12, sm: 8, md: 6 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        onClick={handleLinkPage}
                                    >
                                        Liên hệ với Fanpage
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
