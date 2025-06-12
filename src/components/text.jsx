import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function MyComponent({ Diseases, handleViewDisease, handleEditDisease, handleConfirmDelete, formatDateDay }) {
  return (
    <Grid item xs={12}>
      {/* Header */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <Typography variant="subtitle1">#</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Tên bệnh</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">Ngày bắt đầu</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">Ngày kết thúc</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Actions</Typography>
        </Grid>
      </Grid>

      {/* Data Rows */}
      {Diseases?.map((cls, index) => (
        <Grid container spacing={2} key={cls.diseaseLogId} alignItems="center">
          <Grid item xs={1}>
            {index + 1}
          </Grid>
          <Grid item xs={3}>
            {cls.name}
          </Grid>
          <Grid item xs={2}>
            {formatDateDay(cls.starDate)}
          </Grid>
          <Grid item xs={2}>
            {formatDateDay(cls.endDate)}
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => handleViewDisease(cls)}>
              <RemoveRedEyeIcon />
            </Button>
            <Button onClick={() => handleEditDisease(cls)}>
              <EditIcon />
            </Button>
            <Button onClick={() => handleConfirmDelete(cls)}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default MyComponent;
