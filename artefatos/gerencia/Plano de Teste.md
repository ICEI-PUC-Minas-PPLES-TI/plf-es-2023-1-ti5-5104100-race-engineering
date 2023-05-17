

Test Plan Race Engineering


Introdução

Este projeto busca soluções para o gerenciamento estratégico de corridas de carros, superando as limitações das planilhas de Excel e dos métodos antiquados de monitoramento em papel. A utilização desses métodos pode comprometer o desempenho dos pilotos e afetar os resultados dos campeonatos. Além disso, dificulta a obtenção de controle e consulta dos dados pós-corrida. Com o intuito de resolver esses problemas, o projeto visa fornecer informações através de três perspectivas diferentes: pilotos, engenheiros de pista e engenheiros mecânicos, cada um com necessidades distintas durante uma corrida. Serão exibidas informações sobre o desempenho da corrida em diferentes visualizações, previsões climáticas, dados de tempo e voltas, além de um chat para comunicação entre os envolvidos. Isso permitirá um gerenciamento ágil e efetivo, minimizando erros humanos e facilitando a validação e monitoramento pré e pós-corridas.

Arquitetura


A arquitetura do projeto é baseada na utilização do React e Flutter no Front-End, usando o React para o desenvolvimento web e o Flutter para a parte mobile. O Node.js é escolhido para o desenvolvimento do Back-End, enquanto a comunicação entre as camadas é feita através do protocolo gRPC com Rest API. O Middleware é utilizado como intermediário para melhor eficiência e simplificação da manutenção do sistema. O PostgreSQL fora escolhido como o banco de dados devido à sua robustez, flexibilidade e confiabilidade, suportando grandes volumes de dados e alta demanda de acesso simultâneo, além de oferecer recursos avançados e ter uma comunidade ativa de desenvolvedores.
Funcionalidades

3.1	Web e Mobile


Funcionalidade
Cadastro
Comportamento Esperado
      Ao digitar o nome completo, email,  senha e o tipo de usuário, entre Analista, Piloto e Mecânico, irá efetuar um cadastro na plataforma e o usuário deverá ser redirecionado para a tela de login.

      Deve indicar o campo obrigatório a ser corrigido pelo usuário.
Verificações
Todos os campos devem ser obrigatórios
Senha mínimo 8 caracteres e no máximo 20
Exibir uma mensagem de confirmação em caso positivo.
Redirecionar o usuário para tela de login.
Exibir a mensagem de falha em caso do email ser existente. 
Exibir mensagem de falha no caso de campo obrigatório incompleto.
Critérios de Aceite
Senha entre 8 e 20 caracteres.
Todos os campos devem ser obrigatórios.
Exibir uma mensagem de confirmação em caso positivo.
Redirecionar o usuário para tela de login.
Exibir a mensagem de falha em caso de email existente.
Exibir mensagem de falha caso o campo obrigatório esteja incompleto.





Funcionalidade
Login
Comportamento Esperado
      Ao digitar seu usuário e senha corretamente, o usuário irá logar na plataforma e será direcionado para página inicial.


Verificações
Login no Sistema com sucesso
Usuário Inválido
Usuário não preencher campo obrigatório
Senha Incorreta
Senha Incorreta 3 vezes
Critérios de Aceite
Ter acessibilidade no sistema 



3.2	Web

Funcionalidade
Cadastro de Corridas
Comportamento Esperado
Ao clicar em cadastro na box chamada Corridas, deve-se digitar o Nome da Corrida, selecionar o Circuito, Selecionar o Analista, Selecionar os Corredores, Selecionar os Mecânicos, Selecionar os Times, Informar o Inícios da Corrida e Informar o Término da Corrida e por fim, o Total de Voltas, irá efetuar o cadastro da corrida na plataforma e o usuário deverá ser redirecionado para a tela inicial.

      Deve indicar o campo obrigatório a ser corrigido pelo usuário.
Verificações
Todos os campos devem ser obrigatórios
A data de término da Corrida não pode ser anterior ao início da corrida. 
Exibir uma mensagem de confirmação em caso positivo.
Redirecionar o usuário para tela inicial.
Exibir a mensagem de falha caso a data de término seja anterior a de início 
Exibir mensagem de falha no caso de campo obrigatório incompleto.
Critérios de Aceite
Data de término da corrida posterior à data de início
Todos os campos devem ser obrigatórios.
Exibir uma mensagem de confirmação em caso positivo.
Redirecionar o usuário para a tela inicial.
Exibir a mensagem de falha caso a data de término seja anterior à data de início da corrida
Exibir mensagem de falha caso o campo obrigatório esteja incompleto.





Funcionalidade
Listar Corrida
Comportamento Esperado
Ao clicar em listar na box chamada Corridas, o usuário irá ver uma lista com todas as Corridas Cadastradas e no canto direito de cada objeto, terá o botão de deletar.

Deve ser exibido o ícone de paginação, possibilitando ao usuário navegar entre as telas.

Deve ser exibido uma caixa de texto para o usuário realizar nova pesquisa.


Verificações


Critérios de Aceite









Funcionalidade
Deletar Corrida
Comportamento Esperado
Ao clicar em listar na box chamada Corridas, o usuário irá ver uma lista com todas as Corridas Cadastradas.

Ao clicar no botão Deletar, um formulário questionando se o usuário quer deletar ou não a corrida irá aparecer.


Verificações


Critérios de Aceite





Estratégia de Teste

Escopo de Testes

O plano de testes abrange todas as funcionalidades descritas na tabela acima. 

Serão executados testes em todos os níveis conforme a descrição abaixo.

Testes Unitários: o código terá uma cobertura de 60% de testes unitários, que são de responsabilidade dos desenvolvedores.
Testes de Integração: Serão executados testes de integração em todos os endpoints, e esses testes serão de responsabilidade do time de qualidade.
Testes Automatizados: Serão realizados testes end-to-end na funcionalidade de Login.
Testes Manuais: Todas as funcionalidades serão testadas manualmente pelo time de qualidade seguindo a documentação de Cenários de teste e destes TestPlan. 
Versão Beta: Será lançada uma versão beta para 3 usuários pré-cadastrados antes do release. 



Ambiente e Ferramentas

Os testes serão feitos do ambiente de homologação, e contém as mesmas configurações do ambiente de produção com uma massa de dados gerada previamente pelo time de qualidade.

As seguintes ferramentas serão utilizadas no teste:

Ferramenta  
Time 
Descrição 
Postman
Qualidade
Ferramenta para realização de testes de API
Jest
Desenvolvimento
Framework utilizada para testes unitários
Cypress
Qualidade
Ferramenta para testes end-to-end
Lighthouse
Desenvolvimento
Avaliação de performance e acessibilidade da aplicação
Gravador de Passos
Desenvolvimento
Prover evidências dos testes




Classificação de Bugs

Os Bugs serão classificados com as seguintes severidades:

ID 
Nivel de Severidade 
Descrição 
1
Blocker
Bug que bloqueia o teste de uma função ou feature causa crash na aplicação.
Botão não funciona impedindo o uso completo da funcionalidade.
Bloqueia a entrega.


2
Grave
Funcionalidade não funciona como o esperado
Input incomum causa efeitos irreversíveis


3
Moderada
Funcionalidade não atinge certos critérios de aceitação, mas sua funcionalidade em geral não é afetada
Mensagem de erro ou sucesso não é exibida
4
Pequena
Quase nenhum impacto na funcionalidade porém atrapalha a experiência 
Erro ortográfico
Pequenos erros de UI



Definição de Pronto 

Serão consideradas prontas as funcionalidades que passarem pelas verificações e testes descritas nestes TestPlan, não apresentarem bugs com a severidade acima de Minor, e passarem por uma validação de negócio de responsabilidade do time de produto.
