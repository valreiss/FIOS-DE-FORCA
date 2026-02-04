# 🎯 Guia SUPER SIMPLES - Colocar o Mapa no Ar (GRATUITO)

## ⏱️ Tempo Total: 30 minutos
## 💰 Custo: R$ 0,00

---

# 📋 ETAPA 1: SALVAR NO GITHUB (5 minutos)

## O que é GitHub?
É como um "pendrive na nuvem" para guardar seu código.

## Como fazer:

### Passo 1.1: Botão Save to GitHub
1. Olhe para o chat aqui do Emergent
2. Procure o botão **"Save to GitHub"** (geralmente no topo ou ao lado)
3. Clique nele

### Passo 1.2: Conectar GitHub
1. Se pedir para fazer login no GitHub:
   - Acesse: https://github.com
   - Clique em "Sign up" se não tem conta
   - Ou "Sign in" se já tem
2. Autorize o Emergent a acessar seu GitHub

### Passo 1.3: Criar Repositório
1. Escolha um nome para o projeto: `mapa-brechos` (ou qualquer nome)
2. Deixe PÚBLICO
3. Clique em "Create" ou "Push to GitHub"
4. Aguarde 1-2 minutos

✅ **PRONTO!** Seu código está salvo no GitHub!

---

# 🗄️ ETAPA 2: CRIAR BANCO DE DADOS (10 minutos)

## O que é MongoDB?
É onde vão ficar guardadas as informações dos brechós.

## Como fazer:

### Passo 2.1: Criar Conta
1. Abra uma nova aba do navegador
2. Acesse: **https://www.mongodb.com/cloud/atlas/register**
3. Preencha:
   - Email
   - Senha
   - Primeiro nome / Último nome
4. Marque "I agree to the Terms of Service"
5. Clique em **"Create your Atlas account"**
6. Confirme seu email (veja sua caixa de entrada)

### Passo 2.2: Criar Cluster (Banco)
1. Você vai ver a tela "Deploy a cloud database"
2. Escolha a opção **"M0 FREE"** (lado esquerdo)
   - É DE GRAÇA! ✅
3. Em "Provider", deixe **AWS**
4. Em "Region", escolha **São Paulo** (ou mais próximo)
5. Em "Cluster Name", deixe `Cluster0` ou coloque `brechos-db`
6. Clique em **"Create Deployment"** (botão verde)
7. Aguarde 3-5 minutos (vai aparecer uma barra de progresso)

### Passo 2.3: Criar Usuário do Banco
1. Vai aparecer uma tela "Security Quickstart"
2. Em "Authentication Method", escolha **"Username and Password"**
3. Crie um usuário:
   - Username: `admin` (ou qualquer nome)
   - Password: Clique em **"Autogenerate Secure Password"**
   - **IMPORTANTE**: Copie a senha e salve num bloco de notas! ⚠️
4. Clique em **"Create Database User"**

### Passo 2.4: Liberar Acesso de Qualquer Lugar
1. Vai aparecer a tela "Where would you like to connect from?"
2. Em "IP Access List", escolha **"My Local Environment"**
3. Clique em **"Add My Current IP Address"**
4. Clique em **"Add Entry"**
5. Agora clique em **"Finish and Close"**

### Passo 2.5: Pegar a String de Conexão
1. Clique em **"Go to Overview"**
2. Você vai ver seu cluster `Cluster0`
3. Clique no botão **"Connect"**
4. Escolha **"Drivers"**
5. Em "Driver", deixe **Python** e **3.6 or later**
6. Copie a string que aparece (começa com `mongodb+srv://...`)
7. Cole num bloco de notas

### Passo 2.6: Ajustar a String
Na string que você copiou, você precisa fazer 2 mudanças:

**String original:**
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Mudar para:**
```
mongodb+srv://admin:SUA_SENHA_AQUI@cluster0.xxxxx.mongodb.net/brechos_db?retryWrites=true&w=majority
```

**O que fazer:**
1. Substitua `<password>` pela senha que você copiou
2. Adicione `/brechos_db` antes do `?`

**Exemplo final:**
```
mongodb+srv://admin:Ab123456@cluster0.xxxxx.mongodb.net/brechos_db?retryWrites=true&w=majority
```

✅ **PRONTO!** Guarde essa string, vamos usar depois!

---

# 🔧 ETAPA 3: COLOCAR O BACKEND NO AR (8 minutos)

## O que é Backend?
É a parte que busca os dados da planilha e faz a geocodificação.

## Como fazer:

### Passo 3.1: Criar Conta no Railway
1. Abra uma nova aba
2. Acesse: **https://railway.app**
3. Clique em **"Login"** no canto superior direito
4. Escolha **"Login with GitHub"**
5. Autorize o Railway a acessar seu GitHub

### Passo 3.2: Criar Novo Projeto
1. Na tela inicial, clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Clique em **"Configure GitHub App"**
4. Autorize o Railway
5. Selecione o repositório `mapa-brechos` (ou o nome que você deu)
6. Clique no repositório para importar

### Passo 3.3: Aguardar Build (IMPORTANTE!)
1. O Railway vai começar a fazer o "build"
2. Você vai ver logs rolando na tela
3. Aguarde 5-10 minutos
4. Se aparecer **"Success"** com um ✅ verde = funcionou!
5. Se aparecer **"Failed"** com um ❌ vermelho = vamos corrigir

### Passo 3.4: Adicionar Variáveis de Ambiente
1. No seu projeto no Railway, clique na aba **"Variables"** (no topo)
2. Clique em **"+ New Variable"**
3. Adicione 3 variáveis (uma de cada vez):

**Variável 1:**
- Name: `MONGO_URL`
- Value: Cole aqui a string do MongoDB que você salvou (aquela longa com mongodb+srv://)

**Variável 2:**
- Name: `DB_NAME`
- Value: `brechos_db`

**Variável 3:**
- Name: `CORS_ORIGINS`
- Value: `*`

4. Clique em **"Add"** para cada uma

### Passo 3.5: Pegar a URL do Backend
1. Clique na aba **"Settings"**
2. Role até encontrar **"Domains"**
3. Clique em **"Generate Domain"**
4. Vai aparecer uma URL tipo: `https://seu-app.up.railway.app`
5. **Copie essa URL** e salve no bloco de notas!

### Passo 3.6: Testar se Funcionou
1. Cole a URL que você copiou no navegador
2. Adicione `/api/` no final
3. Exemplo: `https://seu-app.up.railway.app/api/`
4. Aperte Enter
5. Deve aparecer: `{"message":"Mapa de Brechós - MOVIMENTO FIOS DE FORÇA"}`

✅ **BACKEND FUNCIONANDO!** 🎉

---

# 🎨 ETAPA 4: COLOCAR O FRONTEND NO AR (7 minutos)

## O que é Frontend?
É a parte visual do site que as pessoas vão ver (o mapa).

## Como fazer:

### Passo 4.1: Criar Conta no Vercel
1. Abra uma nova aba
2. Acesse: **https://vercel.com/signup**
3. Clique em **"Continue with GitHub"**
4. Autorize o Vercel

### Passo 4.2: Importar Projeto
1. Na tela inicial do Vercel, clique em **"Add New..."**
2. Escolha **"Project"**
3. Você vai ver seus repositórios do GitHub
4. Encontre `mapa-brechos` (ou o nome que você deu)
5. Clique em **"Import"**

### Passo 4.3: Configurar o Build
1. Em **"Framework Preset"**, escolha **"Create React App"**
2. Em **"Root Directory"**, clique em **"Edit"**
3. Selecione a pasta **"frontend"**
4. Clique em **"Continue"**

### Passo 4.4: Adicionar Variável de Ambiente
1. Expanda a seção **"Environment Variables"** (clique na setinha)
2. Adicione:
   - Name: `REACT_APP_BACKEND_URL`
   - Value: Cole aqui a URL do Railway (aquela que você copiou, SEM o /api/ no final)
   - Exemplo: `https://seu-app.up.railway.app`
3. Clique em **"Add"**

### Passo 4.5: Deploy!
1. Clique no botão grande **"Deploy"**
2. Aguarde 3-5 minutos (vai aparecer uma animação bonitinha)
3. Quando terminar, vai aparecer **"Congratulations!"** 🎉

### Passo 4.6: Acessar Seu Site
1. Clique em **"Continue to Dashboard"**
2. No topo vai ter a URL do seu site
3. Clique nela ou copie e cole no navegador
4. Exemplo: `https://mapa-brechos.vercel.app`

✅ **SEU MAPA ESTÁ NO AR!** 🗺️✨

---

# 🎉 ETAPA 5: TESTAR TUDO

## Checklist Final:

Abra seu site (a URL do Vercel) e verifique:

- [ ] O mapa carrega?
- [ ] Aparecem marcadores (pontinhos) no mapa?
- [ ] Quando clica num marcador, abre um popup com informações?
- [ ] A busca funciona? (tente buscar "Campo Grande")
- [ ] O contador mostra quantos brechós tem? (ex: "34 brechós")

Se tudo funcionar = **SUCESSO!** 🎊

Se algo não funcionar = Role para baixo para "Problemas Comuns"

---

# ⚠️ PROBLEMAS COMUNS

## Problema 1: Mapa carrega mas não aparecem marcadores

**Solução:**
- Aguarde 2-3 minutos (a geocodificação é lenta na primeira vez)
- Recarregue a página (F5)
- Clique no botão "Atualizar" no site

## Problema 2: Backend deu erro no Railway

**O que fazer:**
1. No Railway, clique no seu projeto
2. Clique em **"Deployments"**
3. Clique no deployment que falhou
4. Role até o final para ver o erro
5. Tire um print e me mande aqui que eu te ajudo!

**Ou use alternativa:**
- Use o **Render.com** ao invés do Railway (instruções no README.md)

## Problema 3: Frontend não conecta com backend

**Verificar:**
1. No Vercel, vá em **"Settings"** → **"Environment Variables"**
2. Verifique se `REACT_APP_BACKEND_URL` está correto
3. NÃO deve ter `/api/` no final
4. Deve ser a URL do Railway completa

**Se precisar mudar:**
1. Edite a variável
2. Volte para **"Deployments"**
3. Clique nos 3 pontinhos do último deploy
4. Clique em **"Redeploy"**

---

# 📱 COMPARTILHAR SEU MAPA

Agora que está funcionando, você pode:

1. Copiar a URL do Vercel (ex: `https://mapa-brechos.vercel.app`)
2. Compartilhar com o movimento
3. Colocar no WhatsApp, Instagram, site do WordPress
4. Todo mundo pode acessar 24/7! 🌍

---

# 💡 PRÓXIMOS PASSOS (OPCIONAL)

## Configurar Domínio Próprio

Se você tem um domínio (ex: `meusite.com.br`):

**No Vercel:**
1. Vá em **"Settings"** → **"Domains"**
2. Adicione seu domínio
3. Siga as instruções para configurar o DNS

---

# 🆘 PRECISA DE AJUDA?

Se algo deu errado:

1. **Tire prints** das telas de erro
2. **Mande aqui no chat** que eu te ajudo
3. **Ou me diga** em qual etapa você está travado

Estou aqui para ajudar! 💪

---

# 📊 RESUMO DO QUE VOCÊ TEM AGORA

- ✅ Código salvo no GitHub
- ✅ Banco de dados MongoDB (gratuito)
- ✅ Backend rodando no Railway (gratuito)
- ✅ Frontend rodando no Vercel (gratuito)
- ✅ Site público funcionando 24/7
- ✅ Custo: R$ 0,00/mês

**Parabéns!** 🎉🎊✨
