import userSchema , {IUser} from "../../models/userSchema/userSchema";
import passwordSchema from "../../models/passwordSchema/passwordSchema"

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