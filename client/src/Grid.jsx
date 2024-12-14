import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { editAction } from "./features/productSlice";
import { useEffect, useState } from "react";

export default function Grid({ rows, handleRender, handleAlertTrue }) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  //function to handle delete of rows
  function handleDelete(id) {
    axios
      .delete(`/api/product/${id}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        handleRender();
        handleAlertTrue("delete");
      });
  }

  //dispatch selected row object to store which will be consumed by form component for editing
  function handleEdit(params) {
    dispatch(editAction(params.row));
  }
  function handleLoaderOpen() {
    setLoader(true);
  }

  function handleLoaderClose() {
    setLoader(false);
  }

  useEffect(() => {
    rows.length > 0 ? handleLoaderClose() : handleLoaderOpen();
  }, [rows]);
  const columns = [
    { field: "category", headerName: "Category", width: 200 },
    { field: "productName", headerName: "Product Name", width: 400 },
    { field: "sellerName", headerName: "Seller Name", width: 400 },
    { field: "qty", headerName: "Quantity", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params)}>
            <EditIcon></EditIcon>
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <>
      {rows.length > 0 ? (
        <DataGrid columns={columns} rows={rows} />
      ) : (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loader}
          onClick={handleLoaderClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
