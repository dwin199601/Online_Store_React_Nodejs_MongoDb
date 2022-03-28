import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper.js';
import { newItem } from '../util/FetchDataHelper.js';
import TextareaAutosize from 'react-textarea-autosize';
import './newitem.css';

export default function Newitems() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesctiption] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const imgUrl = await getImageUrl(file)
        newItem(imgUrl, name, description, price, setLoading);
        window.location = "/items";
    }

    return (
        <div className="additem">
            <h1>Add New Item </h1>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text"
                    value={name} placeholder="Enter product name"
                    onChange={(e) => setName(e.target.value)}
                    required />
                <label>Price$</label>
                <input type="number" placeholder="999" value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required />
                <label>Description</label>
                <TextareaAutosize
                    id="descrTextArea"
                    className='descriptionTextArea'
                    required
                    rows={1}
                    maxRows={3}
                    placeholder="Enter product description here"
                    value={description}
                    onChange={(e) => setDesctiption(e.target.value)}
                />
                <div className='dropZone'>
                    <input
                        type="file"
                        className="upload_btn"
                        onChange={e => CapturFile(e, setFile)}
                    />
                    {file === null ?
                        <div className="overlay-layer" >Upload photo</div>
                        :
                        <div className="overlay-layer" id="uploadedPhoto">Uploaded!</div>
                    }
                </div>


                {!loading && <button className="btn btn-success">Add Item
                </button>}
                {loading && <button disabled className="btn btn-success">Adding Item...
                </button>}
            </form>
        </div>
    )
}

