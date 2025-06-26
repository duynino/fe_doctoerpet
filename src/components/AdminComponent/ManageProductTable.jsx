import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Switch,
    Grid,
    FormLabel,
    OutlinedInput,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Category, Description } from "@mui/icons-material";

import demoProductImage from "../../assets/imageProduct/food/hat-Ganador-2.jpg"; // Adjust the path as necessary

const ManageProductTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedDialog, setSelectedDialog] = useState("");
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        supplier: "",
        quantity: "",
        price: "",
        image_url: "",
        description: "",
        is_active: "",
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        // Chỉ gọi 1 lần khi component được mount
        setProducts([
            {
                id: "1",
                name: "Royal Canin Dog Food",
                category: "Food",
                supplier: "PetCare Co.",
                quantity: "50",
                price: "450000",
                image_url: demoProductImage,
                description:
                    "Premium dry food for adult dogs. Supports healthy digestion and coat.",
                is_active: "true",
            },
            {
                id: "2",
                name: "Cat Tower Deluxe",
                category: "Accessories",
                supplier: "MeowMart",
                quantity: "15",
                price: "1200000",
                image_url:
                    "https://tiki.vn/blog/wp-content/uploads/2023/01/Y7deW5ZtpOonbiD_XawHLHdkjKYKHvWxvxNZzKdXXn0L8InieLIH_-U5m0u-RUlFtXKp0Ty91Itj4Oxwn_tjKg_UZo3lxFSrOH_DHIbpKP1LDn80z6BbOxj4d8bmymdy8PWFGjLkTpCdoz-3X-KY7IedQ_dxWJlHSIBWwCYhgM02FvUfVUgLKOQxrQWgjw.jpg",
                description: "Multi-level cat tower with scratching posts and cozy perches.",
                is_active: "true",
            },
            {
                id: "3",
                name: "Fish Tank Filter 20L",
                category: "Aquarium",
                supplier: "AquaWorld",
                quantity: "30",
                price: "300000",
                image_url: "https://example.com/fishtankfilter.jpg",
                description: "Efficient filter suitable for fish tanks up to 20 liters.",
                is_active: "false",
            },
        ]);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle add user
    const handleAddProduct = () => {
        setSelectedDialog("add");
        setOpenDialog(true);
        setFormData({
            id: "",
            name: "",
            category: "",
            supplier: "",
            quantity: "",
            price: "",
            image_url: "",
            description: "",
            is_active: true,
        });
        setOpenEdit(true);
    };

    // handle edit user
    const handleEditProduct = (product) => {
        setSelectedDialog("edit");
        setOpenDialog(true);
        setFormData({
            id: product.id,
            name: product.name,
            category: product.category,
            supplier: product.supplier,
            quantity: product.quantity,
            price: product.price,
            image_url: product.image_url,
            description: product.description,
            is_active: product.is_active,
        });
        setOpenEdit(true);
    };

    // handle view user
    const handleViewProduct = (product) => {
        setSelectedDialog("view");
        setOpenDialog(true);
        setFormData({
            id: product.id,
            name: product.name,
            category: product.category,
            supplier: product.supplier,
            quantity: product.quantity,
            price: product.price,
            image_url: product.image_url,
            description: product.description,
            is_active: product.is_active,
        });
        setOpenEdit(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDelete(false);
        setSelectedProduct(null);
        setSelectedDialog("");
        setOpenEdit(false);
    };

    const handleConfirmDelete = (product) => {
        setSelectedProduct(product);
        setOpenDelete(true);
        setSelectedDialog("delete");
    };

    const handleToggleActive = (product) => {
        const updatedProduct = products.map((u) =>
            u.id === product.id ? { ...u, active: !u.active } : u
        );
        setProducts(updatedProduct);
    };

    const formLabelStyle = {
        fontWeight: 600,
        color: "#374151", // neutral gray
        marginBottom: "0.5rem",
        display: "block",
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginBottom: "1rem",
                        flexWrap: "wrap", // Cho responsive nếu cần
                        gap: 2, // Khoảng cách khi wrap
                        width: "100%",
                    }}
                >
                    <Box sx={{ flex: 0.5 }}>
                        <TextField
                            label="Search Users"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                            fullWidth
                            size="small"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flex: 1,
                        }}
                    >
                        <Button
                            sx={{
                                color: "error.main",
                                minWidth: 0,
                                padding: 2,
                            }}
                            onClick={handleAddProduct}
                        >
                            <AddIcon
                                sx={{
                                    color: "green",
                                    minWidth: 0,
                                    padding: 0,
                                }}
                            />
                        </Button>
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Ảnh</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Số Lượng</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .filter((product) =>
                                    product.name.toLowerCase().includes(searchTerm)
                                )
                                .map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={product.is_active}
                                                onChange={() => handleToggleActive(product)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    color: "primary.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleViewProduct(product)}
                                            >
                                                <RemoveRedEyeIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "gray",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "error.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleConfirmDelete(product)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            </Box>

            {/* Dialog hiển thị xác nhận xóa hoặc edit (tùy chỉnh sau) */}
            <Dialog open={openDelete} onClose={handleCloseDialog}>
                <DialogTitle>Product Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with this action for product{" "}
                        <strong>{selectedProduct?.name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="error" onClick={handleCloseDialog}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle sx={{ textAlign: "center" }}>
                    {selectedDialog === "view" && "Thông tin chi tiết"}
                    {selectedDialog === "add" && "Thêm sản phẩm mới"}
                    {selectedDialog === "edit" && "Chỉnh sửa thông tin sản phẩm"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ padding: "1rem" }}>
                        <Grid size={5} item xs={12} sm={4} md={6}>
                            <Box
                                component="img"
                                src={formData.image_url || ""}
                                alt="Product"
                                sx={{
                                    width: "80%",
                                    height: "auto",
                                    border: "2px solid #ccc",
                                    objectFit: "cover",
                                    marginLeft: "1rem",
                                }}
                            />

                            {openEdit && (
                                <Box sx={{ padding: "1rem" }}>
                                    <FormLabel htmlFor="image" required style={formLabelStyle}>
                                        Hình ảnh sản phẩm
                                    </FormLabel>
                                    <OutlinedInput
                                        id="image"
                                        name="image"
                                        type="text"
                                        placeholder="Enter product image URL"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                        size="small"
                                        fullWidth
                                    />
                                </Box>
                            )}
                        </Grid>
                        <Grid size={7} item xs={12} sm={4} md={6}>
                            <Grid
                                container
                                spacing={3}
                                sx={{
                                    width: "100%",
                                    padding: "1rem",
                                }}
                            >
                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="name" required style={formLabelStyle}>
                                        Tên sản phẩm
                                    </FormLabel>
                                    <OutlinedInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Nhập tên sản phẩm"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                        size="small"
                                        fullWidth
                                        disabled={!openEdit}
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="price" required style={formLabelStyle}>
                                        Giá sản phẩm
                                    </FormLabel>
                                    <OutlinedInput
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Nhập giá sản phẩm"
                                        value={formData.price}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                        size="small"
                                        fullWidth
                                        inputProps={{ min: 0, step: 0.1 }}
                                        disabled={!openEdit}
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="quantity" required style={formLabelStyle}>
                                        Số lượng sản phẩm
                                    </FormLabel>
                                    <OutlinedInput
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        placeholder="Nhập số lượng sản phẩm"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                        size="small"
                                        fullWidth
                                        inputProps={{ min: 0, step: 0.1 }}
                                        disabled={!openEdit}
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="species" style={formLabelStyle}>
                                        Nhà cung cấp
                                    </FormLabel>
                                    <OutlinedInput
                                        id="species"
                                        name="species"
                                        type="text"
                                        placeholder="Nhập nhà cung cấp sản phẩm"
                                        value={formData.supplier}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        size="small"
                                        fullWidth
                                        disabled={!openEdit}
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="breed" style={formLabelStyle}>
                                        Loại sản phẩm
                                    </FormLabel>
                                    <OutlinedInput
                                        id="breed"
                                        name="breed"
                                        type="text"
                                        placeholder="Nhập loại sản phẩm"
                                        value={formData.category}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        size="small"
                                        fullWidth
                                        disabled={!openEdit}
                                    />
                                </Grid>
                                <Grid item xs={12} size={8}>
                                    <FormLabel htmlFor="description" style={formLabelStyle}>
                                        Description
                                    </FormLabel>
                                    <OutlinedInput
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Enter pet description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        size="small"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        disabled={!openEdit}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        {selectedDialog === "view" ? "Đóng" : "Hủy"}
                    </Button>
                    {selectedDialog === "edit" && <Button color="primary">Lưu</Button>}
                    {selectedDialog === "add" && <Button color="primary">Thêm sản phẩm</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageProductTable;
