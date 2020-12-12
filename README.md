Nome: Nilo Conrado Messias Alves Cangerana  -  Número USP: 9805362  
Nome: Gabriel Caurin Corrêa  -  Número USP: 9805081

# Projeto de SSC0713 - Sistemas Evolutivos Aplicados a Robótica
## Reconhecimento Evolutivo de Strings

### Link para o vídeo:
[Vídeo](https://www.youtube.com/watch?v=CL7047u1Gvo&feature=youtu.be)

### Funcionamento:
O algoritmo consiste em tentar evoluir uma população de frases aleatórias até uma frase alvo passada pelo usuário do programa. O algoritmo inicia uma população de frases aleatórias e evolui até que a melhor solução seja encontrada.

### Instruções para execução:
O projeto foi feito em javascript, portanto basta abrir o arquivo **index.html** em qualquer navegador de internet.  
  
Ao iniciar, o programa possui uma caixa de texto onde pode-se escrever uma frase alvo na qual o algoritmo tentará evoluir frases aleatórias até atingir a frase alvo.  
  
Ao digitar a frase, clique no botão **Iniciar** para rodar o algoritmo. O algoritmo pode ser parado a qualquer momento clicando no botão **Parar**.  
  
Quando o algoritmo termina ou é parado, é mostrado um gráfico contendo o fitness do melhor de todos e o fitness médio da população em relação ao número de gerações. Também é mostrado na tela a melhor frase obtida, parâmetros como: taxa de mutação, número da população, fitness, número de gerações e uma tabela de 100 membros da geração inicial e 100 membros da geração atual. 
  
Para iniciar o algoritmo após terminado, basta recarregar a página do navegador.

### Explicação do Código:
O programa possui 3 classes:  
-Population.js: um objeto dessa classe é criado para representar a população no algoritmo. Possui um vetor que armazena todos os membros da população.  
-DNA.js: representa um membro da população. Possui uma string de caracteres do tamanho da frase alvo. Também possui uma variável que armazena o fitness desse membro.  
-sketch.js: essa classe é usada para iniciar o programa e mostrar os elementos na tela.  
  
O programa possui 2 arquivos extras:  
-index.html: uma página HTML para exibir informações na tela.  
-style.css: para configurar o estilo e a forma dos elementos dispostos na tela  
  
O programa inicia criando um objeto de Population.js que armazena a população. Todos os membros são gerados como um objeto de DNA.js, com letras aleatórias e seu fitness é calculado.  
O fitness é calculado como o número de letras corretas na posição correta em relação a frase alvo, dividido pelo tamanho da frase alvo. Esse valor é elevado a quarta potência para que o elemento com maior fitness em relação a outros possua uma vantagem exponencial, pois o valor do fitness influencia em quem será escolhido para se reproduzir.  
Todos os elementos são gerados e seus fitness são calculados e armazenados. Com a população gerada, o elemento que possui o maior fitness(melhor de todos) é armazenado.  
  
Com isso, o algoritmo precisa gerar a nova geração. Ele gera um vetor onde será armazenado todos os elementos da população em diferentes quantidades. Quanto maior o fitness, mais entradas os membros da população terão no vetor. O elemento com maior fitness possui a maior quantidade de entradas nesse vetor, possuindo mais chances de ser escolhido.  
Dois elementos são escolhidos aleatóriamente nesse vetor para gerar um filho através do crossover. Com os dois escolhidos, é realizado o crossover: um ponto aleatório na string de caracteres é escolhido e a metade da direita desse ponto vem de um elemento escolhido e a metade da esquerda vem do outro elemento escolhido e o filho é gerado com a concatenação dessas strings.  
  
O filho gerado pode sofrer mutação em sua string de caracteres. Cada caracter possui uma chance bem pequena(taxa de mutação) de se transformar em uma letra totalmente aleatória para manter a variabilidade. No caso do nosso programa, foi escolhido uma taxa de mutação de 1% e, caso o programa ultrapasse a marca de 1000 gerações criadas, a taxa de mutação é reduzida para 0.5%, isso faz com que a população possua menos variabilidade possibilitando que a solução seja encontrada mais rapidamente.  
  
É gerada uma quantidade de filhos suficiente para substituir toda a população com excessão do melhor de todos. E assim uma nova geração é criada.  
  
Com a nova geraçao criada, o programa repete o loop: calcula fitness de todos, armazena elementos no vetor em quantidades diferentes, escolhe elementos desse vetor, faz o crossover, mutação e assim por diante.  
  
O programa só termina corretamente quando o fitness do melhor de todos atinge o valor de 1, ou seja, o melhor de todos possui todas as letras certas na posição correta em relação a frase alvo.  
  
O código está todo comentado para maiores detalhes da implementação.
