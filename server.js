import express from "express";  
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app = express();
app.use(express.json());
const port = 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
        }
    },
    apis: ['./server.js'] 
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get all users from the database
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   age:
 *                     type: integer
 */


app.get("/users", (req, res) => {
    res.json(users);
});
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A new user has been added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 */

app.post("/users", (req, res) => {
    const teamUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    users.push(teamUser);
    res.json({message: "user has been added", user: teamUser});
});
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A user has been updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     age:
 *                       type: integer
 * 404:
 *      description: A user has not been found
 *         
 */

app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((b)=> b.id === userId);
    if (!user) return res.status(404).json({message: "user not found"});
    user.name = req.body.name;
    user.age = req.body.age;
    res.json({message: "user has been updated", user: user});
});
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id to delete
 *     responses:
 *       200:
 *         description: A user has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * 404:
 *      description: A user has not been found
 *         
 */

app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((b)=> b.id !== userId);
    res.json({message: "user has been deleted",});
});



