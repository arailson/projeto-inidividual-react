import React, { Component } from "react";
import "../css/Lista.css";
// import { currencyMasck } from "./MascaraMoeda";
import { EfetuarPagamento } from "./EfetuarPagamento";
import axios from "axios";

export default class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      indexCartao: 0,
      cards: [
        {
          card_number: "1111111111111111",
          cvv: 789,
          expiry_date: "01/18",
        },
        {
          card_number: "4111111111111234",
          cvv: 123,
          expiry_date: "01/20",
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.currencyMasck = this.currencyMasck.bind(this);
  }

  async componentDidMount() {
    let bodyApi = this.state;
    const api = "https://www.mocky.io/v2/5d531c4f2e0000620081ddce";

    const response = await fetch(api);

    const body = await response.json();
    bodyApi.data = body;

    this.setState(bodyApi);
  }

  openPayment(item) {
    document.getElementById("cm1").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
    console.log("USUARIO SELECIONADO", item);

    this.setState({ item: item, username: item.name, id: item.id });
  }
  closePayment() {
    document.getElementById("cm1").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modalSucess").style.display = "none";
    document.getElementById("modalFail").style.display = "none";
  }
  handleChange(event) {
    this.setState({ indexCartao: event.target.value });
    console.log(event.target.value);
    console.log(this.state.indexCartao);
  }
  currencyMasck(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    event.target.value = value;
    console.log(value);
  }
  pay() {
    let valueTransation = document.querySelector("#myInput").value;
    let spanError = document.querySelector(".spanError");
    let eventerror = false;

    if (valueTransation === "") {
      eventerror = true;
      spanError.innerHTML = "Digite o valor";
    }
    if (!eventerror) {
      if (this.state.indexCartao === "0") {
        document.getElementById("cm1").style.display = "none";
        document.getElementById("modalSucess").style.display = "block";

        axios.post(
          "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",

          {
            card: (this.indexCartao),
            destination_user_id: (this.state.id),
            value: (valueTransation),

          })
          .then(function (response) {
          })
          .catch(function (error) {
              console.error(error);
          });
      } else if (this.state.indexCartao === "1") {
        document.getElementById("cm1").style.display = "none";
        document.getElementById("modalFail").style.display = "block";
      }
    }
  }

  render() {
    const itens = this.state.data;

    return (
      <div>
        <ul className="teste">
          {itens.map((item, lista) => (
            <li className="lista" key={lista}>
              <div className="posicionamentoItens">
                <div>
                  <p>ID: {item.id}</p>
                  <img src={item.img} alt=""></img>
                  <p>{item.username}</p>
                </div>
                <h4>{item.name}</h4>
                <button onClick={() => this.openPayment(item)}>PAGAR</button>
              </div>
            </li>
          ))}
        </ul>
        <div id="cm1" className="classModal">
          <span>
            <label>
              Pagando <strong>{this.state.username}</strong>
            </label>
          </span>
          <div className="itemModal">
            <label>Valor do pagamento</label>
            <input
              type="text"
              placeholder="R$"
              id="myInput"
              onChange={this.currencyMasck}
            ></input>
            <div style={{ color: "red" }} className="spanError"></div>
          </div>
          <div className="itemModal">
            <label htmlFor="">Selecione o cartão</label>
            <select onChange={this.handleChange}>
              {this.state.cards.map((card, options) => (
                <option value={options}>
                  Cartão com final: {card.card_number.substr(-4)}
                </option>
              ))}
            </select>
          </div>
          <button onClick={() => this.pay()}>Pagar</button>
        </div>
        <EfetuarPagamento />
        <div id="overlay" onClick={this.closePayment}></div>
      </div>
    );
  }
}
