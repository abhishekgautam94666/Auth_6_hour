import { app } from "./app.js";
import { conneteDB } from "./data/database.js";

conneteDB();

app.listen(process.env.PORT, (req, res) => {
  console.log(
    `Server is Working on Port ${process.env.PORT} in ${process.env.NODE_ENV} Mde`
  );
});
