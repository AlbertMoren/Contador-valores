# Contador de Valores

Sistema web desenvolvido para registrar e exibir quantas vezes cada valor numérico foi enviado ao servidor durante sua execução.

O projeto utiliza Node.js e Express no backend, além de HTML, CSS e JavaScript no frontend.

---

## Funcionalidades

* Envio de valores numéricos ao servidor
* Validação de números inteiros, negativos e decimais
* Contagem individual para cada valor
* Atualização do resultado sem recarregar a página
* Tabela com todos os valores registrados
* Tratamento de erros no frontend e no backend
* Interface responsiva e estilizada

> As contagens são armazenadas na memória e são apagadas quando o servidor é reiniciado.

---

## Pré-requisitos

Antes de começar, instale:

* [Node.js](https://nodejs.org/)

Para verificar se o Node.js e o npm estão instalados, execute:

```bash
node -v
npm -v
```

---

## Passo a passo

### 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/albertmorenn/contador-valores.git
```

### 2. Entrar na pasta do projeto

```bash
cd contador-valores
```

### 3. Instalar as dependências

```bash
npm install
```

Esse comando instalará o Express e as demais dependências registradas no projeto.

### 4. Iniciar o servidor

```bash
node server.js
```

Aguarde até aparecer no terminal:

```text
Servidor iniciado em http://localhost:3000
```

### 5. Acessar no navegador

Abra o navegador e acesse:

```text
http://localhost:3000
```

---

## Como usar

1. Digite um valor numérico no campo de entrada
2. Clique no botão **Enviar**
3. O valor será enviado ao servidor
4. A quantidade de vezes que esse valor foi recebido será exibida
5. A tabela de valores registrados será atualizada automaticamente

O sistema aceita valores como:

```text
10
-5
3.14
3,14
```

Textos e valores inválidos não serão aceitos.

---

## Como funciona

O frontend envia uma requisição HTTP do tipo `POST` para a rota:

```text
POST /contar
```

O corpo da requisição é enviado no formato JSON:

```json
{
  "valor": "10"
}
```

O servidor atualiza a contagem e retorna uma resposta semelhante a:

```json
{
  "valor": "10",
  "quantidade": 2,
  "mensagem": "O valor \"10\" foi adicionado 2 vezes ao servidor."
}
```

A rota abaixo retorna todos os valores registrados:

```text
GET /contagens
```

Exemplo de resposta:

```json
[
  {
    "valor": "5",
    "quantidade": 1
  },
  {
    "valor": "10",
    "quantidade": 2
  }
]
```

---

## Tecnologias utilizadas

* Node.js
* Express
* HTML5
* CSS3
* JavaScript
* API Fetch

---

## Parar o servidor

Para encerrar o servidor, volte ao terminal e pressione:

```text
Ctrl + C
```

Ao encerrar ou reiniciar o servidor, todas as contagens serão apagadas.

---

## Problemas comuns

**O comando `node` não é reconhecido**

Verifique se o Node.js está instalado e configurado na variável de ambiente `PATH`.

Teste com:

```bash
node -v
```

---

**O comando `npm` não é reconhecido**

Verifique a instalação do Node.js e teste:

```bash
npm -v
```