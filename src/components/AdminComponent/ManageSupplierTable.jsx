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

const ManageSupplierTable = () => {
    const [suppliers, setSupplier] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedDialog, setSelectedDialog] = useState("");
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone_number: "",
        email: "",
        address: "",
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
        // Gán danh sách 3 supplier mẫu
        setSupplier([
            {
                id: "SUP001",
                name: "Công ty TNHH Minh Long",
                phone_number: "0901234567",
                email: "minhlong@supplier.vn",
                address: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
                description: "Nhà cung cấp thiết bị điện tử",
                is_active: true,
            },
            {
                id: "SUP002",
                name: "CTCP Thực phẩm An Khang",
                phone_number: "0912345678",
                email: "ankhang@food.vn",
                address: "456 Trần Hưng Đạo, Q.1, TP.HCM",
                description: "Nhà cung cấp thực phẩm sạch",
                is_active: true,
            },
            {
                id: "SUP003",
                name: "Văn phòng phẩm Hồng Hà",
                phone_number: "0938765432",
                email: "contact@hongha.vn",
                address: "789 Lý Thường Kiệt, Q.10, TP.HCM",
                description: "Nhà cung cấp văn phòng phẩm",
                is_active: false,
            },
        ]);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle add user
    const handleAddSuplier = () => {
        setSelectedDialog("add");
        setOpenDialog(true);
        setFormData({
            id: "",
            name: "",
            phone_number: "",
            email: "",
            address: "",
            description: "",
            is_active: true,
        });
        setOpenEdit(true);
    };

    // handle edit user
    const handleEditSupplier = (supplier) => {
        setSelectedDialog("edit");
        setOpenDialog(true);
        setFormData({
            id: supplier.id,
            name: supplier.name,
            phone_number: supplier.phone_number,
            email: supplier.email,
            address: supplier.address,
            description: supplier.description,
            is_active: supplier.is_active,
        });
        setOpenEdit(true);
    };

    // handle view user
    const handleViewSupplier = (supplier) => {
        setSelectedDialog("view");
        setOpenDialog(true);
        setFormData({
            id: supplier.id,
            name: supplier.name,
            phone_number: supplier.phone_number,
            email: supplier.email,
            address: supplier.address,
            description: supplier.description,
            is_active: supplier.is_active,
        });
        setOpenEdit(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDelete(false);
        setSelectedSupplier(null);
        setSelectedDialog("");
        setOpenEdit(false);
    };

    const handleConfirmDelete = (supplier) => {
        setSelectedSupplier(supplier);
        setOpenDelete(true);
        setSelectedDialog("delete");
    };

    const handleToggleActive = (suppliers) => {
        const updatedSupplier = suppliers.map((u) =>
            u.id === u.id ? { ...u, active: !u.active } : u
        );
        setSupplier(updatedSupplier);
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
                            label="Search Suppliers"
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
                            onClick={handleAddSuplier}
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
                                <TableCell>Email</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                                .filter((supplier) =>
                                    supplier.name.toLowerCase().includes(searchTerm)
                                )
                                .map((supplier) => (
                                    <TableRow key={supplier.id}>
                                        <TableCell>{supplier.id}</TableCell>
                                        <TableCell>
                                            {supplier.name} 
                                        </TableCell>
                                        <TableCell>{supplier.email}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={supplier.is_active}
                                                onChange={() => handleToggleActive(supplier)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    color: "primary.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleViewSupplier(supplier)}
                                            >
                                                <RemoveRedEyeIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "gray",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleEditSupplier(supplier)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "error.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleConfirmDelete(supplier)}
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
                <DialogTitle>Supplier Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with this action for supplier{" "}
                        <strong>{selectedSupplier?.name}</strong>?
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
                    {selectedDialog === "add" && "Thêm nhà cung cấp"}
                    {selectedDialog === "edit" && "Chỉnh sửa thông tin nhà cung cấp"}
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
                        <Grid item xs={12} size={6}>
                            <FormLabel htmlFor="name" required style={formLabelStyle}>
                                Tên nhà cung cấp
                            </FormLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                autoComplete="off"
                                required
                                size="small"
                                fullWidth
                                disabled={true}
                            />
                        </Grid>

                        <Grid item xs={12} size={6}>
                            <FormLabel htmlFor="email" style={formLabelStyle}>
                                Email
                            </FormLabel>
                            <OutlinedInput
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="off"
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                            />
                        </Grid>
                        <Grid item xs={12} size={6}>
                            <FormLabel htmlFor="phoneNumber" style={formLabelStyle}>
                                Số điện thoại
                            </FormLabel>
                            <OutlinedInput
                                id="phoneNumber"
                                name="phone_number"
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={formData.phone_number}
                                onChange={handleChange}
                                autoComplete="off"
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                            />
                        </Grid>
                        <Grid item xs={12} size={6}>
                            <FormLabel htmlFor="address" style={formLabelStyle}>
                                Địa chỉ
                            </FormLabel>
                            <OutlinedInput
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Nhập địa chỉ"
                                value={formData.address}
                                onChange={handleChange}
                                autoComplete="off"
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                            />
                        </Grid>
                        <Grid item xs={12} size={12}>
                            <FormLabel htmlFor="description" style={formLabelStyle}>
                                Mô tả
                            </FormLabel>
                            <OutlinedInput
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Nhập mô tả"
                                value={formData.description}
                                onChange={handleChange}
                                autoComplete="off"
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
                    {selectedDialog === "add" && <Button color="primary">Thêm nhà cung cấp</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageSupplierTable;
