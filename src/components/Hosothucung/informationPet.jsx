import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Button,
    Grid,
    Card,
    FormControlLabel,
    FormLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiInstance from "../../axios/index";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const InformationPet = (pet) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: pet?.pet?.name || "",
        description: pet?.pet?.description || "",
        gender: pet?.pet?.gender || "",
        weight: pet?.pet?.weight || "",
        birthDate: pet?.pet?.birthDate || "",
        species: pet?.pet?.species || "",
        breed: pet?.pet?.breed || "",
        image:
            pet?.pet?.image ||
            "https://th.bing.com/th/id/OIP.vJIMLPo1jiNAHINz4gRYYwHaHa?rs=1&pid=ImgDetMain",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log("formData", pet);
    };

    const formLabelStyle = {
        fontWeight: 600,
        color: "#374151", // neutral gray
        marginBottom: "0.5rem",
        display: "block",
    };

    const getDataPet = async () => {
        try {
            const response = await ApiInstance.get(`/pet/${pet?.pet?.petID}`);
            setFormData({
                name: response.data.name || "",
                description: response.data.description || "",
                gender: response.data.gender || "",
                weight: response.data.weight || "",
                birthDate: response.data.birthDate || "",
                species: response.data.species || "",
                breed: response.data.breed || "",
                image: response.data.image || "",
            });
            console.log("Cập nhật thành công:", response.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin thú cưng:", error);
            console.error("Lỗi khi cập nhật thú cưng1:", pet?.pet?.petID);
        }
    };

    useEffect(() => {
        setFormData({
            name: pet?.pet?.name || "",
            description: pet?.pet?.description || "",
            gender: pet?.pet?.gender || "",
            weight: pet?.pet?.weight || "",
            birthDate: pet?.pet?.birthDate || "",
            species: pet?.pet?.species || "",
            breed: pet?.pet?.breed || "",
            image: pet?.pet?.image || "",
        });
        getDataPet();
    }, [pet]);

    const handleEdit = () => {
        setOpenEdit(!openEdit);
    };

    const handleSubmit = async () => {
        try {
            const response = await ApiInstance.put(`/pet/update/${pet?.pet?.petID}`, formData);
            setOpenEdit(false);
            console.log("Cập nhật thành công1:", response.data);
            toast.success("Cập nhật thông tin thú cưng thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật thú cưng:", error);
            toast.error("Lỗi khi cập nhật thông tin thú cưng!");
        }
    };

    const handleDeletePet = async () => {
        try {
            await ApiInstance.put(`/pet/delete/${pet?.pet?.petID}`);
            setOpenDelete(false);
            console.log("Xóa hồ sơ thú cưng thành công");
            toast.success("Xóa hồ sơ thú cưng thành công!");
            navigate(0);
        } catch (error) {
            console.error("Lỗi khi xóa hồ sơ thú cưng:", error);
            toast.error("Lỗi khi xóa hồ sơ thú cưng!");
            setOpenDelete(false);
        }
    };

    return (
        <>
            <Card>
                <Grid container spacing={2}>
                    <Grid size={6} item xs={12} sm={4} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ padding: "1rem" }}>
                            Thông tin Thú Cưng
                        </Typography>
                    </Grid>
                    <Grid size={6} item xs={12} sm={4} md={6}>
                        <Box display="flex" justifyContent="flex-end">
                            {openEdit && (
                                <Button
                                    sx={{
                                        color: "error.main",
                                        minWidth: 0,
                                        padding: 1,
                                    }}
                                    onClick={handleSubmit}
                                >
                                    <SaveIcon
                                        sx={{
                                            color: "gray",
                                            minWidth: 0,
                                            padding: 0,
                                        }}
                                    />
                                </Button>
                            )}
                            <Button
                                sx={{
                                    color: "error.main",
                                    minWidth: 0,
                                    padding: 1,
                                }}
                                onClick={handleEdit}
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
                                    padding: 1,
                                }}
                                onClick={() => setOpenDelete(!openDelete)}
                            >
                                <DeleteIcon sx={{ color: "error.main", minWidth: 0, padding: 0 }} />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ padding: "1rem" }}>
                    {!pet?.pet?.petID ? (
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            size={12}
                        >
                            <Typography variant="body1" color="textSecondary" textAlign="center">
                                Không có dữ liệu
                            </Typography>
                        </Grid>
                    ) : (
                        <React.Fragment>
                            <Grid size={4} item xs={12} sm={4} md={6}>
                                <Box
                                    component="img"
                                    src={formData.image || ""}
                                    alt="Pet Avatar"
                                    sx={{
                                        width: "80%",
                                        height: "auto",
                                        borderRadius: "50%", // or 8 for slightly rounded corners
                                        border: "2px solid #ccc",
                                        objectFit: "cover",
                                        marginLeft: "1rem",
                                    }}
                                />

                                {openEdit && (
                                    <Box sx={{ padding: "1rem" }}>
                                        <FormLabel htmlFor="image" required style={formLabelStyle}>
                                            Pet Image
                                        </FormLabel>
                                        <OutlinedInput
                                            id="image"
                                            name="image"
                                            type="text"
                                            placeholder="Enter pet image URL"
                                            value={formData.image}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            required
                                            size="small"
                                            fullWidth
                                        />
                                    </Box>
                                )}
                            </Grid>
                            <Grid size={8} item xs={12} sm={4} md={6}>
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
                                            Pet Name
                                        </FormLabel>
                                        <OutlinedInput
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter pet name"
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
                                        <FormControl>
                                            <FormLabel id="pet-gender-label" style={formLabelStyle}>
                                                Gender
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="pet-gender-label"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                disabled={!openEdit}
                                            >
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio disabled={!openEdit} />}
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio disabled={!openEdit} />}
                                                    label="Male"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} size={6}>
                                        <FormLabel htmlFor="weight" required style={formLabelStyle}>
                                            Weight (kg)
                                        </FormLabel>
                                        <OutlinedInput
                                            id="weight"
                                            name="weight"
                                            type="number"
                                            placeholder="Enter pet weight"
                                            value={formData.weight}
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
                                        <FormLabel
                                            htmlFor="birthDate"
                                            required
                                            style={formLabelStyle}
                                        >
                                            Birth Date
                                        </FormLabel>
                                        <OutlinedInput
                                            id="birthDate"
                                            name="birthDate"
                                            type="date"
                                            value={formData.birthDate}
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
                                        <FormLabel htmlFor="species" style={formLabelStyle}>
                                            Species
                                        </FormLabel>
                                        <OutlinedInput
                                            id="species"
                                            name="species"
                                            type="text"
                                            placeholder="Enter pet species"
                                            value={formData.species}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            size="small"
                                            fullWidth
                                            disabled={!openEdit}
                                        />
                                    </Grid>

                                    <Grid item xs={12} size={6}>
                                        <FormLabel htmlFor="breed" style={formLabelStyle}>
                                            Breed
                                        </FormLabel>
                                        <OutlinedInput
                                            id="breed"
                                            name="breed"
                                            type="text"
                                            placeholder="Enter pet breed"
                                            value={formData.breed}
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
                        </React.Fragment>
                    )}
                </Grid>
            </Card>

            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Xóa Hồ Sơ Thú Cưng</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa hồ sơ thú cưng này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDeletePet} color="secondary">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InformationPet;
