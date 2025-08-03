import express from 'express'
import cors from 'cors' 
import cookieParser from 'cookie-parser'; 
import userRouter from './routes/user.routes.js';
import snippetRouter from './routes/snippet.routes.js';
import summaryRouter from './routes/summary.route.js';

const app = express(); 

app.use(cors({
  origin: [process.env.CORS_ORIGIN, "http://localhost:5173"], // or 3000 based on Vite config
  credentials: true,
}));

app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({
    extended : true, // object inside object
    limit : '16kb'
}))

app.use(cookieParser());

//route middlewares :
app.use('/api/v1/users' ,userRouter );
app.use('/api/v1/snippets',snippetRouter);
app.use('/api/v1/summarize',summaryRouter)

export {
    app
}