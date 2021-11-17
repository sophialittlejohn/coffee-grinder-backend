import { getUserId } from "../../utils/auth";

// @ts-ignore
export async function users(parent, args, context, info) {
  const allUsers = await context.prisma.user.findMany({
    include: {
      coffeeMachines: true,
    },
  });

  return allUsers;
}

// @ts-ignore
export async function user(parent, args, context, info) {
  try {
    const data = await getUserId(context);
    if (data?.userId) {
      const user = await context.prisma.user.findUnique({
        where: {
          id: data.userId,
        },
        include: {
          coffeeMachines: true,
        },
      });
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log("ERRORRRR", error);
  }
}
