const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false
})




// const me=new User({
//     name:'      Raghav',
//     email: 'Right@gmail.com',
//     password: 'raju123',
//     age: 21
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('error',error)
// })




// const mytask=new Task({
//     description: 'Be better',
//     // completed: false
// })

// mytask.save().then(()=>{
//     console.log(mytask);
// }).catch((error)=>{
//     console.log(error);
// })