import userSchema , {IUser} from "../../models/userSchema/userSchema";
import Password, { IPassword, ISavedPassword } from "../../models/passwordSchema/passwordSchema";
import passwordSchema from "../../models/passwordSchema/passwordSchema";


export const findOne = async (email: string) => {
    try {
        const user = await userSchema.findOne({ email });
        return user;
    } catch (error) {
        throw new Error("Failed to find user by email");
    }
};

export const create = async (userData: IUser) => {
    try {
        const newUser = new userSchema(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw new Error("Failed to create user");
    }
};

export const UserFindById = async (userId: string) => {
    try {
      const user = await userSchema.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Failed to find user by ID');
    }
  };

export const PasswordFindById = async (userId:string) =>{
  try{
    console.log(userId)
    const user = await passwordSchema.findOne({userId:userId})
    console.log(user,"<<<<<<<")
    return user;
  }catch(error){
    throw new Error('Failed to find user by ID');
  }
}



  export const savePassword = async (userId: string, savedPasswordData: ISavedPassword) => {
    try {
        console.log(4)
        let password = await passwordSchema.findOne({ userId: userId });

        if (!password) {
          password = await passwordSchema.create({
            userId,
            savedPassword: [savedPasswordData],
          });
        } else {
          password.savedPassword.push(savedPasswordData);
          await password.save();
        }
    } catch (error) {
        console.log(error);
      throw new Error('Failed to save password');
    }
  };
