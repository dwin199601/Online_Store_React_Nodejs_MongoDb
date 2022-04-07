export const updateImg = (e, setUserimg) => {
    e.preventDefault();
    console.log(e.target.value)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setUserimg(reader.result);
    }
    reader.onerror = function (error) {
      console.log(error)
    }
  }