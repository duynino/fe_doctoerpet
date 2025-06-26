import React from "react";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    CardActionArea,
} from "@mui/material";
import { Rating } from "@mui/material";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const ListProduct = ({ products }) => {
    return (
        <div id="1" className="listPro">
            <h3>Danh sách đồ ăn</h3>
            <Grid container spacing={2}>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={2} key={product.id} size={3}>
                            <Card style={{ height: "100%" }}>
                                <CardActionArea
                                    component={Link}
                                    to={`/productDetail/${product.id}`}
                                    sx={{ display: "block" }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                        style={{
                                            objectFit: "cover",
                                            height: "200px",
                                            width: "100%",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Giá:{" "}
                                            {/* <span style={{ textDecoration: "line-through" }}>
                                            {product.price.toLocaleString("vi-VN")}
                                        </span> */}
                                            <span> {product.price.toLocaleString("vi-VN")}VND</span>
                                        </Typography>
                                        <Rating
                                            name="read-only"
                                            value={product.starRating}
                                            readOnly
                                        />
                                        <br />
                                        {/* <Button
                                            variant="contained"
                                            color="primary"
                                            to={`/productDetail?id=${product.id}`}
                                            component={Link}
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
        </div>
    );
};

export default ListProduct;
