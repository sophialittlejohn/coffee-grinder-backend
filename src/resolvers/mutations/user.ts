import { getUserId } from "../../utils/auth";

// @ts-ignore
export const updateUser = async (parents, args, context) => {
    const { userId } = getUserId(context);

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
};
