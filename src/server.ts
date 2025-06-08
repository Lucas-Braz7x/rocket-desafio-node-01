import http from "node:http";

import { json } from "./middlewares";
import { routes } from "./routes";
import { extractQueryParams } from "./utils";

const server = http.createServer(async (req: any, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3000);

console.log("Server is running in port 3000");
