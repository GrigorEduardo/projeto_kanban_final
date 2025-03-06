# Kanban Board

Este projeto é um sistema de gerenciamento de tarefas no estilo Kanban, desenvolvido com Django e Django REST Framework no backend e React com Material-UI no frontend.

## Tecnologias Utilizadas

**Backend:**

* Python
* Django
* Django REST Framework
* SQLite (ou outro banco de dados configurado)

**Frontend:**

* React.js
* Material-UI
* Axios
* React Router

## Estrutura do Projeto

**Backend (Django):**

```bash
backend/
├── manage.py               # Arquivo de gerenciamento do Django
├── db.sqlite3              # Banco de dados SQLite (ou outro configurado)
├── media/                  # Diretório para arquivos de mídia (imagens)
│   └── ...                 # Imagens ou outros arquivos estáticos
├── api/                    # Aplicação Django para o Kanban
│   ├── __init__.py         # Inicialização da aplicação
│   ├── admin.py            # Configuração do admin do Django
│   ├── apps.py             # Configuração da aplicação
│   ├── models.py           # Modelos do banco de dados
│   ├── serializers.py      # Serializadores para JSON
│   ├── tests.py            # Testes automatizados
│   ├── urls.py            # Rotas da API
│   └── views.py            # Lógica da API
├── backend/                # Configuração principal do Django
│   ├── __init__.py         # Inicialização do projeto
│   ├── asgi.py             # Configuração ASGI
│   ├── settings.py         # Configurações principais do Django
│   ├── urls.py             # URLs principais do Django
│   └── wsgi.py             # Configuração WSGI
└── requirements.txt        # Dependências do backend
```
## Frontend (React):

```
frontend/
├── node_modules/           # Dependências do projeto
├── public/                 # Arquivos públicos
│   ├── index.html          # HTML principal
│   ├── favicon.ico         # Ícone da aplicação
│   └── ...
├── src/                    # Código fonte do React
│   ├── components/         # Componentes reutilizáveis
│   │   ├── AppBars.js      # Componente de barra de navegação
│   │   ├── CriarQuadro.js  # Componente para criação de quadro
│   │   ├── grade_info.js   # Componente para exibir informações de grade
│   │   ├── Home.js         # Página inicial
│   │   ├── Kanban.js       # Componente principal do Kanban
│   ├── App.css             # Estilos do App
│   ├── App.js              # Componente principal da aplicação
│   ├── api.js              # Configuração de chamadas à API
│   └── ...
├── package.json            # Dependências do frontend
└── README.md               # Este arquivo
```

## Instalação e Configuração
### 1️⃣ Clonar o repositório:

```
https://github.com/GrigorEduardo/projeto_kanban_final.git
cd projeto_kanban_final
```
### 2️⃣ Configurar o Backend (Django):

```
python -m venv venv
source venv/bin/activate  # (Linux/macOS)
venv\Scripts\activate     # (Windows)
pip install -r requirements.txt
cd backend
python manage.py makemigrations api
python manage.py migrate
python manage.py createsuperuser  # Criar um usuário administrador
python manage.py runserver
```
A API estará disponível em: http://127.0.0.1:8000/

Caso esteja usando imagens, certifique-se de configurar as rotas para servir arquivos estáticos corretamente:

```
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
### 3️⃣ Configurar o Frontend (React):

```
cd frontend
# Instalar dependências do frontend
npm install

# Se necessário, instale as dependências do React Router DOM, Axios e Material-UI
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material


npm start
```
O frontend estará disponível em: http://localhost:3000/

# **Rotas da API**

*    GET /api/quadros/ → Retorna a lista de quadros
*    POST /api/quadros/criar/ → Cria um novo quadro
*   DELETE /api/quadros/delete/ → Deleta um quadro pelo nome
*   GET /api/quadro/imagem/{quadro_nome}/ → Retorna a imagem de um quadro

# **Servindo Arquivos Estáticos (Imagens)**

Se você estiver usando imagens, certifique-se de adicionar isso ao urls.py do Django:
```
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

