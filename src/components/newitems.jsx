import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { CapturFile, getImageUrl, DisplayImage } from '../util/CaptureFileHelper.js';
import { newItem } from '../util/FetchDataHelper.js';
import TextareaAutosize from 'react-textarea-autosize';
import './newitem.css';
import { VerifyUserHasToken } from '../util/VerifyUser.js';
import getCategoryJson from '../data/categories.json';
import { deleteToastMessage } from '../util/FetchDataHelper';


export default function Newitems(props) {
    VerifyUserHasToken();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDesctiption] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState([]);
    const [isCategory, setIsCategory] = useState(true);
    const [media, setMedia] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await getImageUrl(file)
        if (!category || category === "Select") {
            setIsCategory(false);
            deleteToastMessage('Category is not selected!!')
        }
        else {
            console.log(imgUrl);
            setIsCategory(true)
            setLoading(true);
            newItem(imgUrl, name, description, price, category, props.user.userId, setLoading);
            window.location = "/items";
        }
    }

    const handleUploadFile = (e) => {
        CapturFile(e, setFile);
        DisplayImage(e, setMedia);
    }


    return (
        <div className="additem">
            <h1 className='newItemText'>Add New Item </h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text"
                    value={name} placeholder="Enter product name within 50 character limit"
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={50}
                />
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
                        onChange={e => handleUploadFile(e)}
                    />
                    <div className="overlay-layer" >Upload photo</div>

                </div>

                {!loading && <button className="btn btn-success">Add Item
                </button>}
                {loading && <button disabled className="btn btn-success">Adding Item...
                </button>}
                <div className='imageDisplaying'>
                    {
                        media && media.map((images, index) => {
                            return (
                                <div key={index}>
                                    <img src={images.content} alt={images.name} title={images.name} />
                                </div>
                            )
                        })
                    }
                </div>
            </form>
        </div>
    )
}
