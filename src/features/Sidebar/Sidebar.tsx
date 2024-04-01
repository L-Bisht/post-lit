import { Box, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

type TProps = {
  selectedSection?: string;
};

export const Sidebar = ({ selectedSection }: TProps) => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      <Stack direction="column" spacing={4}>
        <Stack
          sx={{
            backgroundColor: "#125e98",
            borderRadius: "100% 27% 100% 31%",
            color: "white",
            maxWidth: "100px",
          }}
          direction="row"
          spacing={0.5}
          p={1.5}
        >
          <HomeIcon />
          <Typography variant="body1" fontWeight="bold">
            Home
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
