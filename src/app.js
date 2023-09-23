import express from "express";
//import cors from "cors";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from './config/passport.config.js';
//import db from "./database/index.js";
import handlebars from 'express-handlebars'
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
import ProductRouter from "./routes/product.routes.js";
import CartRouter from "./routes/cart.routes.js";
import ViewsRouter from "./routes/views.routes.js";
import sessionsRouter from "./routes/session.routes.js"
import usersRouter from "./routes/users.routes.js"
import './config.js'
import nodemailer from 'nodemailer';
import errorHandler from './middlewares/error.js'
import attachLogger from './middlewares/logger.js'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express'

const app = express();

app.use(attachLogger);

const PORT = process.env.PORT || 4000;
 mongoose.connect(process.env.URL_MONGO)
 app.listen(PORT,()=>console.log(`listening puerto on ${PORT}`))
/*app.listen(PORT, () => {
  console.log("Server funcionando en el puerto 4000");
  db();
});*/

const swaggerOptions = {
  definition:{
      openapi:'3.0.1',
      info:{
          title:"Documentacion Dave commerce ",
          description:"documentacion para API principal de Dave commerce"
      }
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine())
app.set ('views',`${__dirname}/views`)
app.set ('view engine','handlebars')


//app.use(cors());

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
app.use('/api/users',usersRouter)
app.use(errorHandler);

// Configura Handlebars como el motor de vistas
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));

app.use("/tienda", ViewsRouter);
app.use("/", ViewsRouter);
// ...

// Middleware para redirección
/*app.use((req, res, next) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.redirect('/login');
  } else {
    next();
  }
});*/


export default app;
