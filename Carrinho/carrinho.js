function renderizarCarrinho(){ // Obtém o conteúdo do carrinho armazenado no localStorage
    let storage = localStorage.getItem("carrinho");
    const main = document.getElementById("carrinho"); // Seleciona o elemento HTML onde o carrinho será exibido
    if (storage){  // Verifica se há dados no localStorage para o carrinho
        storage = JSON.parse(storage); // Converte o conteúdo do localStorage de uma string JSON para um objeto JavaScript
        storage.forEach(produto => { // repete cada produto armazenado no carrinho
            const divProduto = document.createElement("div");// Cria um novo elemento div para exibir os dados do produto
            divProduto.className="produto-carrinho"; // Define a classe CSS para estilizar o produto no carrinho
            // Define o conteúdo HTML do produto, incluindo título, imagem e preço
            divProduto.innerHTML=`  
            <h3>${produto.title}</h3>
            <img src="${produto.thumbnail}" alt="${produto.title}">
            <p>Preço: R$${produto.price}</p>           
            `;
            main.appendChild(divProduto);// Adiciona o elemento do produto à área principal do carrinho
        });
    } else {
        localStorage.setItem("carrinho", JSON.stringify([])); // Caso não exista, eu seto no LocalStorage um array vazio
    }
}

function valorTotal(){
    let storage = localStorage.getItem("carrinho");// Obtém o conteúdo do carrinho armazenado no localStorage
    const valorTotal = document.getElementById("valor-total"); // Seleciona o elemento HTML onde o valor total será exibido 
    let soma = 0 // Inicializa uma variável para acumular o total dos preços dos produtos
    if (storage){ // Verifica se há dados no localStorage para o carrinho
        storage = JSON.parse(storage); // retornou o dado para o seu tipo de origem ( array )
        storage.forEach(produto => { // cria um laço de repetição que passa pelos produtos
            soma = soma + produto.price
        });
        valorTotal.innerHTML=soma.toFixed(2);// Define o valor total, formatado com duas casas decimais, no elemento HTML
    }
}


renderizarCarrinho(); //chama a funçao de renderizar o carrinho
valorTotal(); // chama a funçao a soma dos valores
