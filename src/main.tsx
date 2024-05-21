import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);
// Amplify.configure(outputs, {
//   API: {
//     REST: {
//       headers: async () => {
//         return { 'X-Api-Key': "mALADPorAD8PmQHgORnii75uOedbKQca38fKkvk3Hide" };
//       }
//     }
//   }
// });
// const existingConfig = Amplify.getConfig();
// Amplify.configure({
//   ...existingConfig,
//   API: {
//     REST: outputs.custom.API,
//   },
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
