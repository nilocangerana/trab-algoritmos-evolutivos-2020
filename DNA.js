// Uma classe para descrever um pseudo-DNA, ou seja, genótipo
//   Aqui, o DNA de um elemento é um vetor de caracteres.

//gera um caracter aleatorio entre 32 e 122 da tabela ascii
function novoChar() {
    let c = floor(random(48, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 32;
    if (c === 60) c = 43;
    if (c === 62) c = 45;
  
    return String.fromCharCode(c);
  }
  
//classe DNA
  class DNA { //construtor do DNA
    constructor(num) {
      // Sequencia genetica
      this.genes = []; //vetor que mantem os caracteres que representam o gene
      this.fitness = 0; //fitness do elemento
      for (let i = 0; i < num; i++) {
        this.genes[i] = novoChar(); // para cada posicao do vetor gene é atribuido um caracter aleatorio
      }
    }
  
    // Converte a matriz de caracteres em uma String
    pegaFrase() {
      return this.genes.join("");
    }
  
    // Funcao para calcular o fintess (retorna ponto flutuante% de caracteres "corretos")
    calcFitness(alvo) {
      let pontuacao = 0; //passa por todas posicoes do vetor gene. Se a letra é igual e esta na posicao certa ao da frase alvo, ganha um ponto.
      for (let i = 0; i < this.genes.length; i++) {
        if (this.genes[i] == alvo.charAt(i)) {
          pontuacao++;
        }
      }
      this.fitness = pontuacao / alvo.length; //o fitness é calculado com a quantidade de pontos obtidos dividido pelo tamanho da frase alvo
      this.fitness = pow(this.fitness,4); //o valor é elevado a quarta
    }
  
    // Crossover
    crossover(parceiro) {
      // cria um filho novo
      let filho = new DNA(this.genes.length);
  
      let pntMed = floor(random(this.genes.length)); // Escolhe um ponto médio aleatorio do vetor gene
       // Metade de um, metade do outro
      for (let i = 0; i < this.genes.length; i++) {
        if (i > pntMed) filho.genes[i] = this.genes[i];
        else filho.genes[i] = parceiro.genes[i]; //adiciona ao vetor filho, metade de um e metade do outro
      }
      return filho; //retorna filho
    }
  
    // Com base em uma probabilidade de mutação, escolhe um novo caracter aleatório
    mutacao(taxaMutacao) {
      let qtdMutados=0;
      for (let i = 0; i < this.genes.length; i++) {
        if (random(1) < taxaMutacao) { //gera um numero randomico entre 0 e 1. Se o numero for menor que a taxa de mutacao, ocorre mutacao
          this.genes[i] = novoChar();
          qtdMutados++;
        }
      }
      /*if(qtdMutados==0) //se nenhum sofreu mutacao, ocorre 1 mutacao aleatoria
      {
        let x=floor(random(this.genes.length));
        this.genes[x]=novoChar();
      }*/
    }
  }