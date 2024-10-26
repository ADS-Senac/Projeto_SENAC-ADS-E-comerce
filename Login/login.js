function validacao() {
    document.getElementById("inome").addEventListener("input", alterna_botao);
    document.getElementById("ilogin").addEventListener("input", alterna_botao);
}

function alterna_botao() {
    const nome = document.getElementById("inome").value;
    const email = document.getElementById("ilogin").value;

    const isNomeValid = nome.length >= 8;
    const isEmailValid = validaEmail(email);

    document.getElementById("entrar").disabled = !(isNomeValid && isEmailValid);
}

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

    // Redireciona para a página home.html
    window.location.href = "home.html";
    return true; // Retorna true se a validação passar
}

function validaEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Adicionando o evento para chamar a função de validação ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    validacao();
});