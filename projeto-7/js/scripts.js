const btnArtilheirosPl = document.querySelector("#artilheirosPL");
const btnBrasileirao = document.querySelector("#brasileirao");
const btArtilheirosChampions = document.querySelector("#artilheirosChampions");
const btArtilheirosBrasileirao = document.querySelector("#brasileiraoArtilheiros");
const btArtilheirosCopaMundo = document.querySelector("#copaDoMundo");
const btnEquipesBr = document.querySelector("#equipesBrasileirao");
const modal = document.getElementById("quizModal");
const modalTitle = document.getElementById("quizTitle");
const quizForm = document.getElementById("quizForm");
const inputsContainer = document.getElementById("inputsContainer");
const feedback = document.getElementById("feedback");
const closeModal = document.querySelector(".close");


const quizzes = {
    artilheirosPL: {
      title: "Top 10 Artilheiros da Premier League 2017/2018",
      numInputs: 10,
      answers: [
        "Salah", "Harry Kane", "Aguero", "Vardy", "Sterling",
        "Lukaku", "Roberto Firmino", "Lacazette", "Gabriel Jesus", "Son"
      ]
    },
    campeoesBrasileirao: {
      title: "Adivinhe os maiores campeões do Brasileirão",
      numInputs: 10,
      answers: ["Palmeiras", "Santos", "Flamengo", "Corinthians", "São Paulo", "Cruzeiro", 
                "Vasco", "Fluminense", "Internacional", "Atlético Mineiro" ]
    },
    artilheirosChampions: {
        title: "Adivinhe o top 10 artilheiros da champions de 2016/2017",
        numInputs: 10,
        answers: ["Cristiano Ronaldo", "Messi", "Lewandowski", "Cavani", "Aubameyang", "Griezmann", 
                  "Mbappé", "Benzema", "Higuaín", "Falcão" ]
    },
    artilheirosDoBr: {
        title: "Adivinhe o top 10 artilheiros da história do Brasileirão",
        numInputs: 10,
        answers: ["Roberto Dinamite", "Fred", "Romário", "Edmundo", "Zico", "Diego Souza", 
                  "Túlio Maravilha", "Serginho Chulapa", "Dadá Maravilha", "Washington" ]
    },
    artilheirosCopaMundo: {
        title: "Adivinhe o top 10 artilheiros da história da Copa do Mundo",
        numInputs: 10,
        answers: ["Miroslav Klose", "Ronaldo", "Gerd Muller", "Just Fontaine", "Messi", "Pelé", 
                  "Mbappé", "Sándor Kocsis", "Jurgen Klinsmann", "Helmut Rahn" ]
    },
    timesDoBr: {
        title: "Adivinhe todos os times que participaram do Brasileirão de 2016",
        numInputs: 20,
        answers: ["Palmeiras", "Santos", "Flamengo", "Atlético Mineiro", "Botafogo", "Athletico Paranaense", 
                "Corinthians", "Ponte Preta", "Grêmio", "São Paulo",
                "Chapecoense", "Cruzeiro", "Fluminense", "Sport", "Coritiba", "Vitória", "Internacional",
                "Figueirense", "Santa Cruz", "América Mineiro"]
    },
      
  };

function normalize(str){
    return str.trim().toLowerCase();
}

//função para criar os inputs dinâmicamente

function generateInputs(num){
    inputsContainer.innerHTML = "";
    for(let i = 1; i <= num; i++){
        const div = document.createElement("div");
        div.className = "input-group";
        const label = document.createElement("label");
        label.setAttribute("for", `answer${i}`);
        label.textContent = `${i} `;
        const input = document.createElement("input");
        input.type = "text";
        input.id = `answer${i}`;
        input.name = `answer${i}`
        input.placeholder ="Digite o nome";
        div.appendChild(label);
        div.appendChild(input);
        inputsContainer.appendChild(div);
    }
}

 // Função para abrir o modal com o quiz selecionado
 function openQuiz(quizKey) {
    const quiz = quizzes[quizKey];
    modalTitle.textContent = quiz.title;
    feedback.textContent = "";
    // Gera os inputs de acordo com o número necessário
    generateInputs(quiz.numInputs);
    modal.style.display = "block";

    // Remova event listeners anteriores para evitar duplicação
    quizForm.onsubmit = (event) => {
      event.preventDefault();
      let allCorrect = true;
      for (let i = 0; i < quiz.answers.length; i++) {
        const input = document.getElementById(`answer${i + 1}`);
        const userAnswer = normalize(input.value);
        const correctAnswer = normalize(quiz.answers[i]);
        if (userAnswer === correctAnswer) {
          input.classList.remove("incorrect");
          input.classList.add("correct");
        } else {
          input.classList.remove("correct");
          input.classList.add("incorrect");
          allCorrect = false;
        }
      }
      feedback.textContent = allCorrect ? "Parabéns! Todas as respostas estão corretas." : "Algumas respostas estão incorretas, verifique os campos em vermelho.";
      feedback.style.color = allCorrect ? "white" : "white";
    };
  }

   // Eventos para os botões dos quizzes
   document.getElementById("artilheirosPL").addEventListener("click", () => openQuiz("artilheirosPL"));
   document.getElementById("brasileirao").addEventListener("click", () => openQuiz("campeoesBrasileirao"));
   document.getElementById("artilheirosChampions").addEventListener("click", () => openQuiz("artilheirosChampions"));
   document.getElementById("brasileiraoArtilheiros").addEventListener("click", () => openQuiz("artilheirosDoBr"));
   document.getElementById("copaDoMundo").addEventListener("click", () => openQuiz("artilheirosCopaMundo"));
   document.getElementById("equipesBrasileirao").addEventListener("click", () => openQuiz("timesDoBr"));

 
   // Fechar modal
   closeModal.addEventListener("click", () => {
     modal.style.display = "none";
   });
 
   window.addEventListener("click", (event) => {
     if (event.target === modal) {
       modal.style.display = "none";
     }
   });
