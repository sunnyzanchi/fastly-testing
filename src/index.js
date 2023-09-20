// import { Router } from "@fastly/expressly";

const EN_BACKEND = "docs_en";
const KR_BACKEND = "docs_kr";
const JP_BACKEND = "docs_jp";

addEventListener("fetch", (event) => {
  // Get the request from the client.
  const req = event.request;
  let backend;
  if (req.url.includes("/jp/")) {
    backend = JP_BACKEND
    req.headers.set("Host", "docswebsitejp.gtsb.io");
  } else if (req.url.includes("/kr/")) {
    backend = KR_BACKEND
    req.headers.set("Host", "docswebsitekr.gtsb.io");
  } else {
    backend = EN_BACKEND
    req.headers.set("Host", "docswebsiteen.gtsb.io");
  }

  const backendResponse = fetch(req, {
    backend,
  }).then((res) => console.log("res", res) || res);
  // Send the backend response back to the client.
  event.respondWith(backendResponse);

  // This is a minimal Compute@Edge app in JavaScript.  For alternative starter
  // code for your fiddle, see the code examples on our developer hub:
  // https://developer.fastly.com/solutions/examples/javascript/
});
// const router = new Router();

// router.get("/jp/(.*)", async (req, res) => {
//   // Send the request to the status backend.
//   console.log('hitting jp backend')
//   res.send(await fetch(req, {
//     backend: JP_BACKEND
//   }));
// });

// router.get("/kr/(.*)", async (req, res) => {
//   // Send the request to the homepage backend.
//   res.send(await fetch(req, {
//     backend: KR_BACKEND
//   }));
// });

// router.get("/(.*)", async (req, res) => {
//   // Send the request to the status backend.
//   res.send(await fetch(req, {
//     backend: EN_BACKEND
//   }));
// });

// // router.all("(.*)", (req, res) => {
// //   res.withStatus(404).send("The page you requested could not be found");
// // });

// router.listen();
