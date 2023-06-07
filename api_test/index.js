const app = require("./server");
const { dataBase } = require("../db/index");

dataBase.sync().then(() =>
  app.listen(3001, () => {
    console.log("el servidor esta en el port 3001");
  })
);


