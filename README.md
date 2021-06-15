<h1> Desenvolvimento de CRUD para Teste Back-End </h1>

<h3>Resumo:</h3>
Com a inteção de desenvolver um CRUD foi necessario criar um modelo e meio para aplicar as funcionalidades requisitadas. Assim foi criado uma API utilizando Js, mongoDB e HTML, que simula um sistema de cadastro de cervejas. 
É possivel cadastrar marcas, tipos, garrafas e as cervejas em si, assim como editar e remover. 
Os comandos de tipo GET são publicos, então não é necessario logar para ver os dados, apenas para inserir e modificalos (POSTs).

<h3>Funcionalidades:</h3>
- Proteção em POSTs usando JWT<br>
- Validação de entrada para campos obrigatoriamente numericos<br>
- Inserção/Modificação/Remoção/Pesquisa de cervejas<br>
- Consulta de cervejas<br>
- Visualização de quantidades <br>

<h3>Comandos:</h3>
Foram o mais padronizados possiveis.<br>
sendo:<br>

<h4> /ver_XXX.html </h4>
Função de obter itens que retorna um HTML listando os itens, XXX podendo ser [cervejas, garrafas, tipos, marcas]

<h4> /ver_XXX.html/adicionar </h4>
Função de adicionar item, XXX podendo ser [cervejas, garrafas, tipos, marcas] e adicionando os dados obtidos no HTML

<h4> /edit_XXX.html </h4>
Função de obter itens que retorna um HTML listando os itens, XXX podendo ser [cervejas, garrafas, tipos, marcas], dando a opção de remoção

<h4> /edit_XXX.html/remover </h4>
Função de deletar itens, XXX podendo ser [cervejas, garrafas, tipos, marcas], e removendoo os dados baseados no ID inserido no HTML

<h4> /edit_cervejas.html/edit </h4>
Função de editar um item baseado nos dados inseridos no HTML, exclusivo para o collection "Cervejas"

<h4> /pesquisa_cervejas.html </h4>
Retorna um HTML onde é possivel definir parametros para filtrar os itens

<h4> /pesquisa_cervejas.html/pesquisar </h4>
Função de filtrar os itens baseado nas entradas dadas no HTML

<h4> /login.html </h4>
Retorna um HTML onde é possivel inserir dados de login

<h4> /login.html/logar </h4>
Função de verificação de usuario e definição de token

<h2>Como rodar:</h2>
A aplicação foi desenvolvida na base do express tornando facil de utilizar.<br>
Basta realiza um 

```
cd "diretorio da pasta"
node main.js
```

Então entrar em http://localhost:3000/<br>
Para utilizar as funções protegidas basta logar utilizando o usuario: "usuario", senha: "senha"

<br>
<br>
<br>
<br>

Caso queira testar fique a vontade para editar/inserir/remover itens do BD :) <br>
Estou a disposição para qualquer duvida ou problema que acontecer.
<h4>Desenvolvido por João Vitor Specht Kogut </h4>
