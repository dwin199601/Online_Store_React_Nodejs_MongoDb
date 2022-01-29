import React from 'react'
import { useState } from 'react'
import ItemList from './itemList';
import 'bootstrap/dist/css/bootstrap.css';
import { FetchDataFromDBWithErrors } from '../util/FetchDataHelper';

export default function Items() {

    const RefresPage = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    const [item, setItem] = useState();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    FetchDataFromDBWithErrors(setItem, setLoading, setError);



    return (
        <div>
            {error &&
                <div className="Errorstyles"> <p>{error}</p><br />
                    <button onClick={RefresPage} className="btn btn-success">Refresh</button>
                </div>}
            {isLoading && <p className="Loadingmessagestyle">Loading...</p>}
            {item && <ItemList item={item} title="All items" setItem={setItem} />}
        </div>
    )
}
