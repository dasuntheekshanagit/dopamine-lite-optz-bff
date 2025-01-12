import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./api/routes";


const app: Application = express();
const PORT: number = 8080;

app.use(bodyParser.json());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Dopamine Lite BFF" });
});

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
export default app;
  