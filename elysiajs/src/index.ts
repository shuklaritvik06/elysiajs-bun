import { Elysia, t } from "elysia";
import { cookie } from "@elysiajs/cookie";
const app = new Elysia()
  .get("/:id", (context) => {
    console.log(context);
    return `Hello Elysia ${context.params.id}`;
  })
  .post(
    "/transform",
    ({ body }) => {
      return body;
    },
    {
      body: t.Object({
        name: t.String()
      }),
      transform: ({ body }) => {
        body.name = body.name + "hello";
      }
    }
  )
  .get("/", () => "Hello", {
    beforeHandle: ({ set, request: { headers } }) => {
      if (!headers) {
        set.status = 401;
        return "Unauthorized";
      }
    }
  })
  .decorate("decor", () => Date.now())
  .state({ counter: 10 })
  .derive(({ store }) => ({
    increase() {
      store.counter++;
    }
  }))
  .get("/state", ({ store, decor, increase }) => {
    console.log(store.counter);
    console.log(decor());
    console.log(increase());
  })
  .use(cookie())
  .get("/cookie", ({ setCookie }) => {
    setCookie("test", "hello", {
      httpOnly: true
    });
  })
  .guard(
    {
      body: t.Object({
        id: t.Number()
      })
    },
    (app) =>
      app.get("/routes/protected", ({ body }) => {
        console.log(body);
        return body;
      })
  )
  .post(
    "/data",
    ({ body }) => {
      console.log(body);
    },
    {
      body: t.Object({
        id: t.Number(),
        name: t.String()
      })
    }
  )
  .onRequest(({ request }) => {
    console.log(request);
  })
  .onResponse((response) => {
    console.log(response);
  })
  .onError(({ error }) => {
    console.log(error);
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
function increase() {
  throw new Error("Function not implemented.");
}
