import { getUserId } from "../../utils/auth";

// @ts-ignore
export async function coffee(parent, args, context) {
    const { userId } = getUserId(context);

    if (!userId) {
        return new Error("coffee query: Not authenticated");
    } else {
        const user = await context.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                coffeeMachines: true,
            }
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
                coffeeMachine: true,
                prices: true,
                photo: true,
                configurations: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
        });

        return foundCoffee;
    }
}

// @ts-ignore
export async function coffeeDetail(parent, args, context) {
    const { userId } = getUserId(context);
    if (userId) {
        const foundCoffee = await context.prisma.coffee.findUnique({
            where: {
                id: args.id,
            },
            include: {
                configurations: {
                    orderBy: args.orderBy,
                }
            }
        });

        return foundCoffee;
    } else {
        return new Error("coffeeDetail: Not authenticated");
    }
}

// @ts-ignore
export async function coffeeMachines(parent, args, context) {
    const { userId } = getUserId(context);

    if (userId) {
        const user = await context.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: { coffeeMachines: true },
        });

        const foundMachines = user?.coffeeMachines || [];

        return foundMachines;
    }
}
