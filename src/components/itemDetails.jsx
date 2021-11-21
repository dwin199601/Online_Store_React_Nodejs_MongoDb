import React from 'react'
import { useParams } from 'react-router'
import useCustomHook from './customHook';

export default function ItemDetails() {

     const {param} = useParams();
    
     const {item, isLoading, error} =
      useCustomHook ('http://localhost:8000/item/' + param);



    return (
        <div>
            <h2>Item Details number {param}</h2>
            {isLoading && <div>Loading..</div>}
            {error && <div>Error: {error}</div>}
            {item &&
            <article>
            <h1>{item.item_name}</h1>
            <p>{item.price}</p>
            <p>{item.item_description}</p>
            <img src={item.item_image} alt=""/>

            </article>
            }
        </div>
    )
}


/*useEffect(()=> {
        fetch('http://localhost:8000/item/')
        .then(res=>{
            if(!res.ok){
                throw Error (`Couldn't fetch the data from the server!`)
            }
            return res.json();
        })
        .then(data=>{//to process data from the json file
            setItem(data);
            setLoading(false);
            setError(null);
        })
        .catch(err=>{
            console.log("Error: " + err);
            setError(err.message + " data from the server! Sorry..");
            setLoading(false);
        })
        }, []);*/