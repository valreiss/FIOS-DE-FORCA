# 🚀 Guia Rápido de Deploy

## Resumo dos 3 Passos

### 1️⃣ MongoDB Atlas (5 minutos)
- Criar conta gratuita em https://mongodb.com/cloud/atlas
- Criar cluster gratuito
- Copiar string de conexão

### 2️⃣ Backend no Railway (10 minutos)
- Criar conta em https://railway.app
- Deploy do repositório GitHub (pasta /backend)
- Adicionar variável: `MONGO_URL` com string do MongoDB
- Copiar URL gerada

### 3️⃣ Frontend no Vercel (5 minutos)
- Criar conta em https://vercel.com
- Deploy do repositório GitHub (pasta /frontend)
- Adicionar variável: `REACT_APP_BACKEND_URL` com URL do Railway
- Pronto! ✨

---

## URLs que Você Vai Precisar

### MongoDB Atlas
```
mongodb+srv://usuario:senha@cluster.xxxxx.mongodb.net/brechos_db
```

### Backend (Railway)
```
https://seu-backend.railway.app
```

### Frontend (Vercel)
```
https://seu-app.vercel.app
```

---

## Variáveis de Ambiente

### Backend (Railway/Render)
```env
MONGO_URL=mongodb+srv://usuario:senha@cluster.xxxxx.mongodb.net/brechos_db
DB_NAME=brechos_db
CORS_ORIGINS=*
```

### Frontend (Vercel)
```env
REACT_APP_BACKEND_URL=https://seu-backend.railway.app
```

---

## Checklist de Deploy ✅

- [ ] Conta MongoDB Atlas criada
- [ ] Cluster MongoDB criado (FREE tier)
- [ ] String de conexão copiada
- [ ] Conta Railway/Render criada
- [ ] Backend deployado
- [ ] Variáveis de ambiente configuradas no backend
- [ ] URL do backend copiada
- [ ] Conta Vercel criada
- [ ] Frontend deployado
- [ ] Variável REACT_APP_BACKEND_URL configurada
- [ ] Site testado e funcionando

---

## Tempo Total Estimado
⏱️ **20-30 minutos**

## Custo Total
💰 **R$ 0,00/mês** (100% GRATUITO)

---

## Próximos Passos Após Deploy

1. ✅ Testar todas as funcionalidades
2. ✅ Compartilhar URL com o movimento
3. ✅ Configurar domínio personalizado (opcional)
4. ✅ Monitorar uso e performance

---

Para instruções detalhadas, veja o arquivo **README.md** completo!