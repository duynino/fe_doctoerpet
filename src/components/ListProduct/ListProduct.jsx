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

    console.log("Product list1:", products);
    return (
        <div id="1" className="listPro">
            <h3>Danh sách sản phẩm</h3>
            <Grid container spacing={2}>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Grid item key={product.productID} size={{ xs: 6, sm: 6, md: 3 }}>
                            <Card style={{ height: "100%" }}>
                                <CardActionArea
                                    component={Link}
                                    to={`/productDetail/${product.productID}`}
                                    sx={{ display: "block" }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.imageURL}
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
                                            <span> {product.price.toLocaleString("vi-VN")}VND</span>
                                        </Typography>
                                        <Rating
                                            name="read-only"
                                            value= '4'
                                            readOnly
                                        />
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
