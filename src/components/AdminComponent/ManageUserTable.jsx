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

const ManageUserTable = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedDialog, setSelectedDialog] = useState("");
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        phone_number: "",
        email: "",
        address: "",
        birth_date: "",
        role: "",
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
        setUsers([
            {
                id: "3",
                firstName: "Doctor",
                lastName: "Pet",
                username: "Admin1",
                phone_number: "09876544321",
                email: "",
                address: "123 Main St",
                birth_date: "1990-01-01",
                role: "admin",
                is_active: true,
            },
            {
                id: "1",
                firstName: "John",
                lastName: "Doe",
                username: "johndoe",
                phone_number: "1234567890",
                email: "",
                address: "123 Main St",
                birth_date: "1990-01-01",
                role: "admin",
                is_active: true,
            },
            {
                id: "2",
                firstName: "Jane",
                lastName: "Smith",
                username: "janesmith",
                phone_number: "0987654321",
                email: "",
                address: "456 Elm St",
                birth_date: "1992-02-02",
                role: "user",
                is_active: false,
            },
        ]);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    // handle add user
    const handleAddUser = () => {
        setSelectedDialog("add");
        setOpenDialog(true);
        setFormData({
            id: "",
            firstName: "",
            lastName: "",
            username: "",
            phone_number: "",
            email: "",
            address: "",
            birth_date: "",
            role: "",
            is_active: "",
        });
        setOpenEdit(true);
    };
    
    // handle edit user
    const handleEditUser = (user) => {
        setSelectedDialog("edit");
        setOpenDialog(true);
        setFormData({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone_number: user.phone_number,
            email: user.email,
            address: user.address,
            birth_date: user.birth_date,
            role: user.role,
            is_active: user.is_active,
        });
        setOpenEdit(true);
    };
    
    // handle view user
    const handleViewUser = (user) => {
        setSelectedDialog("view");
        setOpenDialog(true);
        setFormData({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone_number: user.phone_number,
            email: user.email,
            address: user.address,
            birth_date: user.birth_date,
            role: user.role,
            is_active: user.is_active,
        });
        setOpenEdit(false);
    };
                
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDelete(false);
        setSelectedUser(null);
        setSelectedDialog("");
        setOpenEdit(false);
    };

    const handleConfirmDelete = (user) => {
        setSelectedUser(user);
        setOpenDelete(true);
        setSelectedDialog("delete");
    };

    const handleToggleActive = (user) => {
        const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u));
        setUsers(updatedUsers);
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
                            onClick={handleAddUser}
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
                                <TableCell>Role</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .filter((user) => user.firstName.toLowerCase().includes(searchTerm))
                                .map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>
                                            {user.firstName} {user.lastName}{" "}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={user.is_active}
                                                onChange={() => handleToggleActive(user)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    color: "primary.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleViewUser(user)}
                                            >
                                                <RemoveRedEyeIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "gray",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    color: "error.main",
                                                    minWidth: 0,
                                                }}
                                                onClick={() => handleConfirmDelete(user)}
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
                <DialogTitle>User Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with this action for user{" "}
                        <strong>
                            {selectedUser?.firstName} {selectedUser?.lastName}
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
                    {selectedDialog === "add" && "Thêm Người Dùng"}
                    {selectedDialog === "edit" && "Chỉnh sửa thông tin người dùng"}
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
                            <FormLabel htmlFor="username" required style={formLabelStyle}>
                                Tài khoản người dùng
                            </FormLabel>
                            <OutlinedInput
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                autoComplete="off"
                                required
                                size="small"
                                fullWidth
                                disabled={true}
                            />
                        </Grid>

                        <Grid item xs={12} size={6}>
                            <FormLabel htmlFor="firstName" required style={formLabelStyle}>
                                Tên nguời dùng
                            </FormLabel>
                            <OutlinedInput
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Nhập tên người dùng"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                            />
                        </Grid>

                        <Grid item xs={12} size={6}>
                            <FormLabel htmlFor="lastName" required style={formLabelStyle}>
                                Họ nguời dùng
                            </FormLabel>
                            <OutlinedInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Nhập họ người dùng"
                                value={formData.lastName}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                size="small"
                                fullWidth
                                disabled={!openEdit}
                            />
                        </Grid>

                        <Grid item xs={12} size={6}>
                            <FormLabel htmlFor="birth_date" required style={formLabelStyle}>
                                Ngày sinh
                            </FormLabel>
                            <OutlinedInput
                                id="birth_date"
                                name="birth_date"
                                type="date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                required
                                size="small"
                                fullWidth
                                inputProps={{
                                    max: new Date().toISOString().split("T")[0],
                                }}
                                disabled={!openEdit}
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
                            <FormControl>
                                <FormLabel id="pet-gender-label" style={formLabelStyle}>
                                    Role
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="pet-gender-label"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    disabled={!openEdit}
                                >
                                    <FormControlLabel
                                        value="admin"
                                        control={<Radio disabled={!openEdit} />}
                                        label="Admin"
                                    />
                                    <FormControlLabel
                                        value="user"
                                        control={<Radio disabled={!openEdit} />}
                                        label="User"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        {selectedDialog === "view" ? "Đóng" : "Hủy"}
                    </Button>
                    {selectedDialog === "edit" && <Button color="primary">Lưu</Button>}
                    {selectedDialog === "add" && <Button color="primary">Thêm người dùng</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageUserTable;
// This component manages the user table, allowing for search, edit, and delete actions.
