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

import imageProduct1 from "../../assets/imageProduct/food/Today_Dinner.jpg";
import imageProduct2 from "../../assets/imageProduct/food/Royal_Canin_Kitten.png";
import imageProduct3 from "../../assets/imageProduct/food/Smartheart_Puppy.jpg";
import imageProduct4 from "../../assets/imageProduct/food/hat-Ganador-2.jpg";
import imageProduct5 from "../../assets/imageProduct/food/Pate_Hug.webp";
import imageProduct6 from "../../assets/imageProduct/food/Whiskas_dult_Tuna.jpg";
import imageProduct7 from "../../assets/imageProduct/food/Me_O_Tuna_Canned.jpg";
import imageProduct8 from "../../assets/imageProduct/food/Me_O_Tuna_Flavor.webp";
import imageProduct9 from "../../assets/imageProduct/food/Catrang.webp";
import imageProduct10 from "../../assets/imageProduct/phuKien/Vong_co.jpg";
import imageProduct11 from "../../assets/imageProduct/phuKien/kay_ve_sinh.webp";
import imageProduct12 from "../../assets/imageProduct/phuKien/ban_chai_long.webp";


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
        name: "Today Dinner (1 kg) Hạt cho mèo",
        image: imageProduct1,
        price: 85000,
        salePrice: 80,
        starRating: 4,
    },
    {
        id: 2,
        name: "Royal Canin Kitten 400g",
        image: imageProduct2,
        price: 115000,
        salePrice: 150,
        starRating: 5,
    },
    {
        id: 3,
        name: "Smartheart Pupp 1,5 kg",
        image: imageProduct3,
        price: 115000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 4,
        name: "Hạt Ganador cún trưởng thành 1,5 kg",
        image: imageProduct4,
        price: 75000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 5,
        name: "Pate Hug cho cún 85g",
        image: imageProduct5,
        price: 19000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 6,
        name: "Whiskas Adult Tuna 1.2kg",
        image: imageProduct6,
        price: 120000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 7,
        name: "Me_O Tuna Canned 80g",
        image: imageProduct7,
        price: 20000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 8,
        name: "Me_O Tuna Flavor 450g",
        image: imageProduct8,
        price: 54000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 9,
        name: "Catrang (Hạt cho thú cưng đến từ Hàn Quốc) 5 KG",
        image: imageProduct9,
        price: 380000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 10,
        name: "Vòng cổ có chuông",
        image: imageProduct10,
        price: 23000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 11,
        name: "Khay vệ sinh (cho mèo)",
        image: imageProduct11,
        price: 99000,
        salePrice: 250,
        starRating: 3,
    },
    {
        id: 12,
        name: "Bàn chải lông cho thú cưng",
        image: imageProduct12,
        price: 30000,
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
