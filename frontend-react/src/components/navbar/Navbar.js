import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import "./Navbar.css";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { IconButton } from "@material-ui/core";
import logo from '../../assets/img/login/time32.png';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `2px solid #07EDB0`,
    backgroundColor: '#3B8AF6'
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  other: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    setAuth({
      isAuth: false,
      userAuth: "",
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history.push("/login");
  };

  return (
    <div>
      <AppBar className="navbar-container">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={logo} alt="logo"></img>
          </IconButton>
          <div className={classes.other}>


            {history.location.pathname !== "/history" ? (
              <Button
                className="button-content"
                color="default"
                size="small"
                onClick={() => history.push("/history")}
              >
                Jobs History
              </Button>
            ) : (
              <Button
                className="button-content"
                color="default"
                size="small"
                onClick={() => history.push("/")}
              >
                Jobs
              </Button>
            )}

            {!localStorage.getItem("user") ? (
              <Button
                className="button-content"
                variant="outlined"
                color="default"
                size="small"
                href="/login"
              >
                Login
              </Button>
            ) : (
              <Button
                className="button-content"
                variant="outlined"
                color="default"
                size="small"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
