import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useUpdatePositionMutation, useCreatePositionMutation } from '../app/services/MarketBuddy'
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button'
// import { useGetUserQuery } from "../app/services/MarketBuddy";
import Snackbar from '@mui/material/Snackbar';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    color: "white",
    backgroundColor: "black",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface OrderSummaryModalProps {
    symbol: string,
    transactionType: string,
    transactionDetails: any
    positionId: string,
    cost: number
}

function OrderSummaryModal({ symbol, transactionType, transactionDetails, positionId, cost }: OrderSummaryModalProps) {
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { auth } = useSelector((state: any) => state)
    const [updatePosition] = useUpdatePositionMutation()
    const [createPosition] = useCreatePositionMutation()
    // const history = useHistory()
    const { shares } = transactionDetails 
    // const { data: currentUser, isLoading: currentUserIsLoading } = useGetUserQuery(auth.user)
    
    const handleOpen = () => {
        if(!transactionDetails.shares){
            setSnackbarMessage("Please input shares")
            setSnackbarOpen(true)
            return
        }
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const submitHandler = (e: any) => {
        e.preventDefault()
        if(positionId){
            updatePosition({
                id: auth.user, 
                positionId: positionId, 
                updatedPosition: 
                    {
                        adjustment: transactionType === "Buy" ? Number(shares) : -Math.abs(Number(shares)), 
                        price: cost
                    }
            })
            .then((payload: any) => {
                if(payload.error){
                    setSnackbarMessage(payload.error.data)
                    setSnackbarOpen(true)
                    setOpen(false)
                    return
                }else{
                    setSnackbarMessage('Success')
                    setSnackbarOpen(true)
                    setOpen(false)
                    return
                }
            })
            .catch((error) => console.error('rejected', error))
        }else{
            createPosition({
                id: auth.user,
                newPosition:
                {
                    ticker: symbol.toUpperCase(),
                    shares: Number(shares),
                    cost: cost
                }
            })
            .then((payload: any) => {
                if(payload.error){
                    setSnackbarMessage(payload.error.data)
                    setSnackbarOpen(true)
                    setOpen(false)
                    return
                }else{
                    setSnackbarMessage('Success')
                    setSnackbarOpen(true)
                    setOpen(false)
                    return
                }
            })
        }
    }

    const handleSnackbarClose = (event: any) => {
        setSnackbarOpen(false);
    }

    const action = (
        <>
          <Button
            size="small"
            aria-label="close"
            color={snackbarMessage === "Success" ? "success" : "warning"}
            variant='contained'
            onClick={handleSnackbarClose}
          >
            Close
          </Button>
        </>
    );

    return (
        <div className='order-summary-container'>
            <div className="order-summary-button">
                <Button variant='outlined' color='warning' style={{cursor: "pointer"}} onClick={handleOpen}>Review Order</Button>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={submitHandler}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Order Summary
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            You're placing an order to {transactionType.toLowerCase()} {transactionDetails.shares} share(s) of {symbol}.
                        </Typography>
                        <Button variant='contained' type='submit'>Place order</Button>
                    </form>
                </Box>
            </Modal>
            <Snackbar
            open={snackbarOpen}
            autoHideDuration={2500}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            action={action}
            />
        </div>
    );
}

export default OrderSummaryModal;