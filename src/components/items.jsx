import React from 'react'
import { useState } from 'react'
import ItemList from './itemList';
import 'bootstrap/dist/css/bootstrap.css';
import { FetchDataFromDBWithErrors } from '../util/FetchDataHelper';
import { LoadingOutlined } from '@ant-design/icons';
import { VerifyUserHasToken } from '../util/VerifyUser';
import './item.css';

export default function Items(props) {
    const [isLoading, setLoading] = useState(true);

    VerifyUserHasToken();
    const RefresPage = (e) => {
        e.preventDefault();
        window.location.reload();
    };
    FetchDataFromDBWithErrors(props.setProducts, setLoading, props.setError);

    return (
        <div>
            {isLoading ? <LoadingOutlined className="Loadingmessagestyle" />
                : <ItemList item={props.products} setItem={props.setProducts} userId={props.user.userId} firstName={props.user.fistName} />
            }

            {props.error &&
                <div className="Errorstyles">
                    <p>Sorry, no connection with server, try again..</p>
                    <input type="button" value="Reconnect" onClick={RefresPage} className="reconncetbtn" />
                </div>
            }
        </div>
    )
}

