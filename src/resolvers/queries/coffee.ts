import { getUserId } from "../../utils/auth";

// @ts-ignore
export async function coffee(parent, args, context) {
    console.log("🚀 ~ coffee")
    const { userId } = getUserId(context);
    console.log("🚀 ~ userId", userId)

    if (!userId) {
        return new Error("coffee query: Not authenticated");
    } else {
        try {
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
                    photo: true,
                    coffeeMachine: true,
                    prices: true,
                    configurations: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                },
            });

            console.log("🚀 ~ foundCoffee", foundCoffee)
            return foundCoffee;
        } catch (error) {
            return error
        }
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
