const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Permite que o front (origem diferente) acesse o back
app.use(cors());

// Rota HTTP para o front verificar se estamos vivos
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ready_for_ws' });
});

// Lógica do WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado!');

    // Envia uma mensagem de boas-vindas
    ws.send(JSON.stringify({ message: 'Conexão WebSocket estabelecida com sucesso!' }));

    ws.on('close', () => {
        console.log('Cliente desconectou.');
    });
});

server.listen(8080, () => {
    console.log('Backend rodando na porta 8080');
});