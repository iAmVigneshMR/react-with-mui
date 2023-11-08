import { FormControl, Grid, MenuItem, Select } from '@mui/material'
import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TrvellerModal from './TrvellerModal';

const SecondRowInfo = (props) => {
    let { handleChangeDatePicker, value, nightsData, handlechange, nightsState, travellerData, handleIncOrDec, addAnotherRoom, adult, kid, infant } = props;
    return (
        <Grid container sx={{ padding: '0px 10px' }}>
            <Grid item xs={4} sx={{ padding: '0px 10px' }}>
                <p className='txt-color'>Checkin</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            sx={{ backgroundColor: '#fff' }}
                            value={value}
                            onChange={(newValue) => handleChangeDatePicker(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4} sx={{ padding: '0px 10px' }}>
                <p className='txt-color'>Number of Nights</p>
                <FormControl fullWidth>
                    <Select
                        labelId="search-select-label"
                        id="search-select"
                        name={"nightsDroprDown"}
                        value={nightsState}
                        sx={{ backgroundColor: '#fff' }}
                        onChange={handlechange}
                    >
                        {nightsData?.map((option, i) => (
                            <MenuItem key={i} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} sx={{ padding: '0px 10px' }}>
                <TrvellerModal adult={adult} kid={kid} infant={infant} travellerData={travellerData} handleIncOrDec={handleIncOrDec} addAnotherRoom={addAnotherRoom} />
            </Grid>
        </Grid>
    )
}

export default SecondRowInfo