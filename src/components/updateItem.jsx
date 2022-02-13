import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import "./updateItemStyles.css"
import 'react-toastify/dist/ReactToastify.css';
import { UpdateItemHelper } from '../util/FetchDataHelper';

toast.configure();

function UpdateItem(props) {
  const history = useHistory();
  const { param } = useParams();
  UpdateItemHelper(param, props.setItem);

  const successToastMessage = () => {
    toast.success("The item was updated!", { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
  }

  const updateD = async (e) => {
    e.preventDefault();
    /*const imgURL = await getImageUrl(props.item)
    console.log("URL::: " + imgURL)
    props.setItem({ ...props.item, "item_image": imgURL })*/

    fetch("http://localhost:5000/api/items/" + param, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props.item)
    }).then(response => {
      successToastMessage();
      history.push('/items');
      return response.json();
    }).catch(error => {
      console.log(error);
    })

  }


  return (
    <div>
      <h1> Udate Item</h1>
      <form>
        <div className="parentInputForm">

          <div className='childContainer'>
            <img src={props.item.item_image} alt="item_image" />
          </div>

          <div className='childContainer'>
            <label>Name</label>
            <input type="text"
              value={props.item.item_name}
              onChange={(e) => props.setItem({ ...props.item, item_name: e.target.value })}
              required />
          </div>

          <div className='childContainer'>
            <label>Price$</label>
            <input type="number" placeholder="999"
              value={props.item.price}
              onChange={(e) => props.setItem({ ...props.item, price: e.target.value })}
              required />
          </div>

          <div className='textAreaChild'>
            <label>Description</label>
            <textarea required
              value={props.item.item_description}
              onChange={(e) => props.setItem({ ...props.item, item_description: e.target.value })}
            />
          </div>

          <div className="childContainer">
            <button onClick={updateD} className="btn btn-success m-0">Edit
            </button>
          </div>

        </div>
      </form >
    </div >
  )
}


export default UpdateItem;

/*
 <input type="url"
                value={item.item_image}
                onChange={(e) => setItem({ ...item, "item_image": e.target.value })} />*/

/* <span className='dropZona'>
<input type="file" className='dropButton' onChange={(e) => CapturFile(e, props.setItem)} />
<span className='dropIcon'>Open Image</span>
</span>*/


/*  <div className='childContainer'>
            <div className="childInputForm">
              <label>Image</label>
            </div>
            <div className="childInputForm">

            </div>
            <span className='dropZona'>
              <input type="file" className='dropButton' value="" onChange={(e) => CapturFile(e, props.setItem)} />
              <span className='dropIcon'>Open Image</span>
            </span>

          </div>*/