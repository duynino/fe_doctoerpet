import React from "react";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import CategorySlider from "../../components/CategorySlider";
import RecommendedProducts from "../../components/RecommendedProducts";
import { Box, Container, Typography, Grid, Button, Link } from "@mui/material";

const galleryImages = [
    "gallery_item_1.png",
    "gallery_item_2.png",
    "gallery_item_3.png",
    "gallery_item_4.png",
    "gallery_item_5.png",
    "gallery_item_6.png",
    "gallery_item_7.png",
    "gallery_item_8.png",
    "gallery_item_9.png",
    "gallery_item_10.png",
    "gallery_item_11.png",
    "gallery_item_12.png",
];

const HomePage = () => {
    return (
        <div>
            <HeaderPage />
            <div className="w-100" style={{ minHeight: "500px" }}>
                <Box
                    component="img"
                    src="/src/assets/imageShop/home3.png"
                    alt="banner"
                    sx={{ width: "100%" }}
                />

                <Container maxWidth="lg" sx={{ mt: 2 }}>
                    <CategorySlider />

                    <RecommendedProducts />

                    <Box display="flex" width="100%" marginTop={2}>
                        <Box width="50%">
                            <Box
                                component="img"
                                src="/src/assets/imageShop/a1_mob.png"
                                alt="Puppy Shop"
                                sx={{ width: "100%" }}
                            />
                            <Typography
                                align="center"
                                fontSize="0.75rem" // tương đương fs-small
                                color="black"
                                py={1}
                            >
                                Puppy Shop
                            </Typography>
                        </Box>
                        <Box width="50%">
                            <Box
                                component="img"
                                src="/src/assets/imageShop/a2_mob.png"
                                alt="Kitten Shop"
                                sx={{ width: "100%" }}
                            />
                            <Typography align="center" fontSize="0.75rem" color="black" py={1}>
                                Kitten Shop
                            </Typography>
                        </Box>
                    </Box>

                    <Box component="section" py={2}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h5" component="h3">
                                2,000+ Brands - Shop All
                            </Typography>
                        </Box>

                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {galleryImages.map((imgName, index) => (
                                <Grid item size={{ xs: 2, sm: 2, md: 2 }} key={index}>
                                    <Link href="#" underline="none" sx={{ cursor: "pointer" }}>
                                        <Box
                                            component="img"
                                            src={`/src/assets/imageShop/${imgName}`}
                                            alt={`Gallery item ${index + 1}`}
                                            sx={{ width: "100%" }}
                                        />
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </div>
            <FooterPage />
        </div>
    );
};

export default HomePage;
