import Users from '../model/Users';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: 'No Users Found' });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  let isUserExist;
  const { name, mail, password } = req.body;
  try {
    isUserExist = await Users.findOne({ mail });
  } catch (error) {
    console.log(error);
  }

  if (isUserExist) {
    return res.status(404).json({ message: 'The User Already Exist' });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new Users({
    name,
    mail,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { mail, password } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({ mail });
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: 'Please SignIn First' });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res
      .status(404)
      .json({ message: 'please enter the correct password' });
  }

  return res.status(200).json({ message: 'Login Succesfull' });
};
