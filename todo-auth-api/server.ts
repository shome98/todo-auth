import http from "http";
const server = http.createServer((req, res) => res.end("hello from test"));
server.listen(7890, () => console.log(`server running at http://localhost:7890/`));