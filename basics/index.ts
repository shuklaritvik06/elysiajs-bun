console.log(Bun.MD4.hash("Hello"));
console.log(Bun.MD5.hash("Hello"));
console.log(Bun.SHA1.hash("Hello"));
console.log(Bun.SHA224.hash("Hello"));
const transpiler = new Bun.Transpiler();
let code = transpiler.transformSync("const App= ()=>(<div>Hello World!</div>)");
console.log(code);
console.log(Bun.argv);
console.log(Bun.CryptoHasher.algorithms);
console.log(
  Bun.deepEquals(
    { name: "Hello", parents: { father: { name: "Ramesh", age: 23 } } },
    { name: "Hello", parents: { father: { name: "Ramesh", age: 23 } } },
    true
  )
);
let arr = Bun.allocUnsafe(23);
arr.set([1, 2, 3, 4, 5], 4);
console.log(arr);
console.log(
  Bun.dns.lookup("127.0.0.1").then((data) => {
    console.log(data);
  })
);
console.log(Bun.enableANSIColors);
// const server = Bun.listen({
//   hostname: "localhost",
//   port: 8080,

//   socket: {
//     data(socket, data) {
//       console.log(data.toString("utf-8"));
//     },
//     end(socket) {}
//   }
// });
// Bun.connect({
//   hostname: "localhost",
//   port: 8080,

//   socket: {
//     data(socket, data) {}
//   }
// }).then((socket) => {
//   socket.write("h");
//   socket.write("e");
//   socket.write("l");
//   socket.write("l");
//   socket.write("o");
//   socket.end();
// });

Bun.write("hello.json", '{ "name": "ramesh" }');
console.log(Bun.fileURLToPath(new URL("file:///hello.txt")));
Bun.gc(true);
Bun.deepMatch(
  { father: { name: "ramesh" } },
  { name: "rajesh", father: { name: "ramesh" } }
);
Bun.generateHeapSnapshot();
console.log(Bun.readableStreamToArray(Bun.file("./package.json").stream()));
Bun.serve({
  fetch(req: Request): Response | Promise<Response> {
    return new Response(Bun.file("./package.json").stream());
  },

  port: process.env.PORT || 3000
});
Bun.shrink();
console.log(
  Bun.readableStreamToJSON(Bun.file("./hello.json").stream()).then((data) => {
    console.log(data);
  })
);
console.log(
  Bun.inspect(
    { name: "Rakesh" },
    {
      colors: true
    }
  )
);
