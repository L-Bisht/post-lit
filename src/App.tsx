import { Box, Stack } from "@mui/material";
import Sidebar from "./features/Sidebar";
import Rightbar from "./features/Rightbar";
import Posts from "./features/Posts";
import Navbar from "./features/Navbar";

function App() {
  return (
    <Box>
      <Navbar />
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Sidebar />
        <Posts />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
