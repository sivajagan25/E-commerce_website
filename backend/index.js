const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer =require("multer");
const path=require("path");
const cors=require("cors");




app.use(express.json());
app.use(cors());
//connect mongo db
mongoose.connect("mongodb+srv://sivajagan68:siva123@cluster0.uei6amh.mongodb.net/e-commerce");

//APi creation 
app.get("/",(req,res)=>{

    res.send("express is running success")
})

//image storage engine

var storage= multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
var upload= multer({storage:storage})

//create upload endpoint imagel
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        images_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
const Product =mongoose.model('Product',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})
 //create a API for inserting
app.post('/addproduct',async (req,res)=>{
    let products =await Product.find({});//increment a id 
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({ //insert a data in database
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,

    })
})
 //create a API for removing
 app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log('removed');
    res.json({
        success:true,
        name:req.body.name
    })

 })
 //create a API for getting a allproduct
 app.get('/allproducts',async (req,res)=>{
    let products =await Product.find({});
    console.log("All product fetched");
    res.send(products);
 })

 //schema creating for user model 
const Users =mongoose.model('Users',{
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating a endpoint for the login users 
 
app.post('/signup',async (req,res)=>{
    let check =await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user with the same email id"});

    }
    let cart ={};
    for (let i = 0; i< 300; i++) {
        cart[i]=0;
        
    }
    const user =new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data={
        user:{
            id:user.id
        }
       
    }
    const token =jwt.sign(data,"secret_encrpt")
    res.json({success:true,token})
})

app.post('/login',async (req,res)=>{
    let user =await Users.findOne({email:req.body.email});
    if(user){
        const passcompare =req.body.password === user.password;

        if(passcompare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,"secret=encryp");
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"wrong password"});
        }

    }
    else{
        res.json({success:false,errors:"wrong email id"});
    }
})

app.get('/newcollections',async(req,res)=>{
    let products =await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("new collections fetched")
    res.send(newcollection);
})
app.get('/popularinwomen',async(req,res)=>{
    let products =await Product.find({category:"women"})
    let popularinwomen=products.slice(0,4)
    console.log("women fetched");
    res.send(popularinwomen)
})
//creating middleware to fetch user
const fetchUser = async (req, res, next)=>{
    const token = req.header('auth=token');
    if (!token) {
    res.status(401).send({errors: "Please authenticate using validate token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secert_ecom');
            req.user=data.user;
            next();
            }
            catch(error){
                res.status(401).send({erors:"please authenticate using validate token"})

            }
    }
}

app.post('/addtocart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cart})
     res.send("added");
})
app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port"+ port)
    }
    else{
        console.error("error:"+error)
    }
})