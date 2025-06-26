import React from "react";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import CategorySlider from "../../components/CategorySlider";
import RecommendedProducts from "../../components/RecommendedProducts";
import { Box, Container, Typography, Grid, Button, Link } from "@mui/material";
import bannar1 from "../../assets/imageShop/home3.png";
import bannar2 from "../../assets/imageShop/a1_mob.png";
import bannar3 from "../../assets/imageShop/a2_mob.png";

import galleryItem1 from "../../assets/imageShop/gallery_item_1.png";
import galleryItem2 from "../../assets/imageShop/gallery_item_2.png";
import galleryItem3 from "../../assets/imageShop/gallery_item_3.png";
import galleryItem4 from "../../assets/imageShop/gallery_item_4.png";
import galleryItem5 from "../../assets/imageShop/gallery_item_5.png";
import galleryItem6 from "../../assets/imageShop/gallery_item_6.png";
import galleryItem7 from "../../assets/imageShop/gallery_item_7.png";
import galleryItem8 from "../../assets/imageShop/gallery_item_8.png";
import galleryItem9 from "../../assets/imageShop/gallery_item_9.png";
import galleryItem10 from "../../assets/imageShop/gallery_item_10.png";
import galleryItem11 from "../../assets/imageShop/gallery_item_11.png";
import galleryItem12 from "../../assets/imageShop/gallery_item_12.png";

const galleryImages = [
    galleryItem1,
    galleryItem2,
    galleryItem3,
    galleryItem4,
    galleryItem5,
    galleryItem6,
    galleryItem7,
    galleryItem8,
    galleryItem9,
    galleryItem10,
    galleryItem11,
    galleryItem12,
];

const HomePage = () => {
    return (
        <div>
            <HeaderPage />
            <div className="w-100" style={{ minHeight: "500px" }}>
                <Box
                    component="img"
                    src={bannar1}
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
                                src={bannar2}
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
                                src={bannar3}
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
                                            src={imgName}
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
