import { getUserId } from "../../utils/auth";

// @ts-ignore
export const updateUser = async (parents, args, context) => {
  // @ts-ignore
  try {
    const { userId } = await getUserId(context);

    if (userId) {
      const user = await context.prisma.user.update({
        where: { id: userId },
        data: {
          ...args,
        },
        include: {
          coffeeMachines: true,
        },
      });
      return user;
    } else {
      return new Error("An error occured - update user");
    }
  } catch (error) {
    console.log("EROROROROR", error);
  }
};
