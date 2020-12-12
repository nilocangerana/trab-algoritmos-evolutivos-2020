Nome: Nilo Conrado Messias Alves Cangerana  -  Número USP: 9805362  
Nome: Gabriel Caurin Corrêa  -  Número USP: 9805081

# Projeto de SSC0713 - Sistemas Evolutivos Aplicados a Robótica
## Reconhecimento Evolutivo de Strings

### Link para o vídeo:
[Vídeo](https://www.youtube.com/watch?v=CL7047u1Gvo&feature=youtu.be)

### Funcionamento:
O algoritmo consiste em tentar evoluir uma população de frases aleatórias até uma frase alvo passada pelo usuário do programa. O algoritmo inicia uma população de frases aleatórias e evolui até que a melhor solução seja encontrada.

### Instruções para execução:
O projeto foi feito em javascript, portanto basta iniciar o arquivo index.html em qualquer navegador de internet.  
  
Ao iniciar, o programa possui uma caixa de texto onde pode-se escrever uma frase alvo na qual o algoritmo tentará evoluir frases aleatórias até atingir a frase alvo.  
  
Ao digitar a frase, clique no botão **Iniciar** para rodar o algoritmo. O algoritmo pode ser parado a qualquer momento clicando no botão **Parar**.  
  
Quando o algoritmo termina ou é parado, é mostrado um gráfico contendo o fitness do melhor de todos e o fitness médio da população em relação ao número de gerações. Também é mostrado na tela a melhor frase obtida, parâmetros como: taxa de mutação, número da população, fitness, número de gerações e uma tabela de 100 membros da geração inicial e 100 membros da geração atual. 


### Explicação do Código:
O programa possui 3 classes:  
-Population.js: um objeto dessa classe é criado para representar a população no algoritmo. Possui um vetor que armazena todos os membros da população.
-DNA.js: representa um membro da população. Possui um vetor de caracteres do tamanho da frase alvo. Também possui uma variável que armazena o fitness desse membro.
-sketch.js: essa classe é usada para iniciar o programa e mostrar os elementos na tela.  
  
O programa inicia criando um objeto de Population.js
