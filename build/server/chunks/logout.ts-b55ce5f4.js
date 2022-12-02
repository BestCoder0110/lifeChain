import { m as magic } from './_magic-0aa129fc-661400d2.js';
import { r as removeSessionCookie } from './_utils-7b4af845-9c81a495.js';
import 'cookie';
import 'dotenv';
import '@hapi/iron';
import 'crypto';

async function GET(event) {
  try {
    if (!event.locals["user"]) {
      return {
        status: 401,
        body: {
          error: {
            message: "Unauthorized"
          }
        }
      };
    }
    const cookie = removeSessionCookie();
    try {
      await magic.users.logoutByIssuer(event.locals["user"].issuer);
    } catch (err) {
      console.log("Magic session already expired");
    }
    return {
      status: 200,
      headers: {
        "cache-control": "no-store",
        "set-cookie": cookie
      },
      body: {}
    };
  } catch (err) {
    return {
      status: 401,
      body: {
        error: {
          message: "Unauthorized"
        }
      }
    };
  }
}

export { GET };
//# sourceMappingURL=logout.ts-b55ce5f4.js.map
