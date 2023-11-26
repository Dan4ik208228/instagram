import React from "react";
import "./add-posts.scss";
import { ReactComponent as Plus } from '../../images/svg/plus.svg';
import { ReactComponent as Search } from '../../images/svg/search.svg';
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";
import { StoreState } from "../../redux/reducers";

function AddPosts() {
    const state = useSelector((state: StoreState ) => state.data );

    return (
        <>
            <div className='header-menu'>
                <div className='posts-info'>
                    <h1 className='posts-category'>INSTAGRAM</h1>
                    <p className='posts-num'>{state.length} updates</p>
                </div>
                <div className='options'>
                    <Link to={"/add"}>
                        <Plus className="add-form-button" />
                    </Link>
                    <Search className="search-post-button" />
                </div>
            </div>
           
        </>
    );
}

export default AddPosts;
