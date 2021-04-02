import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './AddJobDialog.css';
import { Chip, InputAdornment, makeStyles, MenuItem } from '@material-ui/core';
import { createJob } from '../../services/job';
import technologies from '../../services/technologies';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
    menuBg: {
        backgroundColor: "#3B8AF6"
    }
}));

const AddJobDialog = ({ openDialog, setOpenDialog }) => {

    const classes = useStyles();

    const [job, setJob] = useState('');
    const [client, setClient] = useState('');
    const [pricePerHour, setPricePerHour] = useState(1);
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
        setChipData([]);
        cleanDialog();
    };

    const handleClose = () => {
        setOpenDialog(false)
        setChipData([]);
        cleanDialog();
    };

    const cleanDialog = () => {
        setJob('');
        setClient('');
        setPricePerHour(1);
    };

    const mapTechChips = (chips) => chips.map(chip => chip.label);

    const handleSelect = e => {
        if (!chipData.some(chip => chip.label === e.target.value)) {
            setChipData([...chipData, { key: e.target.value, label: e.target.value }]);
        } else {
            //console.log('Tech already added');
        }
    };

    const handleDelete = (chipToDelete) => () => {
        setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    };

    return (
        <Dialog open={openDialog}
            fullWidth={true}
            maxWidth={'sm'}
            PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', } }}>
            <div className="dialog-container">
                <DialogTitle id="form-dialog-title" className="dialog-title">Add new job</DialogTitle>

                <DialogContent>
                    <DialogContentText className="dialog-subtitle">

                    </DialogContentText>
                    <ValidatorForm noValidate onSubmit={handleSave}
                        onError={errors => {
                            //console.log(errors);
                            //console.log('ERROR');
                        }} className="validator-form">
                        <TextValidator
                            className="text-input"
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
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                            validators={['required', 'minStringLength:3', 'maxStringLength:12']}
                            errorMessages={[
                                'Job name is required',
                                'Job name must be at least 3 characters',
                                'Job name must be less than 12 characters'
                            ]}
                        />
                        <TextValidator
                            className="text-input"
                            margin="dense"
                            id="company"
                            label="Client / Company"
                            type="text"
                            variant="outlined"
                            fullWidth
                            required
                            autoComplete="off"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            validators={['required', 'minStringLength:3', 'maxStringLength:12']}
                            errorMessages={[
                                'Client name is required',
                                'Client name must be at least 3 characters',
                                'Client name must be less than 12 characters'
                            ]}

                        />
                        <TextField
                            margin="dense"
                            id="pricePerHour"
                            label="Price per hour"
                            type="number"
                            variant="outlined"
                            fullWidth
                            required
                            autoComplete="off"
                            value={pricePerHour}
                            onChange={(e) => setPricePerHour(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputProps: { min: 1, max: 4999 }
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
                        <div className="tech-chips">
                            {chipData.map((data) => {
                                return (
                                    <Chip
                                        className="tech-chip"
                                        key={data.key}
                                        label={data.label}
                                        color="primary"
                                        onDelete={handleDelete(data)}
                                    />
                                );
                            })}
                        </div>
                        <div className="buttons">

                            <Button onClick={handleClose} >
                                Cancel
                        </Button>
                            <Button type="submit" color="primary" variant="contained">
                                Save
                        </Button>
                        </div>
                    </ValidatorForm>
                </DialogContent>
            </div>
        </Dialog>

    );
};

export default AddJobDialog;
