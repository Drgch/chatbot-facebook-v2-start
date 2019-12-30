const express = require('express')
const Property = require('../models/property')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/properties', auth, async (req, res) => {
    const property = new Property({
        ...req.body,
        owner: req.user._id
    })

    try {
        await property.save()
        res.status(201).send(property)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/properties', auth, async (req, res) => {
   const match = {}

   if (req.query.completed){
       match.completed = req.query.completed === 'true'
   }

    try {
        await req.user.populate({
            path: 'properties',
            match
        }).execPopulate()
        res.send(req.user.properties)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/properties/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const property = await Property.findOne({ _id, owner: req.user._id })

        if (!property) {
            return res.status(404).send()
        }

        res.send(property)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/properties/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const property = await Property.findOne({ _id: req.params.id, owner: req.user._id})

        if (!property) {
            return res.status(404).send()
        }

        updates.forEach((update) => property[update] = req.body[update])
        await property.save()
        res.send(property)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/properties/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!property) {
            res.status(404).send()
        }

        res.send(property)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports  = router