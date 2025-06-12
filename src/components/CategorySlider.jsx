// src/components/CategorySlider.tsx
import { Box, Grid, Typography, Link } from "@mui/material";

const categories = [
    {
        href: "/dogs",
        img: "/src/assets/imageShop/img_slider_home_circle_1.png",
        label: "Dành cho chó",
    },
    {
        href: "/cats",
        img: "/src/assets/imageShop/img_slider_home_circle_2.png",
        label: "Dành cho mèo",
    },
    {
        href: "#",
        img: "/src/assets/imageShop/img_slider_home_circle_3.png",
        label: "Chất dinh dưỡng",
    },
    {
        href: "#",
        img: "/src/assets/imageShop/img_slider_home_circle_4.png",
        label: "Hương vị tự nhiên",
    },
    {
        href: "#",
        img: "/src/assets/imageShop/img_slider_home_circle_5.png",
        label: "Ưu đãi đặc biệt",
    },
    {
        href: "#",
        img: "/src/assets/imageShop/img_slider_home_circle_6.png",
        label: "Sổ Tay thú cưng",
    },
];

const CategorySlider = () => {
    return (
        <Grid
            container
            spacing={2}
            my={4}
            wrap="nowrap" // vẫn dùng nowrap để không xuống dòng
            sx={{
                overflowX: "hidden", // không cho phép cuộn ngang
            }}
        >
            {categories.map((item, index) => (
                <Grid
                    item
                    key={index}
                    xs={true} // cho item co giãn đều
                    sx={{
                        flexGrow: 1,
                        flexShrink: 1,
                        minWidth: 0, // để flex item thu nhỏ đúng cách
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Link
                        href={item.href}
                        underline="none"
                        sx={{ cursor: "pointer", width: "100%" }}
                    >
                        <Box
                            component="img"
                            src={item.img}
                            alt={item.label}
                            sx={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                margin: "0 auto",
                            }}
                        />
                        <Typography
                            align="center"
                            color="black"
                            py={1}
                            fontWeight="bold"
                            fontSize="1.25rem"
                            noWrap
                        >
                            {item.label}
                        </Typography>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategorySlider;
