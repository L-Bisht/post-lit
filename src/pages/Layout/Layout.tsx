import Navbar from "../../features/Navbar";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Sidebar from "../../features/Sidebar";
import Rightbar from "../../features/Rightbar";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Sidebar />
        <Box flex={4} p={2}>
          <Outlet />
        </Box>
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default Layout;
