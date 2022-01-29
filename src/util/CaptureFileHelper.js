
export const CapturFile =  (e, setFile) => {
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





