const formulario = document.getElementById("form-contador");
const campoValor = document.getElementById("valor");
const botaoEnviar = document.getElementById("botao-enviar");
const resultado = document.getElementById("resultado");
const tabelaContagens = document.getElementById("tabela-contagens");
const corpoTabela = document.getElementById("corpo-tabela");
const tabelaVazia = document.getElementById("tabela-vazia");
document.addEventListener("DOMContentLoaded", atualizarTabela);

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const valorDigitado = campoValor.value.trim();
    const valorNormalizado = valorDigitado.replace(",", ".");
    const formatoNumerico = /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/;

    resultado.classList.remove("erro");

    if (
        valorDigitado === "" ||
        !formatoNumerico.test(valorNormalizado) ||
        !Number.isFinite(Number(valorNormalizado))
    ) {
        mostrarErro("Digite apenas um número válido.");
        campoValor.focus();
        return;
    }

    const valor = String(Number(valorNormalizado));

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";

    try {
        const resposta = await fetch("/contar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ valor })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Não foi possível enviar o valor."
            );
        }

        mostrarResultado(dados.valor, dados.quantidade);
        await atualizarTabela();
        campoValor.select();

    } catch (erro) {
        mostrarErro(erro.message);

    } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar";
    }
});

function mostrarResultado(valor, quantidade) {
    const numero = document.createElement("span");
    numero.className = "resultado-numero";
    numero.textContent = quantidade;

    const palavraVez = quantidade === 1 ? "vez" : "vezes";

    const texto = document.createElement("span");
    texto.className = "resultado-texto";
    texto.textContent =
        `O valor "${valor}" foi adicionado ${quantidade} ${palavraVez} ao servidor.`;

    resultado.replaceChildren(numero, texto);
}

function mostrarErro(mensagem) {
    resultado.textContent = mensagem;
    resultado.classList.add("erro");
}

async function atualizarTabela() {
    try {
        const resposta = await fetch("/contagens");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as contagens.");
        }

        const listaContagens = await resposta.json();

        corpoTabela.replaceChildren();

        if (listaContagens.length === 0) {
            tabelaContagens.hidden = true;
            tabelaVazia.hidden = false;
            return;
        }

        tabelaContagens.hidden = false;
        tabelaVazia.hidden = true;

        listaContagens.forEach((item) => {
            const linha = document.createElement("tr");

            const colunaValor = document.createElement("td");
            colunaValor.textContent = item.valor;

            const colunaQuantidade = document.createElement("td");
            colunaQuantidade.textContent = item.quantidade;

            linha.append(colunaValor, colunaQuantidade);
            corpoTabela.appendChild(linha);
        });

    } catch (erro) {
        tabelaContagens.hidden = true;
        tabelaVazia.hidden = false;
        tabelaVazia.textContent = erro.message;
    }
}