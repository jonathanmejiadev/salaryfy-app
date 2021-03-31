import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import "./Cards.css";
import WorkOffIcon from "@material-ui/icons/WorkOff";
import { completeJob, getJobs } from "../../services/job";
import technologiesService from "../../services/technologies";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderTop: `4px solid #07EDB0`,
    backgroundColor: "#5095F7",
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  typography: {
    backgroundImage: "linear-gradient(45deg, #f3ec78, #af4261)",
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent",
    textAlign: "center",
  },
  typographyClient: {
    color: theme.palette.text.primary,
    fontWeight: "500",
  },
  divider: {
    margin: "5px 20px 5px 20px",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "4px",
  },
  avatarContent: {
    margin: "0 4px 0 4px",
  },
  buttons: {
    justifyContent: "space-around",
  },
  label: {
    color: theme.palette.text.terciary,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Cards = ({
  earnings,
  name,
  id,
  client,
  technologies,
  setCards,
  setOpen,
  time,
  date,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const techsFiltered = [...technologiesService].filter((tech) =>
    technologies.includes(tech.label)
  );

  const handleFinishJob = () => {
    //dialog: delete question
    completeJob(id, true)
      .then((response) => {
        getJobs().then((response) => {
          setCards([...response.data]);
          setOpen(true);
        });
      })
      .catch((err) => {
        console.log("Error to complete work");
        console.log(err);
      });
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <h1 className="typography">{name}</h1>
        <Typography
          gutterBottom
          variant="subtitle1"
          className={classes.typographyClient}
        >
          {`${client}`}
        </Typography>
        <div>
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{ color: "white", fontWeight: "500", fontSize: "16px" }}
          >
            <Grid item xs={6}>
              <span style={{ color: "white" }}>Earnings</span>
            </Grid>
            <Grid item xs={6} className="card-data">
              <span style={{ color: "#07EDB0" }}> {`$ ${earnings}`}</span>
            </Grid>
            <Grid item xs={6}>
              <span style={{ color: "white" }}>Working Time</span>
            </Grid>
            <Grid item xs={6} className="card-data">
              {time}
            </Grid>
            <Grid item xs={6}>
              <span style={{ color: "white" }}>Created at</span>
            </Grid>
            <Grid item xs={6} className="card-data">
              {date}
            </Grid>
          </Grid>
        </div>
      </CardContent>

      <CardActions className={classes.buttons}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => history.push(`/job/${id}`)}
        >
          Start
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          endIcon={<WorkOffIcon />}
          onClick={handleFinishJob}
        >
          Finish
        </Button>
      </CardActions>
      <Divider className={classes.divider} light />
      <div className={classes.avatarContainer}>
        {techsFiltered.map((face) => (
          <Avatar
            className={classes.avatarContent}
            key={face.key}
            src={face.src}
            variant="rounded"
          />
        ))}
      </div>
    </Card>
  );
};

export default Cards;
