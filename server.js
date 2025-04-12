const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());

app.get('/read-file', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Se o arquivo não existir, cria um vazio
                const initialData = JSON.stringify([]);
                return fs.writeFile(DATA_FILE, initialData, (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({
                            success: false,
                            error: writeErr.message
                        });
                    }
                    res.json({
                        success: true,
                        content: []
                    });
                });
            }
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
        
        try {
            const parsedData = JSON.parse(data);
            res.json({
                success: true,
                content: parsedData
            });
        } catch (parseErr) {
            res.status(500).json({
                success: false,
                error: 'Erro ao parsear o arquivo JSON'
            });
        }
    });
});

app.post('/write-file', (req, res) => {
    const content = req.body.content;
    
    if (!content) {
        return res.status(400).json({
            success: false,
            error: "Conteúdo não fornecido"
        });
    }

    fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
        
        res.json({
            success: true,
            message: "Arquivo salvo com sucesso"
        });
    });
});

app.get('/read-bytes', (req, res) => {
    const filePath = path.join(__dirname, 'example.txt');
    const buffer = Buffer.alloc(1024); // Buffer para armazenar os dados
    
    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
        
        fs.read(fd, buffer, 0, buffer.length, 0, (readErr, bytesRead, buffer) => {
            fs.close(fd, (closeErr) => {
                if (closeErr) console.error('Erro ao fechar o arquivo:', closeErr);
            });
            
            if (readErr) {
                return res.status(500).json({
                    success: false,
                    error: readErr.message
                });
            }
            
            res.json({
                success: true,
                content: buffer.toString('utf8', 0, bytesRead)
            });
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});