import React, { useState } from 'react';

import { Button, Grid, Typography,FormControl,MenuItem,InputLabel,Select } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Calculator = () => {
  const JsonDetails = {

    "Exam Fee": {
      "INDIAN": {
        "ALL_COURSES": {
          "ALL_LEVEL": {
            "amount": 400
          }
        }
      },
      "FOREIGN": {
        "ALL_COURSES": {
          "ALL_LEVEL": {
            "amount": 100
          }
        }
      },
      "NRI": {
        "ALL_COURSES": {
          "ALL_LEVEL": {
            "amount": 600
          }
        }
      },
      "SAARC": {
        "ALL_COURSES": {
          "ALL_LEVEL": {
            "amount": 600
          }
        }
      }
    },
    "Application Fee": {
      "INDIAN": {
        "ALL_COURSES": {
          "UG": {
            "amount": 200
          },
          "UG-DIPLOMA": {
            "amount": 300
          },
          "PG": {
            "amount": 500
          }
        }
      },
      "FOREIGN": {
        "ALL_COURSES": {
          "UG": {
            "amount": 400
          },
          "UG-DIPLOMA": {
            "amount": 400
          },
          "PG": {
            "amount": 700
          }
        }
      }
    }
  };

  const [fee, setFee] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [course, setCourse] = useState(null);
  const [selectedLevel, setLevel] = useState(null);
  const [calculatedFee, setCalculatedFee] = useState(null);
  const [showCalculatedFee, setShowCalculatedFee] = React.useState(false);


  const feeChangeHandler = (event) => {
    setFee(event.target.value);
  };

  const nationalityChange = (event) => {
    setNationality(event.target.value);
  };

  const courseChange = (event) => {
    setCourse(event.target.value);
  };

  const levelChange = (event) => {
    const selectedLevel = event.target.value;
    setLevel(selectedLevel);
    const feeAmount = JsonDetails[fee]?.[nationality]?.[course]?.[selectedLevel]?.amount;

    if (feeAmount !== undefined) {
      setCalculatedFee(feeAmount);
      setShowCalculatedFee(true)
    } else {
      setCalculatedFee(null);
    }
  };

  const handleClose = () => {
   
    setLevel(null)
    setCourse(null)
    setNationality(null)
    setFee(null)
    setShowCalculatedFee(false);
  };

  return (
    <div className='root'>
      <Typography variant='h5'>Calculator</Typography>
      <Grid className='feeContainer'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Fee</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fee}
            label="Fee"
            onChange={(event) => feeChangeHandler(event)}
          >
            {Object.keys(JsonDetails).map((fee) => (

              <MenuItem value={fee}>{fee}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </Grid>
      {fee && (
        <Grid className='feeContainer'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={nationality}
            label="Fee"
            onChange={(event) => nationalityChange(event)}
          >
            {Object.keys(JsonDetails[fee]).map((nationality) => (

              <MenuItem value={nationality}>{nationality}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </Grid>

      )}
      {nationality && (
          <Grid className='feeContainer'>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={course}
              label="Fee"
              onChange={(event) => courseChange(event)}
            >
              {Object.keys(JsonDetails[fee][nationality]).map((course) => (
  
                <MenuItem value={course}>{course === 'ALL_COURSES' ? 'Medical, Dental, Ayurveda' : course}</MenuItem>
              ))}
            </Select>
          </FormControl>
  
        </Grid>

      )}
      {course && (
        <Grid className='feeContainer'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLevel}
            label="Fee"
            onChange={(event) => levelChange(event)}
          >
            {Object.keys(JsonDetails[fee][nationality][course]).map((level) => (

              <MenuItem value={level}>{level === 'ALL_LEVEL' ? 'UG, PG, DIPLOMA, Ph.D' : level}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </Grid>

      )}
       <Dialog
        open={showCalculatedFee}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Calculated Fee</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{alignSelf:"center"}}> ${calculatedFee}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Calculator;
