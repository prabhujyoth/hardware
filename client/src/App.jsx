import { Alert, Box, Collapse, IconButton } from "@mui/material";
import "./App.css";
import Form from "./Form";
import Grid from "./Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [rows, setRows] = useState([]);
  const [alertType, setAlertType] = useState("");

  //fetch rows from api
  async function getData() {
    try {
      await axios.get("/api/products").then((res) => {
        setRows(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }

  //function to handle re-render and fetch data to update the grid rows
  function handleRender() {
    getData();
  }

  //on component mount, get rows
  useEffect(() => {
    handleRender();
  }, []);

  const [isAlert, setIsAlert] = useState(false);

  function handleAlertTrue(type) {
    setAlertType(type);
    setIsAlert(true);
  }

  return (
    <div className="flex flex-col w-full height-grow overflow-auto flex-grow">
      <Collapse in={isAlert}>
        <Alert
          className="alert"
          severity={alertType == "delete" ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertType == "new" && "Record Added Sucessfully !"}
          {alertType == "update" && "Record Updated Sucessfully !"}
          {alertType == "delete" && "Record Deleted Sucessfully !"}
        </Alert>
      </Collapse>
      <Form handleRender={handleRender} handleAlertTrue={handleAlertTrue} />
      <div className="height-grow p-8">
        <Grid
          rows={rows}
          handleRender={handleRender}
          handleAlertTrue={handleAlertTrue}
        />
      </div>
    </div>
  );
}

export default App;
