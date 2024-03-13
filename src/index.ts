import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import connection from './models/db';

dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req: Request, res: Response) => {
  connection.connect();
  res.send("Express + TypeScript");
});

app.get('/users', function (req, res, next) {
  //query
  connection.query('SELECT * FROM users', function (err, rows) {
      if (err) {
          // req.flash('error', err);
          res.render('posts', {
              data: ''
          });
      } else {
          //render ke view posts index
          res.send(rows);
          // res.render('posts/index', {
          //     data: rows // <-- data posts
          // });
      }
  });
});

// app.use('/',)

// require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
app.listen(PORT, () => {
  // if (PORT.match(/[\.sock]+/g) !== null) {
  //   fs.chownSync(PORT, 33, 33)
  // }

  console.log(`Server listening on port ${PORT}`)
})