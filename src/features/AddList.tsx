import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useCreateListMutation } from '../app/services/MarketBuddy';
import { useSelector } from 'react-redux';
import { useForm }from 'react-hook-form'

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
}

function AddList() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, resetField, handleSubmit } = useForm();
    const { auth } = useSelector((state: any) => state)
    const [createList] = useCreateListMutation()

    const onSubmit = (data: any) => {
        createList({ id: auth.user._id, list: {title: data.listTitle} })
        resetField('listTitle')
    }

    return (
        <div>
            <AddIcon style={{cursor: "pointer"}} onClick={handleOpen}/>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="List Name" {...register("listTitle")}/>
                        {/* <Button type="submit">Create</Button> */}
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default AddList;