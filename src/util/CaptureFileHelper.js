import { create } from "ipfs-http-client";
const client = create('https://ipfs.infura.io:5001/api/v0');


export const CapturFile =  (e, setFile) => {
    console.log(e);
    try{
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(Buffer(reader.result));
        }
    } catch(error){
        console.log(error.message);
    }
}

export const getImageUrl = async (file) => {
    let url;
    try {
        const created = await client.add(file);
         url = `https://ipfs.infura.io/ipfs/${created.path}`;
    }
    catch (error) {
        console.log(error.message);
    }
    return url;
}




