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
import axios from "axios";


const ProductSearch = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [listProduct, setListProduct] = React.useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchProducts = async () => {
        try {
            // Replace with your API endpoint
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/`);
            console.log("Fetched products:", response.data);
            setListProduct(response.data);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <HeaderPage />
            <Container>
                <Grid size={{ xs: 12, sm: 12, md: 9 }} item>
                    <Box>
                        <ListProduct products={listProduct} />
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
            </Container>
            <FooterPage />
        </>
    );
};

export default ProductSearch;
