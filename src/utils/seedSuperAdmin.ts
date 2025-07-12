import { envVars } from "../app/config";
import { IAuthProvider, IUser, Role } from "../app/modules/user/user.interface";
import { User } from "../app/modules/user/user.model";
import bcrypt from "bcrypt-ts";
export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.super_admin_email,
    });

    if (isSuperAdminExist) {
      console.log("super admin already exist");
    }
    console.log("Trying to create a super Admin");
    const hashedPassword = await bcrypt.hash(
      envVars.super_admin_password,
      Number(envVars.bcrypt_salt_round)
    );

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.super_admin_email,
    };
    const payload: IUser = {
      name: "Super admin",
      role: Role.SUPERADMIN,
      email: envVars.super_admin_email,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
      bookings: [],
      guides: [],
    };
    const superadmin = await User.create(payload);
    console.log("Super Admin Created Successfuly! \n");
    console.log(superadmin);
  } catch (error) {
    console.log(error);
  }
};
