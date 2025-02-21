require('dotenv').config();
const express = require('express');
const vision = require('@google-cloud/vision');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Verificar se as credenciais estão configuradas
console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

let client;
try {
  client = new vision.ImageAnnotatorClient();
  console.log('Cliente Vision inicializado com sucesso');
} catch (error) {
  console.error('Erro ao inicializar cliente Vision:', error);
}

app.post('/analyze', async (req, res) => {
  console.log('Requisição recebida em /analyze');
  try {
    const { imageUrl } = req.body;
    console.log('Analisando URL:', imageUrl);

    if (!client) {
      throw new Error('Cliente Vision não está inicializado');
    }

    const [result] = await client.imageProperties(imageUrl);

    console.log('Colors array:', result.imagePropertiesAnnotation.dominantColors.colors);
    const colors = result.imagePropertiesAnnotation?.dominantColors?.colors;

    if (!colors || colors.length < 2) {
      return res.status(400).json({ 
        error: "Menos de duas cores detectadas",
        details: result 
      });
    }
    console.log('Resposta.ok')
    res.json({
      color1:rgbToHex(colors[0].color),
      color2:rgbToHex(colors[1].color)
    });

  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack // Apenas em desenvolvimento
    });
  }
});

function rgbToHex({ red, green, blue }) {
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()}`;
}


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Aguardando requisições...');
});