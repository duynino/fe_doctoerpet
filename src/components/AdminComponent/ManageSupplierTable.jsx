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
    
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiInstance from "../../axios/index";


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
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
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

    // Gọi API để lấy danh sách nhà cung cấp (nếu có)
    const getListSupplier = async () => {
        try {
            const response = await ApiInstance.get("/supplier/");
            if (response.status === 200) {
                setSupplier(response.data);
            } else {
                toast.error("Không thể lấy danh sách nhà cung cấp");
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            toast.error("Lỗi khi lấy danh sách nhà cung cấp");
        }
    };

    useEffect(() => {
        getListSupplier();
    }, [suppliers]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle add user
    const handleAddSuplier = () => {
        setSelectedDialog("add");
        setOpenDialog(true);
        setFormData({
            name: "",
            phoneNumber: "",
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
            name: supplier.name,
            phoneNumber: supplier.phoneNumber,
            email: supplier.email,
            address: supplier.address,
            description: supplier.description,
            is_active: supplier.is_active,
        });
        setSelectedSupplier(supplier);
        setOpenEdit(true);
    };

    // handle view user
    const handleViewSupplier = (supplier) => {
        setSelectedDialog("view");
        setOpenDialog(true);
        setFormData({
            name: supplier.name,
            phoneNumber: supplier.phoneNumber,
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

    const formLabelStyle = {
        fontWeight: 600,
        color: "#374151", // neutral gray
        marginBottom: "0.5rem",
        display: "block",
    };
    
    // handle delete supplier
    const handleDeleteSupplier = async () => {
        if (!selectedSupplier) return;
        try {
            const response = await ApiInstance.delete(`/suppliers/${selectedSupplier.supplierID}`);
            if (response.status === 200) {
                setSupplier(suppliers.filter((s) => s.supplierID !== selectedSupplier.supplierID));
                toast.success("Xóa nhà cung cấp thành công");
            } else {
                toast.error("Không thể xóa nhà cung cấp");
            }
        } catch (error) {
            console.error("Error deleting supplier:", error);
            toast.error("Lỗi khi xóa nhà cung cấp");
        }
        handleCloseDialog();
    };

    // handle SAVE supplier
    const handleSaveSupplier = async () => {
        if (selectedDialog === "add") {
            try {
                const response = await ApiInstance.post("/supplier/add", formData);
                if (response.status === 200) {
                    setSupplier([...suppliers, response.data]);
                    toast.success("Thêm nhà cung cấp thành công");
                } else {
                    toast.error("Không thể thêm nhà cung cấp");
                }
            } catch (error) {
                console.error("Error adding supplier:", error);
                toast.error("Lỗi khi thêm nhà cung cấp");
            }
        } else if (selectedDialog === "edit") {
            try {
                console.log("Updating supplier with data:", selectedSupplier.supplierID, formData);
                const response = await ApiInstance.put(`/supplier/update/${selectedSupplier.supplierID}`, formData);
                if (response.status === 200) {
                    setSupplier(
                        suppliers.map((supplier) =>
                            supplier.supplierID === selectedSupplier.supplierID ? response.data : supplier
                        )
                    );
                    toast.success("Cập nhật nhà cung cấp thành công");
                } else {
                    toast.error("Không thể cập nhật nhà cung cấp");
                }
            } catch (error) {
                console.error("Error updating supplier:", error);
                toast.error("Lỗi khi cập nhật nhà cung cấp");
            }
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
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers
                                ?.filter((supplier) =>
                                    supplier?.name?.toLowerCase().includes(searchTerm)
                                )
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((supplier, index) => (
                                    <TableRow key={supplier.supplierID}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {supplier.name} 
                                        </TableCell>
                                        <TableCell>{supplier.email}</TableCell>
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
                    <Button color="error" onClick={handleDeleteSupplier}>
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
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormLabel htmlFor="name" required style={formLabelStyle}>
                                Tên nhà cung cấp
                            </FormLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nhập tên nhà cung cấp"
                                value={formData.name}
                                autoComplete="off"
                                required
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item size={{ xs: 12, sm: 6 }}>
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
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormLabel htmlFor="phoneNumber" style={formLabelStyle}>
                                Số điện thoại
                            </FormLabel>
                            <OutlinedInput
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                autoComplete="off"
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                            />
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 6 }}>
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
                        <Grid item size={{ xs: 12, sm: 12 }}>
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
                    {selectedDialog === "edit" && <Button onClick={handleSaveSupplier} color="primary">Lưu</Button>}
                    {selectedDialog === "add" && <Button onClick={handleSaveSupplier} color="primary">Thêm nhà cung cấp</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageSupplierTable;
