import { Grid, TextField, Typography } from '@mui/material';
import React from 'react'
let textFiledvariables = { 'Guest Name': 'guestName', 'Guest Number': 'guestNumber', 'Guest Email': 'guestEmail' };
const ThridRowInfo = (props) => {
    let { thridRowInfo, handlechange } = props;
    return (
        <>
            <Grid container >
                {Object.entries(textFiledvariables).map(([key, val]) => (
                    <Grid key={key} item xs={4} sx={{ padding: '0px 10px' }}>
                        <Typography className="txt-color" level="h4">{key} </Typography>
                        <TextField
                            sx={{ backgroundColor: 'white' }}
                            name={val}
                            type={val !== "guestName" ? val === "guestNumber" ? "number" : "email" : "text"}
                            fullWidth
                            value={thridRowInfo && thridRowInfo[val]}
                            onChange={handlechange}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ThridRowInfo