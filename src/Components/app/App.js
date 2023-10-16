import React, { useEffect } from 'react';
import './App.scss';
import Spiner from '../spiner-loading/spiner-loading';
import Modal from "../form-modal-icon/form-modal-icon";
import PostModal from '../post-modal-icon/post-modal-icon';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../../pages/home';
import VievAll from '../../pages/view-all';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, startLoad } from '../../redux/actions';
import service from '../../services/service';

function App() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading)
    const {fromServer } = service();

    useEffect(() => {
        dispatch(startLoad());

        fromServer().then(res => {
            dispatch(getAll(res));
        })
    }, []);

    return (
        <>
            {loading ? (
                <Spiner />
            ) : null}
            <div className='container'>

                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="add" element={<Modal />} />
                        <Route path="post/:post" element={<PostModal />} />
                        <Route path="view-All" element={<VievAll />} />
                    </Routes>
                </Router>
            </div>
        </>
    );
}

export default App;
