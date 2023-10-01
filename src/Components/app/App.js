import React, { useState, useEffect } from 'react';
import Context from '../data-context/data-context'
import './App.scss';
import service from '../../services/service';
import Spiner from '../spiner-loading/spiner-loading';
import Modal from "../form-modal-icon/form-modal-icon";
import PostModal from '../post-modal-icon/post-modal-icon';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../../pages/home';
import VievAll from '../../pages/view-all';

function App() {
    const [sliderWidth, setSliderWidth] = useState(0);
    const [maxSlides, setMaxSlides] = useState(1);
    const [data, setData] = useState([]);
    const [defaultPosts, setDefaultPosts] = useState([]);
    const [maxId, setMaxId] = useState(0);
    const [slides, setSlides] = useState([]);
    const [modalHover, setModalHover] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toServer, fromServer } = service();

    useEffect(() => {
        setLoading(true);
        fromServer().then(logData => {
            let newMaxId = maxId;
            for (const key in logData.data) {
                if (logData.data[key].id >= newMaxId) {
                    newMaxId = logData.data[key].id;
                }
            }
            logData.data.sort((a, b) => b.likes - a.likes);
            setDefaultPosts(logData.data.slice(0, 20));
            setSlides(logData.data.slice(0, 5));
            setData(logData.data);
            setMaxId(newMaxId);
            setLoading(false);
        })
    }, []);

    const addPost = (item) => {
        const newItem = { text: item[0], likes: 0, ifLike: false, img: item[1], id: maxId + 1 };
        const newData = [...data, newItem];
        newData.sort((a, b) => b.likes - a.likes);
        setLoading(true);
        toServer('posts', newData).then(i => {
            setLoading(i);
            setDefaultPosts(newData.slice(0, 20));
            setSlides(newData.slice(0, 5));
        });
        setData(newData);
        setMaxId(maxId + 1);
    };

    const onDelete = (id) => {
        const newData = data.filter(item => item.id !== id);
        newData.sort((a, b) => b.likes - a.likes);
        setLoading(true);
        toServer('posts', newData).then(i => {
            setLoading(i);
            setDefaultPosts(newData.slice(0, 20));
            setSlides(newData.slice(0, 5));
        });
        setData(newData);
    };

    const onLike = (id, ifLike) => {
        const newData = data.map(item => {
            if (item.id === id) {
                item.likes = ifLike ? item.likes - 1 : item.likes + 1;
                item.ifLike = !ifLike;
            }
            return item;
        });
        setLoading(true);
        newData.sort((a, b) => b.likes - a.likes);
        toServer('posts', newData).then(i => {
            setLoading(i);
            setDefaultPosts(newData.slice(0, 20));
            setSlides(newData.slice(0, 5));
        });
        setData(newData);
    };

    return (
        <Context.Provider value={{
            maxSlides, setMaxSlides, sliderWidth, setSliderWidth, setModalHover, data, addPost, onDelete, onLike, defaultPosts, setLoading, slides
        }}>
            {loading ? (
                <Spiner />
            ) : null}
            <div className='container'>

                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="add" element={<Modal/>} />
                        <Route path="post/:post" element={<PostModal />} />
                        <Route path="view-All" element={<VievAll />} />
                    </Routes>
                </Router>
            </div>
        </Context.Provider>
    );
}

export default App;
