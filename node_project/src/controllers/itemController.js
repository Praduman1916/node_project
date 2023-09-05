const fs = require('fs');
const items = require('../data/item.json')

module.exports = {
    getAllItems: (req, res) => {
        try {
            const { page = 1, limit = 10, name, category, sort } = req.query;
            let filteredItems = [...items]
            if (name) {
                filteredItems = filteredItems.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
                // console.log("Test filteredItems",filteredItems)
            }
            if (category) {
                filteredItems = filteredItems.filter((item) => item.category.toLocaleLowerCase() === category.toLocaleLowerCase())
                //  console.log("Test filteredItems",filteredItems)
            }
            if (sort === 'name-asc') {
                filteredItems.sort((a, b) => a.name.localeCompare(b.name))
            } else if (sort === 'name-desc') {
                filteredItems.sort((a, b) => b.name.localeCompare(b.name))
            }
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedItems = filteredItems.slice(startIndex, endIndex)
            // console.log("Test paginatedItems",paginatedItems)
            res.status(200).json({
                totalItems: filteredItems.length,
                page,
                limit,
                items: paginatedItems,
            })
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    createItem: (req, res) => {
        try {
            const newItemData = req.body;
            if (!newItemData.name || typeof newItemData.name !== 'string') {
                throw new Error('Name is required and Must be string');
            }
            if (!newItemData.category || typeof newItemData.category !== 'string') {
                throw new Error('Category is required and Must be string');
            }
            const newItem = {
                id: items.length + 1,
                ...newItemData
            }
            items.push(newItem)
            // fs.writeFileSync('./data/item.json', JSON.stringify(items, null, 2));
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    getItemById: (req, res) => {
        try {
            const itemId = parseInt(req.params.id)
            const item = items.find((item) => item.id === itemId)
            if (item) {
                // console.log("Find item", item)
                res.json(item)
            } else {
                res.status(404).json({ message: 'Item not found' })
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    updateItem: (req, res) => {
        try {
            const itemId = parseInt(req.params.id)
            const updateItem = req.body
            if (!updateItem.name || typeof updateItem.name !== 'string') {
                throw new Error('Name is required and Must be string');
            }
            if (!updateItem.category || typeof updateItem.category !== 'string') {
                throw new Error('Category is  required and Must be string');
            }
            const itemIndex = items.findIndex((item) => item.id === itemId)
            if (itemIndex !== -1) {
                items[itemIndex] = { ...items[itemIndex], ...updateItem }
                // fs.writeFileSync('./data/item.json', JSON.stringify(items, null, 2));
                res.json(items[itemIndex]);
            } else {
                res.status(404).json({ message: 'Item not found' })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    deleteItem: (req, res) => {
        try {
            const itemId = parseInt(req.params.id)
            const itemIndex = items.findIndex((item) => item.id === itemId)
            if (itemIndex !== -1) {
                items.splice(itemIndex, 1)
                // fs.writeFileSync('./data/item.json', JSON.stringify(items, null, 2));
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Item not found' })
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}
