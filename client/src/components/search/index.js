import React, {useState} from 'react'
import { authenticated, handleFormInput } from "../../utils";
import {searchBooks} from "../../state/book-slice"
import PublicUrlCards from "../cards/PublicUrlCards"
import {useDispatch, useSelector} from "react-redux"
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";

import "./style.css"

export default function Search() {
    const dispatch = useDispatch()
    const results = useSelector(state => state.Store.Book.search)
    const [search, setSearch] = useState({
        title: ""
    })

    const handleSearch = (event) => {
        event.preventDefault()
        console.log(search.title)
        dispatch(searchBooks(search.title))

    }

    
    return (
        <div className="bookSearchContain" >
            <form onSubmit={handleSearch} id="searchForm" className="centerAlign">
                <input onChange={(event) => handleFormInput(event, search, setSearch)} name="title" value={search.title} placeholder="Book Title"></input>
                <Button type="submit" style={{marginLeft: "15px", height: "27px"}} variant="contained"><SearchIcon/></Button>
            </form>
            <div id="searchResultContain bookSearchContain">
                {results.length > 0 ? results.map(book => <PublicUrlCards category="search" book={book}/> ): <h3 className="noResults">No Search Results</h3>}

            </div>
            
        </div>
    )
}
