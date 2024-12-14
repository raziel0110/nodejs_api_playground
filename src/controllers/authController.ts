import {Request, Response} from 'express';
import {User} from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send("User already exists.");
    }

    const pass = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: pass,
    });

    console.log(user);

    await user.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.log(err);

    res.status(500).send("An error occurred. Please try again.");
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred. Please try again.");
  }
};
