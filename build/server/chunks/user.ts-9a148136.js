import { c as createSessionCookie } from './_utils-7b4af845-9c81a495.js';
import 'cookie';
import 'dotenv';
import '@hapi/iron';

async function GET(evt) {
  try {
    console.log("$$$", evt);
    if (!evt.locals["user"]) {
      return {
        status: 200,
        body: {
          user: null
        }
      };
    }
    const user = evt.locals["user"];
    const cookie = await createSessionCookie(user);
    return {
      status: 200,
      headers: {
        "cache-control": "no-store",
        "set-cookie": cookie
      },
      body: {
        user
      }
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: {
          message: "Internal Server Error"
        }
      }
    };
  }
}

export { GET };
//# sourceMappingURL=user.ts-9a148136.js.map
