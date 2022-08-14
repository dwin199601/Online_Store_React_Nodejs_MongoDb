import { deleteToastMessage } from "./FetchDataHelper";
import axios from "axios";

export const handledeleteProduct = async (allitems, setItem, item) => {
    deleteToastMessage("Product deleted!");
    const { data } = await axios.delete("http://localhost:6050/api/items/"
        + allitems._id);

    const newItems = item.filter(it => it._id !== allitems._id);
    console.log(data, newItems);
    setItem([...newItems]);
}