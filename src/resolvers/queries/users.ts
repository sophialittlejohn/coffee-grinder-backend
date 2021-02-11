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
    const { userId } = getUserId(context);
    const user = await context.prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            coffeeMachines: true,
        },
    });

    return user;
}
