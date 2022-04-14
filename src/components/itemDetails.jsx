import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router';
import { itemDetailsOpen } from '../util/FetchDataHelper.js';
import { LoadingOutlined } from '@ant-design/icons';
import "./itemDetails.css"

export default function ItemDetails(props) {

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { param } = useParams();

  const deleteHandler = async (items) => {
    try {
      items._id = param;
      console.log("Item was deleted");
      const { data } = await axios.delete("http://localhost:5000/api/items/" + items._id);
      const newItem = props.item.filter(i => i._id !== items._id);
      console.log(data, newItem);
      props.setItem([...newItem]);
      alert("Item was deleted!!")
    }
    catch (error) {
      console.log(error);
      navigate('/items');
      setLoading(false);
    }
  }

  useEffect(() => {
    itemDetailsOpen(props.setItem, setLoading, param, setError);
  }, [param]);



  return (
    <div>
      {error && <div>Error: {error}</div>}
      {isLoading ? <LoadingOutlined className="Loadingmessagestyle" /> :
        <div className='itemRiview'>
          <h1 className='itemDetail_h1'>{props.item.item_name}</h1>
          <div className="boxParent">
            <img src={props.item.item_image} alt="" />
            <div className="boxContent">
              <span className='description_item'>
                <h3>Description</h3>
                <p>{props.item.item_description}</p>
              </span>
              <p className='price_item'>Price: ${props.item.price}</p>
              <p className='category_item'>Category: {props.item.category}</p>
            </div>
          </div>
          <button type="button"
            className="btn btn-danger"
            onClick={deleteHandler} style={{ marginTop: "20px" }}>Delete Item</button>
        </div>
      }
    </div>
  )
}

