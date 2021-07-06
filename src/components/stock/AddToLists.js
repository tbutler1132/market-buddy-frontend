import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { addStockToList, RemoveStockFromAList } from '../../redux/actions'

function AddToLists(props) {

    const {lists, user, stockSymbol, add} = props
    const dispatch = useDispatch()

    const [selected, setSelect] = useState([])


    const handleChangeCheckBox = (e) => {
        if (e.target.checked){
            setSelect([...selected, e.target.name])
        }else {
            const clone = [...selected]
            const filtered =clone.filter(id => id !== e.target.name)
            setSelect(filtered)
        }   
    }

    const renderPresentLists = () => {
        return lists.map(list => 
            <div key={list._id}>
                <label>{list.title}</label>
                <input onChange={handleChangeCheckBox} name={list._id} type="checkbox"/>
            </div>
        )
    }

    // const renderunPresentLists = () => {
    //     return uncheckedLists.map(list => 
    //         <div key={list._id}>
    //             <label>{list.title}</label>
    //             <input name={list.title} type="checkbox"/>
    //         </div>
    //     )
    // }


    //Get the form, update state, THEN update the database based off of the new state (ASYNC)

    //<<<<---------Optimize--------->>>>>//
    const submitHandler = (e) => {
        console.log("Hit")
        e.preventDefault()
        if (add){
            selected.forEach(list => {
                dispatch(addStockToList(user._id, list, {stock: stockSymbol.toUpperCase()}))
            })
        }else{
            selected.forEach(list => {
                dispatch(RemoveStockFromAList(user._id, list, stockSymbol.toUpperCase()))
            })
        }
    }

    return (
        <div >
            <button>Add to lists</button>
            <form onSubmit={submitHandler}>
                {renderPresentLists()}
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
}

export default AddToLists;