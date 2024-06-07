import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/Yoga");
export const connection = mongoose.connection;
const UserSchema = new mongoose.Schema({
    name : String,
    email:String,
    password:String,
    photoURL:String,
    gender:String,
    address:String,
    phone:String,
})

const InstructorSchema = new mongoose.Schema({
    name : String,
    email:String,
    password:String,
    photoURL:String,
    gender:String,
    address:String,
    phone:String,
    experience : String,
    status : String,
})


const ClassesSchema = new mongoose.Schema({
    name : String, 
    availableSeats : Number, 
    price : Number ,
    videoID : String,
    description : String,
    instructorName : String, 
    instructorEmail : String, 
    status : String,        
    totalStudentEnrolled : Number,
    imageURL :String
})
const AdminSchema = new mongoose.Schema({
    name : String,
    email:String,
    password:String,
})
const CartSchema = new mongoose.Schema({
    classID : String,
    Usermail : String
})
const EnrollSchema = new mongoose.Schema({
    classID : String,
    Usermail : String
})
UserSchema.index({email:1,role:1},{unique:true});
EnrollSchema.index({ Usermail: 1, classID: 1 }, { unique: true });
CartSchema.index({ Usermail: 1, classID: 1 }, { unique: true });

export const user = mongoose.model("user",UserSchema);
export const Classes = mongoose.model("Classes",ClassesSchema);
export const Cart = mongoose.model("Cart",CartSchema);
export const Enroll = mongoose.model("Enroll",EnrollSchema);
export const Admin = mongoose.model("Admin",AdminSchema);
export const Instructor = mongoose.model("Instructor",InstructorSchema);