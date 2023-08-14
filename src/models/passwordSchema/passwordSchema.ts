import mongoose, {Document,Schema ,Types } from "mongoose";

interface ISavedPassword extends Document {
    appName:String;
    userName:String;
    password:String

}

interface IPassword extends Document {
    userId:Types.ObjectId;
    savedPassword:ISavedPassword[]
}

const savedPasswordSchema:Schema<ISavedPassword> = new Schema({
    appName:{
        type:String
    },
    userName:{
        type:String
    },
    password:{
        type:String
    }
});

const passwordSchema:Schema<IPassword> = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    savedPassword:[savedPasswordSchema]
})

export default mongoose.model<IPassword>("Password",passwordSchema)











