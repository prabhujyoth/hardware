import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import axios from "axios";

export default function Trends() {
  const [formData, setFormData] = useState({
    trendTitle: "",
    comments: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const postData = { ...formData, date: new Date().toLocaleString() };
    axios
      .post("/api/trends", postData)
      .then(() => {})
      .catch((err) => console.log(err));
  }

  function handleClear() {
    setFormData({
      trendTitle: "",
      comments: "",
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 1 }} className="flex flex-col gap-2">
        <Typography variant="h6">Post a Trend</Typography>
        <Grid container spacing={1}>
          <Grid size={8}>
            <TextField
              label="Trend Title"
              size="small"
              required
              name="trendTitle"
              value={formData.trendTitle}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid size={8}>
            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              name="comments"
              rows={4}
              value={formData.comments}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid size={5}>
            <div className="flex gap-2">
              <Button type="submit" variant="contained">
                POST
              </Button>
              <Button variant="outlined" onClick={() => handleClear()}>
                Clear
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
