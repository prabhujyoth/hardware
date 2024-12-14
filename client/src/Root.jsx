import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ComputerIcon from "@mui/icons-material/Computer";
import WhatshotIcon from "@mui/icons-material/Whatshot";
export default function Root() {
  const location = useLocation();
  const headerValue =
    location.pathname.split("/")[1].charAt(0).toUpperCase() +
    location.pathname.split("/")[1].slice(1);

  return (
    <div className="flex h-full">
      <div className="left flex flex-col items-center gap-2 w-20 min-w-20 border border-r">
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1976d2" : "white",
            color: isActive ? "white" : "black",
          })}
          className={
            "h-16 w-16 border rounded-full  flex items-center justify-center"
          }
        >
          <DashboardIcon />
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1976d2" : "white",
            color: isActive ? "white" : "black",
          })}
          className={
            "h-16 w-16 border rounded-full flex items-center justify-center"
          }
        >
          <ComputerIcon />
        </NavLink>

        <NavLink
          to="/trends"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1976d2" : "white",
            color: isActive ? "white" : "black",
          })}
          className={
            "h-16 w-16 border rounded-full flex items-center justify-center"
          }
        >
          <WhatshotIcon />
        </NavLink>
      </div>
      <div className="right overflow-auto flex flex-col w-full">
        <Box
          sx={{
            flexGrow: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {headerValue}
              </Typography>
              <Button color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
          {/* router */}
          <Outlet />
        </Box>
      </div>
    </div>
  );
}
