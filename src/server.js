const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ noCors: false });

const bodyParser = require("body-parser");

server.use(middlewares);
server.use(bodyParser());

server.post("/auth", async (req, res, next) => {
  const usersRes = await fetch("http://localhost:3001/users");
  const users = await usersRes.json();

  console.log(req?.body);
  const user = users.find((value) => value.email === req?.body?.email);

  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(401);
    res.send(401);
  }
});

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }

  next();
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});

const isAuthorized = (req) => {
  return true;
};
