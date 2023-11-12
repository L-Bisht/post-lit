import { styled } from "@mui/material/styles";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import BoltIcon from "@mui/icons-material/Bolt";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  color: "white",
  display: "none",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Userbox = styled(Box)(({ theme }) => ({
  color: "white",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Search = styled(Box)({
  backgroundColor: "white",
  borderRadius: "4px",
});

export const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography sx={{ display: { xs: "none", md: "block" } }} variant="h6">
          postLit
        </Typography>
        <BoltIcon sx={{ display: { xs: "block", md: "none" } }} />
        <Search>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <ChatBubbleIcon />
          </Badge>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
          <Avatar
            sx={{ height: 30, width: 30 }}
            alt="Profile photo"
            src="https://www.hindustantimes.com/ht-img/img/2023/08/09/550x309/one_piece_gear_5_1691322181077_1691583557654.jpg"
          />
        </Icons>
        <Userbox>
          <Avatar
            sx={{ height: 30, width: 30 }}
            alt="Profile photo"
            src="https://www.hindustantimes.com/ht-img/img/2023/08/09/550x309/one_piece_gear_5_1691322181077_1691583557654.jpg"
          />
          <Typography>Lalit</Typography>
        </Userbox>
      </StyledToolbar>
    </AppBar>
  );
};
