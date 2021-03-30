import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './AddJobDialog.css';
import { Chip, InputAdornment, makeStyles, MenuItem } from '@material-ui/core';
import { createJob } from '../../services/job';
import technologies from '../../services/technologies';

const useStyles = makeStyles((theme) => ({
    menuBg: {
        backgroundColor: "#3B8AF6"
    }
}));

const AddJobDialog = ({ openDialog, setOpenDialog }) => {

    const classes = useStyles();

    const [job, setJob] = useState('');
    const [client, setClient] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [chipData, setChipData] = useState([]);
    let techArray = [...technologies];
    const userValues = "";

    const handleSave = async () => {
        const techs = mapTechChips(chipData)
        const jobFormData = {
            jobName: job,
            clientName: client,
            pricePerHour: pricePerHour,
            technologies: techs
        };
        await createJob(jobFormData);
        setOpenDialog(false);
    };

    const handleClose = () => {
        setOpenDialog(false)
        setChipData([]);
    };

    const mapTechChips = (chips) => chips.map(chip => chip.label);

    const handleSelect = e => {
        if (!chipData.some(chip => chip.label === e.target.value)) {
            setChipData([...chipData, { key: e.target.value, label: e.target.value }]);
        } else {
            console.log('Tech already added');
        }
    };

    const handleDelete = (chipToDelete) => () => {
        setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    };

    return (
        <Dialog open={openDialog}
            PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', } }}>
            <div className="dialog-container">
                <DialogTitle id="form-dialog-title" className="dialog-title">New Job</DialogTitle>
                <DialogContent>
                    <DialogContentText className="dialog-subtitle">

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="job"
                        name="job"
                        label="Job"
                        type="text"
                        variant="outlined"
                        fullWidth
                        required
                        autoComplete="off"
                        onChange={(e) => setJob(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="company"
                        label="Client / Company"
                        type="text"
                        variant="outlined"
                        fullWidth
                        required
                        autoComplete="off"
                        onChange={(e) => setClient(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pricePerHour"
                        label="Price per hour"
                        type="number"
                        variant="outlined"
                        fullWidth
                        required
                        autoComplete="off"
                        onChange={(e) => setPricePerHour(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            inputProps: { min: 0, max: 10 }
                        }}
                    />
                    <TextField
                        className="select"
                        select
                        label="Select"
                        variant="outlined"
                        value={userValues}
                        onChange={e => handleSelect(e)}
                        helperText="Please select the technologies to use."
                        SelectProps={{
                            MenuProps: {
                                classes: { paper: classes.menuBg }
                            }
                        }}>
                        {techArray.map(option => (
                            <MenuItem
                                key={option.key}
                                value={option.label}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div >
                        {chipData.map((data) => {
                            return (
                                <Chip
                                    className="chip"
                                    key={data.key}
                                    label={data.label}
                                    color="primary"
                                    onDelete={handleDelete(data)}
                                />
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                     </Button>
                </DialogActions>
            </div>
        </Dialog>

    );
};

export default AddJobDialog;
