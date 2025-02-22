export const KEY_CACHE = {
  USERS: {
    GET_ALL: "users:get-all",
  },
  FANCY_TEXT: {
    GET_PUBLIC: "fancy-text:get-public",
    GET_MINE: (id: string) => `fancy-text:get-mine:${id}`,
    GET_ONE: (id: string) => `fancy-text:get-one:${id}`,
    GET_ALL: "fancy-text:get-all",
  },
} as const;
