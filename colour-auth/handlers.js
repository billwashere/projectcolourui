const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

const jwtKey = process.env.JWT_KEY || "a!NFDSKFMEI#E1RPOW#sdew325644321";
const HasuraKey = process.env.HASURA_KEY || "davina93!";
const jwtExpirySeconds = parseInt(process.env.JWT_EXPIRY, 10) || 900;

const url =
  process.env.AUTH_API || "https://colour.heisamachine.com/v1/graphql";

const signIn = async (req, res) => {
  // Get credentials from JSON body
  const { username, password } = req.body;

  const query = `
  query {
    check_password(args: {uname:${JSON.stringify(username)},pass:${JSON.stringify(password)}}, where: {locked: {_eq: false}, active: {_eq: true}, deleted: {_neq: true}, sec_role_maps: {deleted: {_eq: false}}}) {
      id
      sec_role_maps {
        sec_role {
          name
        }
        default
      }
    }
  }
`;

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HasuraKey
    },
    body: JSON.stringify({ query })
  };

  try {
    const results = await fetch(url, opts).then(res => res.json());
    console.log(results);
    // return 401 error is username or password doesn't exist, or if password does
    // not match the password in our records
    if (results.data.check_password.length === 0) {
      return res.status(401).end();
    }
    var user_roles = results.data["check_password"][0]["sec_role_maps"].map(
      x => x["sec_role"]["name"]
    );
    var default_user_role = results.data["check_password"][0]["sec_role_maps"]
      .map(x => (x["default"] ? x["sec_role"]["name"] : null))
      .filter(x => x !== null);
    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const token = jwt.sign(
      {
        name: username,
        admin: true,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": user_roles,
          "x-hasura-default-role": default_user_role[0],
          "x-hasura-user-id": results.data.check_password[0].id.toString()
        }
      },
      jwtKey,
      {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
      }
    );
    console.log("token:", token);

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
    res.json({ token: token });
    res.end();
  } catch (exception) {
    console.log(exception);
    return res.status(401).end();
  }
};

const welcome = (req, res) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const { token } = req.body;

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  res.send(`Welcome ${payload.user}!`);
};

const refresh = (req, res) => {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route
  console.log("payload");
  console.log(payload);
  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  console.log(nowUnixSeconds);
  if (payload.exp - nowUnixSeconds > 30) {
    res.json({ token: token });
  res.end();
    //return res.status(400).end();
  }

  //todo:check if user still valid
  console.log("payload");
  console.log(payload["https://hasura.io/jwt/claims"]);
  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign(
    {
      name: payload.name,
      admin: true,
      "https://hasura.io/jwt/claims": payload["https://hasura.io/jwt/claims"]
    },
    jwtKey,
    {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds
    }
  );

  // Set the new token as the users `token` cookie
  res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 });
  res.json({ token: token });
  res.end();
};

module.exports = {
  signIn,
  welcome,
  refresh
};
