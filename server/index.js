import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import PostRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
dotenv.config();
const app =express();
app.get('/',(req,res)=>{
    res.send('Hello to JOY API');
})

app.use(bodyParser.json({limit:"50mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))
app.use(cors())
app.use('/posts', PostRoutes);
app.use('/user', userRoutes);



const PORT=process.env.PORT
const CONNECTION_URL=process.env.CONNECTION_URL
mongoose.connect(CONNECTION_URL).then(()=>app.listen(PORT,()=>console.log(`server run ${PORT}`))).catch((error)=>console.log(error.message))

//mongoose.set('useFindAndModify',false);