function renderizarCarrinho() { 
    let storage = localStorage.getItem("carrinho");
    const main = document.getElementById("carrinho"); // Seleciona o elemento HTML onde o carrinho será exibido
    main.innerHTML = ''; // Limpa o conteúdo do carrinho antes de renderizar novamente
    if (storage) {  
        storage = JSON.parse(storage); // Converte o conteúdo do localStorage de uma string JSON para um objeto JavaScript
        storage.forEach(produto => { // Repete cada produto armazenado no carrinho
            const divProduto = document.createElement("div"); // Cria um novo elemento div para exibir os dados do produto
            divProduto.className = "produto-carrinho"; // Define a classe CSS para estilizar o produto no carrinho

            // Define o conteúdo HTML do produto, incluindo título, imagem e preço
            divProduto.innerHTML = `
                <h3>${produto.title}</h3>
                <img src="${produto.thumbnail}" alt="${produto.title}">
                <p>Preço: R$${produto.price.toFixed(2)}</p>
                <button class="btn-remover" onclick="removerProdutoCarrinho(${produto.id})">Remover</button>
            `;

            // Adiciona o elemento do produto à área principal do carrinho
            main.appendChild(divProduto);
        });
    } else {
        localStorage.setItem("carrinho", JSON.stringify([])); // Caso não exista, eu seto no LocalStorage um array vazio
    }

    atualizarQuantidadeItens(); // Atualiza a quantidade de itens no carrinho
}

function valorTotal() {
    let storage = localStorage.getItem("carrinho"); // Obtém o conteúdo do carrinho armazenado no localStorage
    const valorTotal = document.getElementById("valor-total"); // Seleciona o elemento HTML onde o valor total será exibido
    let soma = 0; // Inicializa uma variável para acumular o total dos preços dos produtos
    if (storage) { // Verifica se há dados no localStorage para o carrinho
        storage = JSON.parse(storage); // Retorna o dado para o seu tipo de origem (array)
        storage.forEach(produto => { // Cria um laço de repetição que passa pelos produtos
            soma += produto.price;
        });
        valorTotal.innerHTML = soma.toFixed(2); // Define o valor total, formatado com duas casas decimais, no elemento HTML
    }
}

function removerProdutoCarrinho(id) {
    let storage = localStorage.getItem("carrinho"); // Obtém o conteúdo do carrinho armazenado no localStorage
    if (storage) {
        storage = JSON.parse(storage); // Converte o conteúdo para um array de objetos
        // Filtra os produtos, removendo o item com o id passado como parâmetro
        const novosProdutos = storage.filter(produto => produto.id !== id);
        localStorage.setItem("carrinho", JSON.stringify(novosProdutos)); // Atualiza o localStorage com a lista de produtos atualizada
        renderizarCarrinho(); // Re-renderiza os itens do carrinho
        valorTotal(); // Atualiza o valor total após a remoção do item
    }
}

function atualizarQuantidadeItens() {
    let storage = localStorage.getItem("carrinho");
    const quantidadeItens = document.getElementById("quantidade-itens"); // Elemento que exibe a quantidade de itens
    let quantidade = 0;
    if (storage) {
        storage = JSON.parse(storage);
        quantidade = storage.length; // A quantidade é igual ao número de itens no array
    }
    quantidadeItens.innerHTML = `Quantidade de itens: ${quantidade}`; // Exibe a quantidade no elemento
}

function limparCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify([])); // Define o carrinho como um array vazio no LocalStorage
    renderizarCarrinho(); // Re-renderiza o carrinho vazio
    valorTotal(); // Atualiza o valor total para 0
    atualizarQuantidadeItens(); // Atualiza a quantidade de itens para 0
}

function finalizarCompra() {
    let storage = localStorage.getItem("carrinho");
    let quantidade = 0;
    let total = 0;

    if (storage) {
        storage = JSON.parse(storage);
        quantidade = storage.length; // Obtém a quantidade de itens
        storage.forEach(produto => total += produto.price); // Soma os preços
    }

    alert(`Total: R$${total.toFixed(2)}\nQuantidade de itens: ${quantidade}`); // Exibe o total e a quantidade em um alert
    limparCarrinho();
}

renderizarCarrinho(); // Chama a função de renderizar o carrinho
valorTotal(); // Chama a função para calcular o total do carrinho
