import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import { useUpdatePositionMutation } from '../app/services/MarketBuddy';

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

interface OrderSummaryModalProps {
    shares: number,
    symbol: string,
    transactionType: string
}

function OrderSummaryModal({ shares, symbol, transactionType }: OrderSummaryModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const [updatePostition] = useUpdatePositionMutation()

    return (
        <div>
            <span onClick={handleOpen}>Review Order</span>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Order Summary
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You’re placing an order to {transactionType} {shares} share of {symbol} that will be converted to a limit order with a 5% collar. If your order cannot be executed within the collar, it won’t be filled. Your order will be placed after the market opens
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default OrderSummaryModal;