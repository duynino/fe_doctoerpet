import React from "react";
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



const LeftMenuList = () => {
    // lay user từ localStorage
  
    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Bộ lọc
            </Typography>

            {/*  */}
            <Box mb={2}>
                <FormLabel component="legend">Thú Cưng</FormLabel>
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
                    <FormControlLabel value="asc" control={<Radio />} label="Giá tăng dần" />
                    <FormControlLabel value="desc" control={<Radio />} label="Giá giảm dần" />
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
    );
};

export default LeftMenuList;
