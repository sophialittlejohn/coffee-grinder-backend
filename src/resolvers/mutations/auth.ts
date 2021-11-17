import { APP_SECRET } from "../../utils/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { makeId } from "../../utils/makeId";

// @ts-ignore
export async function signup(parent, args, context, info) {
  try {
    const password = await bcrypt.hash(args.password, 10);
    const coffeeMachineCode = makeId();
    const user = await context.prisma.user.create({
      data: {
        ...args,
        password,
        coffeeMachines: {
          create: {
            name: "",
            brand: "",
            code: coffeeMachineCode,
          },
        },
      },
      include: {
        coffeeMachines: true,
      },
    });

    const token = await jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  } catch (error) {
    return error;
  }
}

// @ts-ignore
export async function login(parent, args, context, info) {
  try {
    const user = await context.prisma.user.findUnique({
      where: {
        email: args.email,
      },
      include: {
        coffeeMachines: true,
      },
    });

    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      return new Error("Invalid password");
    }

    const token = await jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  } catch (error) {
    return error;
  }
}
