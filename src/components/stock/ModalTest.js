import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { BASE_API } from '../../App';

import { addStockToList } from '../../redux/actions';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({})
  const dispatch = useDispatch()

  const { user, lists, stockSymbol } = props

  useEffect(() => {
    const inititial = {}
    lists.notHasStock.forEach(list => {
      inititial[list._id] = "unchecked"
    })
    setChecked(inititial)
  }, [lists.notHasStock])

  const renderLists = () => {
    return lists.notHasStock.map(list => 
      <div key={list._id}>
        <label>{list.title}</label>
        {checked[list._id] === "unchecked" ?
        <input onChange={handleChangeCheckBox} name={list._id} type="checkbox"/>
        :
        <input onChange={handleChangeCheckBox} name={list._id} type="checkbox" defaultChecked/>
        }
      </div>
    )
  }

  const handleChangeCheckBox = (e) => {
    const cloneState = {...checked}
    if(cloneState[e.target.name] === "unchecked"){
      cloneState[e.target.name] = "checked"
    }else{
      cloneState[e.target.name] = "unchecked"
    }
    setChecked(cloneState)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async () => {
    const stateArr = Object.entries(checked)
    // stateArr.forEach(list => {
    //   if(list[1] === "checked"){
    //     console.log(list[0])
    //     dispatch(addStockToList(user._id, list[0], {stock: stockSymbol.toUpperCase()}))
    //   }
    // })
    let updatedUser = {}
    for (let i = 0; i < stateArr.length - 1; i++) {
      if(stateArr[i][1] === "checked"){
        updatedUser = await axios.patch(`${BASE_API}/${user._id}/lists/${stateArr[i][0]}`, {stock: stockSymbol.toUpperCase()})
      }
    }
    console.log(stateArr[stateArr.length - 1])
    if(stateArr[stateArr.length - 1][1] === "checked"){
      updatedUser = await axios.patch(`${BASE_API}/${user._id}/lists/${stateArr[stateArr.length - 1][0]}`, {stock: stockSymbol.toUpperCase()})
    }
    dispatch(addStockToList(updatedUser))
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add to lists
      </Button>
        <form >
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add lists</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Check off and confirm to add this stock to a list
              </DialogContentText>
                {renderLists()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={submitHandler} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </form>
    </div>
  );
}
