import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "Bob" })
      server.create("user", { name: "Alice" })
    },

    routes() {
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.users.all()
      })

      this.get("/users-error", { errors: ['The site is down'] }, 500);


      this.get("/list", [
        {title: "this is a movie", id: '1'},
        {title: "why you did that", id: '2'},
        {title: "what's your name", id: '3'},
        {title: "you can't do it", id: '4'},
      ]);

      // this.get("/list", { errors: ['The page does not exist']}, 404);


      this.post("list", (schema, request) => {
        const requestBody = JSON.parse(request.requestBody);

        let list = [
          {title: "this is a movie", id: '1'},
          {title: "why you did that", id: '2'},
          {title: "what's your name", id: '3'},
          {title: "you can't do it", id: '4'},
        ];

        return list.filter((listItem) => listItem.title.toLowerCase().indexOf(requestBody.toLowerCase()) !== -1);
      })
    },
  })

  return server
}