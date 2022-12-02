import * as cookie from 'cookie';
import { g as getSession, S as SESSION_NAME } from './_utils-7b4af845-9c81a495.js';
import 'dotenv';
import '@hapi/iron';

const handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");
  const user = await getSession(cookies[SESSION_NAME]);
  event.locals["user"] = user;
  const response = await resolve(event);
  return response;
};

export { handle };
//# sourceMappingURL=hooks-68a18f9d-761030da.js.map
