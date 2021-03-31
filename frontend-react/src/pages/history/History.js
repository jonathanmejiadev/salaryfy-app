import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./History.css";
import {
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { completeJob, deleteJob, getCompletedJobs } from "../../services/job";
import { IconButton } from "@material-ui/core";
import dollars from "../../assets/img/history/dollars1.png";
import sensible from "../../assets/img/history/sensible.png";
import businessman from "../../assets/img/history/businessman2.png";
import actions from "../../assets/img/history/touch.png";
import back from "../../assets/img/history/reply.png";
import remove from "../../assets/img/history/trash1.png";
import Snackbar from '../../components/Snackbar/Snackbar';
import { Alert } from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: "#5095F7",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  listItemTextPrimary: {
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
  },
  listItemTextSecondary: {
    fontSize: "12px",
    display: "flex",
    justifyContent: "center",
  },
  listItemTextPrimaryEarnings: {
    display: "flex",
    justifyContent: "center",
    color: "#06d6a0",
  },
  icon: {
    width: "0px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  fontSizeGridHeader: {
    fontSize: "0.8rem",
    "@media (min-width:600px)": {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem",
    },
  },
  fontSizeGridItem: {
    fontSize: "0.8rem",
    "@media (min-width:600px)": {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
    },
    textAlign: "center",
    marginLeft: "11px",
  },
  fontSizeGridItemEarnings: {
    fontSize: "0.9rem",
    "@media (min-width:600px)": {
      fontSize: "1.0rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
    },
    color: "#06d6a0",
    textAlign: "center",
  },
}));

const History = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getCompletedJobs()
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleBackToWork = (jobId) => {
    completeJob(jobId, false)
      .then((response) => {
        getCompletedJobs()
          .then((response) => {
            setJobs(response.data);
            setOpenSnackbar(true);
            setSnackbarMessage('Your job has been returned!');
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (jobId) => {
    deleteJob(jobId)
      .then((response) => {
        getCompletedJobs()
          .then((response) => {
            setJobs(response.data);
            setOpenSnackbar(true);
            setSnackbarMessage('Job has been deleted successfully');
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <div className="history-container">
      <CssBaseline />
      <h1>History</h1>
      {loading === true ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (

        <div className="list-container">
          {jobs.length === 0 ? (
            <div className="alert-container">
              <Alert severity="info">
                No finished jobs yet!
              </Alert>
            </div>
          ) : (
            <div className="grid-container">
              <Grid container spacing={3}>
                <Grid item xs={3} md={3} className="grid-item">
                  <img src={sensible} alt="app"></img>{" "}
                  <Typography
                    className={classes.fontSizeGridHeader}
                    variant="subtitle2"
                  >
                    Jobs
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} className="grid-item">
                  <img src={businessman} alt="client-company"></img>
                  <Typography
                    className={classes.fontSizeGridHeader}
                    variant="subtitle2"
                  >
                    Client
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} className="grid-item">
                  <img src={dollars} alt="earnings"></img>{" "}
                  <Typography
                    className={classes.fontSizeGridHeader}
                    variant="subtitle2"
                  >
                    Earnings
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} className="grid-item">
                  <img src={actions} alt="actions"></img>
                  <Typography
                    className={classes.fontSizeGridHeader}
                    variant="subtitle2"
                  >
                    Actions
                </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider
                    style={{
                      color: "white",
                      background: "white",
                      margin: "0 20px 0 20px",
                    }}
                  ></Divider>
                </Grid>
                {(jobs.map((job) => (
                  <Grid container spacing={3} key={job._id}>
                    <Grid item xs={3} md={3} className="grid-list-item">
                      <Typography
                        className={classes.fontSizeGridItem}
                        variant="body1"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {job.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} md={3} className="grid-list-item">
                      <Typography
                        className={classes.fontSizeGridItem}
                        variant="body1"
                      >
                        {job.client}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} md={3} className="grid-list-item">
                      <Typography
                        className={classes.fontSizeGridItemEarnings}
                        variant="body1"
                      >{`$ ${job.earnings}`}</Typography>
                    </Grid>
                    <Grid item xs={3} md={3} className="grid-list-item">
                      <Tooltip title="Back to Work">
                        <IconButton
                          edge="end"
                          onClick={() => handleBackToWork(job._id)}
                        >
                          <img src={back} alt="back" className="action-button" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(job._id)}>
                          <img
                            src={remove}
                            alt="delete"
                            className="action-button"
                          />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                )))}
              </Grid>
            </div>)
          }
        </div>
      )}
      <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={snackbarMessage} />
    </div>
  );
};

export default withRouter(History);