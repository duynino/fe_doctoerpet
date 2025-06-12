import React from "react";
import {
    Card,
    Grid,
    Typography,
    Box,
    Button,
    FormLabel,
    OutlinedInput,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { formatDateDay } from "../../components/convertDate/convertDate";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ApiInstance from "../../axios/index";

const VaccinationLog = (pet) => {
    const [vaccinationLog, setVaccinationLog] = useState([]);
    const [selectVaccine, setSelectVaccine] = useState("");
    const [currentVaccine, setCurrentVaccine] = useState({});
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [formData, setFormData] = useState({
        name: pet.name || "",
        description: pet.description || "",
        type: pet.type || "",
        vacDate: pet.vacDate || "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const formLabelStyle = {
        fontWeight: 600,
        color: "#374151", // neutral gray
        marginBottom: "0.5rem",
        display: "block",
    };

    // get vaccince log from backend
    const getVaccinationLog = () => {
        ApiInstance.get(`/vac/pet/${pet?.pet?.petID}`)
            .then((response) => {
                setVaccinationLog(response.data);
                console.log("Danh sách vắc xin:", response.data);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy thông tin vắc xin:", error);
            });
    };

    React.useEffect(() => {
        getVaccinationLog();
    }, [pet, currentVaccine]);

    // Handle view vaccination
    const handleViewVaccince = (cls) => {
        setSelectVaccine("view");
        setCurrentVaccine(cls);
        setFormData({
            name: cls.name,
            description: cls.description,
            type: cls.type,
            vacDate: cls.vacDate,
        });
        setOpen(true);
    };

    // Handle edit vaccination
    const handleEditVaccince = (cls) => {
        setSelectVaccine("edit");
        setCurrentVaccine(cls);
        setFormData({
            name: cls.name,
            description: cls.description,
            type: cls.type,
            vacDate: cls.vacDate,
        });
        setOpen(true);
    };

    // Handle add vaccination
    const handleAddVaccince = () => {
        setSelectVaccine("add");
        setCurrentVaccine({});
        setFormData({
            name: "",
            description: "",
            type: "",
            vacDate: "",
        });
        setOpen(true);
    };

    // handle confirm delete disease
    const handleConfirmDelete = (cls) => {
        setCurrentVaccine(cls);
        setOpenDelete(true);
    };

    // handle close dialog
    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false);
        setSelectVaccine("");
        setCurrentVaccine({});
        setFormData({
            name: "",
            description: "",
            type: "",
            vacDate: "",
        });
    };

    // handle save vaccine
    const handleSaveVaccine = () => {
        if (selectVaccine === "add") {
            // Call API to add new vaccine
            ApiInstance.post(`/vac/add/pet/${pet?.pet?.petID}`, formData)
                .then((response) => {
                    console.log("Thêm vắc xin thành công:", response.data);
                    getVaccinationLog(); // Refresh the vaccination log
                })
                .catch((error) => {
                    console.error("Lỗi khi thêm vắc xin:", error);
                });
        } else if (selectVaccine === "edit") {
            // Call API to update existing vaccine
            ApiInstance.put(`/vac/update/${currentVaccine.vacLogId}`, formData)
                .then((response) => {
                    console.log("Cập nhật vắc xin thành công:", response.data);
                    getVaccinationLog(); // Refresh the vaccination log
                })
                .catch((error) => {
                    console.error("Lỗi khi cập nhật vắc xin:", error);
                });
        }
        handleClose();
    };

    // handle delete vaccine
    const handleDeleteVaccine = () => {
        ApiInstance.put(`/vac/delete/${currentVaccine.vacLogId}`)
            .then((response) => {
                console.log("Xóa vắc xin thành công:", response.data);
                getVaccinationLog(); // Refresh the vaccination log
            })
            .catch((error) => {
                console.error("Lỗi khi xóa vắc xin:", error);
            });
        handleClose();
    };

    return (
        <>
            <Card>
                <Grid container spacing={2}>
                    <Grid size={6} item xs={12} sm={4} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ padding: "1rem" }}>
                            Thông tin Vắc Xin
                        </Typography>
                    </Grid>
                    <Grid size={6} item xs={12} sm={4} md={6}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                sx={{
                                    color: "error.main",
                                    minWidth: 0,
                                    padding: 2,
                                }}
                                onClick={handleAddVaccince}
                            >
                                <AddIcon
                                    sx={{
                                        color: "green",
                                        minWidth: 0,
                                        padding: 0,
                                    }}
                                />
                            </Button>
                            {/* <Button
                                sx={{
                                    color: "error.main",
                                    minWidth: 0,
                                    padding: 2,
                                    paddingRight: 0,
                                }}
                            >
                                <EditIcon
                                    sx={{
                                        color: "gray",
                                        minWidth: 0,
                                        padding: 0,
                                    }}
                                />
                            </Button>
                            <Button
                                sx={{
                                    color: "error.main",
                                    minWidth: 0,
                                    padding: 2,
                                }}
                            >
                                <DeleteIcon sx={{ color: "error.main", minWidth: 0, padding: 0 }} />
                            </Button> */}
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Số thứ tự</TableCell>
                                    <TableCell>Tên Vaccine</TableCell>
                                    <TableCell>Loại Vaccine</TableCell>
                                    <TableCell>Ngày Tiêm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!Array.isArray(vaccinationLog) || vaccinationLog.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                textAlign="center"
                                            >
                                                Không có dữ liệu
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    vaccinationLog.map((cls, index) => (
                                        <TableRow key={cls.vaccinationLogId}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{cls.name}</TableCell>
                                            <TableCell>{cls.type}</TableCell>
                                            <TableCell>{formatDateDay(cls.vacDate)}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleViewVaccince(cls)}>
                                                    <RemoveRedEyeIcon />
                                                </Button>
                                                <Button onClick={() => handleEditVaccince(cls)}>
                                                    <EditIcon />
                                                </Button>
                                                <Button onClick={() => handleConfirmDelete(cls)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ textAlign: "center" }}>
                        {selectVaccine === "view" && "Thông tin chi tiết"}
                        {selectVaccine === "add" && "Thêm Vắc Xin"}
                        {selectVaccine === "edit" && "Chỉnh sửa Vắc Xin"}
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
                                    Tên Vắc Xin
                                </FormLabel>
                                <OutlinedInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nhập tên vắc xin"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} size={6}>
                                <FormLabel htmlFor="vacDate" required style={formLabelStyle}>
                                    Ngày Tiêm Vắc Xin
                                </FormLabel>
                                <OutlinedInput
                                    id="vacDate"
                                    name="vacDate"
                                    type="date"
                                    value={formData.vacDate}
                                    onChange={handleChange}
                                    required
                                    size="small"
                                    fullWidth
                                    inputProps={{
                                        max: new Date().toISOString().split("T")[0],
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} size={6}>
                                <FormLabel htmlFor="type" required style={formLabelStyle}>
                                    Loại vắc xin
                                </FormLabel>
                                <OutlinedInput
                                    id="type"
                                    name="type"
                                    type="text"
                                    placeholder="Nhập loại vắc xin"
                                    value={formData.type}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} size={8}>
                                <FormLabel htmlFor="description" style={formLabelStyle}>
                                    Mô Tả
                                </FormLabel>
                                <OutlinedInput
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Nhập mô tả thú cưng"
                                    value={formData.description}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            {selectVaccine === "view" ? "Đóng" : "Hủy"}
                        </Button>
                        {selectVaccine === "edit" && (
                            <Button onClick={handleSaveVaccine} color="primary">
                                Lưu
                            </Button>
                        )}
                        {selectVaccine === "add" && (
                            <Button onClick={handleSaveVaccine} color="primary">
                                Thêm Vắc Xin
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>

                {/* Dialog for delete confirmation */}
                <Dialog open={openDelete} onClose={handleClose}>
                    <DialogTitle>Xác nhận xóa lần tiêm vắc xin</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bạn có chắc chắn muốn xóa lần tiêm vắc xin "{currentVaccine.name}"?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleDeleteVaccine} color="secondary">
                            Xóa
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </>
    );
};

export default VaccinationLog;
