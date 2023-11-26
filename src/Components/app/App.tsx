import React, { useEffect } from 'react';
import './App.scss';
import Spiner from '../spiner-loading/spiner-loading.tsx';
import Modal from "../form-modal-icon/form-modal-icon.tsx";
import PostModal from '../post-modal-icon/post-modal-icon.tsx';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../../pages/home/index.tsx';
import VievAll from '../../pages/view-all/index.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, startLoad } from '../../redux/actions.ts';
import { server, PostData } from '../../services/service.ts';
import { StoreState } from '../../redux/reducers.tsx';

function App() {
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state: StoreState) => state.loading)

    useEffect(() => {
        dispatch(startLoad());

        server.fromServer('').then((res: PostData[]) => {
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
                        <Route path="post" element={<PostModal />} />
                        <Route path="view-All" element={<VievAll />} />
                    </Routes>
                </Router>
            </div>
        </>
    );
}

export default App;
