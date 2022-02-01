import React, {Component} from "react";
import '../css/Lista.css'

export default class Lista extends Component{
    state = {
        data: [],
        username:"",
        id:"",
        cards:[
            {
                card_number: '1111111111111111',
                cvv: 789,
                expiry_date: '01/18',
            },
            {
                card_number: '4111111111111234',
                cvv: 123,
                expiry_date: '01/20',
            }
        ]
       
    }
    
    async componentDidMount(){
        
        let bodyApi = this.state
        const api = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'

        const response = await fetch(api)
        console.log('res ', response)

        const body = await response.json()
        console.log('body', body[0])
        bodyApi.data = body
        
        
        this.setState(bodyApi)
        
    }
    openPayment(item){
        document.getElementById("cm1").style.display = 'flex';
        console.log("USUARIO SELECIONADO", item)

        this.setState({username: item.name, id: item.id})
        
    }
    
    render(){
        const itens = this.state.data
        return(
            <div>
                <ul className="teste">
                    {itens.map((item, lista)=>
                        <li className="lista" key={lista }>
                            <div className="posicionamentoItens">
                                <div>
                                    <p>ID: {item.id}</p> 
                                    <img src={item.img} alt=""></img>
                                    <p>{item.username}</p>
                                </div>
                                <h4>{item.name}</h4>
                                <button onClick={()=> this.openPayment(item)}>PAGAR</button>
                            </div>

                        </li>
                    )}
                </ul>
                <div id="cm1" className="classModal">
                    <label>Pagando {this.state.username}</label>
                    <label>Valor do pagamento</label>
                    <input type="text"></input>
                    <label htmlFor="">Selecione o cartão</label>
                    <select>
                        <option value="1"></option>
                        <option value="2"></option>
                    </select>
                </div>
            </div>
        )
    }
}