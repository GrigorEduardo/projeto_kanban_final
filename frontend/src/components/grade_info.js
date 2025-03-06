import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardTable = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Para mostrar o carregamento
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/page/");
      setRows(data);
      setLoading(false); // Dados carregados, setando loading como false
    } catch (error) {
      setError("Erro ao buscar os dados.");
      console.error(error);
      setLoading(false); // Definir como false também no erro
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (quadroNome) => {
    if (window.confirm("Tem certeza que deseja excluir este quadro?")) {
      try {
        const response = await axios.delete("http://127.0.0.1:8000/page/quadros/delete/", {
          data: { quadro: quadroNome },
        });

        if (response.status === 200) {
          setRows((prevRows) => prevRows.filter((row) => row.quadro !== quadroNome));
          alert("Quadro excluído com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao excluir quadro:", error);
        alert("Erro ao excluir quadro.");
      }
    }
  };

  const handleViewClick = (nomeDoQuadro) => {
    navigate(`/kanban/${nomeDoQuadro}`); // Redireciona para a página do quadro com o nome
  };

  return (
    <Box p={3}>
      {error && <p>{error}</p>}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ height: "35px" }}>
                <TableCell><strong>Nome do quadro</strong></TableCell>
                <TableCell><strong>Responsável</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ height: "35px" }}>
                  <TableCell>{row.quadro}</TableCell>
                  <TableCell>{row.responsavel}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status === 1.0 ? "Ativo" : "Inativo"}
                      color={row.status === 1.0 ? "success" : "error"}
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {/* Botão de Visualização */}
                    <IconButton
                      color="primary"
                      onClick={() => handleViewClick(row.quadro)} // Ao clicar, vai para o KanbanBoard com o nome do quadro
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.quadro)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default DashboardTable;
