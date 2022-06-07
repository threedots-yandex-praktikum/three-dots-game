const { secureServer } = require("./dist/server.js");
const port = process.env.PORT || 4000;

secureServer.listen(port, () => {
  console.log(
    "Application is started on https://local.ya-praktikum.tech",
    port
  );
});
