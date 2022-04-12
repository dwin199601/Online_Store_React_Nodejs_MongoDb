const {getItemData, getItemById, createItem, updateItem, deleteItem} = require("../controlers/itemController");
const router = require("express").Router();

router.get('/api/items', getItemData);
router.get('/api/items/:id', getItemById);
router.post('/api/newitems', createItem);
router.put('/api/items/:id', updateItem);
router.delete('/api/items/:id', deleteItem);

module.exports = router;