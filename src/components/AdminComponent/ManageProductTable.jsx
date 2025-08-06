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
    Grid,
    FormLabel,
    OutlinedInput,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Category, Description } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiInstance from "../../axios/index";
import axios from "axios";

// import demoProductImage from "../../assets/imageProduct/food/hat-Ganador-2.jpg";

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
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        supplierId: "",
        quantity: "",
        price: "",
        imageURL: "",
        description: "",
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // get data from API or mock data
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/`);
            if (response.status === 200) {
                setProducts(response.data);
            } else {
                toast.error("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products");
        }
    };

    // Fetch categories and suppliers
    const fetchCategories = async () => {
        try {
            const response = await ApiInstance.get("/category/");
            if (response.status === 200) {
                setCategories(response.data);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories");
        }
    };

    const fetchSuppliers = async () => {
        try {
            const response = await ApiInstance.get("/supplier/");
            if (response.status === 200) {
                setSuppliers(response.data);
            } else {
                toast.error("Failed to fetch suppliers");
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            toast.error("Failed to fetch suppliers");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchSuppliers();
    }, []); // Fetch products when component mounts

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle add user
    const handleAddProduct = () => {
        setSelectedDialog("add");
        setOpenDialog(true);
        setFormData({
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
            name: product.name,
            categoryId: product.category.categoryID,
            supplierId: 1,
            quantity: product.quantity,
            price: product.price,
            imageURL: product.imageURL,
            description: product.description,
            is_active: true,
        });
        setSelectedProduct(product);
        setOpenEdit(true);
    };

    // handle view user
    const handleViewProduct = (product) => {
        console.log("Viewing product:", product);
        setSelectedDialog("view");
        setOpenDialog(true);
        setFormData({
            name: product.name,
            categoryId: product.category.categoryID,
            supplierId: 1,
            quantity: product.quantity,
            price: product.price,
            imageURL: product.imageURL,
            description: product.description,
            is_active: true,
        });
        setSelectedProduct(product);
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

    const formLabelStyle = {
        fontWeight: 600,
        color: "#374151", // neutral gray
        marginBottom: "0.5rem",
        display: "block",
    };

    // handle delete product
    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            try {
                const response = await ApiInstance.post(
                    `/product/delete/${selectedProduct.productID}`
                );
                if (response.status === 200) {
                    setProducts(products.filter((p) => p.productID !== selectedProduct.productID));
                    toast.success("Product deleted successfully");
                } else {
                    toast.error("Failed to delete product");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product");
            }
        }
        handleCloseDialog();
    };

    // handle save product
    const handleSaveProduct = async () => {
        try {
            console.log("Saving product with formData:", formData);
            if (selectedDialog === "add") {
                const response = await ApiInstance.post("/product/add", formData);
                if (response.status === 200) {
                    setProducts([...products, response.data]);
                    toast.success("Product added successfully");
                } else {
                    toast.error("Failed to add product");
                }
            } else if (selectedDialog === "edit") {
                const response = await ApiInstance.put(
                    `/product/update/${selectedProduct.productID}`,
                    formData
                );
                if (response.status === 200) {
                    setProducts(
                        products.map((p) =>
                            p.productID === selectedProduct.productID ? response.data : p
                        )
                    );
                    await fetchProducts(); // Refresh products
                    toast.success("Product updated successfully");
                } else {
                    toast.error("Failed to update product");
                }
            }
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Failed to save product");
        }
        handleCloseDialog();
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
                                ?.filter((product) =>
                                    product?.name?.toLowerCase().includes(searchTerm)
                                )
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((product, index) => (
                                    <TableRow key={product.productID}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <img
                                                src={product.imageURL}
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
                        count={20}
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
                    <Button color="error" onClick={handleDeleteProduct}>
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
                                src={formData.imageURL || ""}
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
                                        value={formData.imageURL}
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
                                    <FormControl sx={{ minWidth: 200 }} size="small">
                                        <InputLabel id="select-supplier-label">
                                            Nhà cung cấp
                                        </InputLabel>
                                        <Select
                                            labelId="select-supplier-label"
                                            id="supplier-select"
                                            name="supplierId"
                                            value={formData.supplierId}
                                            label="Nhà cung cấp"
                                            onChange={handleChange}
                                            disabled={!openEdit} // ✅
                                        >
                                            {Array.isArray(suppliers) && suppliers.length > 0 ? (
                                                suppliers.map((supplier) => (
                                                    <MenuItem
                                                        key={supplier.supplierID}
                                                        value={supplier.supplierID}
                                                    >
                                                        {supplier.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>Không có nhà cung cấp</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormControl sx={{ minWidth: 200 }} size="small">
                                        <InputLabel id="select-category-label">
                                            Loại sản phẩm
                                        </InputLabel>
                                        <Select
                                            labelId="select-category-label"
                                            id="category-select"
                                            name="categoryId"
                                            value={formData.categoryId}
                                            label="Loại sản phẩm"
                                            onChange={handleChange}
                                            disabled={!openEdit} 
                                        >
                                            {Array.isArray(categories) && categories.length > 0 ? (
                                                categories.map((category) => (
                                                    <MenuItem
                                                        key={category.categoryID}
                                                        value={category.categoryID}
                                                    >
                                                        {category.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>Không có danh mục</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
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
                    {selectedDialog === "edit" && (
                        <Button onClick={handleSaveProduct} color="primary">
                            Lưu
                        </Button>
                    )}
                    {selectedDialog === "add" && (
                        <Button onClick={handleSaveProduct} color="primary">
                            Thêm sản phẩm
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageProductTable;
