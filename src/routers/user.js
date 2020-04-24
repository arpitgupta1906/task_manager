const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const router=new express.Router()
const sharp=require('sharp')


router.post('/users',async (req,res)=>{
    const user=new User(req.body)

    try{
        await user.save()
        const token=await user.generateAuthToken()

        //we are sending token to be used by postman
        res.status(201).send({user,token});

    }
    catch(e){
        res.status(400).send(e);
    }


    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })
})

router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth,async (req,res)=>{
    try{
        // res.send(req.user.tokens)
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })

        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth,async (req,res)=>{

    res.send(req.user)

})



router.patch('/users/update', auth,async (req,res)=>{

    const updates=Object.keys(req.body);
    const allowedupdates=['name','email','password','age'];
    isValidUpdate=updates.every((update)=> allowedupdates.includes(update))

    if(!isValidUpdate){
        return res.status(400),send({error:'Invalid updates!'})
    }

    try{

        const user=await User.findById(req.user)

        updates.forEach((update)=>{
            user[update]=req.body[update]
        })

        await user.save()
        // user=await User.findByIdAndUpdate(_id,req.body,{
        //     new: true,runValidators:true
        // })

        res.send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
})



router.delete('/users/me', auth,async (req,res)=>{
    try{
       req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(500).send();
    }
})


const upload=multer({
    limits:{
        fieldSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
            return cb(new Error('Please input an image'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{

    const buffer=await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()

    req.user.avatar=buffer
    // req.user.avatar=req.file.buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async (req,res)=>{

    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async (req,res)=>{
    try{
        
        const user=await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

//we have to set content type default is application /json
        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})

// router.delete('/users/:id',async (req,res)=>{
//     try{
//         const user=await User.findByIdAndDelete(req.params.id);

//         if(!user)
//         {
//             res.status(404).send('User not found')
//         }

//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send();
//     }
// })


// router.get('/users/:id',async (req,res)=>{
//     const _id=req.params.id;

//     try{
//         const user=await User.findById(_id)
//         if(!user){

//             return res.status(404).send()
//         }

//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send();
//     }
    
// })


// router.patch('/users/:id',async (req,res)=>{
//     const _id=req.params.id;
//     const updates=Object.keys(req.body);
//     const allowedupdates=['name','email','password','age'];
//     isValidUpdate=updates.every((update)=> allowedupdates.includes(update))

//     if(!isValidUpdate){
//         return res.status(400),send({error:'Invalid updates!'})
//     }

//     try{

//         const user=await User.findById(req.params.id)

//         if(!user)
//         return res.status(404).send();

//         updates.forEach((update)=>{
//             user[update]=req.body[update]
//         })

//         await user.save()
//         // user=await User.findByIdAndUpdate(_id,req.body,{
//         //     new: true,runValidators:true
//         // })

//         res.send(user);
//     }
//     catch(e){
//         res.status(400).send(e);
//     }
// })



module.exports=router;