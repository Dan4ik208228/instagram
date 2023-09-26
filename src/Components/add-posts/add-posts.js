import React, { useState, useRef, useContext } from "react";
import "./add-posts.scss";
import Context from "../data-context/data-context";
import { ReactComponent as Plus } from '../svg/plus.svg';
import { ReactComponent as Search } from '../svg/search.svg';
import { Link } from "react-router-dom";


function AddPosts() {
    const [form, setForm] = useState(false);
    const { data, setModalHover } = useContext(Context);

    const modelMenu = () => {
        setForm(!form);
        setModalHover(true)
    };

    return (
        <>
            <div className='header-menu'>
                <div className='posts-info'>
                    <h1 className='posts-category'>All</h1>
                    <p className='posts-num'>{data.length} updates</p>
                </div>
                <div className='options'>
                    <Link to={"/add"}>
                        <Plus className="add-form-button" onClick={modelMenu} />
                    </Link>
                    <Search className="search-post-button" />
                </div>
            </div>
           
        </>
    );
}

export default AddPosts;
