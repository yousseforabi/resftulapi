import express from "express";  
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
});

let users = [
    {
        id: 1,
        name: "John ",
        age: "29"
    },
    {
        id: 2,
        name: "Jane",
        age: "25"
    }
]

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const teamUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    users.push(teamUser);
    res.json({message: "user has been added", user: teamUser});
});

app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((b)=> b.id === userId);
    if (!user) return res.status(404).json({message: "user not found"});
    user.name = req.body.name;
    user.age = req.body.age;
    res.json({message: "user has been updated", user: user});
});

app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((b)=> b.id !== userId);
    res.json({message: "user has been deleted",});
});



