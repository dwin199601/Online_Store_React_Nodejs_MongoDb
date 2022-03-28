import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const url = "http://localhost:5000/api/items";
export const successfullMessage = (message) => {
  toast.success(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
}

export const FetchDataFromDB =(setItem, setLoading, item) =>{
  let isMounted = true;
  const fetchData = () => {
    fetch(url)
    .then(res=>{
      if(!res.ok){
        
          console.log(`Couldn't fetch the data from the server!`)
      }
      console.log("Server works!!")
      return res.json();
     
    })
    .then(data=>{
      if(isMounted){
          setItem(data);
          setLoading(false);
      }
    })
    .catch(err=>{
      if(isMounted){
          console.log("Error: " + err);
          setLoading(false); 
      }
    }) 
  }
  useEffect(()=> {
    fetchData();
      return ()=>{
          isMounted = false;
      }
  }, []);
}

export const FetchDataFromDBWithErrors = (setItem, setLoading, setError )=>{
  let isMounted = true;
  const fetchData = () =>{
    fetch(url)
    .then(res => {
        if (!res.ok) {
            console.log(`Couldn't fetch the data from the server!`)
        }
        return res.json();
    })
    .then(data => {//to process data from the json file
      if(isMounted){
        let newItem = data.map(items => {
          items.visibleDescription = false;
          return items;
      });
      setItem(newItem);
      setLoading(false);
      setError(null);
      }
    })
    .catch(err => {
      if(isMounted){
        console.log("Error: " + err);
        setError(err.message + " data from the server! Sorry..");
        setLoading(false);
      }
    })
  }
  useEffect(() => {
    fetchData();
    return ()=>{
      isMounted = false;
    }
  }, []);
}

export const UpdateItemHelper = (param, setItem) => {
  
    useEffect(() => {
        const abortControl = new AbortController();
        fetch("http://localhost:5000/api/items/" + param, { signal: abortControl.signal })
          .then((res) => {
            if (!res.ok) {
              console.log(`Couldn't fetch the data from the server!`)
            }
            return res.json()
          })
          .then((res) => {
            setItem(res);
    
          })
          .catch(err => {
            if (err.name === "AbortError")
              console.log("Fatch abort");
          })
        return () => abortControl.abort();
      }, []);
}


export const newItem = (itemUrl, name, description, price, setLoading) => {
   
        fetch("http://localhost:5000/api/newitems", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "item_image": itemUrl,
                "item_name": name,
                "item_description": description,
                "price": price
            }
            )

        }).then(() => {
            console.log("New item added");
            successfullMessage("New item was created!!");
            setLoading(false);

        }).catch(err => {
            console.log("Error: " + err);
            setLoading(false);
        })
    
    }


export const itemDetailsOpen = (setItem, setLoading, param, setError) => {
    const abortControl = new AbortController();
    fetch("http://localhost:5000/api/items/" + param, { signal: abortControl.signal })
      .then((res) => {
        if (!res.ok) {
          console.log(`Couldn't fetch the data from the server!`);
        }
        return res.json()
      })
      .then((res) => {
        setItem(res);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("Fatch abort");
        }
        else {
          setLoading(false);
          setError(err.message);
        }

      })
    return () => abortControl.abort();
  
}

