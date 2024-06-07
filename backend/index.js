import express from "express"
import bodyParser from "body-parser"
import session from "express-session";
import connectMongo from "connect-mongo";  //npm i connect-mongo@3
import bcrypt from "bcryptjs";
import {connection,user,Classes,Cart,Enroll,Instructor,Admin} from "./database.js"
import cors from "cors"
// import { Jwt } from "jsonwebtoken";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


const MongoStore = connectMongo(session);
const sessionStore = new MongoStore({
    mongooseConnection : connection,
    collection : 'sessions'
})
app.use(session({
    secret : "My Secret",
    resave : false,
    saveUninitialized : false,
    store : sessionStore,
    cookie : {
        maxAge : 15*1000*60*60*24   // 15 day in milisecond
    }
}))
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
    credentials: true // Allow cookies to be sent across origins
}));

app.get("/check-login",async(req,res)=>{
    let email = req.session.mail;
    if(email){
       res.send(req.session.val.toString());
    }
    else{
        res.send("0");
    }
})
app.get("/logout",async(req,res)=>{
    req.session.mail = "";
    res.send("1");
})
app.post("/login",async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    try{
      if(role==="student"){
          const a = await user.findOne({email:req.body.email});
          if(a){
              const is_match = await bcrypt.compare(req.body.password,a.password);
              if(is_match){
                  req.session.val = 1;
                  req.session.mail = req.body.email;
                  res.send(req.body.email);
               }
               else{
                   res.send("Invalid Credentials")
               }
           }
           else{
             res.send("Invalid Credentials")
          }
      }
      else if(role==="instructor"){
        const a = await Instructor.findOne({email:req.body.email});
          if(a){
              const is_match = await bcrypt.compare(req.body.password,a.password);
              if(is_match){
                  req.session.val = 2;
                  req.session.mail = req.body.email;
                  res.send(req.body.email);
               }
               else{
                   res.send("Invalid Credentials")
               }
           }
           else{
             res.send("Invalid Credentials")
          }
      }
      else{
        const a = await Admin.findOne({email:req.body.email});
          if(a){
              const is_match = await bcrypt.compare(req.body.password,a.password);
              if(is_match){
                  req.session.val = 3;
                  req.session.mail = req.body.email;
                  res.send(req.body.email);
               }
               else{
                   res.send("Invalid Credentials")
               }
           }
           else{
             res.send("Invalid Credentials")
          }
      }
    }
    catch(err){
       console.log(err.message);
       res.status(500).send("Internal Server Error");
    }
 })
 app.get("/all_class",async(req,res)=>{
    const arr = await Classes.find({status:"approved"});
    res.send(arr);
})

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.get("/name",async(req,res)=>{
    let mail = req.session.mail;
    let a = await user.findOne({email:mail});
    res.send(a.name);
})
app.post("/register",async(req,res)=>{
    try{ 
        const z = await user.findOne({email:req.body.email});
        if(z){res.send("0");}
        else{
            const salt = await bcrypt.genSalt(10);
            const hPassword = await bcrypt.hash(req.body.password,salt);
            const a = new user({
               name : req.body.name,
               email: req.body.email,
               password:hPassword,
               photoURL:req.body.Imageurl,
               gender:req.body.Gender,
               address:req.body.address,
               phone:req.body.mobile
            });
            a.save();
            req.session.mail = req.body.email;
            req.session.val = 1;
            res.send("1")
        }
    }
    catch(err){
       console.error("Error",err);
       res.status(500).send("Internal Server Error");
    }
 })

app.post("/new_user",async(req,res)=>{
    const a = new user(req.body);
    a.save();
    res.send(a);
})


app.get("/user",async(req,res)=>{
    const a = await user.find();
    res.send(a);
})

app.get("/user/:id",async(req,res)=>{
    const id = req.params.id;
    const a = await user.find({_id:id});
    res.send(a);
})

app.get("/user/:email",async(req,res)=>{
    const email = req.params.email;
    const a = await user.find({email});
    res.send(a);
})

app.delete("/delete_user/:id",async(req,res)=>{
    const id = req.params.id;
    const a = await user.deleteOne({_id:id});
    res.send(a);
})

app.put("/update-user/:id",async(req,res)=>{
    const id = req.params.id;
    const us = req.body;
    const a = await user.updateOne(
        {
            _id : id 
        },
        {
            $set : {
                name : us.name,
                email : us.email,
                role : us.role,
                address : us.address,
                photoURL : us.photoURL
            }
        }
       )
       res.send(a);

})


//Check

app.get("/class_by_id/:id",async(req,res)=>{
    const id = req.params.id;
    const a = await Classes.findOne({_id:id});
    res.send(a);
})

app.get("/specific_class/:id",async(req,res)=>{
    const id = req.params.id;
    const a = await Classes.findOne({_id:id});
    res.send(a);
})

app.put("/update_class/:id",async(req,res)=>{
    const id = req.params.id;
    const updated_class = req.body;
    const a = await Classes.updateOne(
     {
         _id : id 
     },
     {
         $set : {
             name : updated_class.name,
             description : updated_class.description,
             price : parseInt(updated_class.price),
             availableSeats : parseInt(updated_class.availableSeats),
             videoID : updated_class.videoID,
             status : "pending"
         }
     }
    )
    res.send(a);
});

app.get("/Cart_Item",async(req,res)=>{
    const id = req.params.id;
    const email = req.session.mail;
    const a = await Cart.find({classID:id,UserEmail:email});
    console.log(a);
});

app.post("/Add_to_cart",async(req,res)=>{
    // console.log(req.session.email);
    const mail = req.session.mail;
    try{
        if(mail){
            const id = req.body._id;
            const z = await Cart.findOne({classID:id,Usermail:mail});
            if(z){
                res.send("2");
            }
            else{
                const a = new Cart({classID: id, Usermail:mail});
                a.save();
                res.send("1");    
            }
        }
        else{
            res.send("0");
        }
    }
    catch(err){
        console.error("Error occurred while saving to database:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/Enroll",async(req,res)=>{
    let mail = req.session.mail;
    try{
        if(mail){
            const id = req.body.id;
            const isEnrolled = await Enroll.findOne({classID:id,Usermail:mail});
            if(isEnrolled){
                res.send("2");
            }
            else{
                const check_avail_seats = await Classes.findOne({_id:id});
                if(check_avail_seats.availableSeats){
                    const z = await Classes.updateOne(
                        {
                            _id : id
                        },
                        {
                            $inc: { availableSeats : -1 , totalStudentEnrolled: +1}
                        }
                    )
                    const a = new Enroll({classID: id, Usermail:mail});
                    a.save();
                    res.send("1");    
                }
                else{
                    res.send("3");
                }
            }
        }
        else{
            res.send("0");
        }
    }
    catch(err){
        console.error("Error occurred while saving to database:", err);
        res.status(500).send("Internal Server Error");
    }
});



app.get("/cart",async(req,res)=>{                // <------
     const email = req.session.mail;
     const a = await Cart.find({Usermail:email});
     res.send(a);
})

app.post("/delete_cart_item",async(req,res)=>{
    const id = req.body.id;
    const mail = req.session.mail;
    const a = await Cart.deleteOne({classID:id,Usermail:mail});
    res.send(a);
})

app.get("/popular-instructors",async(req,res)=>{        // <------

})

app.get("/popular-classes",async(req,res)=>{
    const a = await Classes.find({status:"approved"}).sort({totalStudentEnrolled:-1}).limit(7);
    res.send(a);
})

app.get("/enrolled-classes",async(req,res)=>{        
    const email = req.session.mail;
    const a = await Enroll.find({Usermail:email});
    res.send(a);
})
app.get("/isapplied",async(req,res)=>{
    const mail = req.session.mail;
    const a = await Instructor.findOne({email:mail});
    if(a){
       if(a.status==="pending") res.send("1");
       else{res.send("2")}
    }
    else{res.send("0");}
})
app.post("/apply-instructor",async(req,res)=>{ 
    let mail = req.session.mail;         
    try{ 
        const z = await Instructor.findOne({email:mail});
        if(z){res.send("0");}
        else{
            const salt = await bcrypt.genSalt(10);
            const hPassword = await bcrypt.hash(req.body.password,salt);
            const a = new Instructor({
               name : req.body.name,
               email: req.body.email,
               password:hPassword,
               photoURL:req.body.Imageurl,
               gender:req.body.Gender,
               address:req.body.address,
               phone:req.body.mobile,
               experience:req.body.experience,
               status : "pending",
            });
            a.save();
            res.send("1")
        }
    }
    catch(err){
       console.error("Error",err);
       res.status(500).send("Internal Server Error");
    }
})
app.get("/admin",async(req,res)=>{
    let a = await Enroll.find({});
    let b = await Instructor.find({status:"approved"});
    let c = await Classes.find({status:"approved"});
    let d = await Classes.find({status:"pending"});
    let e = await Instructor.find({status:"pending"});
    let l1 = a.length;
    let l2 = b.length;
    let l3 = c.length;
    let l4 = d.length;
    let l5 = e.length;
    res.send([l1,l2,l3,l4,l5]);
})
app.get("/pending-instructor",async(req,res)=>{
    let arr = await Instructor.find({status:"pending"});
    res.send(arr);
})
app.get('/approved-instructor',async(req,res)=>{
    let arr = await Instructor.find({status:"approved"});
    res.send(arr);
})
app.get("/approved_classes",async (req,res)=>{
    const arr = await Classes.find({status:"approved"});
    res.send(arr);
})
app.post("/delete-class",async(req,res)=>{
    let id = req.body._id;
    console.log(id);
    let a = await Classes.deleteOne({_id:id});
    res.send("1");  
})

app.post("/reject-ins",async(req,res)=>{
    let id = req.body.id;
    let a = await Instructor.deleteOne({_id:id});
    res.send("1");
})
app.post("/approve-ins",async(req,res)=>{
    let id = req.body.id;
    let a = await Instructor.updateOne(
        {
            _id : id
        },
        {
            $set : {
                status : "approved"
            }
        }
    )
    res.send("1");
})
app.post("/new_class",async(req,res)=>{
    const name = req.body.className;
    const availableSeats = parseInt(req.body.totalSeats);
    const price = parseInt(req.body.price);
    const videoID = req.body.videoID;
    const description = req.body.description;
    const instructorName = req.body.instructorName;
    const instructorEmail = req.body.instructorEmail;
    const status = "pending";
    const totalStudentEnrolled = 0;
    const imageURL = req.body.imageURL;
    const c = new Classes({name,availableSeats,price,videoID,description,instructorName,instructorEmail,status,totalStudentEnrolled,imageURL});
    c.save();
    res.send("1");
})
app.get("/classes_by_instructor",async(req,res)=>{
    const instructorEmail = req.session.mail;
    const arr = await Classes.find({instructorEmail});
    res.send(arr);
})
app.get("/pending-classes",async(req,res)=>{
    let arr = await Classes.find({status:"pending"});
    res.send(arr);
})
app.post("/approve-class",async(req,res)=>{
    let id = req.body.id;
    let a = await Classes.updateOne(
        {
            _id : id
        },
        {
            $set : {
                status : "approved"
            }
        }
    )
    res.send("1");
})
app.post("/reject-class",async(req,res)=>{
    let id = req.body.id;
    let a = await Classes.deleteOne({_id:id});
    res.send("1");
})


app.listen(3000,()=>{
    console.log("Listening");
});