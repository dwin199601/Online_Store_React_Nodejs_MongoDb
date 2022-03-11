import React from 'react'
import { useState } from 'react'
import ItemList from './itemList';
import 'bootstrap/dist/css/bootstrap.css';
import { FetchDataFromDBWithErrors } from '../util/FetchDataHelper';
import { IfUserIsntRegistered } from '../util/UserAuthHelper';
import { LoadingOutlined } from '@ant-design/icons';

export default function Items(props) {
    IfUserIsntRegistered("/login");
    const [item, setItem] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const RefresPage = (e) => {
        e.preventDefault();
        window.location.reload();
    };
    const [error, setError] = useState(null);
    FetchDataFromDBWithErrors(setItem, setLoading, setError);

    return (
        <div>
            {isLoading ? <LoadingOutlined className="Loadingmessagestyle" />
                : <ItemList item={item} setItem={setItem} />
            }

            {error &&
                <div className="Errorstyles">
                    <p>Sorry, no connection with server, try again..</p>
                    <input type="button" value="Reconnect" onClick={RefresPage} className="reconncetbtn" />
                </div>
            }
        </div>
    )
}

