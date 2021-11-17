import { getUserId } from "../../utils/auth";

// @ts-ignore
export const createCoffee = async (parent, args, context) => {
  // @ts-ignore
  const { userId } = getUserId(context);
  const { coffeeMachineId, grams, price, photo, address, ...rest } = args;

  const prices =
    price && grams
      ? {
          create: {
            grams,
            price,
          },
        }
      : {};

  if (userId) {
    const newCoffee = await context.prisma.coffee.create({
      data: {
        ...rest,
        coffeeMachine: {
          connect: { id: Number(coffeeMachineId) },
        },
        prices,
        photo: {
          create: photo,
        },
        address: {
          create: address,
        },
      },
      include: {
        prices: true,
        photo: true,
        address: true,
      },
    });
    return newCoffee;
  } else {
    throw new Error("createCoffee - Not authenticated");
  }
};

// @ts-ignore
export const updateCoffee = async (parent, args, context) => {
  // @ts-ignore
  const { userId } = getUserId(context);

  if (userId) {
    const { id, grams, price, amount, size, status, ...rest } = args;
    const prices =
      price && grams
        ? {
            create: {
              grams,
              price,
            },
          }
        : {};

    const configurations =
      size && status && amount
        ? {
            create: {
              size,
              status,
              amount,
            },
          }
        : {};

    const updatedCoffee = await context.prisma.coffee.update({
      where: {
        id,
      },
      data: {
        ...rest,
        prices,
        configurations,
        updatedAt: new Date().toISOString(),
      },
      include: {
        prices: true,
        coffeeMachine: true,
        configurations: true,
        photo: true,
        address: true,
      },
    });
    return updatedCoffee;
  } else {
    throw new Error("updateCoffee - Not authenticated");
  }
};

// @ts-ignore
export const deleteCoffee = async (parents, args, context) => {
  // @ts-ignore
  const { userId } = getUserId(context);
  if (userId) {
    return await context.prisma.coffee.delete({
      where: {
        id: args.id,
      },
    });
  }
};
