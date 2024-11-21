// Etapa 1: Adiciona os event listeners para os campos de entrada
function validacao() {
    document.getElementById("inome").addEventListener("input", alterna_botao);
    document.getElementById("ilogin").addEventListener("input", alterna_botao);
    document.getElementById("isenha").addEventListener("input", alterna_botao);
}

// Função que verifica se os campos estão válidos e alterna o estado do botão
function alterna_botao() {
    const nome = document.getElementById("inome").value;
    const email = document.getElementById("ilogin").value;
    const senha = document.getElementById("isenha").value;
    const errorMessage = document.getElementById("error-message");

    const isNomeValid = nome.length >= 8;
    const isEmailValid = validaEmail(email);
    const isSenhaValid = senha.length >= 8;

    // Exibe a mensagem de erro para o nome, email ou senha inválidos
    if (!isNomeValid) {
        errorMessage.textContent = 'O nome deve ter pelo menos 8 caracteres.';
        errorMessage.style.display = 'block';
    } else if (!isEmailValid) {
        errorMessage.textContent = 'E-mail inválido.';
        errorMessage.style.display = 'block';
    } else if (!isSenhaValid) {
        errorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres.';
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none'; // Oculta a mensagem de erro se tudo estiver correto
    }

    // Habilita ou desabilita o botão de submit baseado na validade dos campos
    document.getElementById("entrar").disabled = !(isNomeValid && isEmailValid && isSenhaValid);
}

// Função que valida o formato do e-mail
function validaEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função chamada quando o botão "Entrar" é clicado para validar o login
function validaLogin(event) {
    event.preventDefault(); // Impede o envio do formulário para validar

    const nome = document.getElementById("inome").value;
    const email = document.getElementById("ilogin").value;
    const senha = document.getElementById("isenha").value;
    const errorMessage = document.getElementById("error-message");

    // Limpar mensagem de erro anterior
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Validação básica
    if (nome.length < 8) {
        errorMessage.textContent = 'O nome deve ter pelo menos 8 caracteres.';
        errorMessage.style.display = 'block';
        return false;
    }

    if (!validaEmail(email)) {
        errorMessage.textContent = 'E-mail inválido.';
        errorMessage.style.display = 'block';
        return false;
    }

    if (senha.length < 8) {
        errorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres.';
        errorMessage.style.display = 'block';
        return false;
    }


    // Etapa 4.1: Salvando o nome, e-mail e senha do usuário no localStorage
    const userData = { nome, email };
    localStorage.setItem("user", JSON.stringify(userData));

    // Redireciona para a página home.html
    window.location.href = "../Home/home.html";
    return true; // Retorna true se a validação passar
}

// Função que carrega o nome do usuário na página home.html
function carregarUsuario() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.nome) {
        const span = document.querySelector('header p span');
        span.textContent = user.nome;
    }
}

// Adiciona os eventos de validação e carregamento do usuário ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    validacao(); // Chama a validação ao carregar a página
    if (window.location.pathname.includes('home.html')) {
        carregarUsuario(); // Carrega o nome do usuário na página home
    }
});

