import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Dialog, DialogContent } from "@mui/material";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "features/Auth/userSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ResetPassForm from "features/Auth/components/ResetPassForm";
const MODE = {
  login: "login",
  register: "register",
  resetpass: "resetpass",
};

const ButtonLink = styled(Button)`
  margin: 0 10px;
  color: black;
  &:hover {
    background-color: white;
  }
`;

const LinkNotDecoration = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  right: 0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "200px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

const StyleButtonAuth = styled(Button)`
  margin-left: 20px;
  text-decoration: none;
  color: white;
  background-color: #27006f;
  &:hover {
    background-color: #1a0049;
  }
`;

export default function Header({ handleSearch, addToCartClick }) {
  const [quantityCart, setQuantityCart] = React.useState();

  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    let totalQuantity = 0;
    if (cartData && Array.isArray(cartData)) {
      totalQuantity = cartData.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setQuantityCart(totalQuantity);
    }
  }, [addToCartClick]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mode, setMode] = React.useState(MODE.login);
  const dispath = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const loggedInUser = useSelector((state) => state.user.current);
  // Nếu nó có id thì là đăng nhập rồi

  const isLoggin = loggedInUser && loggedInUser.user_id ? true : null;
  // console.log("isLogin: ", loggedInUser.user_id);

  const [open, setOpen] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // console.log("Search value:", searchValue);
    handleSearch(searchValue);
  };

  const handleClose = () => {
    setOpen(false);
    setMode(MODE.login);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    const action = logout();
    setAnchorEl(null);

    dispath(action);
  };
  const handleSwapMode = () => {};
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Tài khoản</MenuItem>
      <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      Profile Account
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fcaf17" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", color: "#27006f" } }}
          >
            <LinkNotDecoration to="/">
              NHGB <FormatColorFillIcon />
            </LinkNotDecoration>
          </Typography>

          <Box sx={{ flexGrow: 0.1 }} />
          <ButtonLink component={LinkNotDecoration} to="/products/0">
            NAM
          </ButtonLink>
          <ButtonLink component={LinkNotDecoration} to="/products/1">
            NỮ
          </ButtonLink>
          {/* <ButtonLink component={LinkNotDecoration} to="/phukien">
            PHỤ KIỆN
          </ButtonLink> */}
          <Box sx={{ flexGrow: 1 }} />
          <form onSubmit={handleSearchSubmit}>
            <Search>
              <SearchIconWrapper sx={{ color: "#27006f" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ color: "#27006f" }}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Search>
          </form>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* WISH */}
            <Link to="/favorite">
              <IconButton size="large" sx={{ color: "#27006f" }}>
                <FavoriteIcon />
              </IconButton>
            </Link>

            {/* CART */}
            <Link to="/cart">
              <IconButton size="large" sx={{ color: "#27006f" }}>
                <Badge badgeContent={quantityCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            {/* NOTIFY */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: "#27006f" }}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            {isLoggin && (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: "#27006f" }}
                >
                  <AccountCircle />
                </IconButton>
              </>
            )}
            {!isLoggin && (
              <StyleButtonAuth onClick={handleClickOpen}>
                {" "}
                LOGIN
              </StyleButtonAuth>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown
      >
        <DialogContent>
          {mode == MODE.login && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center" mt={"10px"}>
                <Button onClick={() => setMode(MODE.register)}>
                  Chưa có tài khoản ? Đăng ký ngay.
                </Button>
                <br></br>
                <Button onClick={() => setMode(MODE.resetpass)}>
                  Quên mật khẩu
                </Button>
              </Box>
            </>
          )}

          {mode == MODE.register && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center" mt={"10px"}>
                <Button onClick={() => setMode(MODE.login)}>
                  Đã có tài khoản ? Đăng nhập ngay.
                </Button>
                <br></br>
                <Button onClick={() => setMode(MODE.resetpass)}>
                  Quên mật khẩu
                </Button>
              </Box>
            </>
          )}

          {mode == MODE.resetpass && (
            <>
              <ResetPassForm closeDialog={handleClose} />
              <Box textAlign="center" mt={"10px"}>
                <Button onClick={() => setMode(MODE.login)}>
                  Đã có tài khoản ? Đăng nhập ngay.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
