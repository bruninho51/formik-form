import React from 'react';
import validation from './validation';
import DynamicForm from './DynamicForm';
import './App.css';

class App extends React.Component {
  render() {
    const fields = [
      {label: "Nome", type: "input", name: "firstName", value: ""},
      {label: "Sobrenome", type: "input", name: "lastName", value: ""},
      {label: "Rua", type: "input", name: "address", value: ""},
      {label: "Cidade", type: "input", name: "city", value: ""},
      {label: "Ocupação", type: "select", name: "ocuppation", data: ['Professor', 'Engenheiro', 'Programador', 'Médico', 'Advogado']},
      {label: "Mensagem", type: "textarea", name: "message", value: ""},
      {label: "Aceito os termos e condições", type: "checkbox", name: "terms", value: false}
    ];
    
    return (
      <div className="container">
        <DynamicForm fields={fields} validation={validation} />
      </div>
    );
  }
}

export default App;
