import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
    Divider,
    ListItemIcon,
    Stack,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/LogoDr.Pet.jpg"; // Adjust the path as necessary

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f1f1f1",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    paddingLeft: theme.spacing(6),
}));

const navItems = [
    { label: "Trang Chủ", path: "/" },
    { label: "Sản phẩm ", path: "/productSearch" },
    { label: "Đặt Lịch Khám", path: "/" },
    { label: "Quản Lý Hồ sơ", path: "/petProfile" },
    { label: "Về Chúng Tôi", path: "/" },
];

const HeaderPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // 1. Xóa dữ liệu khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("account");

        // 3. Chuyển hướng về trang chính
        navigate("/");

        // 4. Hiển thị thông báo thành công
        toast.success("Đăng xuất thành công!");
        // 5. Cập nhật trạng thái người dùng
        setAnchorEl(null);
        setUser(null); // Cập nhật trạng thái người dùng
        // 6. rest trang website
        window.location.reload();
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    useEffect(() => {
        const accountStr = localStorage.getItem("account");
        if (accountStr) {
            const account = JSON.parse(accountStr);
            setUser(account);
        } else {
            setUser(null);
        }
    }, []);

    const handleNavigation = (path) => {
        console.log("Navigating to:", path);
        const accountStr = localStorage.getItem("account");
        if (path === "/petProfile") {
            if (!accountStr) {
                navigate("/login");
            } else {
                navigate(path);
            }
        } else {
            navigate(path);
        }
        setDrawerOpen(false); // Đóng drawer sau khi điều hướng
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box
                sx={{
                    backgroundColor: "#0098E6",
                    color: "white",
                    textAlign: "center",
                    py: 1,
                    fontWeight: "bold",
                }}
            >
                Giao hàng nhanh trong 30 phút!
            </Box>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ backgroundColor: "#0098E6" }}
            >
                <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Stack
                        direction="row"
                        component="a"
                        href="/"
                        spacing={1}
                        alignItems="center"
                        sx={{ textDecoration: "none", color: "white" }}
                    >
                        <img
                            src={logo}
                            alt="Doctor Pet Logo"
                            style={{ width: 60, height: 60 }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Dr Pet
                        </Typography>
                    </Stack>

                    {!isMobile && (
                        <Search sx={{ flexGrow: 1, maxWidth: 400 }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    )}

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "white" }}>
                        {!user && (
                            <>
                                <Button color="inherit" href="/login">
                                    Đăng nhập
                                </Button>
                                <Button color="inherit" href="/register">
                                    Đăng ký
                                </Button>
                            </>
                        )}
                        {user && (
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? "account-menu" : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? "true" : undefined}
                                        >
                                            <PersonIcon sx={{ color: "white" }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&::before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform: "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> Hồ sơ cá nhân
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> Lịch sử đặt hàng
                                    </MenuItem>
                                    {user && user.role === "admin" && (
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Quản lý tài khoản
                                        </MenuItem>
                                    )}
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>
                                <IconButton color="inherit">
                                    <Badge badgeContent={4} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {isMobile && (
                <Box sx={{ px: 2, py: 1 }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Box>
            )}

            {!isMobile && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 4, py: 1 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            sx={{ color: "black" }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
            )}

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem
                                key={item.label}
                                onClick={() => handleNavigation(item.path)}
                                sx={{ cursor: "pointer" }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default HeaderPage;
