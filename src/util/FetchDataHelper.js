import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_URL } from '../util/constants';
import axios from 'axios';
toast.configure();

export const url = "http://localhost:6050/api/items";
export const commentUrl = "http://localhost:6050/api/comment";

export const successfullMessage = (message) => {
  toast.success(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 });
}

export const deleteToastMessage = (message) => {
  toast.error(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
}

export const FetchUserDataFromDb =(setUser, emailForUser, setError) => {
  return fetch ("http://localhost:6050")
          .then(res => {
            if(!res.ok){
              console.log("Couldn't fetch user data from the server!");
              deleteToastMessage("Sorry, cannot upload user data. Contact admin (dwin13672@gmail.com)");
            }
            console.log("User server is on");
            return res.json();
          })
          .then(data => {
            data.filter((value) => {
              if (value.email === emailForUser)
                return value;
            })
            .map((data) => {
              setUser({
                fistName: data.firstName,
                lastName: data.lastName,
                userId: data._id,
                userImage: data.image
              })
            })
          })
          .catch(err => {
            setError(err);
          })
}

export const FetchDataFromDB =(setItem, setLoading) => {
  let isMounted = true;
  const fetchData = () => {
    fetch(url)
    .then(res=>{
      if(!res.ok){
        console.log(`Cannot fatch data from the server`);
      }
      console.log("Server works!!");
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

export const FetchAllPurchases = (setPurchases, userId, setLoading) => {
    fetch("http://localhost:6050/api/newPurchase")
    .then(res => {
      if(!res.ok){
        console.log('Cannot fatch data from the server');
      }
      return res.json();
    })
    .then(data => {
     let userPurchases = data.filter((value) => {
          if (value.recipientId === userId)
            return value;
        });
        setPurchases(userPurchases);
        setLoading(false);
    })
    .catch(err => {
      console.log("Error: " + err);
      setLoading(false); 
    })
}

export const FetchDataFromDBWithErrors = (setItem, setLoading, setError ) => {
  let isMounted = true;
  const fetchData = () =>{
    fetch(url)
    .then(res => {
        if (!res.ok) {
            console.log("Couldn't fetch the data from the server!");
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

export const UpdateItemHelper = (param, setItem, setLoading) => {
    useEffect(() => {
        const abortControl = new AbortController();
        fetch("http://localhost:6050/api/items/" + param, { signal: abortControl.signal })
          .then((res) => {
            if (!res.ok) {
              console.log(`Couldn't fetch the data from the server!`)
            }
            return res.json();
          })
          .then((res) => {
            setItem(res);
            setLoading(false);
          })
          .catch(err => {
            if (err.name === "AbortError")
              console.log("Fatch abort");
          })
        return () => abortControl.abort();
      }, []);
}

export const newPayment = (recipientName, recipientId, itemName, 
  itemImage, itemId, paidAmount, street, suite, city, state, country, postalCode) => {
  fetch("http://localhost:6050/api/newPurchase", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "recipientName": recipientName,
      "recipientId": recipientId,
      "itemName": itemName,
      "itemImage": itemImage,
      "itemId": itemId,
      "paidAmount": paidAmount,
      "street": street,
      "suite": suite,
      "city": city,
      "state": state,
      "country": country,
      "postalCode": postalCode
    })
  }).then(() => {
    console.log("Payment is saved");
  }).catch(err => {
    console.log("Error: " + err);
  }) 
}

export const newItem = (itemUrl, name, description, price, category, userId, seller_name, setLoading) => {
        fetch("http://localhost:6050/api/newitems", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "item_image": itemUrl,
              "item_name": name,
              "item_description": description,
              "price": price,
              "category": category,
              "user_id": userId,
              "seller_name" : seller_name
            }
            )
        }).then(() => {
            setLoading(false);

        }).catch(err => {
            console.log("Error: " + err);
            setLoading(false);
        })    
}

export const newComment = (commentAuthorName, commentBody, itemRate, item_id, user_id) => {
  fetch("http://localhost:6050/api/newComment", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "commentAuthorName": commentAuthorName,
      "commentBody": commentBody,
      "itemRate": itemRate,
      "item_id": item_id,
      "user_id": user_id
    })
  })
  .then(()=> {
      console.log("New comment was added");
  })
  .catch(err => {
      deleteToastMessage("Opps, got error when creating the comment: " + err);
  })  
}

export const FetchCommentsFromDb = (setComment, param, setNumOfComments) => {
  fetch("http://localhost:6050/api/comment")
  .then(res => {
      if(!res.ok) {
      console.log(`Couldn't fetch any comment from the server!`)
     }
    return res.json();
  })
  .then(data => {
      let dataBasedOnUserId = data.filter((value) => {
        if (value.item_id === param)
          return value;
      })
      setNumOfComments(dataBasedOnUserId.length)
      setComment(dataBasedOnUserId);
     
  })
  .catch(err=> {
    console.log("Error when fetching comments for the item: ", err);
    
  })
}

export const DeleteComment = async (param, allComments, setAllComments) => {
  try {
    const comment_id = param;
    await axios.delete("http://localhost:6050/api/comment/"+comment_id);
    const newCommentList = allComments.filter(comt => comt._id !== comment_id);
    setAllComments([...newCommentList]);
    successfullMessage("Your comment was erased");
  }
  catch(error) {
    deleteToastMessage("Got error when deleting: ", error);
  }
}

export const itemDetailsOpen = (setItem, setLoading, param, setError) => {
    const abortControl = new AbortController();
    fetch("http://localhost:6050/api/items/" + param, { signal: abortControl.signal })
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

export const getUserEmail = async (setUserEmail) => {
  const { data } = await axios.post(
    USER_URL,
    {}, {withCredentials: true}
  );
  setUserEmail(data.user);
}

