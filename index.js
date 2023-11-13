import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import cors from 'cors'
import userModels from './models/user.models.js';
import todoModels from './models/todo.models.js';



const app = express();





app.use(cors({

    credentials: true,
    origin: 'https://taskmanager-appp.netlify.app',

}));

app.use(express.json());

app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Database Connection failed', error.message);
});

























app.get('/profile', async (req, res) => {

    const { token } = req.cookies;

    console.log(token);
    if (token) {

        jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {

            if (err) throw err;

            const { email } = userDoc;
            const userInfo = await userModels.findOne({ email })

            res.json(userInfo);
        });

    }
    else {

        res.json(null);
    }


});
















app.get('/profile', async (req, res) => {

    const { token } = req.cookies;


    if (token) {

        jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {

            if (err) throw err;

            const { email } = userDoc;
            const userInfo = await userModels.findOne({ email })

            res.json(userInfo);
        });

    }
    else {

        res.json(null);
    }


});























app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await userModels.findOne({ email });

        if (!userDoc || !bcrypt.compareSync(password, userDoc.password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        else {
            jwt.sign({ email: userDoc.email }, jwtSecret, {}, (err, token) => {

                if (err) throw err;

                res.cookie('token', token, { httpOnly: true, }).json({ userDoc, token });
            });

        }

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});































app.post('/todos', async (req, res) => {

    const { title, todoDesc, userId, } = req.body;

    const TodoInfo = await todoModels.create({ title, description: todoDesc, userId });

    res.status(201).json(TodoInfo);
})







app.get('/Alltodos', async (req, res) => {

    const todoDoc = await todoModels.find().sort({ createdAt: -1 });;

    res.json(todoDoc);

    // console.log(todoDoc);

})




app.get('/getOneTodo/:id', async (req, res) => {

    const { id } = req.params;
    // console.log(id);
    try {

        const oneTodo = await todoModels.findById({ _id: id });

        res.json(oneTodo);
        // console.log(oneTodo);

    } catch (err) {

        console.log(err)
    }
})



app.put('/updateTodos/:id', async (req, res) => {
    const { title, todoDesc } = req.body;
    const { id } = req.params;
    // console.log(id)

    try {
        const updatedTodo = await todoModels.findByIdAndUpdate(
            id,
            { title, description: todoDesc },
            { new: true } // This option returns the modified document
        );

        if (updatedTodo) {
            // Respond with the updated todo
            res.json(updatedTodo);
            // console.log("updated")
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.delete('/deleteTask/:id', async (req, res) => {

    const { id } = req.params;
    // console.log(id)


    try {

        const data = await todoModels.findByIdAndDelete({ _id: id });
        res.json(data);
        // console.log(data);
    } catch (err) {

        if (err) throw err;

    }
})































const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`);
});














