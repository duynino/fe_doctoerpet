import React from "react";
import LeftMenuAdmin from "../../components/LeftMenu/LeftMenuAdmin";
import { Box, Grid } from "@mui/material";
import ManageCategoryTable from "../../components/AdminComponent/ManageCategoryTable";

const ManagementCategory = () => {
    return (
        <>
            <Grid container spacing={0} sx={{ marginTop: "1rem" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} size={2.5}>
                    <LeftMenuAdmin role="ADMIN" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} size={9.5}>
                    <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
                        Quản lý loại sản phẩm
                    </h1>
                    <ManageCategoryTable />
                </Grid>
            </Grid>
        </>
    );
};
export default ManagementCategory;
