import React, { useEffect } from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper.js';
import { newItem } from '../util/FetchDataHelper.js';
import TextareaAutosize from 'react-textarea-autosize';
import './newitem.css';
import { VerifyUserHasToken } from '../util/VerifyUser.js';
import getCategoryJson from '../data/categories.json';
import { deleteToastMessage } from '../util/FetchDataHelper';

export default function Newitems() {
    VerifyUserHasToken();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDesctiption] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [isCategory, setIsCategory] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await getImageUrl(file)
        if (!category || category === "Select") {
            setIsCategory(false);
            deleteToastMessage('Category is not selected!!')
        }
        else {
            setIsCategory(true)
            setLoading(true);
            newItem(imgUrl, name, description, price, category, setLoading);
            window.location = "/items";
        }
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
                <input type="number" placeholder="Enter product price" value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required />
                <label>Category</label>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    className={isCategory === true ? 'categorySelection' : 'categorySelectionRed'}
                    required
                >
                    {
                        getCategoryJson.map((value) => {
                            return (
                                <option
                                    key={value.id}
                                >
                                    {value.category}
                                </option>
                            )
                        })
                    }
                </select>
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
