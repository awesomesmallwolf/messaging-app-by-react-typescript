import { User } from "./types";

export const getFullName = (user: User) => {
  const fullName = user.firstName + user.lastName;

  if (user.type !== 'Student') {
    return (user.salutation ?? '') + fullName;
  }

  return fullName;
};
