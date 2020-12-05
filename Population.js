
// Uma classe para descrever uma população de organismos virtuais
// Neste caso, cada organismo é apenas uma instância de um objeto de DNA

class Population {
    constructor(p, m, num) { //construtor do objeto population
  
      this.populacao; // Matriz para manter a população atual
      this.acasalamento; // vetor que usaremos para nosso "habitat de acasalamento"
      this.geracoes = 0; // Número de gerações
      this.termino = false; // Define se terminou de evoluir
      this.alvo = p; // Frase alvo
      this.taxaMutacao = m; // Taxa de mutação
      this.meta = 1; //variavel da meta
  
      this.melhor = ""; //variavel que guarda o melhor
      this.melhorTodos;
      this.melhorTodosIndex;
      this.melhorFitness=0; //variavel que guarda o melhor fitness da populacao
      this.trocaMutacao=0; //flag da troca da taxa de mutacao
  
      this.populacao = []; //inicializa a matriz
      for (let i = 0; i < num; i++) { //adiciona um novo objeto DNA ate a quantidade de membros da populacao
        this.populacao[i] = new DNA(this.alvo.length);
      }
      this.acasalamento = []; //inicializa o vetor
      this.calcFitness(); //calcula o fitness de cada membro
    }
  
    //calcula o valor do fitness para cada membro da população
    calcFitness() {
      for (let i = 0; i < this.populacao.length; i++) {
        this.populacao[i].calcFitness(alvo);
      }
    }

//calcula o melhor fitness dentro da populacao
    calcMelhorFitness() {
      let maxFitness = 0;
      let index=0;
      for (let i = 0; i < this.populacao.length; i++) {
        if (this.populacao[i].fitness > maxFitness) {
          maxFitness = this.populacao[i].fitness;
          index=i;
        }
      }
      this.melhorTodos=populacao[index];
      this.melhorTodosIndex=index;
      return maxFitness;
    }

    //retorna a taxa de mutacao
    getTaxaMutacao() {
      return this.taxaMutacao;
    }
  
    // Gerar o vetor de acasalamento
    selecaoNatural() {
      // Limpa a lista
      this.acasalamento = [];
      let index;
      let maxFitness = 0; //procura o melhor fitness da populacao
      for (let i = 0; i < this.populacao.length; i++) {
        if (this.populacao[i].fitness > maxFitness) {
          maxFitness = this.populacao[i].fitness;
          index=i;
        }
      }
      this.melhorTodos=populacao[index];
      this.melhorTodosIndex=index;

      //varia por todos membros da populacao
      for (let i = 0; i < this.populacao.length; i++) {
        //mapeia o valor do fitness do membro da populacao entre 0 e maxFitness
        let fitness = map(this.populacao[i].fitness, 0, maxFitness, 0, 1);
        //o novo valor mapeado é multiplicado por 1000 e o valor obtido(n) é o numero de vezes que o membro estara no vetor acasalamento. Membros com maior fitness obtem um valor maior de n e,
        //portanto tem mais deles no vetor. Assim, membros com maior fitness tem maior chance de serem escolhidos no vetor pois possuem mais entradas nele.
        let n = floor(fitness * 1000); // Multiplicador arbitrário
        for (let j = 0; j < n; j++) { // o membro é adicionado n vezes ao vetor acasalamento.
          this.acasalamento.push(this.populacao[i]);
        }
      }
    }
  
    // Cria uma nova geração
    novaGeracao() {

      //varia pelo tamanho da populacao para substitui-la pelos filhos.
      for (let i = 0; i < this.populacao.length; i++) {
        if(i!=this.melhorTodosIndex) {
          let a = floor(random(this.acasalamento.length)); //um valor aleatorio é escolhido entre 0 e o tamanho do vetor de acasalamento
          let b = floor(random(this.acasalamento.length)); //outro valor aleatorio é escolhido entre 0 e o tamanho do vetor de acasalamento
          let parceiroA = this.acasalamento[a]; //o parceiroA é escolhido pelo valor a obtido
          let parceiroB = this.acasalamento[b]; //o parceiroB é escolhido pelo valor b obtido
          //O parceiroA e B sao objetos DNA escolhidos do vetor acasalamento.addCarrinho
          //O filho é obtido com o crossover dos dois
          let filho = parceiroA.crossover(parceiroB);
          //o filho executa a funcao de mutacao
          filho.mutacao(this.taxaMutacao);
          //o membro i da populacao antiga é substituido pelo filho novo
          this.populacao[i] = filho;
      }
    }
      //o numero de geracoes é incrementado
      this.geracoes++;
    }
  
  //retorna a melhor frase
    getMelhor() {
      return this.melhor;
    }
  
    // avalia se a populacao atingiu o resultado esperado
    avaliar() {
      let melhorRecorde = 0.0;
      let index = 0;
      //calcula o fitness maximo
      for (let i = 0; i < this.populacao.length; i++) {
        if (this.populacao[i].fitness > melhorRecorde) {
          index = i;
          melhorRecorde = this.populacao[i].fitness;
        }
      }
  
      //compara o fitness maximo com a meta. Se forem iguais, o programa termina senão continua
      this.melhor = this.populacao[index].pegaFrase();
      if (melhorRecorde === this.meta) {
        this.termino = true;
      }

      //calcula o melhor fitness novamente.
      this.melhorFitness=populacao.calcMelhorFitness();
      //Se o programa esta na geracao 1000 ou mais,  melhor fitness é maior que 0.4 e a flag trocaMutacao for 0, a taxa de mutacao é diminuida para melhorar a evolução
      if(this.geracoes>1000 && this.melhorFitness>0.40 && this.trocaMutacao==0)
      {
        //diminui taxa e altera a flag trocaMutacao
        this.taxaMutacao=0.005;
        this.trocaMutacao=1;
      }
    }
  
    //retorna se terminou
    terminado() {
      return this.termino;
    }
  
    //retorna o numero de geracoes
    getGeracoes() {
      return this.geracoes;
    }
  
    // Calcular fitness médio para a população
    getFitnessMedio() {
      let total = 0;
      for (let i = 0; i < this.populacao.length; i++) {
        total += this.populacao[i].fitness;
      }
      return total / (this.populacao.length);
    }
  
    //retorna todas as frases da populacao
    todasFrases() {
      let sequencia = "";
  
      let limite = min(this.populacao.length, 100);
  
  
      for (let i = 0; i < limite; i++) {
        sequencia += this.populacao[i].pegaFrase() + "<br>";
      }
      return sequencia;
    }

    //retorna as frases geradas inicialmente
    frasesIniciais() {
        let sequencia = "";
    
        let limite = min(this.populacao.length, 100);
    
    
        for (let i = 0; i < limite; i++) {
          sequencia += this.populacao[0].pegaFrase() + "<br>";
        }
        return sequencia;
      }

      //retorna o fitness de um membro
      getFitness() {
          let fit=0;
        for (let i = 0; i < this.populacao.length; i++) {
            if(this.populacao[i].fitness>=fit)
            {
                fit=this.populacao[i].fitness;
            }
        }
        return fit;
      }
}

