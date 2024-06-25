const mongoose = require(`mongoose`)
const express = require(`express`)
const app = express()
app.use(express.json())
require(`dotenv`).config()
port = process.env.port

const router = require(`./router/userRouter`)
app.use(router)

mongoose.connect(process.env.db).then(()=>{
    app.listen(port,()=>{
        console.log(`App is currently running & connected on port:${port}`);
    })
    console.log(`Connection to MongoDB established successfully.`);
}).catch((e)=>{
    console.log(`Unable to connect to MongoDB because :${e}`);
})


