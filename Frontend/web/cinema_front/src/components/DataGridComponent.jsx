import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DataGridComponent = ({ columns, rows, pageSizeOptions, onEditClick, onDeleteClick, onDisplayClick ,showDisplayIcon, showActionColumn  }) => {
  const updatedColumns = showActionColumn
  ? [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          {showDisplayIcon && (
            <IconButton onClick={() => onDisplayClick(params.row)} style={{ color: '#FFA500' }}>
              <VisibilityIcon />
            </IconButton>
          )}
          <IconButton onClick={() => onEditClick(params.row)} style={{ color: '#00FF00' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDeleteClick(params.row)} style={{ color: '#FF0000' }}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ]:columns;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: 400, width: '65%', margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={updatedColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridComponent;
