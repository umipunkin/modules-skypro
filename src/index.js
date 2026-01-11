const http = require("http");
const url = require("url");
const UserModule = require("./modules/users.js");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const queryParams = parsedUrl.query;

  const paramKeys = Object.keys(queryParams);

  if ("hello" in queryParams) {
    const name = queryParams.hello;

    if (name && name.trim() !== "") {
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(`Hello, ${name}.`);
    } else {
      response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Enter a name");
    }
    return;
  }

  if ("users" in queryParams) {
    const users = UserModule.getUsers();
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify(users));
    return;
  }

  if (paramKeys.length === 0) {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Hello, World!");
    return;
  }

  response.writeHead(500);
  response.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
