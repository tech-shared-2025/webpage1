import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import '.../css/header.css';

export default function Header(){
    return (
        <div className="heading-area">
            <h2>Notes</h2>
            <div className="icons">
                <SearchIcon className="icon"/>
                <AddIcon className="icon"/>
            </div>
        </div>
    )
}