# 🔧 Guia de Solução de Problemas - Railway

## Erro: Build Failed

### Passo 1: Verificar Logs
1. No Railway, clique no seu projeto
2. Clique na aba "Deployments"
3. Clique no deployment que falhou
4. Role para baixo e veja os logs de erro

### Passo 2: Problemas Comuns e Soluções

#### ❌ Erro: "No module named 'server'"
**Solução:**
- O Railway está tentando rodar de fora da pasta backend
- Configure o Root Directory no Railway:
  1. Clique em "Settings"
  2. Em "Root Directory", deixe vazio (não coloque /backend)
  3. Os arquivos `nixpacks.toml` e `Procfile` já têm `cd backend`

#### ❌ Erro: "Address already in use" ou "PORT not found"
**Solução:**
- Certifique-se que o comando de start usa `${PORT:-8000}`
- Verifique o arquivo `nixpacks.toml` ou `Procfile`

#### ❌ Erro: "Could not find a version that satisfies the requirement"
**Solução:**
1. Verifique se o arquivo `backend/requirements.txt` existe
2. Certifique-se que o Python 3.11 está especificado em `runtime.txt`

#### ❌ Erro: "MONGO_URL not found"
**Solução:**
1. Adicione as variáveis de ambiente no Railway:
   - Settings → Variables
   - Adicione: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`

### Passo 3: Configuração Manual do Railway

Se ainda não funcionar, configure manualmente:

1. **Build Command** (Settings → Build):
```bash
cd backend && pip install -r requirements.txt
```

2. **Start Command** (Settings → Deploy):
```bash
cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT
```

3. **Root Directory** (Settings):
```
(deixe vazio)
```

4. **Variáveis de Ambiente** (Settings → Variables):
```
MONGO_URL=mongodb+srv://usuario:senha@cluster.xxxxx.mongodb.net/brechos_db
DB_NAME=brechos_db
CORS_ORIGINS=*
```

### Passo 4: Forçar Redeploy

1. No Railway, vá em "Deployments"
2. Clique nos 3 pontinhos do último deploy
3. Clique em "Redeploy"

### Passo 5: Verificar se Funcionou

Teste o backend:
```
https://sua-url-railway.app/api/
```

Deve retornar:
```json
{
  "message": "Mapa de Brechós - MOVIMENTO FIOS DE FORÇA"
}
```

---

## Alternativa: Usar Render.com

Se o Railway continuar com problemas, use o Render.com (também gratuito):

1. Acesse: https://render.com
2. Crie uma conta
3. Clique em "New +" → "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Name**: brecho-backend
   - **Region**: Oregon
   - **Branch**: main
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

6. Adicione as variáveis de ambiente
7. Clique em "Create Web Service"

---

## Ainda com Problemas?

### Verificar Arquivo requirements.txt

Certifique-se que o arquivo `/backend/requirements.txt` tem todas as dependências:

```
fastapi==0.110.1
uvicorn==0.25.0
httpx
pandas
motor
pymongo
pydantic
python-dotenv
requests
```

### Logs Detalhados

Para ver logs mais detalhados no Railway:
1. Clique no deployment
2. Role até o final para ver todos os logs
3. Procure por linhas com "ERROR" ou "FAILED"

### Suporte

Se nada funcionar:
1. Tire um print dos logs de erro completos
2. Compartilhe aqui para eu ajudar a diagnosticar
3. Ou tente o Render.com como alternativa

---

## Checklist de Verificação ✅

Antes de fazer deploy, confirme:

- [ ] Arquivo `backend/requirements.txt` existe
- [ ] Arquivo `backend/runtime.txt` existe (deve ter `python-3.11`)
- [ ] Arquivo `nixpacks.toml` existe na raiz
- [ ] Arquivo `Procfile` existe na raiz
- [ ] Variáveis de ambiente configuradas no Railway
- [ ] MongoDB Atlas está funcionando e acessível
- [ ] String de conexão do MongoDB está correta (com senha e dbname)

---

Boa sorte com o deploy! 🚀
