// Etapa 2
async function chamarApi(query) {
    if (!query) return alert("Digite o produto");
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`; // Monta a URL para a API
    const response = await fetch(URL); // Faz a requisição à URL
    const data = await response.json(); // Converte a resposta para JSON
    return data.results; // Retorna somente a lista de produtos
}

async function pesquisarProduto() {
    const termoBusca = document.getElementById("inputBusca").value.trim(); // Pega o termo de busca digitado
    const produtos = await chamarApi(termoBusca);
    renderizarProdutos(produtos); // Chama a função renderizarProdutos com os dados retornados
};

document.getElementById("inputBusca").addEventListener("keyup", function(event) {
    if (event.key === "Enter") pesquisarProduto(); // Adiciona evento para realizar busca ao pressionar 'Enter'
});

function renderizarProdutos(produtos) {
    // Seleciona o container onde os produtos serão exibidos
    const container = document.getElementById('listaProdutos');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    if (produtos.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    produtos.forEach(function(produto) {
        const produtoDiv = document.createElement('div'); // Cria um div para o produto
        produtoDiv.classList.add('produto'); // Adiciona uma classe para estilização
        produtoDiv.innerHTML = `
            <h3>${produto.title}</h3>
            <img src="${produto.thumbnail}" alt="${produto.title}">
            <p>Preço: R$${produto.price}</p>
        `;

        const botaoAdicionar = document.createElement('button'); // Cria o botão "Adicionar ao Carrinho"
        botaoAdicionar.innerText = 'Adicionar ao Carrinho';
        botaoAdicionar.classList.add('btn-adicionar');
        produtoDiv.appendChild(botaoAdicionar);
        container.appendChild(produtoDiv);
    });
}
