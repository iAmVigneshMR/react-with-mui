import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ButtonGroup, Grid } from '@mui/material';

let order = ["Adult", "Kid", "Infant"];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: "scroll",
    p: 4,
    maxHeight: "90%"
};
export default function TrvellerModal(props) {
    let { travellerData, handleIncOrDec, addAnotherRoom, adult, kid, infant } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button sx={{ background: '#fff', width: '100%', marginTop: '50px', padding: '15px 0px', ":hover": { background: "#fff" }, color: 'black' }} onClick={handleOpen}>{adult + " Adult ," + kid + " Kid ," + infant + " Infant"}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflow: 'scroll', maxHeight: '100%' }}
            >
                <Box sx={style}>
                    {travellerData.length > 0 && travellerData.map((ft, ind) => (
                        <div key={ft.id}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">{"Room " + (ft.id)} {ft.id > 1 && <Button sx={{ color: 'red' }} onClick={() => addAnotherRoom(ft.id, 'remove')}>  Remove</Button>}</Typography>
                            <Grid container sx={{ padding: '0px 10px' }}>
                                {order.map(gt => (
                                    <>
                                        <Grid item xs={6} sx={{ padding: '0px 10px' }}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">{gt}</Typography>
                                            <Typography id="modal-modal-title" variant="h6" component="h5">{ft[gt].text}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ padding: '0px 10px' }}>
                                            <ButtonGroup size="small" aria-label="small outlined button group">
                                                <Button onClick={() => handleIncOrDec(ft.id, gt, "decrement")}>-</Button>
                                                <Button disabled>{ft[gt].val}</Button>
                                                <Button onClick={() => handleIncOrDec(ft.id, gt, "increment")}>+</Button>
                                            </ButtonGroup>
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                        </div>
                    ))}
                    <Button onClick={() => addAnotherRoom()}>Add Another Room</Button>
                </Box>
            </Modal>
        </div>
    );
}