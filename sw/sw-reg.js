if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => {
        console.log("СВ зарегистрирован: ", reg);
      })
      .catch((err) => {
        console.error("Регистрация СВ провалилась: ", err);
      });
  });
}
