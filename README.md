# Mapa de Brechós e Moda Sustentável - MOVIMENTO FIOS DE FORÇA

Aplicação web para visualizar brechós e negócios de moda circular em um mapa interativo.

## 🌟 Funcionalidades

- Mapa interativo com localização de brechós
- Busca por nome ou cidade
- Integração automática com Google Sheets
- Geocodificação automática de endereços
- Atualização automática a cada 5 minutos
- Design responsivo (mobile e desktop)
- Contador de brechós por região

## 🚀 Deploy Gratuito (Opção Recomendada)

### Requisitos
- Conta no GitHub
- Conta no Vercel (gratuita)
- Conta no Railway.app ou Render.com (gratuita)
- Conta no MongoDB Atlas (gratuita)

---

## 📦 PARTE 1: Preparar o MongoDB (Banco de Dados)

### Passo 1: Criar conta no MongoDB Atlas
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Clique em "Create" para criar um novo cluster
4. Escolha a opção **FREE** (M0 Sandbox)
5. Escolha uma região próxima ao Brasil (ex: São Paulo)
6. Clique em "Create Cluster"

### Passo 2: Configurar acesso ao banco
1. Clique em "Database Access" no menu lateral
2. Clique em "Add New Database User"
3. Escolha "Password" como método de autenticação
4. Anote o usuário e senha (você vai precisar!)
5. Em "Database User Privileges", escolha "Read and write to any database"
6. Clique em "Add User"

### Passo 3: Configurar Network Access
1. Clique em "Network Access" no menu lateral
2. Clique em "Add IP Address"
3. Clique em "Allow Access from Anywhere" (0.0.0.0/0)
4. Clique em "Confirm"

### Passo 4: Obter a String de Conexão
1. Volte para "Database" no menu lateral
2. Clique em "Connect" no seu cluster
3. Escolha "Connect your application"
4. Copie a string de conexão (começa com `mongodb+srv://`)
5. **IMPORTANTE**: Substitua `<password>` pela senha que você criou
6. **IMPORTANTE**: Substitua `<dbname>` por `brechos_db`

Exemplo final:
```
mongodb+srv://usuario:SuaSenha123@cluster0.xxxxx.mongodb.net/brechos_db?retryWrites=true&w=majority
```

---

## 🔧 PARTE 2: Deploy do Backend (FastAPI)

### Opção A: Railway.app (Recomendado)

#### Passo 1: Criar conta
1. Acesse: https://railway.app
2. Clique em "Start a New Project"
3. Faça login com GitHub

#### Passo 2: Deploy do Backend
1. Clique em "Deploy from GitHub repo"
2. Conecte seu repositório do GitHub
3. Selecione a pasta `/backend`
4. Railway vai detectar automaticamente que é Python

#### Passo 3: Configurar Variáveis de Ambiente
1. Clique em "Variables" na aba do seu projeto
2. Adicione as seguintes variáveis:

```
MONGO_URL=sua_string_de_conexao_mongodb_aqui
DB_NAME=brechos_db
CORS_ORIGINS=*
```

#### Passo 4: Obter URL do Backend
1. Clique em "Settings"
2. Em "Domains", clique em "Generate Domain"
3. Copie a URL gerada (ex: `https://seu-app.railway.app`)
4. **Guarde essa URL**, você vai precisar no frontend!

---

### Opção B: Render.com (Alternativa)

#### Passo 1: Criar conta
1. Acesse: https://render.com
2. Crie uma conta gratuita
3. Faça login com GitHub

#### Passo 2: Criar Web Service
1. Clique em "New +" → "Web Service"
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: brecho-backend
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

#### Passo 3: Configurar Variáveis de Ambiente
1. Na seção "Environment Variables", adicione:

```
MONGO_URL=sua_string_de_conexao_mongodb_aqui
DB_NAME=brechos_db
CORS_ORIGINS=*
```

#### Passo 4: Deploy
1. Clique em "Create Web Service"
2. Aguarde o deploy (5-10 minutos)
3. Copie a URL do serviço (ex: `https://brecho-backend.onrender.com`)

---

## 🎨 PARTE 3: Deploy do Frontend (React)

### Usando Vercel (Recomendado)

#### Passo 1: Criar conta
1. Acesse: https://vercel.com
2. Clique em "Sign Up"
3. Faça login com GitHub

#### Passo 2: Importar Projeto
1. Clique em "Add New" → "Project"
2. Selecione seu repositório GitHub
3. Clique em "Import"

#### Passo 3: Configurar Build
1. **Root Directory**: Selecione `frontend`
2. **Framework Preset**: Create React App
3. **Build Command**: `yarn build` (já configurado)
4. **Output Directory**: `build` (já configurado)

#### Passo 4: Configurar Variável de Ambiente
1. Em "Environment Variables", adicione:

```
REACT_APP_BACKEND_URL=https://sua-url-do-backend-aqui
```

**IMPORTANTE**: Use a URL do backend que você copiou no Passo 4 da Parte 2!

#### Passo 5: Deploy
1. Clique em "Deploy"
2. Aguarde o build (2-5 minutos)
3. 🎉 Seu site estará no ar!
4. Vercel vai te dar uma URL (ex: `https://seu-app.vercel.app`)

---

## ✅ PARTE 4: Testar Tudo

### Checklist Final

1. ✅ MongoDB Atlas está rodando?
2. ✅ Backend está respondendo? Teste: `https://sua-url-backend/api/`
3. ✅ Frontend carregou o mapa?
4. ✅ Marcadores aparecem no mapa?
5. ✅ Busca funciona?
6. ✅ Popups abrem ao clicar nos marcadores?

---

## 🌐 PARTE 5: Domínio Personalizado (Opcional)

### No Vercel (Frontend)
1. No dashboard do Vercel, clique em "Settings"
2. Clique em "Domains"
3. Adicione seu domínio personalizado
4. Configure os DNS conforme as instruções do Vercel

### No Railway/Render (Backend)
1. Configure um subdomínio (ex: `api.seudominio.com`)
2. Atualize a variável `REACT_APP_BACKEND_URL` no Vercel
3. Faça redeploy do frontend

---

## 🔄 Atualizar a Aplicação

### Quando você fizer mudanças no código:

1. **Faça commit no GitHub**:
```bash
git add .
git commit -m "Sua mensagem"
git push
```

2. **Deploy Automático**:
   - Vercel e Railway fazem deploy automático quando você faz push!
   - Nada mais a fazer! 🎉

---

## 💰 Custos

- **MongoDB Atlas**: GRÁTIS (512MB)
- **Railway.app**: GRÁTIS (até $5/mês de uso)
- **Render.com**: GRÁTIS (com algumas limitações)
- **Vercel**: GRÁTIS (100GB bandwidth/mês)

**Total: R$ 0,00/mês** 🎉

---

## 🆘 Problemas Comuns

### Backend não conecta ao MongoDB
- Verifique se a string de conexão está correta
- Confirme que o IP está liberado (0.0.0.0/0)
- Verifique se substituiu `<password>` e `<dbname>`

### Frontend não carrega dados
- Verifique se `REACT_APP_BACKEND_URL` está correto
- Teste o backend diretamente: `https://sua-url-backend/api/locations`
- Verifique CORS no backend

### Marcadores não aparecem
- Aguarde 1-2 minutos (geocodificação leva tempo)
- Verifique se o Google Sheets está público
- Teste o endpoint: `https://sua-url-backend/api/locations?force_refresh=true`

---

## 📞 Suporte

Se tiver dúvidas:
1. Verifique os logs no Railway/Render/Vercel
2. Teste cada parte individualmente (MongoDB → Backend → Frontend)
3. Use as ferramentas de desenvolvedor do navegador (F12)

---

## 🎉 Parabéns!

Seu Mapa de Brechós está no ar 24/7 de forma GRATUITA!

Compartilhe a URL com o Movimento Fios de Força! 🌍✨