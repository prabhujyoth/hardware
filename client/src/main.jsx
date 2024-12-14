import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import Dashboard from "./Dashboard.jsx";
import Root from "./Root.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Trends from "./Trends.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <App />,
      },
      {
        path: "/trends",
        element: <Trends />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Root />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
