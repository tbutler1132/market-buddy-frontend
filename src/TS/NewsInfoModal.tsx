import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function NewsInfoModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <InfoOutlinedIcon color="disabled" className='info-icon' fontSize='small' style={{cursor: "pointer"}} onClick={handleOpen}/>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        News: How are news articles chosen?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        News is chosen from over 3,000 global news sources including major publications, regional media, and social
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default NewsInfoModal;