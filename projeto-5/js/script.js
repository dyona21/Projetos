const formMultiplication = document.querySelector("#form-multiplication"); //selecionando o formMultiplication para adicionar um evento nele quando acontecer o submit
const numberInput = document.querySelector("#number"); //selecionando um dos números 
const number2Input = document.querySelector("#number2"); //selecionando um dos números
const operator = document.querySelector("#operation"); //selecionando o operador
const multiplicationTable = document.querySelector("#multiplication-operations"); //selecionando a table para limpar ela a cada operação e colocar conteúdo novo nela 

const operation = (numberInput, number2Input, operator) => {
    multiplicationTable.innerHTML = "";  //limpa a table para colocar o conteúdo novo
    let result = 0; 

    if (operator === "+") {
        result = numberInput + number2Input;
    } else if (operator === "-") {
        result = numberInput - number2Input;
    } else if (operator === "*" || operator === "x") {
        result = numberInput * number2Input;
    } else if (operator === ":" || operator === "/") {
        result = numberInput / number2Input;
    } else {
        alert("Operador inválido! Use +, -, * ou /.");
        return;
    }

    const template = `<div class="row">
        <div class="operation">${numberInput} ${operator} ${number2Input} = </div>
        <div class="result">${result}</div>
    </div>`; //realiza o "print na tela", é substituido no lugar do HTML depois

    const parser = new DOMParser();  //declara um parser
    const htmlTemplate = parser.parseFromString(template, "text/html"); //transforma de string para HTML
    const row = htmlTemplate.querySelector(".row"); //seleciona a classe row

    multiplicationTable.appendChild(row); //adiciona a classe row e seu conteúdo dentro da classe multiplication-table
};

formMultiplication.addEventListener("submit", (e) => {
    e.preventDefault();

    const number1 = Number(numberInput.value);  //transforma o valor dos inputs para inteiros
    const number2 = Number(number2Input.value); 
    const operator2 = operator.value; //pega o valor do input (esse é string)

    if (isNaN(number1) || isNaN(number2)) {
        alert("Digite números válidos.");
        return;
    }

    operation(number1, number2, operator2);
});
