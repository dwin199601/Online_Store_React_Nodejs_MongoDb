import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import { create } from "ipfs-http-client";
import { CapturFile } from '../util/CaptureFileHelper.js';
import { newItem } from '../util/FetchDataHelper.js';
const client = create('https://ipfs.infura.io:5001/api/v0');

export default function Newitems() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesctiption] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [file, setFile] = useState(null);
    let url = "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const created = await client.add(file);
            url = `https://ipfs.infura.io/ipfs/${created.path}`;
        }
        catch (error) {
            console.log(error.message);
        }

        newItem(url, name, description, price, history, setLoading);
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
                <textarea required placeholder="Enter product description here"
                    value={description}
                    onChange={(e) => setDesctiption(e.target.value)}
                />
                <div className='dropZone'>
                    <input type="file" class="upload_btn" onChange={e => CapturFile(e, setFile)} />
                    {file === null ?
                        <div class="overlay-layer">Upload photo</div>
                        :
                        <div class="overlay-layer" id="uploadedPhoto">Uploaded!</div>
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

