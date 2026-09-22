import express from "express";
const app = express();
const port = 4000;
app.get('/', (req, res) => {
    res.send("Hello!");
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map