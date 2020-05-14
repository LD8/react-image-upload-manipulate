import React from "react";
import { Header } from "./components/Header";
import { FileUpload } from "./components/FileUpload";

function App() {
  return (
    <main className="d-flex flex-column container mt-n5">
      <Header />
      <FileUpload />
    </main>
  );
}

export default App;
