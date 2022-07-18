module.exports = {
  backend_server: "https://www.eventby.xyz/backend/apps/asset",

  frontend_server: "https://brlbd.com/apps/task/",

  registerNewUser: "/user/register-user",
  login: "/user/login-user",
  getAllUsers: "/user/get-users",
  updateUserRole: "/user/update-user-role",
  deleteUser: "/user/delete-user",

  // router.post(
  //   "/",
  //   utils.authenticateToken,
  //   controllers.asset.post.
  // );

  // router.get(
  //   "/",
  //   utils.authenticateToken,
  //   controllers.asset.post.
  // );

  // router.post(
  //   "/",
  //   utils.authenticateToken,
  //   controllers.asset.post.
  // );

  // router.post(
  //   "/",
  //   utils.authenticateToken,
  //   controllers.asset.post.
  // );

  // router.get("/", controllers.asset.post.);

  addNewItem: "/asset/add-item",
  getAllItems: "/asset/get-items",
  changeItemStatus: "/asset/change-item-status",
  deleteItem: "/asset/delete-item",
  getTotalItemCount: "/asset/get-item-count",

  addTagetAllItemsGlobalsk: "/asset/get-items-global",

  authorized_admin_emails: [
    "turzoxpress@gmail.com",
    "testsdfsdf324324sdf565675343534@gmail.com",
  ],
};
