import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import React from 'react'

const StateAndCountryDropDown = (props) => {
    let { handlechange, selectedCountry, countryData, partnerState, stateData, selectedState, Lead, Partner, leadState } = props;
    return (
        <Grid container sx={{ padding: '0px 10px' }}>
            <Grid item xs={4} sx={{ padding: '0px 10px' }}>
                <p className='txt-color'>Select Country</p>
                <FormControl fullWidth>
                    <Select
                        labelId="search-select-label"
                        id="search-select"
                        name={"countryDroprDown"}
                        value={selectedCountry}
                        sx={{ backgroundColor: '#fff' }}
                        onChange={handlechange}
                    >
                        {countryData.map((option, i) => (
                            <MenuItem key={i} value={option}>
                                {option.country_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} sx={{ padding: '0px 10px' }}>
                <p className='txt-color'>Select State</p>
                <FormControl fullWidth>
                    <Select
                        labelId="search-select-label"
                        id="search-select"
                        name={"stateDroprDown"}
                        value={selectedState}
                        sx={{ backgroundColor: '#fff' }}
                        onChange={handlechange}
                    >
                        {stateData.map((option, i) => (
                            <MenuItem key={i} value={option}>
                                {option.state_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2} sx={{ padding: '0px 10px' }}>
                <p className='txt-color'>Lead Type</p>
                <FormControl fullWidth>
                    <Select
                        labelId="search-select-label"
                        id="search-select"
                        name={"leadDroprDown"}
                        value={leadState}
                        sx={{ backgroundColor: '#fff' }}
                        onChange={handlechange}
                    >
                        {Lead.map((option, i) => (
                            <MenuItem key={i} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2} sx={{ padding: '0px 10px' }}>
                <p className='txt-color'>Partner</p>
                <FormControl fullWidth>
                    <Select
                        labelId="search-select-label"
                        id="search-select"
                        name={"partnerDroprDown"}
                        value={partnerState}
                        sx={{ backgroundColor: '#fff' }}
                        onChange={handlechange}
                    >
                        {Partner.map((option, i) => (
                            <MenuItem key={i} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default StateAndCountryDropDown