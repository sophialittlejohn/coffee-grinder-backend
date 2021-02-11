import jwt from "jsonwebtoken";
export const APP_SECRET = "SOMEthing-very-ranDOM";

// @ts-ignore
export function getUserId(context) {
  const Authorization = context.request.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    // @ts-ignore
    const { userId } = jwt.verify(token, APP_SECRET);
    return { userId };
  } else {
    throw new Error("getUserId: Not authenticated");
  }
}

