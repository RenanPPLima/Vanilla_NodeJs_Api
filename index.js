const http = require("http");

const users = [];

const server = http.createServer((request, response) => {

    if(request.url === "/users") {

        if(request.method === "GET"){
        return response.end (JSON.stringify(users));
        }

        if(request.method === "POST") {
            request.on("data", (data) => {
              const userData = JSON.parse(data); // have to parse because it comes in buffers if not parsed.
              
              const user = {
                id: "insert ID here - can use some interesting libs",
                ...userData,
              };

              users.push(user);
            })
            .on("end", () => {
            return response.end (JSON.stringify(users));
        });
      }

      if(request.url.startsWith("/users")) {
        if(request.method === "PUT") {
            const url = request.url;
            const splitUrl = url.split("/");

            const userId = splitUrl[2];

            const indexUser = users.findIndex((user) => user.id === userId);

            request.on("data", (data) => {
                const userData = JSON.parse(data);

                users[indexUser] = {
                    id: userId,
                    ...userData,
                };
            })
            .on("end", () => {
                return response.end(JSON.stringify(users))
        });
       }
      }
     }
});

server.listen("INSERT PORT NUMBER HERE (int)", () => console.log("Testing: Server is running"));