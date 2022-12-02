import { m as magic } from './_magic-39494e99-319a3f29.js';
import { c as createSessionCookie } from './_utils-7b4af845-9c81a495.js';
import '@magic-sdk/admin';
import 'cookie';
import 'dotenv';
import '@hapi/iron';

async function POST(evt) {
  try {
    const didToken = magic.utils.parseAuthorizationHeader(evt.request.headers.get("authorization"));
    await magic.token.validate(didToken);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const cookie = await createSessionCookie(metadata);
    return {
      status: 200,
      headers: {
        "set-cookie": cookie
      },
      body: {
        user: metadata,
        token: didToken
      }
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: {
          message: "Internal Server Error",
          err
        }
      }
    };
  }
}

export { POST };
//# sourceMappingURL=login.ts-794e4e45.js.map
