import express from 'express';
import router from './routes/router.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use(express.static("./public"));

app.use("/api/products", router);

app.listen(6969, () => {
    console.log("Server is running on port 6969");
});