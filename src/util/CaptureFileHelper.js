import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
const client = create('https://ipfs.infura.io:5001/api/v0');


export const CapturFile =  (e, setFile, forUser) => {
    try{
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        if(!forUser){//if this function is used to generate image url for product
            reader.onloadend = () => {
                setFile(arr=> [...arr, Buffer(reader.result) ]);
            }
        }
        else {//if this function is used to generate image url for user
            reader.onloadend = () => {
                setFile(Buffer(reader.result));
            }
        }
        
    } catch(error){
        console.log(error.message);
    }
    e.preventDefault();
}

export const getImageUrl = async (file, forUser) => {
    const urls = [];
    let url;
    if(!forUser) {
        try {
            for (const value of file) {
                const created = await client.add(value); 
                urls.push(`https://ipfs.infura.io/ipfs/${created.path}`)
            }
        }
        catch (error) {
            console.log(error.message);
        }
        return urls;
    }
    else {
        try {
            const created = await client.add(file);
             url = `https://ipfs.infura.io/ipfs/${created.path}`;
        }
        catch (error) {
            console.log(error.message);
        }
        return url;
    }
}

//to display all item's images
export const DisplayImage = (e, setMedia) => {
    const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setMedia(arr=> [...arr, {
                content: reader.result,
                name: file.name,
            }]);
        };
        reader.onerror = function (error) {
            console.log(error);
        };
}






