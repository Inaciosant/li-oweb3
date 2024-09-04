// Importa o módulo Express para criar o servidor web
const express = require('express');
// Cria uma instância do aplicativo Express
const app = express();
// Define a porta do servidor
const port = 3001;
// Analisa o corpo (body) das requisições HTTP em formato JSON
app.use(express.json());
// Servir arquivos estáticos (como HTML, CSS, imagens) a partir do diretório atual
app.use(express.static(__dirname));

// Vetor que simula um banco de dados de itens
let listaDeCompras = [];
let nextId = 1; // Controle de IDs para os itens

// Rota GET para obter todos os itens
app.get('/itens', (req, res) => {
    res.json(listaDeCompras); // Retorna a lista de compras como JSON
});

// Rota POST para adicionar um novo item
app.post('/itens', (req, res) => {
    const novoItem = { id: nextId++, ...req.body }; // Atribui um ID único ao item
    listaDeCompras.push(novoItem); // Adiciona o novo item ao array
    res.status(201).json(novoItem); // Retorna o novo item criado
});

// Rota PUT para atualizar o status de um item (comprado ou não)
app.put('/itens/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtém o ID a partir dos parâmetros da URL
    const item = listaDeCompras.find(item => item.id === id); // Busca o item pelo ID

    if (item) {
        item.comprado = req.body.comprado; // Atualiza o status de comprado (true ou false)
        res.json(item); // Retorna o item atualizado
    } else {
        res.status(404).json({ error: 'Item não encontrado' }); // Retorna erro se o item não for encontrado
    }
});

// Rota DELETE para remover um item
app.delete('/itens/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtém o ID a partir dos parâmetros da URL
    const index = listaDeCompras.findIndex(item => item.id === id); // Busca o índice do item pelo ID

    if (index !== -1) {
        listaDeCompras.splice(index, 1); // Remove o item do array
        res.sendStatus(204); // Retorna sucesso, mas sem conteúdo
    } else {
        res.status(404).json({ error: 'Item não encontrado' }); // Retorna erro se o item não for encontrado
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
