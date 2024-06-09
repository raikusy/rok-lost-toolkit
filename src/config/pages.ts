export const PAGES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  CREATE_TEMPLATE: "/create-template",
  EDIT_TEMPLATE: (id: string) => `/edit-template/${id}`,
  VIEW_TEMPLATE: (id: string) => `/view-template/${id}`,
  PUBLIC_TEMPLATES: "/public-templates",
};
