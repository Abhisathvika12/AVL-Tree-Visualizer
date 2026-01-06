const express = require("express");
const AVLTree = require("./avlTree");

const app = express();
const tree = new AVLTree();

app.use(express.json());
app.use(express.static("public"));

app.post("/insert", (req, res) => {
    tree.insert(Number(req.body.value));
    res.json(tree.toObject());
});

app.post("/delete", (req, res) => {
    tree.delete(Number(req.body.value));
    res.json(tree.toObject());
});

app.post("/search", (req, res) => {
    const found = tree.search(tree.root, Number(req.body.value));
    res.json({ found });
});

app.listen(3000, () => {
    console.log("Running at http://localhost:3000");
});
