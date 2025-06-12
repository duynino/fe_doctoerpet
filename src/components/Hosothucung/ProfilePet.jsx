import React from "react";
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import InformationPet from "./informationPet";
import VaccinationLog from "./VaccinationLog";
import DiseaseLog from "./DiseaseLog";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import AddIcon from "@mui/icons-material/Add";
import ApiInstance from "../../axios/index"; // Adjust the import path as necessary
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ProfilePet = () => {
    const [pets, setPets] = React.useState([]);
    const [selectedPet, setSelectedPet] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [selectedPetId, setSelectedPetId] = React.useState(null);
    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        gender: "",
        weight: 0,
        birthDate: "",
        species: "",
        breed: "",
        image: "",
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
        setFormData({
            name: "",
            description: "",
            gender: "",
            weight: 0,
            birthDate: "",
            species: "",
            breed: "",
            image: "",
        });
    };

    const fetchPets = async () => {
        try {
            const response = await ApiInstance.get("/pet/all");
            setPets(response.data);
            console.log("Pets fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    // get list pets from backend
    React.useEffect(() => {
        fetchPets();
    }, [selectedPet]);

    const handleChange = (event) => {
        setSelectedPet(event.target.value);
        const selectedPetData = pets.find((pet) => pet.name === event.target.value);
        if (selectedPetData) {
            setSelectedPetId(selectedPetData);
            console.log("Selected pet data:", selectedPetId);
        } else {
            setSelectedPetId(null);
        }
    };
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {
        try {
            const response = await ApiInstance.post("/pet/addPet", formData);
            console.log("Pet created successfully:", response.data);
            console.log("Form data to be submitted:", formData);
            setOpen(false);
            fetchPets(); // Refresh the pet list after adding a new pet
        } catch (error) {
            console.error("Error creating pet:", error);
        }
    }

    const formLabelStyle = {
        fontWeight: 600,
        color: "#374151", // neutral gray
        marginBottom: "0.5rem",
        display: "block",
    };

    return (
        <>
            <HeaderPage />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    Hồ Sơ Thú Cưng
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={4}>
                            <Box display="flex" justifyContent="flex-end">
                                <Box>
                                    <FormControl sx={{ minWidth: 200 }} size="small">
                                        <InputLabel id="select-pet-label">Thú Cưng</InputLabel>
                                        <Select
                                            labelId="select-pet-label"
                                            id="select-pet"
                                            value={selectedPet}
                                            label="Thú Cưng"
                                            onChange={handleChange}
                                        >
                                            {pets.map((pet) => (
                                                <MenuItem key={pet.id} value={pet.name}>
                                                    {pet.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Button onClick={handleOpen}>
                                        <AddIcon
                                            sx={{
                                                color: "green",
                                                minWidth: 0,
                                                padding: 0,
                                                marginRight: "2px",
                                            }}
                                        />
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <br />
                <Box sx={{ mb: 2 }}>
                    <InformationPet pet={selectedPetId} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <VaccinationLog pet={selectedPetId} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <DiseaseLog pet={selectedPetId} />
                </Box>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ textAlign: "center" }}>Thêm Hồ Sơ Thú Cưng</DialogTitle>
                    <DialogContent>
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
                                        Tên Thú Cưng
                                    </FormLabel>
                                    <OutlinedInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Nhập tên thú cưng"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                        required
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormControl>
                                        <FormLabel id="pet-gender-label" style={formLabelStyle}>
                                            Giới Tính
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="pet-gender-label"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleFormChange}
                                        >
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Cái"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Đực"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="weight" required style={formLabelStyle}>
                                        Cân Nặng (kg)
                                    </FormLabel>
                                    <OutlinedInput
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        placeholder="Nhập cân nặng thú cưng"
                                        value={formData.weight}
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                        required
                                        size="small"
                                        fullWidth
                                        inputProps={{ min: 0, step: 0.1 }}
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="birthDate" required style={formLabelStyle}>
                                        Ngày Sinh
                                    </FormLabel>
                                    <OutlinedInput
                                        id="birthDate"
                                        name="birthDate"
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={handleFormChange}
                                        required
                                        size="small"
                                        fullWidth
                                        inputProps={{
                                            max: new Date().toISOString().split("T")[0],
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="species" style={formLabelStyle}>
                                        Giống Loài
                                    </FormLabel>
                                    <OutlinedInput
                                        id="species"
                                        name="species"
                                        type="text"
                                        placeholder="Nhập giống loài thú cưng"
                                        value={formData.species}
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="breed" style={formLabelStyle}>
                                        Giống
                                    </FormLabel>
                                    <OutlinedInput
                                        id="breed"
                                        name="breed"
                                        type="text"
                                        placeholder="Nhập giống thú cưng"
                                        value={formData.breed}
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} size={12}>
                                    <FormLabel htmlFor="description" style={formLabelStyle}>
                                        Mô Tả
                                    </FormLabel>
                                    <OutlinedInput
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Nhập mô tả thú cưng"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                        size="small"
                                        fullWidth
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                                <Grid item xs={12} size={6}>
                                    <FormLabel htmlFor="image" required style={formLabelStyle}>
                                        Ảnh Thú Cưng
                                    </FormLabel>
                                    <OutlinedInput
                                        id="image"
                                        name="image"
                                        type="text"
                                        placeholder="Nhập ảnh thú cưng"
                                        value={formData.image}
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                        required
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            <CancelIcon sx={{ marginRight: "8px" }} />
                            Hủy
                        </Button>
                        <Button onClick={handleSubmit}>
                            <SaveIcon sx={{ marginRight: "8px" }} />
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
            <FooterPage />
        </>
    );
};

export default ProfilePet;
