import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearProduct } from "./features/productSlice";

export default function Form({ handleRender, handleAlertTrue }) {
  const initialFormState = {
    category: "",
    productName: "",
    sellerName: "",
    qty: 0,
  };
  //Edit Object from the redux store
  const dispatch = useDispatch();
  let editObj = useSelector((state) => state.product.value) || {};
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  //clear editObj on first mount
  useEffect(() => {
    dispatch(clearProduct());
  }, [dispatch]);

  //If Edit Object has category, then load edit object in form else the initial state
  useEffect(() => {
    if (editObj?.category) {
      setFormData(editObj);
      setEditMode(true);
    } else {
      setFormData(initialFormState);
      setEditMode(false);
    }
  }, [editObj]);

  //generating random id for objects
  function generateRandomId() {
    return Math.floor(Math.random() * 10000);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    //return from function if the qty is 0
    if (name == "qty" && value < 0) {
      return;
    }

    name == "qty"
      ? setFormData({ ...formData, [name]: Number(value) })
      : setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //apending random id to form data before sending it in post request
    const postData = { ...formData, id: generateRandomId() };

    // edit object exits perform patch and return from function
    if (editMode) {
      axios.put(`/api/product/${formData.id}`, formData).catch((err) => {
        console.log(err);
      });
      handleFormClear();
      //method to trigger alert dialog
      handleAlertTrue("update");
      handleRender();
      return;
    }

    // perform new product post request
    axios
      .post("/api/products", postData)
      .then(() => {
        //method to trigger alert dialog
        handleAlertTrue("new");
      })
      .catch((err) => console.log(err));

    handleRender();
    handleFormClear();
    setEditMode(false);
  }

  //clear the form
  function handleFormClear() {
    setFormData(initialFormState);
    setEditMode(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 1, paddingTop: "1rem" }}>
        <Grid container spacing={1}>
          <Grid size={{ xl: 2, lg: 2, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={formData.category}
                required
                onChange={handleChange}
              >
                <MenuItem value={"CPU"}>CPU</MenuItem>
                <MenuItem value={"GPU"}>GPU</MenuItem>
                <MenuItem value={"RAM"}>RAM</MenuItem>
                <MenuItem value={"Motherboard"}>Motherboard</MenuItem>
                <MenuItem value={"SSD"}>SSD</MenuItem>
                <MenuItem value={"PSU"}>PSU</MenuItem>
                <MenuItem value={"HDD"}>HDD</MenuItem>
                <MenuItem value={"Monitor"}>Monitor</MenuItem>
                <MenuItem value={"Cooling"}>Cooling</MenuItem>
                <MenuItem value={"Case"}>Case</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xl: 3, lg: 3, md: 4 }}>
            <TextField
              label="Product Name"
              size="small"
              required
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xl: 3, lg: 3, md: 4 }}>
            <TextField
              label="Seller Name"
              size="small"
              name="sellerName"
              required
              value={formData.sellerName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xl: 1, lg: 1, md: 2 }}>
            <TextField
              type="number"
              label="Quantity "
              size="small"
              required
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              {editMode ? "Update" : "Add"}
            </Button>
          </Grid>
          <Grid size="auto">
            <Button onClick={() => handleFormClear()} variant="outlined">
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
