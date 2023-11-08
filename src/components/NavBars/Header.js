import React from 'react'
import { Home, AccountCircle } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';

const Header = () => {
    return (
        <div className='header-container'>
            <Grid container>
                <Grid item xs={6} >
                    <Box sx={{ margin: '13px 100px', }}>
                        <img className='header-img' src='/twigaa.png' alt='logo' />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', margin: '13px 160px', }}>
                        <Home className='txt-color' /><span className='txt-color header-text'>Home</span>
                        <AccountCircle className='txt-color' /><span className='txt-color header-text'>Login</span>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header