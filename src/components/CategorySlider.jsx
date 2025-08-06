// src/components/CategorySlider.tsx
import { Box, Grid, Typography, Link } from "@mui/material";
import sislider_home1 from "../assets/imageShop/img_slider_home_circle_1.png";
import sislider_home2 from "../assets/imageShop/img_slider_home_circle_2.png";  
import sislider_home3 from "../assets/imageShop/img_slider_home_circle_3.png";
import sislider_home4 from "../assets/imageShop/img_slider_home_circle_4.png";
import sislider_home5 from "../assets/imageShop/img_slider_home_circle_5.png";
import sislider_home6 from "../assets/imageShop/img_slider_home_circle_6.png";


const categories = [
    {
        href: "/dogs",
        img: { src: sislider_home1, alt: "Dành cho chó" },
        label: "Dành cho chó",
    },
    {
        href: "/cats",
        img: { src: sislider_home2, alt: "Dành cho mèo" },
        label: "Dành cho mèo",
    },
    {
        href: "#",
        img: { src: sislider_home3, alt: "Dành cho thú cưng khác" },
        label: "Chất dinh dưỡng",
    },
    {
        href: "#",
        img: { src: sislider_home4, alt: "Chất dinh dưỡng" },
        label: "Hương vị tự nhiên",
    },
    {
        href: "#",
        img: { src: sislider_home5, alt: "Ưu đãi đặc biệt" },
        label: "Ưu đãi đặc biệt",
    },
    {
        href: "#",
        img: { src: sislider_home6, alt: "Ưu đãi đặc biệt" },
        label: "Sổ Tay thú cưng",
    },
];

const CategorySlider = () => {
    return (
        <Grid
            container
            spacing={2}
            my={4}
            // wrap="nowrap" // vẫn dùng nowrap để không xuống dòng
            // sx={{
            //     overflowX: "hidden", // không cho phép cuộn ngang
            // }}
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
                    size={{ xs: 2, sm: 2, md: 2 }} // đảm bảo mỗi item chiếm 1/6 chiều rộng
                >
                    <Link
                        href={item.href}
                        underline="none"
                        sx={{ cursor: "pointer", width: "100%" }}
                    >
                        <Box
                            component="img"
                            src={item.img.src}
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
