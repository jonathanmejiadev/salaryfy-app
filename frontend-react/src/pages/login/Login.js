import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { loginService } from '../../services/login';
import Alert from '@material-ui/lab/Alert';
import './Login.css';
import logo from '../../assets/img/login/time128.png';
import Popover from '@material-ui/core/Popover';
import { CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(10),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }, typography: {
        padding: theme.spacing(2),
        color: 'black'
    },
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const { setAuth } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const userFormData = { username, password };
        const { token, user } = await loginService(userFormData);

        if (token) {
            setLoading(false);
            setError(false);
            setAuth({ userAuth: user, isAuth: true });
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            history.push('/');
        } else {
            setLoading(false);
            setError(true);
        }

    };

    //---------------- Temporary pop-up message
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //----------------

    return (
        <>
            {loading ? (
                <div className="login-loading">
                    <CircularProgress />
                </div>
            ) : (
                <Container component="main" maxWidth="xs" className="login-container">
                    <CssBaseline />

                    <div className={classes.paper}>
                        <div className="login-title">
                            <img src={logo} alt="logo"></img>
                            <h1>SALARYFY</h1>
                        </div>
                        {error === true &&
                            <Alert severity="error" className="alert-error">Username or password is incorrect!</Alert>
                        }
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="off"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Sign In
                        </Button>
                            <Grid container justify="flex-end">
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                  </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        Dont't have an account? Sign up
                                </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container >
            )}
            <div className="recruiter-info">
                <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                    Click me!!
      </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>
                        Hello there! If you are a recruiter or just want to see functionalities please use this account
                        <br />
                        ( username: recruiter password:123456 ) otherwise you can register.
                        <br />
                        This is not the final version, some features to be added soon.
                    </Typography>
                </Popover>
            </div>
        </>
    );
}

export default Login;