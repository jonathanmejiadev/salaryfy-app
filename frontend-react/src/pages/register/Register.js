import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import { useHistory } from 'react-router';
import logo from '../../assets/img/login/time128.png';
import Snackbar from '../../components/Snackbar/Snackbar';
import { registerService } from '../../services/login';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = () => {
    const classes = useStyles();
    //const history = useHistory();
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //if user not exists 
        setRegisterData({ username: '', email: '', password: '' });
        //history.push('/login');
        //else alert error
        registerService(registerData)
            .then(response => {
                setOpenSnackbar(true);
            })
            .then(err => {
                console.log(err);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    return (
        <Container component="main" maxWidth="xs" className="login-container">
            <CssBaseline />
            <div className={classes.paper}>
                <div className="login-title">
                    <img src={logo} alt="wallet"></img>
                    <h1>SALARYFY</h1>
                </div>
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
                                value={registerData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                value={registerData.email}
                                onChange={handleChange}
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
                                value={registerData.password}
                                onChange={handleChange}
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={'User has been registered successfully'} />
        </Container>
    );
}

export default Register;
