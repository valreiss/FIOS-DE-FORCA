# 📋 CHECKLIST COMPLETO - Deploy Gratuito

Use este arquivo como uma LISTA DE TAREFAS. Marque cada item conforme for fazendo!

---

## ✅ FASE 1: GITHUB (VOCÊ ESTÁ AQUI!)

- [ ] Clicar em "Save to GitHub" no Emergent
- [ ] Criar/Selecionar repositório (nome sugerido: `mapa-brechos`)
- [ ] Clicar em "Push to GitHub"
- [ ] Confirmar que apareceu "Success" ✅

**Depois de fazer isso, vá para FASE 2!**

---

## ✅ FASE 2: MONGODB ATLAS (10 minutos)

### Passo 1: Criar Conta
- [ ] Acessar: https://www.mongodb.com/cloud/atlas/register
- [ ] Preencher cadastro e confirmar email
- [ ] Fazer login

### Passo 2: Criar Cluster
- [ ] Clicar em "Create" 
- [ ] Escolher plano **M0 FREE** (gratuito)
- [ ] Provider: **AWS**
- [ ] Region: **São Paulo** (ou mais próximo do Brasil)
- [ ] Clicar em "Create Deployment"
- [ ] Aguardar 3-5 minutos

### Passo 3: Criar Usuário
- [ ] Username: `admin` (ou outro nome)
- [ ] Clicar em "Autogenerate Secure Password"
- [ ] **COPIAR A SENHA** e salvar aqui embaixo:

```
SENHA DO MONGODB: ___________________________________
```

- [ ] Clicar em "Create Database User"

### Passo 4: Liberar Acesso
- [ ] Clicar em "Add My Current IP Address"
- [ ] Clicar em "Add Entry"
- [ ] Clicar em "Finish and Close"

### Passo 5: Pegar String de Conexão
- [ ] Clicar em "Go to Overview"
- [ ] Clicar em "Connect" no cluster
- [ ] Escolher "Drivers"
- [ ] Copiar a string (começa com `mongodb+srv://`)
- [ ] **COLAR AQUI EMBAIXO:**

```
STRING ORIGINAL:
_________________________________________________________________
```

- [ ] Substituir `<password>` pela senha que você copiou
- [ ] Adicionar `/brechos_db` antes do `?`
- [ ] **STRING FINAL (GUARDAR!):**

```
STRING FINAL DO MONGODB:
_________________________________________________________________
```

**Exemplo de como deve ficar:**
```
mongodb+srv://admin:SuaSenha123@cluster0.xxxxx.mongodb.net/brechos_db?retryWrites=true&w=majority
```

---

## ✅ FASE 3: RAILWAY (BACKEND) (8 minutos)

### Passo 1: Criar Conta
- [ ] Acessar: https://railway.app
- [ ] Clicar em "Login"
- [ ] Escolher "Login with GitHub"
- [ ] Autorizar Railway

### Passo 2: Criar Projeto
- [ ] Clicar em "New Project"
- [ ] Escolher "Deploy from GitHub repo"
- [ ] Se pedir, clicar em "Configure GitHub App"
- [ ] Selecionar o repositório `mapa-brechos`
- [ ] Aguardar 5-10 minutos o build

### Passo 3: Adicionar Variáveis
- [ ] Clicar na aba "Variables"
- [ ] Adicionar estas 3 variáveis:

**Variável 1:**
```
Name: MONGO_URL
Value: [Cole aqui a STRING FINAL DO MONGODB que você salvou acima]
```

**Variável 2:**
```
Name: DB_NAME
Value: brechos_db
```

**Variável 3:**
```
Name: CORS_ORIGINS
Value: *
```

### Passo 4: Pegar URL do Backend
- [ ] Clicar na aba "Settings"
- [ ] Encontrar seção "Domains"
- [ ] Clicar em "Generate Domain"
- [ ] Copiar a URL gerada
- [ ] **COLAR AQUI:**

```
URL DO BACKEND (RAILWAY):
_________________________________________________________________
```

### Passo 5: Testar Backend
- [ ] Abrir no navegador: [SUA_URL_DO_RAILWAY]/api/
- [ ] Deve aparecer: `{"message":"Mapa de Brechós - MOVIMENTO FIOS DE FORÇA"}`
- [ ] Se aparecer = ✅ funcionou!
- [ ] Se der erro = ❌ me mande print que eu ajudo!

---

## ✅ FASE 4: VERCEL (FRONTEND) (7 minutos)

### Passo 1: Criar Conta
- [ ] Acessar: https://vercel.com/signup
- [ ] Clicar em "Continue with GitHub"
- [ ] Autorizar Vercel

### Passo 2: Importar Projeto
- [ ] Clicar em "Add New..." → "Project"
- [ ] Encontrar repositório `mapa-brechos`
- [ ] Clicar em "Import"

### Passo 3: Configurar
- [ ] Framework Preset: **Create React App**
- [ ] Root Directory: Clicar em "Edit" e selecionar **frontend**
- [ ] Clicar em "Continue"

### Passo 4: Adicionar Variável
- [ ] Expandir "Environment Variables"
- [ ] Adicionar:

```
Name: REACT_APP_BACKEND_URL
Value: [Cole aqui a URL DO BACKEND que você salvou acima]
```

**⚠️ IMPORTANTE:** NÃO coloque `/api/` no final!

### Passo 5: Deploy
- [ ] Clicar em "Deploy"
- [ ] Aguardar 3-5 minutos
- [ ] Quando aparecer "Congratulations" = ✅ funcionou!

### Passo 6: Acessar Seu Site
- [ ] Clicar em "Continue to Dashboard"
- [ ] Copiar a URL do site
- [ ] **GUARDAR AQUI:**

```
URL DO SEU SITE:
_________________________________________________________________
```

- [ ] Abrir a URL no navegador
- [ ] Seu mapa deve estar funcionando! 🗺️✨

---

## ✅ FASE 5: TESTAR TUDO

- [ ] O mapa carrega?
- [ ] Aparecem marcadores?
- [ ] Consigo clicar nos marcadores?
- [ ] Abre popup com informações?
- [ ] A busca funciona?
- [ ] O contador mostra quantos brechós?

**Se tudo OK = 🎉 PARABÉNS!**

**Se algo não funciona:**
- [ ] Aguardei 2-3 minutos? (primeira geocodificação é lenta)
- [ ] Recarreguei a página? (F5)
- [ ] Verifiquei os logs no Railway?
- [ ] Mandei print do erro aqui no chat?

---

## 🎯 RESUMO DAS SUAS URLS FINAIS

Preencha aqui quando terminar:

```
🔗 GitHub: https://github.com/seu-usuario/mapa-brechos
🔗 MongoDB: Cluster0 no MongoDB Atlas
🔗 Backend: [URL do Railway]
🔗 Frontend: [URL do Vercel]
```

---

## 💰 CUSTOS

- MongoDB Atlas: R$ 0,00 ✅
- Railway: R$ 0,00 ✅
- Vercel: R$ 0,00 ✅

**TOTAL: R$ 0,00/mês** 🎉

---

## 🆘 PRECISA DE AJUDA?

Se travar em qualquer fase:

1. Tire um print da tela
2. Me mande aqui no chat
3. Eu te ajudo a resolver!

Boa sorte! 💪✨
