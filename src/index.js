const express = require('express')
const multer = require('multer')
require('./db/mongoose')
const userRouter = require('./routers/user')
const propertyRouter = require('./routers/property')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(userRouter)
app.use(propertyRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Property = require('./models/property')
const User = require('./models/user')

const main = async () => {
    // const property = await Property.findById('5c2e505a3253e18a43e612e6')
    // await property.populate('owner').execPopulate()
    // console.log(task.owner)

    //const user = await User.findById('5c2e4dcb5eac678a23725b5b')
   // await user.populate('properties').execPopulate()
   // console.log(user.properties)
}

main()