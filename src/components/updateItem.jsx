import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import "./updateItemStyles.css"
import 'react-toastify/dist/ReactToastify.css';
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper';
import { UpdateItemHelper } from '../util/FetchDataHelper';
import { LoadingOutlined } from '@ant-design/icons';

toast.configure();

function UpdateItem(props) {
  const history = useHistory();
  const { param } = useParams();
  const [file, setFile] = useState(null);
  const [item, setItem] = useState({});
  UpdateItemHelper(param, setItem);

  const successToastMessage = () => {
    toast.success("The item was updated!", { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
  }
  const handleImgUrl = async () => {
    const imageUrl = await getImageUrl(file)
    //setImage(imageUrl)
    setItem({ ...item, "item_image": imageUrl })
  }

  const updateD = async (e) => {
    e.preventDefault();
    /*const imgURL = await getImageUrl(props.item)
    console.log("URL::: " + imgURL)
    props.setItem({ ...props.item, "item_image": imgURL })*/

    fetch("http://localhost:5000/api/items/" + param, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
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
            {
              item.item_image ? <img src={item.item_image} alt="item_image" />
                : <LoadingOutlined className="Loadingmessagestyle" />
            }
          </div>
          <div className='childContainer'>
            <label>Image</label>
            <input value={item.item_image ? item.item_image : "loading..."} readOnly={true} />
            <div className='dragDropZone'>
              <input
                type="file"
                className="uploadImagebtn"
                onChange={e => CapturFile(e, setFile)}
                onMouseLeave={handleImgUrl}
              />
              <div className="dropzoneIcon">Upload Image</div>
            </div>
          </div>
          <div className='childContainer'>
            <label>Name</label>
            <input type="text"
              value={item.item_name ? item.item_name : "loading..."}
              onChange={(e) => setItem({ ...item, item_name: e.target.value })}
              required />
          </div>

          <div className='childContainer'>
            <label>Price$</label>
            <input type="number" placeholder="999"
              value={item.price ? item.price : "loading..."}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              required />
          </div>

          <div className='textAreaChild'>
            <label>Description</label>
            <textarea required
              value={item.item_description ? item.item_description : "loading..."}
              onChange={(e) => setItem({ ...item, item_description: e.target.value })}
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