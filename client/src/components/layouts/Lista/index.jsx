import React from "react";
import "./Lista.css";

import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default class Lista extends React.Component {
  constructor() {
    super();
    this.state = {
        
      NewText: "",
      dados: JSON.parse(localStorage.getItem('lista')) || [],
    };
  }

  handleChange = (id, text) => {
    const dadosAtualizados = [...this.state.dados];
    dadosAtualizados.map((item) => {
      if (item.id === id) {
        item.text = text;
      }
      return item;
    });

    this.setState({ dados: dadosAtualizados });
  };

  HandleDelete = (id) => {
    var Array = [...this.state.dados];
    var i = this.state.dados.findIndex((x) => x.id === id);

    Array.splice(i, 1);
    this.setState({ dados: Array });

    this.MessageError("Item apagado");
  };

  HandleAdd = () => {
    if (!this.state.NewText) {
      return;
    }

    this.setState({
      dados: [
        ...this.state.dados,
        { id: this.state.dados.length, text: this.state.NewText },
      ],
    });
    this.setState({ NewText: "" });

    this.MessageSucces("Item adicionado");
  };

  ChangeText = (e) => {
    this.setState({ NewText: e.target.value });
  };

  keyPressed = (evt) => {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return key;
  };

  MessageSucces = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  MessageError = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  MessageInfo = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  HandleClickToEdit = () => {
    this.MessageInfo("Atualizando valor");
  };


  HandleSave = () =>{
    const JSONdados = JSON.stringify(this.state.dados)
    localStorage.setItem('lista',JSONdados)


    this.MessageSucces("Salvo com sucesso")
  }










  componentDidMount() {
    document.onkeydown = (event) => {
      const Key = this.keyPressed(event);

      if (Key === 13) {
        this.HandleAdd();
      }
    };


    
    this.MessageInfo("Lembre-se de salvar ao sair")


  }

  render() {
    return (
      <div className="ListaContainer">
        <ToastContainer />
        <div className="Options">
          <input
            type="text"
            value={this.state.NewText}
            onChange={this.ChangeText}
          />
          <button onClick={this.HandleAdd}>Adicionar</button>
          <button onClick={this.HandleSave}>Salvar</button>
        </div>
        <ul className="Lista">
          {this.state.dados.map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="text"
                  className="TextList"
                  value={item?.text}
                  onChange={(e) => {
                    this.handleChange(item.id, e.target.value);
                  }}
                  onClick={this.HandleClickToEdit}
                />
                <button
                  className="closebutton"
                  onClick={() => {
                    this.HandleDelete(item.id);
                  }}
                >
                  <IoClose />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
