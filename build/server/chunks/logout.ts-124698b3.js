import { m as magic } from './_magic-40b9b235-f8c45b24.js';
import { r as removeSessionCookie } from './_utils-7b4af845-9c81a495.js';
import '@magic-sdk/admin';
import 'cookie';
import 'dotenv';
import '@hapi/iron';

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
//# sourceMappingURL=logout.ts-124698b3.js.map
