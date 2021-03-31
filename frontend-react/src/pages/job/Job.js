import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import "./Job.css";
import { getJob, updateJob } from "../../services/job";
import { Grid, makeStyles, IconButton, Tooltip, Fab, } from "@material-ui/core";
import stop from "../../assets/img/job/stop11.png";
import playbutton from "../../assets/img/job/play11.png";
import dollars from "../../assets/img/job/dollars1.png";
import timemoney from "../../assets/img/job/time-is-money1.png";
import workingmoney from "../../assets/img/job/working-time.png";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Snackbar from '../../components/Snackbar/Snackbar';
import client from '../../assets/img/history/businessman2.png';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.terciary,
  },
  gridButtons: {
    display: "flex",
    justifyContent: "center",
  },
  playIcon: {
    height: 75,
    width: 75,
    color: "#f0ec57",
  },
  stopIcon: {
    height: 75,
    width: 75,
    color: "#373a43",
    borderRadius: "100%",
    backgroundColor: "#f0ec57",
    border: "2px solid #f0ec57",
  },
}));

const Job = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [seconds, setSeconds] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [time, setTime] = useState("");
  const [jobName, setJobName] = useState("");
  const [clientName, setclientName] = useState("");
  const [pricePerHour, setPricePerHour] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const history = useHistory();
  const [earningsEach30sec, setEarningsEach30sec] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');

  useEffect(() => {
    setLoading(true);
    getJob(id)
      .then((response) => {
        const { name, earnings, pricePerHour, seconds, time, client } = response.data;
        setJobName(name);
        setclientName(client)
        setEarnings(earnings);
        setPricePerHour(pricePerHour);
        setSeconds(seconds);
        setTime(time);
        sumToEarnings(pricePerHour);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let interval = null;
    if (isTimerOn) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        let hhmmss = secondsToTime(seconds + 1);
        setTime(hhmmss);
        calculateEarnings();
      }, 1000);
    } else if (!isTimerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerOn, seconds]); // eslint-disable-line react-hooks/exhaustive-deps

  const startTimer = () => {
    setIsTimerOn(true);
  };

  const stopTimer = () => {
    setIsTimerOn(false);
    const jobUpdate = {
      earnings: earnings,
      seconds: seconds,
      time: time,
    };
    updateJob(id, jobUpdate)
      .then((response) => {
        setSnackbarMessage('Your working time has been saved');
        setTypeSnackbar('success');
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const secondsToTime = (timeInSeconds) => {
    var pad = function (num, size) {
      return ("000" + num).slice(size * -1);
    },
      time = parseFloat(timeInSeconds).toFixed(3),
      hours = Math.floor(time / 60 / 60),
      minutes = Math.floor(time / 60) % 60,
      seconds = Math.floor(time - minutes * 60);
    return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
  };

  const calculateEarnings = () => {
    if ((seconds + 1) % 30 === 0) {
      setEarnings(twoDecimals(earnings + earningsEach30sec));
    }
  };

  const sumToEarnings = (pricePerHour) => {
    const earnings30sec = pricePerHour / 60 / 2;
    setEarningsEach30sec(twoDecimals(earnings30sec));
  };

  const twoDecimals = (number) => {
    return Number(number.toFixed(2));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="job-container">
      <CssBaseline />
      <div className="back-button">
        <Tooltip title="Back">
          <Fab color="primary" aria-label="add" onClick={() => {
            if (isTimerOn) {
              setSnackbarMessage('You need to stop the timer first!');
              setTypeSnackbar('error');
              setOpenSnackbar(true);
              return; //snackbar alert danger
            } else {
              history.push("/");
            }
          }}>
            <KeyboardBackspaceIcon />
          </Fab>
        </Tooltip>
      </div>
      { loading === true ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <Container maxWidth="sm">
          <div className="job-content">
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <h1>{jobName}</h1>
              </Grid>
              <Grid item xs={6} className="grid-item">
                <img src={client} alt="earnings" /> Client
              </Grid>
              <Grid item xs={6} className="grid-item">
                {clientName}
              </Grid>
              <Grid item xs={6} className="grid-item">
                <img src={dollars} alt="earnings" /> Earnings
              </Grid>
              <Grid item xs={6} className="grid-item">
                {`$ ${earnings}`}
              </Grid>
              <Grid item xs={6} className="grid-item">
                <img src={workingmoney} alt="working-money" /> Time
              </Grid>
              <Grid item xs={6} className="grid-item">
                {time}
              </Grid>
              <Grid item xs={6} className="grid-item">
                <img src={timemoney} alt="time-money" /> Price Per Hour
              </Grid>
              <Grid item xs={6} className="grid-item">
                {`$ ${pricePerHour}`}
              </Grid>
              <Grid item xs={12} className="button-title">
                {isTimerOn === false ? (
                  <p>Press the button to start running time!</p>
                ) : (
                  <p>Press the button to stop running time!</p>
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridButtons}>
                {isTimerOn === false ? (
                  <Tooltip title="Play">
                    <IconButton aria-label="play" onClick={startTimer}>
                      <img src={playbutton} alt="play-button" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Stop">
                    <IconButton aria-label="stop" onClick={stopTimer}>
                      <img src={stop} alt="stop-button" />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
      <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={snackbarMessage} type={typeSnackbar} />
    </div>
  );
};

export default Job;
