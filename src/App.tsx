import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
bitcoin.initEccLib(ecc);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
