//Inicializacao de variaveis
let alvo; //frase alvo
let popmax; //tamanho da populacao
let taxaMutacao; //taxa de mutacao
let populacao; //objeto populacao

let melhorFrase; //melhor frase
let todasFrases; //todas frases atuais
let stats; //status do programa
let frasesIniciais; //frases iniciais geradas
let primeiraGeracao=0; //variavel da primeira geracao criada
let listaFitness =[]; //vetores para plotar o grafico
let listaGeracao =[];
let listaMediaFitness=[];
let terminou=0; //flag botao parar
let iniciar=0; //flag botao iniciar

//Funcao do botao iniciar
function inicializar(){ 
  alvo = document.getElementById('inputAlvo').value; //pega o valor da caixa de input
  popmax = 2000; //define tamanho da populacao
  taxaMutacao = 0.01; //define taxa de mutacao

  // Cria um objeto population com uma frase alvo, taxa de mutação e população máxima
  populacao = new Population(alvo, taxaMutacao, popmax);
  iniciar = 1; //ativa flag iniciar
}

function setup() {
  //plot do texto na tela
  melhorFrase = createP("Melhor Frase:");
  //melhorFrase.position(70,250);
  melhorFrase.class("melhor");
  melhorFrase.parent("divMelhor");

  frasesIniciais = createP("Primeira Geração:",true);
  frasesIniciais.class("all");
  frasesIniciais.parent("divLista");

  todasFrases = createP("Geração Atual:",true);
  todasFrases.class("all");
  todasFrases.parent("divLista");

  stats = createP("");
  //stats.position(70,600);
  stats.class("stats");
  stats.parent("divMelhor");
}

function draw() {
  if(iniciar==1) {
  // Gera o vetor acasalamento
  populacao.selecaoNatural();

  // Gera a proxima geracao
  populacao.novaGeracao();

  // Calcula o fitness da geracao
  populacao.calcFitness();

  //avalia o estado da geracao atual
  populacao.avaliar();

  // Se encontrarmos a frase alvo, para
  if (populacao.terminado()) {
    listaFitness.push(populacao.getFitness());
    listaGeracao.push(populacao.getGeracoes());
    listaMediaFitness.push(populacao.getFitnessMedio());
    noLoop();
    //plota o grafico
    var trace1 = {
        x: listaGeracao,
        y: listaFitness,
        type: 'scatter',
        name: 'Melhor Fitness'
      };
      
      var trace2 = {
        x: listaGeracao,
        y: listaMediaFitness,
        type: 'scatter',
        name: 'Fitness Médio'
      };
      
      var data = [trace1, trace2];
    
      var layout = {
        width: 950,
        height: 500,
    
        title: {
            text:'Gráfico',
            font: {
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          },
    
      xaxis: {
        title: {
          text: 'Gerações',
          font: {
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Melhor Fitness',
          font: {
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    };
      Plotly.newPlot('grafico', data,layout);
      document.getElementById('textoFim').innerHTML='Finalizado';
  }
  displayInfo();
}
}

//funcao do botao parar. Para o codigo e gera o grafico
function pararLoop() {
  listaFitness.push(populacao.getFitness());
  listaGeracao.push(populacao.getGeracoes());
  listaMediaFitness.push(populacao.getFitnessMedio());
  noLoop();
  //plota o grafico
  var trace1 = {
    x: listaGeracao,
    y: listaFitness,
    type: 'scatter',
    name: 'Melhor Fitness'
  };

  var trace2 = {
    x: listaGeracao,
    y: listaMediaFitness,
    type: 'scatter',
    name: 'Fitness Médio'
  };
  
  var data = [trace1, trace2];

  var layout = {
    width: 950,
    height: 500,

    title: {
        text:'Gráfico',
        font: {
          size: 24
        },
        xref: 'paper',
        x: 0.05,
      },

  xaxis: {
    title: {
      text: 'Gerações',
      font: {
        size: 18,
        color: '#7f7f7f'
      }
    },
  },
  yaxis: {
    title: {
      text: 'Melhor Fitness',
      font: {
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
};
  Plotly.newPlot('grafico', data,layout);
  document.getElementById('textoFim').innerHTML='Finalizado';
  displayInfo();
}


let i=1;
function displayInfo() {
  // Mostra os status da população atual na tela
  let answer = populacao.getMelhor();
    listaFitness.push(populacao.getFitness());
    listaGeracao.push(i);
    listaMediaFitness.push(populacao.getFitnessMedio());
    i++;
  melhorFrase.html("Melhor Frase:<br>" + answer);

  let statstext = "Total de Gerações:     " + populacao.getGeracoes() + "<br>";
  statstext += "Fitness Médio:       " + nf(populacao.getFitnessMedio()) + "<br>";
  statstext += "Melhor Fitness Atual:       " + populacao.getFitness() + "<br>";
  statstext += "Tamanho da Populacao:      " + popmax + "<br>";
  statstext += "Taxa de mutação:         " + populacao.getTaxaMutacao() * 100 + "%";

  stats.html(statstext);

  //mostra a lista da populacao inicial e atual
  if(primeiraGeracao==0)
  {
    frasesIniciais.html("Primeira Geração:<br>" + populacao.todasFrases())
    primeiraGeracao++;
  }
  todasFrases.html("Geração Atual:<br>" + populacao.todasFrases())
}