import './form-modal-icon.scss'
import Context from '../data-context/data-context';
import React, { useState } from "react";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Upload } from '../svg/upload.svg';
import { Link } from "react-router-dom";
function Modal({ }) {
    const [text, setText] = useState("");
    const [form, setForm] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const { addPost, setModalHover } = useContext(Context);
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

    const fileUpload = (event) => {
        console.log(event)
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target.result;
                setImageUrl(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

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
                        <div className="upload-container">
                            <Upload className="upload-image" src="upload.svg" />
                            <div >
                                <input onChange={fileUpload} className="file" type="file" name="file" multiple />
                                <label for="file">Select a file</label>
                                <span> or drag it here</span>
                            </div>
                            
                        </div>
                        <input className='file' onChange={fileUpload}
                                type="file" />
                        <button onClick={(e) => addForm(e, [text, imageUrl])} className="form-submit-button" type="submit">
                            Submit post
                        </button>
                        <Link to={'/'}><div><div  className='exit'>X</div></div></Link>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Modal;