async function chamarApi(query) {
    if (!query) return alert("Digite o produto");
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`; // Monta a URL para a API
    const response = await fetch(URL); // Faz a requisição à URL
    const data = await response.json(); // Converte a resposta para JSON
    return data.results; // Retorna somente a lista de produtos
};

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

        botaoAdicionar.onclick=() => adicionarAoCarrinho(produto.title, produto.thumbnail, produto.price);
        produtoDiv.appendChild(botaoAdicionar);
        container.appendChild(produtoDiv);
    });
};

// Função para adicionar um item ao carrinho de compras
function adicionarAoCarrinho(title, thumbnail, price) {
    let storage = localStorage.getItem("carrinho"); // Recupera o carrinho armazenado no localStorage
    let id = 0; // Inicializa o id com 0

    if (storage) { // Verifica se o carrinho já existe no localStorage
        storage = JSON.parse(storage); // Converte o carrinho de volta para um array
        if (storage.length > 0) {
            id = storage[storage.length - 1].id + 1; // Atualiza o id com base no último produto
        }
    } else {
        storage = []; // Se não existir carrinho, inicializa um array vazio
    }

    // Cria um novo produto com o id único
    const novoProduto = { id: id, title: title, thumbnail: thumbnail, price: price };

    storage.push(novoProduto); // Adiciona o novo produto ao carrinho

    // Atualiza o localStorage com os dados do carrinho (agora com o novo produto)
    localStorage.setItem("carrinho", JSON.stringify(storage)); // Salva o carrinho atualizado no localStorage

    renderizarCarrinho(); // Atualiza a exibição do carrinho
    atualizarTotalCarrinho(); // Atualiza o total do carrinho
};

// Função para renderizar os produtos do carrinho
function renderizarCarrinho() {
    const carrinhoContainer = document.getElementById("cart-products"); // Seleciona o container do carrinho
    carrinhoContainer.innerHTML = ''; // Limpa o carrinho antes de adicionar os itens novamente

    let storage = localStorage.getItem("carrinho"); // Recupera o carrinho do localStorage
    if (storage) { // Verifica se o carrinho existe no localStorage
        storage = JSON.parse(storage); // Converte o carrinho de volta para um array
        storage.forEach(item => { // Percorre cada item do carrinho
            const itemCarrinho = document.createElement("div"); // Cria um contêiner para o item do carrinho
            itemCarrinho.classList.add("item-carrinho"); // Classe para estilizar itens no CSS

            // Cria e adiciona a imagem do produto
            const imagem = document.createElement("img");
            imagem.src = item.thumbnail;
            imagem.alt = item.title;
            itemCarrinho.appendChild(imagem);

            // Cria e adiciona o título do produto
            const titulo = document.createElement("p");
            titulo.innerText = item.title;
            itemCarrinho.appendChild(titulo);

            // Cria e adiciona o preço do produto
            const preco = document.createElement("p");
            preco.innerText = `R$ ${item.price.toFixed(2)}`;
            itemCarrinho.appendChild(preco);

            // Cria e adiciona o botão de remover
            const botaoRemover = document.createElement("button");
            botaoRemover.innerText = "X";
            botaoRemover.classList.add("btn-remover");
            botaoRemover.onclick = () => removerDoCarrinho(item.id); // Chama a função para remover o produto do carrinho
            itemCarrinho.appendChild(botaoRemover);

            // Adiciona o item ao carrinho
            carrinhoContainer.appendChild(itemCarrinho);
        });
    } else {
        // Se não existir carrinho, atribui um array vazio
        storage = [];
    }
}

// Função para remover um produto do carrinho
function removerDoCarrinho(id) {
    let storage = localStorage.getItem("carrinho"); // Recupera o carrinho armazenado no localStorage

    if (storage) { // Verifica se o carrinho existe no localStorage
        storage = JSON.parse(storage); // Converte o carrinho de volta para um array
        // Filtra os produtos, removendo o item com o id especificado
        storage = storage.filter(item => item.id !== id);

        // Atualiza o localStorage com a lista de produtos atualizada
        localStorage.setItem("carrinho", JSON.stringify(storage)); // Salva o carrinho atualizado no localStorage
    }

    renderizarCarrinho(); // Atualiza a exibição do carrinho
    atualizarTotalCarrinho(); // Atualiza o total do carrinho após a remoção
}

// Função para atualizar o total do carrinho
function atualizarTotalCarrinho() {
    let storage = localStorage.getItem("carrinho"); // Recupera os produtos do carrinho
    let total = 0; // Inicializa o total

    if (storage) {
        storage = JSON.parse(storage); // Converte o carrinho de volta para um array
        storage.forEach(item => {
            total += item.price; // Soma o preço de cada produto
        });
    }

    // Seleciona o elemento HTML que exibirá o total
    const totalPriceElement = document.getElementById("total-price");

    // Se o carrinho estiver vazio, exibe 0,00
    if (!storage || storage.length === 0) {
        totalPriceElement.innerText = `Total: R$ 0,00`;
    } else {
        totalPriceElement.innerText = `Total: R$ ${total.toFixed(2)}`; // Exibe o total com 2 casas decimais
    }
}

// Função chamada quando a página é recarregada
function reloadPage() {
    renderizarCarrinho(); // Renderiza os produtos do carrinho após o carregamento da página
    atualizarTotalCarrinho(); // Atualiza o total do carrinho
}

function carregarMensagemBoasVindas() {
    // Buscar os dados do usuário no localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
        // Converter a string JSON em objeto
        const { nome } = JSON.parse(userData);

        // Atualizar o elemento com o nome do usuário
        const userNameElement = document.getElementById("user-name");
        userNameElement.textContent = nome;
    }
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarMensagemBoasVindas);


reloadPage(); // Chama a função para renderizar o carrinho ao recarregar a página
