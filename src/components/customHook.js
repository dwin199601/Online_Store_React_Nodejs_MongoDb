
import { useState } from 'react'
import { useEffect } from 'react'

 const useCustomHook =(url)=> {

     const [item, setItem] = useState(null);
     const [isLoading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(()=> {
       

         const abortControl = new AbortController();
        fetch(url, {signal: abortControl.signal})
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
            if(err.name === "AbortError"){
                console.log("Fetch abort");
            }
            else{
                setLoading(false);
                setError(err.message);
            }
         
        })
        return () => abortControl.abort();
        
        }, [url]);


    return {item, isLoading, error}
}

export default useCustomHook;
