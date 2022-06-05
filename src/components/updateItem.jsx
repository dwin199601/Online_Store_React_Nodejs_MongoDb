import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import "./updateItemStyles.css"
import 'react-toastify/dist/ReactToastify.css';
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper';
import { UpdateItemHelper } from '../util/FetchDataHelper';
import { LoadingOutlined } from '@ant-design/icons';
import TextareaAutosize from 'react-textarea-autosize';
import getCategoryJson from '../data/categories.json';
import { deleteToastMessage } from '../util/FetchDataHelper';

toast.configure();

function UpdateItem() {
  const navigate = useNavigate();
  const { param } = useParams();
  const [file, setFile] = useState("");
  const [item, setItem] = useState({});
  const [changedImg, setchangedImg] = useState(false);
  UpdateItemHelper(param, setItem);

  const successToastMessage = () => {
    toast.success("The item was updated!", { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
  }

  const updateD = async (e) => {
    e.preventDefault();
    if (item.category === 'Select') {
      deleteToastMessage("Select Category!")
    }
    else {

      fetch("http://localhost:6050/api/items/" + param, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "item_name": item.item_name,
          "item_description": item.item_description,
          "price": item.price,
          "category": item.category
        })
      }).then(response => {
        successToastMessage();
        navigate('/items');
        return response.json();
      }).catch(error => {
        console.log(error);
      })
    }
  }


  return (
    <div className='content_update'>
      <form className="updateItemForm">
        <div className='UpdateImg'>
          <div>
            {
              item.item_image ? <img src={item.item_image[0]} alt="item img" />
                : <LoadingOutlined className="Loadingmessagestyle" />
            }
          </div>
        </div>

        <div className="parentInputForm">
          <div className='childContainer'>
            <label>Name</label>
            <input type="text"
              value={item.item_name ? item.item_name : "loading..."}
              onChange={(e) => setItem({ ...item, item_name: e.target.value })}
              required />
          </div>

          <div className='childContainer'>
            <label>Price&#x0024;</label>
            <input type="number" placeholder="999"
              value={item.price ? item.price : "loading..."}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              required />
          </div>
          <div className='childContainer'>
            <label>Category</label>
            <select
              className='updateItemCategory'
              onChange={(e) => setItem({ ...item, category: e.target.value })}
              required>
              {
                getCategoryJson.map((value) => {
                  return (
                    <option
                      key={value.id}
                      defaultValue
                    >
                      {value.category}
                    </option>
                  )
                })
              }
            </select>
          </div>

          <div className='childContainer'>
            <label>Description</label>
            <TextareaAutosize
              required
              rows={1}
              maxRows={4}
              value={item.item_description ? item.item_description : "loading..."}
              onChange={(e) => setItem({ ...item, item_description: e.target.value })}
            />
          </div>
        </div>
      </form >
      <button onClick={updateD} className="btnUpdate">Edit </button>
    </div >
  )
}


export default UpdateItem;

