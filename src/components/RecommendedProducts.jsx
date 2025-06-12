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
} from "@mui/material";

const demoProducts = [
    { id: 1, productGroupId: "pg_001", title: "Dog Food", price: 20, image: "dog_food.jpg" },
    { id: 2, productGroupId: "pg_002", title: "Cat Food", price: 15, image: "cat_food.jpg" },
    { id: 3, productGroupId: "pg_001", title: "Dog Leash", price: 10, image: "dog_leash.jpg" },
    { id: 4, productGroupId: "pg_002", title: "Cat Toy", price: 5, image: "cat_toy.jpg" },
    { id: 5, productGroupId: "pg_001", title: "Dog Bed", price: 50, image: "dog_bed.jpg" },
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
            <Grid container spacing={2}>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={2} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    style={{ objectFit: "cover", height: "200px" }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        style={{ whiteSpace: "pre-line" }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Giá:{" "}
                                        <span style={{ textDecoration: "line-through" }}>
                                            ${product.price}
                                        </span>
                                        <span style={{ color: "red" }}> ${product.salePrice}</span>
                                    </Typography>
                                    <Rating name="read-only" value={product.starRating} readOnly />
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`cart?id=${product.id}`}
                                    >
                                        Add to cart
                                    </Button>
                                </CardContent>
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
        </section>
    );
};

export default RecommendedProducts;
