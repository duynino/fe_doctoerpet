import React from "react";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import ListProduct from "../../components/ListProduct/ListProduct";
import { Container, Grid } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Button,
    FormGroup,
    FormLabel,
} from "@mui/material";
import { Star } from "@mui/icons-material";

const brands = [
    { id: "loai1", companyName: "Hạt khô" },
    { id: "loai2", companyName: "Pate ướt" },
    { id: "loai3", companyName: "Snack" },
];

const pets = [
    { id: "pet1", companyName: "Đồ ăn cho chó" },
    { id: "pet2", companyName: "Đồ ăn cho Mèo" },
];

const products = [
    {
        id: 1,
        name: "Product 1",
        image: "/src/assets/imageShop/img_slider_home_circle_1.png",
        price: 100,
        salePrice: 80,
        starRating: 4,
    },
    {
        id: 2,
        name: "Product 2",
        image: "/src/assets/imageShop/img_slider_home_circle_2.png",
        price: 200,
        salePrice: 150,
        starRating: 5,
    },
    {
        id: 3,
        name: "Product 3",
        image: "/src/assets/imageShop/img_slider_home_circle_3.png",
        price: 300,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 3,
        name: "Product 4",
        image: "/src/assets/imageShop/img_slider_home_circle_3.png",
        price: 300,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 3,
        name: "Product 5",
        image: "/src/assets/imageShop/img_slider_home_circle_3.png",
        price: 300,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 3,
        name: "Product 6",
        image: "/src/assets/imageShop/img_slider_home_circle_3.png",
        price: 300,
        salePrice: 250,
        starRating: 3,
    },
];

const ProductSearch = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <HeaderPage />
            <Container>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid size={3} item xs={3}>
                        <Box p={2}>
                            <Typography variant="h5" gutterBottom>
                                Bộ lọc
                            </Typography>

                            {/*  */}
                            <Box mb={2}>
                                <FormLabel component="legend">Đồ ăn</FormLabel>
                                <FormGroup>
                                    {pets.map((pet) => (
                                        <FormControlLabel
                                            key={pet.id}
                                            control={<Checkbox name="pet" value={pet.id} />}
                                            label={pet.companyName}
                                        />
                                    ))}
                                </FormGroup>
                            </Box>

                            {/* Dạng thức ăn */}
                            <Box mb={2}>
                                <FormLabel component="legend">Dạng thức ăn</FormLabel>
                                <FormGroup>
                                    {brands.map((brand) => (
                                        <FormControlLabel
                                            key={brand.id}
                                            control={<Checkbox name="loai" value={brand.id} />}
                                            label={brand.companyName}
                                        />
                                    ))}
                                </FormGroup>
                            </Box>

                            {/* Sắp xếp */}
                            <Box mb={2}>
                                <FormLabel component="legend">Sắp xếp</FormLabel>
                                <RadioGroup name="sapxep">
                                    <FormControlLabel
                                        value="asc"
                                        control={<Radio />}
                                        label="Giá tăng dần"
                                    />
                                    <FormControlLabel
                                        value="desc"
                                        control={<Radio />}
                                        label="Giá giảm dần"
                                    />
                                </RadioGroup>
                            </Box>

                            {/* Đánh giá */}
                            <Box mb={2}>
                                <FormLabel component="legend">Đánh giá</FormLabel>
                                <RadioGroup name="star">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <FormControlLabel
                                            key={star}
                                            value={`star_${star}`}
                                            control={<Radio />}
                                            label={
                                                <Box display="flex" alignItems="center">
                                                    {[...Array(star)].map((_, i) => (
                                                        <Star key={i} color="primary" />
                                                    ))}
                                                </Box>
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={9} item xs={9}>
                        <Box>
                            <ListProduct products={products} />
                        </Box>
                        <Box>
                            <TablePagination
                                component="div"
                                count={100}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <FooterPage />
        </>
    );
};

export default ProductSearch;
