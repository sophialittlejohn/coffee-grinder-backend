import { getUserId } from "../../utils/auth";
import { makeId } from "../../utils/makeId";

// currently unused since users can only have one machine atm
// @ts-ignore
export async function createCoffeeMachine(parent, args, context, info) {
  // @ts-ignore
  const { userId } = getUserId(context);

  const coffeeMachineCode = makeId();

  if (userId) {
    const coffeeMachine = await context.prisma.coffeeMachine.create({
      data: {
        ...args,
        code: coffeeMachineCode,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await context.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        primaryMachine: coffeeMachine.id,
      },
    });

    return coffeeMachine;
  } else {
    throw new Error("createCoffeeMachine: Not authenticated");
  }
}

// @ts-ignore
export const connectCoffeeMachineToUser = async (parents, args, context) => {
  const { userId } = getUserId(context);

  const coffeeMachine = await context.prisma.coffeeMachine.update({
    where: { code: args.code },
    data: {
      users: {
        connect: {
          id: Number(userId),
        },
      },
    },
  });

  return coffeeMachine;
};
