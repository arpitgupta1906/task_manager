const express=require('express');
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express();
const PORT=3000;


// app.use((req,res,next)=>{
//     res.status(503).send("Server under maintainence")
// })


app.use(express.json());

app.use(userRouter)
app.use(taskRouter)



app.listen(PORT,()=>{
    console.log("server is up on port 3000");
})


const User=require('./models/user')
const Task=require('./models/task')

// const main=async ()=>{
//     const task=await Task.findById('')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

//     const user=await User.findById('')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }