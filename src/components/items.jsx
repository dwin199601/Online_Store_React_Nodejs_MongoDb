import React, { useEffect } from 'react'
import { useState } from 'react'
import ItemList from './itemList';
import 'bootstrap/dist/css/bootstrap.css';
import { FetchDataFromDBWithErrors } from '../util/FetchDataHelper';
import { LoadingOutlined } from '@ant-design/icons';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { VerifyUserHasToken } from '../util/VerifyUser';
import './item.css';

export default function Items(props) {
    VerifyUserHasToken();
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

