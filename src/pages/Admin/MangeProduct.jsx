import React from "react";
import LeftMenuAdmin from "../../components/LeftMenu/LeftMenuAdmin";
import { Box, Grid } from "@mui/material";
import ManageProductTable from "../../components/AdminComponent/ManageProductTable";

const ManagementProduct = () => {
    return (
        <>
            <Grid container spacing={0} sx={{ marginTop: "1rem" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} size={2.5}>
                    <LeftMenuAdmin role="admin" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} size={9.5}>
                    <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
                        Quản lý sản phẩm
                    </h1>
                    <ManageProductTable />
                </Grid>
            </Grid>
        </>
    );
};

export default ManagementProduct;
