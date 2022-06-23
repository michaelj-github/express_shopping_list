const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDB")

router.get("/", function (req, res) {
  res.json({ items })
})

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name) throw new ExpressError("The name of the item is required", 400);
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    return res.status(201).json({ item: newItem })
  } catch (e) {
    return next(e)
  }
})

router.get("/:name", function (req, res) {
    const founditem = items.find(item => item.name === req.params.name)
    if (founditem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    res.json({ item: founditem })
})

router.patch("/:name", function (req, res) {
    const founditem = items.find(item => item.name === req.params.name)
    if (founditem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    founditem.name = req.body.name
    res.json({ item: founditem })
})

router.delete("/:name", function (req, res) {
    const founditem = items.findIndex(item => item.name === req.params.name)
    if (founditem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    items.splice(founditem, 1)
    res.json({ message: "Deleted" })
})

module.exports = router;
