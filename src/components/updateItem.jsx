import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import "./updateItemStyles.css"
import 'react-toastify/dist/ReactToastify.css';
import { UpdateItemHelper } from '../util/FetchDataHelper';
import { LoadingOutlined } from '@ant-design/icons';
import TextareaAutosize from 'react-textarea-autosize';
import getCategoryJson from '../data/categories.json';
import { deleteToastMessage } from '../util/FetchDataHelper';

toast.configure();

function UpdateItem() {
  const navigate = useNavigate();
  const { param } = useParams();
  const [item, setItem] = useState({});
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  UpdateItemHelper(param, setItem, setLoading);

  const successToastMessage = () => {
    toast.success("The item was updated!", { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
  }

  const updateD = async (e) => {
    e.preventDefault();
    setCategoryError(false);
    setPriceError(false);
    setNameError(false);

    if (item.category === 'Select') {
      deleteToastMessage("Select Category!");
      setCategoryError(true)
    }
    else if (item.item_name === "") {
      deleteToastMessage("The item must have a name");
      setNameError(true);
    }
    else if (!item.price || parseInt(item.price) < 0) {
      deleteToastMessage("Enter a price, must be > 0 !!");
      setPriceError(true);
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
    <>
      {
        isLoading === true ?
          <LoadingOutlined className="Loadingmessagestyle" />
          :

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
                    value={item.item_name}
                    onChange={(e) => setItem({ ...item, item_name: e.target.value })}
                    className={nameError === true ? "inputNameWithError" : ""}
                    required />
                </div>

                <div className='childContainer'>
                  <label>Price&#x0024;</label>
                  <input type="number"
                    value={item.price}
                    onChange={(e) => setItem({ ...item, price: e.target.value })}
                    className={priceError === true ? "inputPriceWithError" : ""}
                    required />
                </div>
                <div className='childContainer'>
                  <label>Category</label>
                  <select
                    className={categoryError === true ? 'categoryError' : ''}
                    onChange={(e) => setItem({ ...item, category: e.target.value })}
                    required>
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
                </div>

                <div className='childContainer'>
                  <label>Description</label>
                  <TextareaAutosize
                    required
                    rows={1}
                    maxRows={4}
                    value={item.item_description}
                    onChange={(e) => setItem({ ...item, item_description: e.target.value })}
                  />
                </div>
              </div>
            </form >
            <button onClick={updateD} className="btnUpdate">Edit </button>
          </div >
      }
    </>
  )
}


export default UpdateItem;

