import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_GET_PERMISSIONS
} from "react-admin";
import { parseJwt } from "./utils/parsejwt";

//TODO: check if expired. refresh tokens.

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params;

    return fetch("/signin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //mode: 'no-cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ username, password }) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(token => {
        localStorage.setItem("username", token.token);
        const jwtDecoded = parseJwt(token.token);
        if (jwtDecoded) {
          localStorage.setItem(
            "permissions",
            jwtDecoded["https://hasura.io/jwt/claims"]["x-hasura-default-role"]
          );
          
          localStorage.setItem("id",jwtDecoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]);
          
          // localStorage.setItem("available_perms",JSON.stringify(jwtDecoded["https://hasura.io/jwt/claims"]["x-hasura-allowed-roles"]))
        }
      });
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("username");
    localStorage.removeItem("available_perms");
    return Promise.resolve();
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      localStorage.removeItem("available_perms");
      return Promise.reject();
    }
    const token = localStorage.getItem("username");
    if (!token) return Promise.reject();

    const jwtDecoded = parseJwt(token);
    if (jwtDecoded) {
      const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
      if (jwtDecoded.exp - nowUnixSeconds > 120) {
        return Promise.resolve();
      } else {
        return fetch("/refresh", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: 'same-origin', // include, *same-origin, omit
          //credentials: 'include',
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify({ token }) // body data type must match "Content-Type" header
        })
          .then(response => {
            if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
            }
            console.log("refreshing");
            return response.json();
          })
          .then(t => {
            localStorage.setItem("username", t.token);
            const jwtDecoded = parseJwt(t.token);
            if (jwtDecoded) {
              
              localStorage.setItem("id",jwtDecoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]);
              if(!localStorage.getItem("permissions")) {
              localStorage.setItem(
                "permissions",
                jwtDecoded["https://hasura.io/jwt/claims"][
                  "x-hasura-default-role"
                ]
              )};
             // localStorage.setItem("available_perms",JSON.stringify(jwtDecoded["https://hasura.io/jwt/claims"]["x-hasura-allowed-roles"]))
            }
          });
      }
    }
    return Promise.reject();
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    const token = localStorage.getItem("username");
    if (!token) return Promise.reject();

    const jwtDecoded = parseJwt(token);
    if (jwtDecoded) {
      const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
      if (jwtDecoded.exp - nowUnixSeconds > 30) {
        return Promise.resolve();
      } else {
        return fetch("/refresh", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: 'same-origin', // include, *same-origin, omit
          //credentials: 'include',
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify({ token }) // body data type must match "Content-Type" header
        })
          .then(response => {
            if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
            }
            console.log("refreshing");
            return response.json();
          })
          .then(t => {
            localStorage.setItem("username", t.token);
            localStorage.setItem("permissions",jwtDecoded["https://hasura.io/jwt/claims"]["x-hasura-default-role"]);
            localStorage.setItem("id",jwtDecoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]);
          });
      }
    } else {
      return Promise.reject();
    }
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem("permissions");
    return role ? Promise.resolve(role) : Promise.reject();
  }

  return Promise.reject("Unknown method: " + type);
};
