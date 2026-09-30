# Picly 📸 — Rede Social Moderna

**Picly** é uma aplicação web completa de rede social inspirada nas melhores funcionalidades do Instagram, desenvolvida com identidade visual própria, design moderno, minimalista e responsivo, funcionando perfeitamente em computadores e celulares.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** com **TypeScript**
- **Tailwind CSS v4**
- **React Router v7**
- **Lucide Icons** & Web APIs

### Backend
- **Node.js** com **Express**
- **TypeScript** via `tsx`
- **JWT (JSON Web Tokens)** para autenticação segura
- **Bcryptjs** para hash criptográfico de senhas
- **Multer** para upload de imagens (armazenamento estático e suporte a Base64)

### Banco de Dados & Armazenamento
- **Supabase PostgreSQL** (Schema completo fornecido em `supabase_schema.sql` com Foreign Keys, Índices, Políticas RLS e Triggers)
- Banco de dados relacional integrado com persistência de dados local out-of-the-box (`data/picly_db.json`)
- Suporte a Supabase Storage

---

## 🌟 Funcionalidades Principais

1. **Autenticação Segura & Teste Instantâneo**:
   - Cadastro com validação de formato de e-mail, senha mínima e unicidade de `@username`.
   - Login por e-mail ou nome de usuário com senha criptografada.
   - Contas fictícias pré-populadas para atividades em laboratório.
   - Modal de recuperação de senha.

2. **Feed Principal & Stories (24h)**:
   - Feed dinâmico com fotos em alta definição, avatar, autor, localização e carimbo de tempo.
   - **Stories horizontais** no topo: anéis gradientes vibrantes para histórias não vistas.
   - **Visualizador Fullscreen de Stories**: temporizador de 5 segundos, pause ao pressionar, navegação por toque e exclusão pelo proprietário.
   - **Duplo clique ou duplo toque na foto para curtir** com animação de coração flutuante.

3. **Interações Sociais**:
   - **Curtidas** em tempo real com contador e bloqueio de curtidas duplicadas.
   - **Comentários** instantâneos com exclusão pelo autor do comentário ou pelo dono da publicação.
   - **Salvar publicações**: coleção privada acessível em `/saved`.
   - **Compartilhar**: cópia instantânea do link da publicação com notificação toast.

4. **Perfis & Sistema de Seguir**:
   - Perfis completos com foto, biografia, link externo e contadores de publicações, seguidores e seguindo.
   - Modais para visualizar listas de seguidores e seguindo.
   - **Contas Públicas e Privadas**: perfis privados exigem solicitação para seguir; aba de aprovação/recusa em Configurações.
   - Edição de perfil com upload de fotos.

5. **Mensagens Diretas (Chat Privado)**:
   - Página `/messages` e `/messages/:id` com layout dividido em desktop e fluido no celular.
   - Lista de conversas com prévia da última mensagem e contador de não lidas.
   - Busca para iniciar conversa com qualquer usuário.
   - Troca de mensagens em tempo real com polling ativo.

6. **Notificações**:
   - Central de notificações para curtidas, comentários, novos seguidores e solicitações.
   - Indicador de status lida/não lida e botão para "Marcar todas como lidas".

7. **Painel Administrativo Completo (`/admin`)**:
   - Protegido no backend e no frontend (acesso restrito a usuários com `role: 'admin'`).
   - **Dashboard**: total de usuários, publicações, comentários, curtidas, novos cadastros hoje e denúncias pendentes.
   - **Gestão de Usuários (`/admin/users`)**: tabela com ID, avatar, e-mail, data, suspensão/reativação e promoção para administrador.
   - **Moderação de Posts (`/admin/posts`)**: visualização e exclusão com registro de motivo para auditoria.
   - **Fila de Denúncias (`/admin/reports`)**: análise de denúncias da comunidade (spam, assédio, etc.) com atualização de status (*pendente*, *analisando*, *resolvido*).

---

## 🛠️ Como Instalar e Rodar Localmente

### 1. Clonar ou Acessar o Repositório
```bash
git clone <url-do-repositorio>
cd picly
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
JWT_SECRET=sua_chave_secreta_jwt_picly_2026
NODE_ENV=development
PORT=3000
```
> **Nota:** Caso você não tenha um projeto Supabase configurado de início, a aplicação funcionará normalmente utilizando o banco de dados de desenvolvimento embutido e persistente em `data/picly_db.json`.

### 4. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Acesse o aplicativo em seu navegador:
👉 `http://localhost:3000`

---

## 🗄️ Como Configurar o Supabase

1. Crie um projeto gratuito no [Supabase](https://supabase.com).
2. Acesse o **SQL Editor** do dashboard do Supabase.
3. Abra o arquivo `supabase_schema.sql` presente na raiz deste projeto.
4. Cole todo o conteúdo no SQL Editor e execute (**Run**).
5. O script criará:
   - Todas as tabelas: `profiles`, `posts`, `likes`, `comments`, `follows`, `saved_posts`, `notifications`, `messages`, `stories`, `reports`.
   - Índices de performance.
   - Tipos e enums (`user_role`, `report_status`, `follow_status`).
   - Políticas completas de **Row Level Security (RLS)**.
6. Copie sua `URL` e `Anon Key` das configurações de API do Supabase para o seu `.env`.

---

## 👑 Como Criar ou Promover um Usuário para Administrador

Existem duas formas seguras e documentadas:

### Método 1: Pela Interface Administrativa ou Login de Teste
1. Faça login com uma conta administrativa definida pelo responsável do laboratório.
2. Vá em **Painel Admin** no menu lateral (`/admin/users`).
3. Ao lado de qualquer usuário listado, clique no botão **"Tornar Admin"**.

### Método 2: Pelo Banco de Dados (SQL do Supabase ou Terminal)
Execute o seguinte comando no SQL Editor do Supabase ou banco de dados:

```sql
UPDATE profiles
SET role = 'admin'
WHERE username = 'seunomedeusuario';
```
Exemplo:
```sql
UPDATE profiles
SET role = 'admin'
WHERE username = 'lucas';
```

---


## 🧪 Modo de laboratório de segurança

O projeto inclui um cenário **intencionalmente vulnerável e limitado**, destinado exclusivamente a atividades autorizadas neste próprio aplicativo. A falha não concede acesso administrativo e pode ser desativada definindo `LAB_MODE=false`.

> O arquivo local `TEACHER_NOTES.md` contém a resposta do desafio e está no `.gitignore`, portanto não deve ser publicado junto com o repositório dos alunos.

## 📦 Build e Deploy

### Build para Produção
```bash
npm run build
```

### Deploy no Render (Aplicação Fullstack)
1. Conecte o repositório GitHub ao [Render](https://render.com).
2. Crie um novo **Web Service**.
3. Configure:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Adicione as variáveis de ambiente (`JWT_SECRET`, `NODE_ENV=production`, `PORT=3000`, etc.).

### GitHub Pages / Vercel
O GitHub Pages e um deploy Vite puro hospedam apenas o frontend. Como o Picly usa API Node/Express, o exercício completo precisa de um serviço Node (por exemplo, Render).

### Deploy na Vercel (Frontend SPA)
1. Conecte o repositório na [Vercel](https://vercel.com).
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

---

## 👥 Contas de Teste Pré-Configuradas

As contas abaixo são fictícias e destinadas ao laboratório. O responsável pode redefinir as senhas antes de distribuir a atividade.

| Nome | @Username | E-mail | Tipo |
| :--- | :--- | :--- | :--- |
| **Lucas Martins** | `@lucas` | `lucas@picly.com` | Fotógrafo (Usuário) |
| **Mariana Souza** | `@mari` | `mari@picly.com` | Designer (Usuário) |
| **Pedro Lima** | `@pedrolima` | `pedro@picly.com` | Desenvolvedor (Usuário) |
| **Julia Alves** | `@juliaalves` | `julia@picly.com` | Gastronomia (Usuário) |
| **Carlos Mendes** | `@carlos` | `carlos@picly.com` | Atleta (Conta Privada) |
| **Admin Picly** | `@admin` | `admin@picly.com` | **Administrador Geral** |

---

© 2026 **Picly**. Todos os direitos reservados.
