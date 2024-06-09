export const KEY_CACHE = {
  USERS: {
    GET_ALL: "USERS_GET_ALL",
  },
  FANCY_TEXT: {
    GET_PUBLIC: "FANCY_TEXT_GET_PUBLIC",
    GET_MINE: (id: string) => `FANCY_TEXT_GET_MINE_${id}`,
    GET_ONE: (id: string) => `FANCY_TEXT_GET_ONE_${id}`,
  },
};
