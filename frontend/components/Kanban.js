import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Chip, Avatar } from "@mui/material";
import { useParams } from "react-router-dom"; // Importar useParams para pegar o parâmetro da URL
import axios from "axios";

const columns = [
  { title: "Projetos na fila", color: "success", status: "No prazo", date: "12/07/2024" },
  { title: "Baixo docs e visibilidade", color: "warning", status: "Atrasado", date: "03/08/2024" },
  { title: "Execução time", color: "warning", status: "Atrasado", date: "05/08/2024" },
  { title: "Apresentação cliente", color: "success", status: "No prazo", date: "18/08/2024" },
  { title: "Revisão final", color: "success", status: "No prazo", date: "20/08/2024" },
  { title: "Entrega e aprovação", color: "warning", status: "Atrasado", date: "25/08/2024" },
  { title: "Pós-entrega", color: "success", status: "No prazo", date: "30/08/2024" }
];

const KanbanBoard = () => {
  const { nomeDoQuadro } = useParams(); // Pega o nome do quadro da URL
  const [imagemUrl, setImagemUrl] = useState(""); // Estado para armazenar a URL da imagem

  // Função para pegar a imagem do backend
  const handleGetImagemQuadro = async (quadroNome) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/page/quadro/imagem/${quadroNome}/`);
      const imagemUrl = response.data.imagem_url;

      if (imagemUrl) {
        setImagemUrl(imagemUrl); // Atualiza o estado com a URL da imagem
      }
    } catch (error) {
      console.error("Erro ao buscar imagem:", error);
    }
  };

  // Efeito para buscar a imagem assim que o nome do quadro for carregado
  useEffect(() => {
    if (nomeDoQuadro) {
      handleGetImagemQuadro(nomeDoQuadro);
    }
  }, [nomeDoQuadro]); // Executa a função quando o nomeDoQuadro muda

  return (
    <Box sx={{ p: 3 }}>
      {/* Exibe o nome do quadro */}
      <Typography variant="h4" gutterBottom>
        {nomeDoQuadro} {/* Exibe o nome do quadro dinamicamente */}
      </Typography>

      {/* Exibe as colunas do Kanban */}
      <Box sx={{ overflowX: "auto", p: 2, bgcolor: "#f4f4f4" }}>
        <Box sx={{ display: "flex", gap: 3, minWidth: columns.length * 350, alignItems: "flex-start" }}>
          {columns.map((col, index) => (
            <Box key={index} sx={{ minWidth: 320, bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                {col.title}
              </Typography>
              {[...Array(4)].map((_, idx) => (
                <Card key={idx} sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent>
                    <Chip label={col.status} color={col.color} size="small" sx={{ mb: 1 }} />
                    <Typography variant="body1">LOGO Empresa LTDA</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Previsão de entrega
                    </Typography>
                    <Typography variant="body2" color="error" fontWeight={600}>
                      📅 {col.date}
                    </Typography>
                    {/* Exibe o Avatar com a imagem recebida */}
                    <Avatar sx={{ mt: 1 }} src={imagemUrl} />
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default KanbanBoard;
