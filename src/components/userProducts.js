import React from 'react';
import { Link } from 'react-router-dom';
import { handledeleteProduct } from '../util/ProductsHelper';
import { EditOutlined, CloseCircleOutlined, LoadingOutlined, DeleteOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';

export default function UserProducts(props) {
  return (
    <div className='rightSideConten'>
                <p>Your Products</p>
                <div className='user_products'>
                  {
                    props.products
                    .filter((value) => {
                        if(value.user_id === props.user_id)
                        return value;                      
                    })
                    .map((allproducts) => {
                      return (
                        <div key={allproducts._id} className='productBox'>
                          <h1>Title: <span className='productName' title={allproducts.item_name}>{allproducts.item_name.slice(0, 15).toUpperCase()}..</span></h1>
                          {
                            allproducts.item_image ?
                              <img src={allproducts.item_image[0]} />
                              :
                              <LoadingOutlined />
                          }
                          <h3 className='productPrice'>${allproducts.price}</h3>
                          <h4>Added date: {allproducts.data_added.slice(0, 10)}</h4>
                          <div className='productListBtn'>
                            <Link to={`/updateItem/${allproducts._id}`} className='editLink'>
                              <EditOutlined className='editProducBtn' title='edit product' />
                            </Link>
                            <DeleteOutlined className='deleteProductBtn' title='delete product' onClick={() => { handledeleteProduct(allproducts, props.setProducts, props.products) }} />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
  )
}
