import e from "cors";
import html2canvas from "html2canvas";

export const exportAsImage = async(el, imageFileName) => {
    const html = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0];
    let htmlWidth = html.clientWidth;
    let bodyWidth = html.clientWidth;
    const newWidth = el.scrollWidth - el.clientWidth;
    if(newWidth> e.clientWidth){
        htmlWidth +=newWidth;
        bodyWidth +=newWidth;
    }
    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
    html.style.width=null;
    body.style.width = null;
};

const downloadImage = (blob, fileNmae) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "dispay:block;"
    fakeLink.download = fileNmae;
    fakeLink.href = blob;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
}