import { useState } from "react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center">
      <div className="w-11/12 min-w-[320px] sm:w-2/6 h-max bg-slate-900 mt-5">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
