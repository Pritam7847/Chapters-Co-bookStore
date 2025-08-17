import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';

//Import Routes
import bookRoutes from './routes/book.route.js';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config()

const PORT = process.env.PORT || 4001;

//Database Connection

const URL = process.env.dbUrl;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection failed:", err);
});

//Routes

app.use('/book', bookRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`)
})
