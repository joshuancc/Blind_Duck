import express from "express";
import apiV1Router from "./routes/v1/api-routes.js";

const PORT = 3000;
const app = express();

app.use(express.json())
app.use("/api/v1", apiV1Router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
