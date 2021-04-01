import React, { useEffect, useState, } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../assets/img/login/time128.png';
import Snackbar from '../../components/Snackbar/Snackbar';
import { registerService } from '../../services/login';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';

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
    const history = useHistory();
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(false);

    const handleChange = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //if user not exists 
        setRegisterData({ username: '', email: '', password: '', repeatPassword: '' });
        //else alert error
        setLoading(true)
        registerService(registerData)
            .then(response => {
                //setOpenSnackbar(true);
                if (response.data.errors) {
                    //console.log('Registration error');
                    setLoading(false);
                } else {
                    setLoading(false);
                    history.push('/login');
                }
            })

    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== registerData.password) {
                return false
            } else {
                return true
            };
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, [registerData.password]);

    return (
        <Container component="main" maxWidth="xs" className="login-container">
            <CssBaseline />
            <div className={classes.paper}>
                <div className="login-title">
                    <img src={logo} alt="wallet"></img>
                    <h1>SALARYFY</h1>
                </div>
                {loading !== false ? (
                    <div className="loading">
                        <CircularProgress />
                    </div>
                ) : (
                    <ValidatorForm className={classes.form} noValidate onSubmit={handleSubmit}
                        onError={errors => {
                            //console.log(errors);
                            //console.log('ERROR');
                        }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextValidator
                                    autoComplete="off"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    value={registerData.username}
                                    onChange={handleChange}
                                    validators={['required', 'minStringLength:3', 'maxStringLength:12']}
                                    errorMessages={[
                                        'Username is required',
                                        'Username must be at least 3 characters',
                                        'Username must be less than 12 characters'
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="off"
                                    value={registerData.email}
                                    onChange={handleChange}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Email is required', 'Invalid email']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
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
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['Password is required', 'Password must be at least 6 characters']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="repeatPassword"
                                    label="Repeat Password"
                                    type="password"
                                    value={registerData.repeatPassword}
                                    onChange={handleChange}
                                    validators={['required', 'isPasswordMatch']}
                                    errorMessages={['Repeat password is required', 'Passwords do not match']}
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
                    </ValidatorForm>
                )

                }

            </div>
            <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={'User has been registered successfully'} />
        </Container>
    );
}

export default Register;
