import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserService = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({
    name,
    email,
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
