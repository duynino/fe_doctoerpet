import React, { useState } from "react";
import {
    Typography,
    Box,
    Button,
    Grid,
    Card,
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
import ApiInstance from "../../axios/index";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { formatDateDay } from "../../components/convertDate/convertDate";

const DiseaseLog = (pet) => {
    const [Diseases, setDiseases] = useState([]);
    const [selectDisease, setSelectDisease] = useState("");
    const [currentDisease, setCurrentDisease] = useState({});
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [formData, setFormData] = useState({
        diseaseLogId: "",
        name: "",
        starDate: "",
        endDate: "",
        description: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const formLabelStyle = {
        fontWeight: 600,
        color: "#374151",
        marginBottom: "0.5rem",
        display: "block",
    };

    const getDataListDisease = async () => {
        try {
            if (!pet?.pet?.petID) {
                console.error("petID không hợp lệ:", pet);
                setDiseases([]);
                return;
            }
            const response = await ApiInstance.get(`/disease/all/pet/${pet?.pet?.petID}`);
            const data = response.data;
            const diseaseList = Array.isArray(data) ? data : data?.data ?? [];

            console.log("Fetched disease list:", diseaseList);
            setDiseases(diseaseList);
            console.log("Danh sách bệnh:", typeof Diseases);
            console.error("Lỗi khi lấy thông pet:", pet?.pet?.petID);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin bệnh:", error);
            console.error("Lỗi khi lấy thông pet:", pet?.pet?.petID);
        }
    };

    React.useEffect(() => {
        getDataListDisease();
    }, [pet, currentDisease]);

    // handle edit disease
    const handleEditDisease = (cls) => {
        setSelectDisease("edit");
        setCurrentDisease(cls);
        setFormData({
            name: cls.name,
            description: cls.description,
            starDate: cls.starDate,
            endDate: cls.endDate,
        });
        setOpen(true);
    };

    // handle view disease
    const handleViewDisease = (cls) => {
        setSelectDisease("view");
        setCurrentDisease(cls);
        setFormData({
            name: cls.name,
            description: cls.description,
            starDate: cls.starDate,
            endDate: cls.endDate,
        });
        setOpen(true);
    };

    // handle confirm delete disease
    const handleConfirmDelete = (cls) => {
        setSelectDisease("delete");
        setCurrentDisease(cls);
        setFormData({
            name: cls.name,
            description: cls.description,
            starDate: cls.starDate,
            endDate: cls.endDate,
        });
        setOpenDelete(true);
    };

    // handle add disease
    const handleAddDisease = () => {
        setSelectDisease("add");
        setFormData({
            name: "",
            starDate: "",
            endDate: "",
            description: "",
        });
        setOpen(true);
    };

    // handle close dialog
    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false);
        setSelectDisease("");
        setFormData({
            name: "",
            starDate: "",
            endDate: "",
            description: "",
        });
    };

    // handle delete disease
    const handleDeleteDisease = async () => {
        try {
            await ApiInstance.delete(`/disease/delete/pet/${currentDisease.diseaseLogId}`);
            setDiseases((prev) =>
                prev.filter((disease) => disease.diseaseLogId !== currentDisease.diseaseLogId)
            );
            setOpenDelete(false);
            toast.success("Xóa bệnh thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa bệnh:", error);
            toast.error("Xóa bệnh thất bại!");
            setOpenDelete(false);
        }
    };

    // handle save disease
    const handleSaveDisease = async () => {
        try {
            if (selectDisease === "edit") {
                await ApiInstance.put(
                    `/disease/update/pet/${currentDisease.diseaseLogId}`,
                    formData
                );
                toast.success("Cập nhật bệnh thành công!");
            } else if (selectDisease === "add") {
                await ApiInstance.post(`/disease/add/pet/${pet?.pet?.petID}`, formData);
                toast.success("Thêm bệnh thành công!");
            }
            setOpen(false);
            getDataListDisease();
        } catch (error) {
            console.error("Lỗi khi lưu bệnh:", error);
            console.error("Lỗi khi lưu bệnh:", formData);
            toast.error("Lưu bệnh thất bại!");
            setOpen(false);
        }
    };

    return (
        <>
            <Card>
                <Grid container spacing={2}>
                    <Grid size={6} item xs={12} sm={4} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ padding: "1rem" }}>
                            Thông tin Bệnh
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
                                onClick={handleAddDisease}
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
                                    <TableCell>Tên bệnh</TableCell>
                                    <TableCell>Ngày bắt đầu</TableCell>
                                    <TableCell>Ngày kết thúc</TableCell>
                                    <TableCell>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!Array.isArray(Diseases) || Diseases.length === 0 ? (
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
                                    Diseases.map((cls, index) => (
                                        <TableRow key={cls.diseaseLogId}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{cls.name}</TableCell>
                                            <TableCell>{formatDateDay(cls.starDate)}</TableCell>
                                            <TableCell>{formatDateDay(cls.endDate)}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleViewDisease(cls)}>
                                                    <RemoveRedEyeIcon />
                                                </Button>
                                                <Button onClick={() => handleEditDisease(cls)}>
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
                        {selectDisease === "view" && "Thông tin chi tiết"}
                        {selectDisease === "add" && "Thêm Bệnh"}
                        {selectDisease === "edit" && "Chỉnh sửa Bệnh"}
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
                                    Tên Bệnh
                                </FormLabel>
                                <OutlinedInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nhập tên bệnh"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                    size="small"
                                    fullWidth
                                    disabled={selectDisease === "view"}
                                    inputProps={{ maxLength: 100 }}
                                />
                            </Grid>

                            <Grid item xs={12} size={6}>
                                <FormLabel htmlFor="starDate" required style={formLabelStyle}>
                                    Ngày Bắt Đầu
                                </FormLabel>
                                <OutlinedInput
                                    id="starDate"
                                    name="starDate"
                                    type="date"
                                    value={formData.starDate}
                                    onChange={handleChange}
                                    required
                                    size="small"
                                    fullWidth
                                    inputProps={{
                                        max: new Date().toISOString().split("T")[0],
                                    }}
                                    disabled={selectDisease === "view"}
                                />
                            </Grid>

                            <Grid item xs={12} size={6}>
                                <FormLabel htmlFor="endDate" style={formLabelStyle}>
                                    Ngày Kết Thúc
                                </FormLabel>
                                <OutlinedInput
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    size="small"
                                    fullWidth
                                    inputProps={{
                                        max: new Date().toISOString().split("T")[0],
                                    }}
                                    disabled={selectDisease === "view"}
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
                                    placeholder="Nhập mô tả bệnh"
                                    value={formData.description}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    disabled={selectDisease === "view"}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            {selectDisease === "view" ? "Đóng" : "Hủy"}
                        </Button>
                        {selectDisease === "edit" && (
                            <Button onClick={handleSaveDisease} color="primary">
                                Lưu
                            </Button>
                        )}
                        {selectDisease === "add" && (
                            <Button onClick={handleSaveDisease} color="primary">
                                Thêm Bệnh
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>

                {/* Dialog for delete confirmation */}
                <Dialog open={openDelete} onClose={handleClose}>
                    <DialogTitle>Xác nhận xóa bệnh</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bạn có chắc chắn muốn xóa bệnh "{currentDisease.name}"?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleDeleteDisease} color="secondary">
                            Xóa
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </>
    );
};

export default DiseaseLog;
