import { getUserId } from "../../utils/auth";

// @ts-ignore
export async function coffee(parent, args, context) {
  try {
    const authenticated = getUserId(context);
    console.log("🚀 ~ userId", authenticated);
    const user = await context.prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: authenticated.userId,
      },
      include: {
        coffeeMachines: true,
      },
    });

    const { coffeeMachines } = user;

    const foundCoffee = await context.prisma.coffee.findMany({
      where: {
        coffeeMachine: {
          id: {
            equals: coffeeMachines[0].id,
          },
        },
      },
      orderBy: args.orderBy,
      include: {
        photo: true,
        coffeeMachine: true,
        address: true,
        prices: true,
        configurations: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return foundCoffee;
  } catch (error) {
    return error;
  }
}

// @ts-ignore
export async function coffeeDetail(parent, args, context) {
  const authenticated = getUserId(context);
  if (authenticated) {
    const foundCoffee = await context.prisma.coffee.findUnique({
      where: {
        id: args.id,
      },
      include: {
        configurations: {
          orderBy: args.orderBy,
        },
      },
    });

    return foundCoffee;
  } else {
    return new Error("coffeeDetail: Not authenticated");
  }
}

// @ts-ignore
export async function coffeeMachines(parent, args, context) {
  const authenticated = getUserId(context);

  if (authenticated) {
    const user = await context.prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: authenticated.userId,
      },
      include: { coffeeMachines: true },
    });

    const foundMachines = user?.coffeeMachines || [];

    return foundMachines;
  }
}
