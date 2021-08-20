import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import { Button, TextField } from '@material-ui/core';

import {addList} from '../../redux/actions'

function AddList(props) {
    const { user } = props
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()


    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const clickHandler = () => {
        !open ? setOpen(true) : setOpen(false)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const listObj = {
            title: title,
        }
        dispatch(addList(user._id, listObj))
        setTitle('')
        setOpen(false)
    }

    return (
        <div className="add-list">
            {open ?
            <div className="new-list-form">
                <form onSubmit={submitHandler}>
                    <TextField onChange={titleHandler} value={title}/>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </form>
            </div> 
            : null}
            <div>
                <p id="list-add" onClick={clickHandler}>{!open ? '+' : '-'}</p>
            </div>
        </div>
    );
}

export default AddList;