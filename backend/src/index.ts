import express from "express"
import cors from 'cors'
import router from "./routers/coffee"
import "./config/db"

const app = express()
const port = process.env.APP_PORT
app.use(cors({
    origin : ['http://localhost:5173', 'http://localhost:8080' , 'https://localhost:443'],
    credentials: true
}))
app.use(express.json());
app.use('/main', router)

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})