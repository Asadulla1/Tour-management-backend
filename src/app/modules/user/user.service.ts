import { envVars } from "../../config";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import { hash } from "bcrypt-ts";
const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("User Already Exist");
  }

  // hashing the password
  const hashedPassword = await hash(
    password as string,
    Number(envVars.bcrypt_salt_round)
  );
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUserCount = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUserCount,
    },
  };
};

export const UserServices = {
  createUser: createUserService,
  getAllUsers,
};
