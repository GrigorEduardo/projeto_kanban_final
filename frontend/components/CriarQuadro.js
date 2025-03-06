import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação
import { Box, TextField, Grid, Button, Typography, MenuItem } from "@mui/material";

export default function CriarQuadro() {
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    quadro: "",
    responsavel: "",
    empresa: "",
    status: "",
    dataEntrega: "",
    imagem: null, 
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "status" && !["0", "1"].includes(value)) {
      return; 
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("quadro", form.quadro);
    formData.append("responsavel", form.responsavel);
    formData.append("empresa", form.empresa);
    formData.append("status", form.status);
    formData.append("data", form.dataEntrega);
    if (form.imagem) {
      formData.append("imagem", form.imagem);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/page/quadros/criar/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Quadro criado com sucesso!");
        navigate("/"); 
      } else {
        alert("Erro ao criar o quadro.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 3, maxWidth: 600, margin: "auto" }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" gutterBottom>
        Criar Novo Quadro
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Quadro" name="quadro" value={form.quadro} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Responsável" name="responsavel" value={form.responsavel} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Empresa" name="empresa" value={form.empresa} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12} sm={6}>

          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="1">Ativo</MenuItem>
            <MenuItem value="0">Inativo</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth type="date" label="Data Entrega" name="dataEntrega" value={form.dataEntrega} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: "#c4cf48", color: "#000" }}>
            Enviar Imagem
            <input type="file" name="imagem" hidden onChange={handleChange} />
          </Button>
          {form.imagem && <Typography>{form.imagem.name}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#c4cf48", color: "#000" }} fullWidth>
            Criar Quadro
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
