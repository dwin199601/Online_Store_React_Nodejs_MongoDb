import { Buffer } from "buffer";
const ipfsClient = require('ipfs-http-client');
const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;  
const projectSecret = process.env.REACT_APP_INFURA_SECRET_KEY;
const projectGateWay = process.env.REACT_APP_INFURA_GATE_WAY;
const auth = 'Basic ' + Buffer.from(`${projectId}` + ':' + `${projectSecret}`).toString('base64');
const client = ipfsClient.create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
        authorization: auth,
    }
})

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

export const getImageUrl = async (file) => {
    const urls = [];
    let url;
    const fileType = Array.isArray(file);
    if(fileType === true) {
        try {
            for (const value of file) {
                const created = await client.add(value); 
                urls.push(`${projectGateWay}${created.path}`);
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
             url = `${projectGateWay}${created.path}`;
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






