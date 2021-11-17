import { ContextParameters } from "graphql-yoga/dist/types";
import jwt from "jsonwebtoken";
export const APP_SECRET = "SOMEthing-very-ranDOM";

interface EnrichedJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const getUserId = (
  context: ContextParameters
): Promise<{ userId: string }> => {
  const Authorization = context.request.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, APP_SECRET) as EnrichedJwtPayload;
    console.log("➜ ~ payload", payload);
    if (payload.userId) {
      return Promise.resolve({ userId: payload.userId });
    } else {
      return Promise.reject(Error("[0] getUserId: Not authenticated"));
    }
  } else {
    return Promise.reject(Error("[1] getUserId: Not authenticated"));
  }
};

// integrate an auth0 service?
