import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '../../components/cards/Cards';
//import { AuthContext } from '../../context/AuthContext';
//import { useHistory } from 'react-router';
import './Dashboard.css';
import { getJobs } from '../../services/job';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddJobDialog from '../../components/add-job-dialog/AddJobDialog';
import { Alert } from '@material-ui/lab';
import Snackbar from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    loading: {
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    fab: {
        top: theme.spacing(2)
    }
}));

const Dashboard = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    useEffect(() => {
        setLoading(true);
        getJobs().then(response => {
            setCards([...response.data])
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        getJobs().then(response => {
            setCards([...response.data])
            setLoading(false);
        });
    }, [openDialog])

    return (
        <>
            <CssBaseline />
            <div className="add-button">
                <Fab color="primary" aria-label="add" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </Fab>
            </div>

            <main className="main-content">
                {loading === true ? (<div className="loading">
                    <CircularProgress />
                </div>) : (<Container className={classes.cardGrid} maxWidth="md">
                    {cards.length === 0 && (
                        <div className="alert-container">
                            <Alert severity="info">
                                Actived jobs not found, create one to start!
                            </Alert>
                        </div>
                    )}
                    <Grid container spacing={4} justify="center">
                        {cards.map((card) => (
                            <Grid item key={card._id} xs={12} sm={6} md={4}>
                                <Card earnings={card.earnings} name={card.name} id={card._id} client={card.client} setCards={setCards} setOpen={setOpenSnackbar} technologies={card.technologies} time={card.time} date={card.date} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>)
                }
            </main>
            <AddJobDialog openDialog={openDialog} setOpenDialog={setOpenDialog}></AddJobDialog>
            <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={'Job finished successfully'} />
        </>
    )
}

export default withRouter(Dashboard);