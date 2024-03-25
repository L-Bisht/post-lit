import { CircularProgress, Stack, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <CircularProgress />
      <Typography variant="h6">Loading...</Typography>
    </Stack>
  );
};

export default Loader;
