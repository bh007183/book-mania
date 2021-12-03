import React, {useEffect} from 'react'
import {setView}  from "../../state/book-slice"
import {useDispatch, useSelector} from "react-redux"
export default function ViewBook() {
    const dispatch = useDispatch()
    useEffect(() => {
        let data = window.location.pathname.split("/")
        
        let obj = {
            category: data[3],
            id: data[2]
        }
       
        dispatch(setView(obj))
    }, [])

    let view = useSelector(state => state.Store.Book.view)
    console.log(view)
    return (
        <div>
            
        </div>
    )
}
