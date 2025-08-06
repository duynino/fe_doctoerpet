import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Link,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    Button,
    Rating,
    Container,
    CardActionArea,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import imageProduct1 from "../assets/imageProduct/food/Royal_Canin_Kitten.png";
import imageProduct2 from "../assets/imageProduct/food/Me_O_Tuna_Flavor.webp";
import imageProduct3 from "../assets/imageProduct/food/Me_O_Tuna_Canned.jpg";
import imageProduct4 from "../assets/imageProduct/food/hat-Ganador-2.jpg";
import imageProduct5 from "../assets/imageProduct/food/Today_Dinner.jpg";
import imageProduct6 from "../assets/imageProduct/food/Whiskas_dult_Tuna.jpg";

const demoProducts = [
    {
        id: 2,
        productGroupId: "pg_001",
        name: "Royal Canin Kitten 400 g",
        price: 115000,
        image: { src: imageProduct1, alt: "Royal Canin Kitten 400 g" },
        starRating: 4.5,
    },
    {
        id: 8,
        productGroupId: "pg_002",
        name: "Me-O Tuna Flavor 450g",
        price: 54000,
        image: { src: imageProduct2, alt: "Me-O Tuna Flavor 450g" },
        starRating: 4.0,
    },
    {
        id: 7,
        productGroupId: "pg_001",
        name: "Me-O Tuna Canned 80g",
        price: 20000,
        image: { src: imageProduct3, alt: "Me-O Tuna Canned 80g" },
        starRating: 4.5,
    },
    {
        id: 3,
        productGroupId: "pg_002",
        name: "Hạt Ganador cún trưởng thành 1,5 kg",
        price: 75000,
        image: { src: imageProduct4, alt: "Hạt Ganador cún trưởng thành 1,5 kg" },
        starRating: 4.0,
    },
    {
        id: 1,
        productGroupId: "pg_001",
        name: "Today Dinner (1 kg) Hạt cho mèo",
        price: 85000,
        image: { src: imageProduct5, alt: "Today Dinner (1 kg) Hạt cho mèo" },
        starRating: 4.5,
    },
    {
        id: 6,
        productGroupId: "pg_001",
        name: "Whiskas Adult Tuna 1.2 kg",
        price: 85000,
        image: { src: imageProduct6, alt: "Whiskas Adult Tuna 1.2 kg" },
        starRating: 4.5,
    },
];

const RecommendedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setProducts(demoProducts);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <section className="my-4 recommend">
            <Typography variant="h5" component="h4" gutterBottom>
                Recommended Products
            </Typography>
            <Container>
                <Grid container spacing={2}>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Grid item key={product.id} size={{ xs: 6, sm: 6, md: 2 }}>
                                <Card style={{ height: "100%" }}>
                                    <CardActionArea
                                        component={RouterLink}
                                        to={`/productDetail/${product.id}`}
                                        sx={{ display: "block" }}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.image.src}
                                            alt={product.name}
                                            style={{
                                                objectFit: "cover",
                                                maxHeight: "200px",
                                                maxWidth: "100%",
                                                height: "200px",
                                                width: "100%",
                                            }}
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                style={{ whiteSpace: "pre-line" }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Giá:{" "}
                                                {/* <span style={{ textDecoration: "line-through" }}>
                                                {product.salePrice}VND
                                            </span> */}
                                                <span> {product.price}VND</span>
                                            </Typography>
                                            <Rating
                                                name="read-only"
                                                value={product.starRating}
                                                readOnly
                                            />
                                            <br />
                                            {/* <Button
                                                component={Link}
                                                to={`/productDetail?id=${product.id}`}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add to cart
                                            </Button> */}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="body1" color="text.secondary" align="center">
                                No products available
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </section>
    );
};

export default RecommendedProducts;
