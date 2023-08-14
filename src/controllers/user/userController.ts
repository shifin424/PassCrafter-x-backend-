import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  create,
  findOne,
} from "../../repositories/userRepositories/userRespositories";
import { IUser } from "../../models/userSchema/userSchema";

export const registerUser = async (req: Request, res: Response) => {
  const { userName, email, password }: IUser = req.body;

  try {
    // Check if the email already exists
    const existingUser = await findOne(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the user
    const userData: any = { userName, email, password: hashedPassword };
    const newUser = await create(userData);

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({ user: newUser.userName, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;
  try {
    const existingUser = await findOne(email);
    if (!existingUser) {
      return res.status(400).json({ error: "Email does not exist" });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ user: existingUser.userName, token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login User" });
  }
};
