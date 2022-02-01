import { Component } from "react";
import "../css/modais.css";
import logoErrado from "../assets/erraado.png"
import logoCerto from "../assets/logoCerto.png"

export class EfetuarPagamento extends Component {
  render() {
    return (
      <>
        <div id="modalSucess">
          <div className="receipt">
            <span>Recibo de pagamento</span>
          </div>
          <div id="successfullyPaid">
            <span><strong>Pagamento realizado com sucesso</strong></span>
            <img src={logoCerto} alt="logo certo"></img>
          </div>
        </div>
        <div id="modalFail">
          <div className="receipt">
            <span>Recibo de pagamento</span>
          </div>
          <div id="failPaid">
            <span><strong>Pagamento não realizado</strong></span>
            <img src={logoErrado} alt="logo errado"></img>
          </div>
        </div>
      </>
    );
  }
}
