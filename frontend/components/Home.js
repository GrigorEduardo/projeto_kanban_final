import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; 
import { useNavigate } from "react-router-dom"; 

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2} 
    >
      <Typography variant="h6">Dashboard</Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#c4cf48", 
          color: "#000",
          "&:hover": { backgroundColor: "#b0bb40" }, 
        }}
        onClick={() => navigate("/novo-quadro")} 
      >
        Criar novo quadro
      </Button>
    </Box>
  );
}

export default Home;