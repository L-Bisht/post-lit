import Loader from "./Loader";
import { Stack, Typography } from "@mui/material";

const withLoader = (
  children: JSX.Element,
  status: "idle" | "loading" | "succeeded" | "failed",
  message?: string | null
) => {
  if (status === "loading") return <Loader />;
  if (status === "failed")
    return (
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography color="error" variant="h3">
          {message || "Some error occured"}
        </Typography>
        <Typography variant="body1">Please try reloading the page</Typography>
      </Stack>
    );
  if (status === "succeeded") return children;
  return <Typography>No content here</Typography>;
};

export default withLoader;
