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

const ManageCategoryTable = () => {
    const [categorys, setCategorys] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedDialog, setSelectedDialog] = useState("");
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        is_active: true,
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
        setCategorys([
            {
                id: 1,
                name: "Category 1",
                description: "Description for Category 1",
                is_active: true,
            },
            {
                id: 2,
                name: "Category 2",
                description: "Description for Category 2",
                is_active: false,
            },
            {
                id: 3,
                name: "Category 3",
                description: "Description for Category 3",
                is_active: true,
            },
            // Thêm các category khác nếu cần
        ]);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    // handle add user
    const handleAddCategory = () => {
        setSelectedDialog("add");
        setOpenDialog(true);
        setFormData({
            id: "",
            name: "",
            description: "",
            is_active: true,
        });
        setOpenEdit(true);
    };
    
    // handle edit user
    const handleEditCategory = (category) => {
        setSelectedDialog("edit");
        setOpenDialog(true);
        setFormData({
            id: category.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
        });
        setOpenEdit(true);
    };
    
    // handle view user
    const handleViewCategory = (category) => {
        setSelectedDialog("view");
        setOpenDialog(true);
        setFormData({
            id: category.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
        });
        setOpenEdit(false);
    };
                
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDelete(false);
        setSelectedCategory(null);
        setSelectedDialog("");
        setOpenEdit(false);
    };

    const handleConfirmDelete = (category) => {
        setSelectedCategory(category);
        setOpenDelete(true);
        setSelectedDialog("delete");
    };

    const handleToggleActive = (category) => {
        const updatedCategory = categorys.map((u) => (u.id === category.id ? { ...u, active: !u.active } : u));
        setCategorys(updatedCategory);
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
                            onClick={handleAddCategory}
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
                                <TableCell>Name</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categorys
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .filter((category) => category.name.toLowerCase().includes(searchTerm))
                                .map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>
                                            {category.name}
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={category.is_active}
                                                onChange={() => handleToggleActive(category)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    color: "primary.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleViewCategory(category)}
                                            >
                                                <RemoveRedEyeIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "gray",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleEditCategory(category)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "error.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleConfirmDelete(category)}
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
                <DialogTitle>Category Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with this action for category{" "}
                        <strong>
                            {selectedCategory?.name}
                        </strong>
                        ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="error" onClick={handleCloseDialog}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{ textAlign: "center" }}>
                    {selectedDialog === "view" && "Thông tin chi tiết"}
                    {selectedDialog === "add" && "Thêm loại sản phẩm"}
                    {selectedDialog === "edit" && "Chỉnh sửa thông tin loại sản phẩm"}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            width: "100%",
                            padding: "1rem",
                        }}
                    >
                        <Grid item xs={12} size={12}>
                            <FormLabel htmlFor="name" required style={formLabelStyle}>
                                Tên loại sản phẩm
                            </FormLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập tên loại sản phẩm"
                                autoComplete="off"
                                required
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                            />
                        </Grid>
                        
                        <Grid item xs={12} size={12}>
                            <FormLabel htmlFor="description" required style={formLabelStyle}>
                                Mô tả loại sản phẩm
                            </FormLabel>
                            <OutlinedInput
                                id="description"
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Nhập mô tả loại sản phẩm"
                                autoComplete="off"
                                required
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                                multiline
                                rows={4}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        {selectedDialog === "view" ? "Đóng" : "Hủy"}
                    </Button>
                    {selectedDialog === "edit" && <Button color="primary">Lưu</Button>}
                    {selectedDialog === "add" && <Button color="primary">Thêm loại sản phẩm</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};
export default ManageCategoryTable;
