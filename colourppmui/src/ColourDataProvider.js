import { GET_ONE, UPDATE } from "react-admin";

// A function decorating a dataProvider for handling user profiles
export const ColourDataProvider = dataProvider => (verb, resource, params) => {
  // I know I only GET or UPDATE the profile as there is only one for the current user
  // To showcase how I can do something completely different here, I'll store it in local storage
  // You can replace this with a customized fetch call to your own API route, too
  if (resource === "profile") {
    if (verb === GET_ONE) {
      return dataProvider(GET_ONE, "users", params)
    }

    if (verb === UPDATE) {
      return dataProvider(UPDATE, "users", params);
    }
  }

  // Fallback to the dataProvider default handling for all other resources
  return dataProvider(verb, resource, params);
};