import { serialize } from 'cookie';
import dotenv from 'dotenv';
import Iron from '@hapi/iron';

dotenv.config();
const SESSION_NAME = "session";
const SESSION_LENGTH_MS = Number.parseInt(process.env["SESSION_LENGTH_MS"]);
const MAGIC_SECRET_KEY = process.env["MAGIC_SECRET_KEY"];
const ENCRYPTION_SECRET = process.env["ENCRYPTION_SECRET"];
async function encrypt(data) {
  return data && Iron.seal(data, ENCRYPTION_SECRET, Iron.defaults);
}
async function decrypt(data) {
  return data && Iron.unseal(data, ENCRYPTION_SECRET, Iron.defaults);
}
async function createSessionCookie(data) {
  const session = await encrypt(data);
  return serialize(SESSION_NAME, session, {
    maxAge: SESSION_LENGTH_MS / 1e3,
    expires: new Date(Date.now() + SESSION_LENGTH_MS),
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    path: "/",
    sameSite: "lax"
  });
}
async function getSession(cookie) {
  return await decrypt(cookie);
}
function removeSessionCookie() {
  return serialize(SESSION_NAME, "", {
    maxAge: -1,
    path: "/"
  });
}

export { MAGIC_SECRET_KEY as M, SESSION_NAME as S, createSessionCookie as c, getSession as g, removeSessionCookie as r };
//# sourceMappingURL=_utils-7b4af845-9c81a495.js.map
