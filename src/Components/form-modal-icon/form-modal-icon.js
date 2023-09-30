import './form-modal-icon.scss'
import Context from '../data-context/data-context';
import React, { useState } from "react";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Upload } from '../svg/upload.svg';
import { Link } from "react-router-dom";
function Modal() {
    const [text, setText] = useState("");
    const [form, setForm] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const { addPost, setModalHover } = useContext(Context);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const addForm = (e, items) => {
        e.preventDefault()
        modelMenu();
        addPost(items)
        navigate('/');
    };

    const modelMenu = () => {
        setForm(!form);
        setText("");
        setModalHover(true)
    };

    const onInputChange = (e) => {
        setText(e.target.value);
    };

    const fileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            fileUpData(file)
        }
    };

    const fileUpData = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataURL = e.target.result;
            setImageUrl(dataURL);
        };
        reader.readAsDataURL(file);
    }

    const dropHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    fileUpData(file);
                    setIsActive(false);
                }
            });
        }
    }
    const dragOverHandler = (e) => {
        setIsActive(true);
        e.preventDefault();
    }
    const dragEnter = (e) => {
        e.preventDefault();
        setIsActive(true);
    }
    const dragLeave = (e) => {
        e.preventDefault();
        setIsActive(false);
    }
    const classes = isActive ? 'upload-container droping' : 'upload-container';
    return (
        <>
            <div className='modal-bottom'>
                <div className='prev-img'>
                    <img className='preview' src={imageUrl} alt="Preview" />
                </div>
                <div className='form'>
                    <h2>Add Post</h2>
                    <form className="post-form">
                        <textarea className="post-text-area" placeholder="Post text" value={text} onChange={onInputChange} name="post-text-input" />
                        <div onDragLeave={dragLeave} onDragEnter={dragEnter} onDragOver={(e) => dragOverHandler(e)} onDrop={(e) => dropHandler(e)} className={classes}>
                            <Upload className="upload-image" src="upload.svg" />
                            <div>
                                <input id="fileInput" onChange={fileUpload} className="file" type="file" name="file" multiple />
                                <label htmlFor="fileInput">Select a file</label>
                                <span> or drag it here</span>
                            </div>

                        </div>
                        <button onClick={(e) => addForm(e, [text, imageUrl])} className="form-submit-button" type="submit">
                            Submit post
                        </button>
                        <Link to={'/'}><div><div className='exit'>X</div></div></Link>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Modal;