import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper.js';
import { IfUserIsntRegistered } from '../util/UserAuthHelper.js';
import { newItem } from '../util/FetchDataHelper.js';

export default function Newitems() {
    IfUserIsntRegistered("/login");
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesctiption] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [file, setFile] = useState(null);
    const [img, setImg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        newItem(img, name, description, price, history, setLoading);
    }
    const handleImgUrl = async () => {
        const imgUrl = await getImageUrl(file)
        setImg(imgUrl);
    }

    /*const onPaste = (e) => {
        console.log(e.clipboardData.files[0].name);
        CapturFile(e.clipboardData.files[0], setFile)
        if (e.clipboardData.files.length > 0) {
            if (e.clipboardData.files[0].type.startsWith("image/")) {
                getImage(e.clipboardData.files[0]);
            }
        }
    }

    const getImage = (file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setImage(fileReader.result);
        }
        console.log(image);
    }
   */

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
                <textarea required placeholder="Enter product description here"
                    value={description}
                    onChange={(e) => setDesctiption(e.target.value)}
                />
                <div className='dropZone'>
                    <input
                        type="file"
                        className="upload_btn"
                        onChange={e => CapturFile(e, setFile)}
                        onMouseLeave={handleImgUrl}
                    />
                    {file === null ?
                        <div className="overlay-layer">Upload photo</div>
                        :
                        <div className="overlay-layer" id="uploadedPhoto">Uploaded!</div>
                    }
                    <div>
                        {
                            img ? <img src={img} className="newItemImage" alt="" />
                                : ""
                        }
                    </div>
                </div>


                {!loading && <button className="btn btn-success">Add Item
                </button>}
                {loading && <button disabled className="btn btn-success">Adding Item...
                </button>}
            </form>
        </div>
    )
}



/*  <div className='fileUpload'>
                    <input
                        type="text"
                        placeholder='paste item images here'
                        style={{ border: "none" }}
                        value={image}
                        onPaste={e => onPaste(e)}
                    />

                    <div>
                        {image ? <img src={image} alt="" className='pasteImgClass' /> : ""}
                    </div>
                </div>*/

