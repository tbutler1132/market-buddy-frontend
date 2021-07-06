import React, {useState} from 'react';
import {useDispatch} from 'react-redux'

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
        setOpen(false)
    }

    return (
        <div>
            <p onClick={clickHandler}>+</p>
            {open ? 
            <>
            <form onSubmit={submitHandler}>
                <input onChange={titleHandler} value={title}/>
                <button type="submit">Submit</button>
            </form>
            </> 
            : null}
        </div>
    );
}

export default AddList;