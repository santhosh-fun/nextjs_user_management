export const routes = {
  login: "/login",
  home: "/",
  user: {
    list: "/users",
    add: "/users/add",
    update: (id: string) => `/users/update/${id}`,
  },
  team: {
    list: "/teams",
    create: "/teams/create",
  },
  department: "/departments",
  organization: "/organization",
  position: "/positions",
  role: "/roles",
};
