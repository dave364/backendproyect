import express from "express";
import cors from "cors";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import initializePassport from './config/passport.config.js';
import db from "./database/index.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
import ProductRouter from "./routes/product.routes.js";
import CartRouter from "./routes/cart.routes.js";
import ViewsRouter from "./routes/views.routes.js";
import sessionsRouter from "./routes/session.router.js"
import './config.js'
import nodemailer from 'nodemailer';

const app = express();
app.use(express.static('src/public', { 
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use(cors());
app.use(express.json());

app.use(session({
  store: new MongoStore({
    mongoUrl: "mongodb+srv://castrodavid9872:ItNaMTm4F5cwWs0v@cluster364da.jqgneo9.mongodb.net/?retryWrites=true&w=majority",
    ttl: 3600,
  }),
  secret: "CoderS3cretFelis",
  resave: false,
  saveUninitialized: false
}))

export const transport = nodemailer.createTransport({
  service:'gmail',
  port:587,
  auth:{
      user:process.env.APP_EMAIL,
      pass:process.env.APP_PASSWORD
  }
})

app.use(passport.initialize());
initializePassport();

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use('/api/sessions',sessionsRouter);

// Configura Handlebars como el motor de vistas
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));

app.use("/tienda", ViewsRouter);
app.use("/", ViewsRouter);
// ...

// Middleware para redirección
app.use((req, res, next) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.redirect('/login');
  } else {
    next();
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server funcionando en el puerto 4000");
  db();
});

export default app;
