import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  name: string;
  email: string;
  password_hash: string;
  bio: string;
  avatar_url: string;
  website: string;
  is_private: boolean;
  is_suspended: boolean;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  image_url: string;
  caption: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  status: 'accepted' | 'pending';
  created_at: string;
}

export interface SavedPost {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string; // recipient
  actor_id: string; // initiator
  type: 'like' | 'comment' | 'follow' | 'follow_request' | 'follow_accept';
  post_id?: string;
  comment_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Story {
  id: string;
  user_id: string;
  image_url: string;
  created_at: string;
  expires_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_type: 'post' | 'comment' | 'profile';
  target_id: string;
  reason: 'spam' | 'conteúdo impróprio' | 'assédio' | 'perfil falso' | 'outro';
  description: string;
  status: 'pendente' | 'analisando' | 'resolvido';
  created_at: string;
}

export interface DatabaseSchema {
  profiles: Profile[];
  posts: Post[];
  likes: Like[];
  comments: Comment[];
  follows: Follow[];
  saved_posts: SavedPost[];
  notifications: Notification[];
  messages: Message[];
  stories: Story[];
  reports: Report[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'picly_db.json');

// Helper to hash password
export function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, 10);
}

export function comparePassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}

// Generate realistic initial seed database
function createInitialDatabase(): DatabaseSchema {
  const defaultPasswordHash = hashPassword('password123');

  const uAdminId = 'u-admin-0000';
  const uLucasId = 'u-lucas-1111';
  const uMariId = 'u-mari-2222';
  const uPedroId = 'u-pedro-3333';
  const uJuliaId = 'u-julia-4444';
  const uCarlosId = 'u-carlos-5555';

  const now = new Date();
  const isoNow = now.toISOString();
  const pastHours = (h: number) => new Date(Date.now() - h * 3600 * 1000).toISOString();
  const futureHours = (h: number) => new Date(Date.now() + h * 3600 * 1000).toISOString();

  const profiles: Profile[] = [
    {
      id: uLucasId,
      user_id: uLucasId,
      username: 'lucas',
      name: 'Lucas Martins',
      email: 'lucas@picly.com',
      password_hash: defaultPasswordHash,
      bio: '📸 Fotógrafo urbano e entusiasta visual. Capturando luzes e arquitetura em São Paulo.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      website: 'https://lucasmartins.photo',
      is_private: false,
      is_suspended: false,
      role: 'user',
      created_at: pastHours(240),
      updated_at: pastHours(10),
    },
    {
      id: uMariId,
      user_id: uMariId,
      username: 'mari',
      name: 'Mariana Souza',
      email: 'mari@picly.com',
      password_hash: defaultPasswordHash,
      bio: '✨ Product Designer & amante de café especial. Explorando cores e minimalismo.',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
      website: 'https://marianasouza.design',
      is_private: false,
      is_suspended: false,
      role: 'user',
      created_at: pastHours(200),
      updated_at: pastHours(8),
    },
    {
      id: uPedroId,
      user_id: uPedroId,
      username: 'pedrolima',
      name: 'Pedro Lima',
      email: 'pedro@picly.com',
      password_hash: defaultPasswordHash,
      bio: '🌍 Viajante e desenvolvedor nômade. Amante de montanhas, trilhas e tecnologia.',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      website: 'https://pedrolima.dev',
      is_private: false,
      is_suspended: false,
      role: 'user',
      created_at: pastHours(180),
      updated_at: pastHours(5),
    },
    {
      id: uJuliaId,
      user_id: uJuliaId,
      username: 'juliaalves',
      name: 'Julia Alves',
      email: 'julia@picly.com',
      password_hash: defaultPasswordHash,
      bio: '🌿 Gastronomia botânica, fermentação natural & vida consciente. Rio de Janeiro.',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      website: 'https://receitasdajulia.com',
      is_private: false,
      is_suspended: false,
      role: 'user',
      created_at: pastHours(150),
      updated_at: pastHours(4),
    },
    {
      id: uCarlosId,
      user_id: uCarlosId,
      username: 'carlos',
      name: 'Carlos Mendes',
      email: 'carlos@picly.com',
      password_hash: defaultPasswordHash,
      bio: '🏃‍♂️ Maratonista amador e triatleta. Saúde, foco e determinação todos os dias!',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      website: '',
      is_private: true,
      is_suspended: false,
      role: 'user',
      created_at: pastHours(120),
      updated_at: pastHours(12),
    },
    {
      id: uAdminId,
      user_id: uAdminId,
      username: 'admin',
      name: 'Admin Picly',
      email: 'admin@picly.com',
      password_hash: defaultPasswordHash,
      bio: '🛡️ Conta oficial da equipe de moderação e engenharia do Picly.',
      avatar_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
      website: 'https://picly.social',
      is_private: false,
      is_suspended: false,
      role: 'admin',
      created_at: pastHours(300),
      updated_at: pastHours(1),
    },
  ];

  const posts: Post[] = [
    {
      id: 'p-1',
      user_id: uLucasId,
      image_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1080&auto=format&fit=crop&q=85',
      caption: 'Luz dourada cortando os prédios da Avenida Paulista hoje ao entardecer. A arquitetura nunca deixa de surpreender. #urbano #sp #goldenhour',
      location: 'Avenida Paulista, São Paulo',
      created_at: pastHours(3),
      updated_at: pastHours(3),
    },
    {
      id: 'p-2',
      user_id: uMariId,
      image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&auto=format&fit=crop&q=85',
      caption: 'Organizando o workspace para a nova semana de criação. Minimalismo não é ter pouco, é ter apenas o que faz sentido 💻☕',
      location: 'Vila Madalena, São Paulo',
      created_at: pastHours(6),
      updated_at: pastHours(6),
    },
    {
      id: 'p-3',
      user_id: uPedroId,
      image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&auto=format&fit=crop&q=85',
      caption: 'Acampamento nas alturas. O silêncio do topo da serra renova qualquer energia. Próxima parada: Patagônia! 🏔️🎒',
      location: 'Serra da Mantiqueira, MG',
      created_at: pastHours(12),
      updated_at: pastHours(12),
    },
    {
      id: 'p-4',
      user_id: uJuliaId,
      image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1080&auto=format&fit=crop&q=85',
      caption: 'Pão sourdough fresquinho saindo da panela de ferro. Casquinha estalando e 36 horas de fermentação natural. O aroma tomou conta da casa toda! 🍞💛',
      location: 'Santa Teresa, Rio de Janeiro',
      created_at: pastHours(18),
      updated_at: pastHours(18),
    },
    {
      id: 'p-5',
      user_id: uLucasId,
      image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1080&auto=format&fit=crop&q=85',
      caption: 'Reflexos calmos em águas profundas. Uma pausa necessária no meio da correria cotidiana.',
      location: 'Parque Nacional de Itatiaia',
      created_at: pastHours(36),
      updated_at: pastHours(36),
    },
    {
      id: 'p-6',
      user_id: uCarlosId,
      image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1080&auto=format&fit=crop&q=85',
      caption: '15km na conta antes do sol nascer. A disciplina é o melhor combustível para os nossos objetivos! 🏅🔥',
      location: 'Parque Ibirapuera',
      created_at: pastHours(24),
      updated_at: pastHours(24),
    },
  ];

  const likes: Like[] = [
    { id: 'l-1', user_id: uMariId, post_id: 'p-1', created_at: pastHours(2) },
    { id: 'l-2', user_id: uPedroId, post_id: 'p-1', created_at: pastHours(2) },
    { id: 'l-3', user_id: uJuliaId, post_id: 'p-1', created_at: pastHours(1) },
    { id: 'l-4', user_id: uLucasId, post_id: 'p-2', created_at: pastHours(5) },
    { id: 'l-5', user_id: uCarlosId, post_id: 'p-2', created_at: pastHours(4) },
    { id: 'l-6', user_id: uMariId, post_id: 'p-3', created_at: pastHours(10) },
    { id: 'l-7', user_id: uLucasId, post_id: 'p-3', created_at: pastHours(8) },
    { id: 'l-8', user_id: uPedroId, post_id: 'p-4', created_at: pastHours(15) },
    { id: 'l-9', user_id: uMariId, post_id: 'p-4', created_at: pastHours(14) },
  ];

  const comments: Comment[] = [
    {
      id: 'c-1',
      user_id: uMariId,
      post_id: 'p-1',
      content: 'Essa luz ficou fantástica, Lucas! Que lente você usou?',
      created_at: pastHours(2),
    },
    {
      id: 'c-2',
      user_id: uLucasId,
      post_id: 'p-1',
      content: 'Obrigado Mari! Foi com a 35mm f/1.8 na hora perfeita do sol se pondo!',
      created_at: pastHours(1),
    },
    {
      id: 'c-3',
      user_id: uPedroId,
      post_id: 'p-2',
      content: 'Setup dos sonhos! A produtividade agradece 👏',
      created_at: pastHours(4),
    },
    {
      id: 'c-4',
      user_id: uLucasId,
      post_id: 'p-3',
      content: 'Que lugar surreal Pedro! Leva um agasalho pesado hein!',
      created_at: pastHours(9),
    },
    {
      id: 'c-5',
      user_id: uMariId,
      post_id: 'p-4',
      content: 'Quero um pedaço dessa maravilha urgente! 😍',
      created_at: pastHours(14),
    },
  ];

  const follows: Follow[] = [
    { id: 'f-1', follower_id: uLucasId, following_id: uMariId, status: 'accepted', created_at: pastHours(100) },
    { id: 'f-2', follower_id: uLucasId, following_id: uPedroId, status: 'accepted', created_at: pastHours(90) },
    { id: 'f-3', follower_id: uMariId, following_id: uLucasId, status: 'accepted', created_at: pastHours(95) },
    { id: 'f-4', follower_id: uMariId, following_id: uJuliaId, status: 'accepted', created_at: pastHours(80) },
    { id: 'f-5', follower_id: uPedroId, following_id: uLucasId, status: 'accepted', created_at: pastHours(70) },
    { id: 'f-6', follower_id: uJuliaId, following_id: uLucasId, status: 'accepted', created_at: pastHours(60) },
    { id: 'f-7', follower_id: uCarlosId, following_id: uLucasId, status: 'accepted', created_at: pastHours(50) },
  ];

  const saved_posts: SavedPost[] = [
    { id: 'sp-1', user_id: uLucasId, post_id: 'p-2', created_at: pastHours(5) },
    { id: 'sp-2', user_id: uLucasId, post_id: 'p-3', created_at: pastHours(11) },
  ];

  const notifications: Notification[] = [
    {
      id: 'n-1',
      user_id: uLucasId,
      actor_id: uMariId,
      type: 'like',
      post_id: 'p-1',
      is_read: false,
      created_at: pastHours(2),
    },
    {
      id: 'n-2',
      user_id: uLucasId,
      actor_id: uMariId,
      type: 'comment',
      post_id: 'p-1',
      comment_id: 'c-1',
      is_read: false,
      created_at: pastHours(2),
    },
    {
      id: 'n-3',
      user_id: uLucasId,
      actor_id: uJuliaId,
      type: 'follow',
      is_read: true,
      created_at: pastHours(60),
    },
  ];

  const messages: Message[] = [
    {
      id: 'm-1',
      sender_id: uMariId,
      receiver_id: uLucasId,
      content: 'Oi Lucas! Vi sua foto na Paulista, muito boa!',
      is_read: true,
      created_at: pastHours(4),
    },
    {
      id: 'm-2',
      sender_id: uLucasId,
      receiver_id: uMariId,
      content: 'Obrigado Mari! O dia estava com um céu limpo incrível.',
      is_read: true,
      created_at: pastHours(3),
    },
    {
      id: 'm-3',
      sender_id: uMariId,
      receiver_id: uLucasId,
      content: 'Precisamos marcar aquele ensaio que conversamos para o portfólio novo!',
      is_read: false,
      created_at: pastHours(2),
    },
    {
      id: 'm-4',
      sender_id: uPedroId,
      receiver_id: uLucasId,
      content: 'Fala Lucas! Bora subir a serra no próximo feriado?',
      is_read: true,
      created_at: pastHours(10),
    },
  ];

  const stories: Story[] = [
    {
      id: 's-1',
      user_id: uLucasId,
      image_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
      created_at: pastHours(2),
      expires_at: futureHours(22),
    },
    {
      id: 's-2',
      user_id: uMariId,
      image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      created_at: pastHours(4),
      expires_at: futureHours(20),
    },
    {
      id: 's-3',
      user_id: uPedroId,
      image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
      created_at: pastHours(6),
      expires_at: futureHours(18),
    },
    {
      id: 's-4',
      user_id: uJuliaId,
      image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
      created_at: pastHours(1),
      expires_at: futureHours(23),
    },
  ];

  const reports: Report[] = [
    {
      id: 'rep-1',
      reporter_id: uMariId,
      target_type: 'post',
      target_id: 'p-6',
      reason: 'spam',
      description: 'Conta postando links repetitivos de suplementos nos comentários.',
      status: 'pendente',
      created_at: pastHours(5),
    },
  ];

  return {
    profiles,
    posts,
    likes,
    comments,
    follows,
    saved_posts,
    notifications,
    messages,
    stories,
    reports,
  };
}

class Database {
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read existing database file, initializing fresh database', e);
    }
    const initial = createInitialDatabase();
    this.saveImmediate(initial);
    return initial;
  }

  public save(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveImmediate(this.data);
    }, 200);
  }

  private saveImmediate(data: DatabaseSchema): void {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write database file', e);
    }
  }

  // Profile queries
  public getProfiles(): Profile[] {
    return this.data.profiles;
  }

  public getProfileById(id: string): Profile | undefined {
    return this.data.profiles.find((p) => p.id === id);
  }

  public getProfileByUsername(username: string): Profile | undefined {
    return this.data.profiles.find((p) => p.username.toLowerCase() === username.toLowerCase());
  }

  public getProfileByEmail(email: string): Profile | undefined {
    return this.data.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
  }

  public createProfile(profile: Omit<Profile, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Profile {
    const id = 'u-' + crypto.randomUUID().slice(0, 8);
    const now = new Date().toISOString();
    const newProfile: Profile = {
      ...profile,
      id,
      user_id: id,
      created_at: now,
      updated_at: now,
    };
    this.data.profiles.push(newProfile);
    this.save();
    return newProfile;
  }

  public updateProfile(id: string, updates: Partial<Profile>): Profile | undefined {
    const index = this.data.profiles.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.data.profiles[index] = {
      ...this.data.profiles[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.save();
    return this.data.profiles[index];
  }

  public deleteProfile(id: string): boolean {
    const initialLen = this.data.profiles.length;
    this.data.profiles = this.data.profiles.filter((p) => p.id !== id);
    // Cascade delete user data
    this.data.posts = this.data.posts.filter((p) => p.user_id !== id);
    this.data.likes = this.data.likes.filter((l) => l.user_id !== id);
    this.data.comments = this.data.comments.filter((c) => c.user_id !== id);
    this.data.follows = this.data.follows.filter((f) => f.follower_id !== id && f.following_id !== id);
    this.data.saved_posts = this.data.saved_posts.filter((sp) => sp.user_id !== id);
    this.data.stories = this.data.stories.filter((s) => s.user_id !== id);
    this.data.messages = this.data.messages.filter((m) => m.sender_id !== id && m.receiver_id !== id);
    this.save();
    return this.data.profiles.length < initialLen;
  }

  // Posts queries
  public getPosts(): Post[] {
    return [...this.data.posts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public getPostById(id: string): Post | undefined {
    return this.data.posts.find((p) => p.id === id);
  }

  public getPostsByUser(userId: string): Post[] {
    return this.data.posts
      .filter((p) => p.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public createPost(post: { user_id: string; image_url: string; caption: string; location?: string }): Post {
    const id = 'p-' + crypto.randomUUID().slice(0, 8);
    const now = new Date().toISOString();
    const newPost: Post = {
      id,
      user_id: post.user_id,
      image_url: post.image_url,
      caption: post.caption,
      location: post.location || '',
      created_at: now,
      updated_at: now,
    };
    this.data.posts.unshift(newPost);
    this.save();
    return newPost;
  }

  public updatePost(id: string, updates: Partial<Post>): Post | undefined {
    const post = this.data.posts.find((p) => p.id === id);
    if (!post) return undefined;
    Object.assign(post, updates, { updated_at: new Date().toISOString() });
    this.save();
    return post;
  }

  public deletePost(id: string): boolean {
    const initialLen = this.data.posts.length;
    this.data.posts = this.data.posts.filter((p) => p.id !== id);
    this.data.likes = this.data.likes.filter((l) => l.post_id !== id);
    this.data.comments = this.data.comments.filter((c) => c.post_id !== id);
    this.data.saved_posts = this.data.saved_posts.filter((sp) => sp.post_id !== id);
    this.save();
    return this.data.posts.length < initialLen;
  }

  // Likes queries
  public getLikesByPost(postId: string): Like[] {
    return this.data.likes.filter((l) => l.post_id === postId);
  }

  public hasUserLiked(userId: string, postId: string): boolean {
    return this.data.likes.some((l) => l.user_id === userId && l.post_id === postId);
  }

  public toggleLike(userId: string, postId: string): { liked: boolean; count: number } {
    const existingIndex = this.data.likes.findIndex((l) => l.user_id === userId && l.post_id === postId);
    let liked = false;
    if (existingIndex >= 0) {
      this.data.likes.splice(existingIndex, 1);
      liked = false;
    } else {
      this.data.likes.push({
        id: 'l-' + crypto.randomUUID().slice(0, 8),
        user_id: userId,
        post_id: postId,
        created_at: new Date().toISOString(),
      });
      liked = true;

      // Create notification for post owner if not self
      const post = this.getPostById(postId);
      if (post && post.user_id !== userId) {
        this.createNotification({
          user_id: post.user_id,
          actor_id: userId,
          type: 'like',
          post_id: postId,
        });
      }
    }
    this.save();
    const count = this.getLikesByPost(postId).length;
    return { liked, count };
  }

  // Comments queries
  public getCommentsByPost(postId: string): Comment[] {
    return this.data.comments
      .filter((c) => c.post_id === postId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  public createComment(userId: string, postId: string, content: string): Comment {
    const id = 'c-' + crypto.randomUUID().slice(0, 8);
    const newComment: Comment = {
      id,
      user_id: userId,
      post_id: postId,
      content,
      created_at: new Date().toISOString(),
    };
    this.data.comments.push(newComment);

    const post = this.getPostById(postId);
    if (post && post.user_id !== userId) {
      this.createNotification({
        user_id: post.user_id,
        actor_id: userId,
        type: 'comment',
        post_id: postId,
        comment_id: id,
      });
    }

    this.save();
    return newComment;
  }

  public deleteComment(id: string): boolean {
    const initialLen = this.data.comments.length;
    this.data.comments = this.data.comments.filter((c) => c.id !== id);
    this.save();
    return this.data.comments.length < initialLen;
  }

  // Follows
  public getFollowers(userId: string): Follow[] {
    return this.data.follows.filter((f) => f.following_id === userId && f.status === 'accepted');
  }

  public getFollowing(userId: string): Follow[] {
    return this.data.follows.filter((f) => f.follower_id === userId && f.status === 'accepted');
  }

  public getPendingFollowRequests(userId: string): Follow[] {
    return this.data.follows.filter((f) => f.following_id === userId && f.status === 'pending');
  }

  public getFollowStatus(followerId: string, followingId: string): 'none' | 'following' | 'pending' {
    const f = this.data.follows.find((item) => item.follower_id === followerId && item.following_id === followingId);
    if (!f) return 'none';
    return f.status === 'accepted' ? 'following' : 'pending';
  }

  public toggleFollow(followerId: string, followingId: string): { status: 'none' | 'following' | 'pending' } {
    if (followerId === followingId) return { status: 'none' };
    const targetUser = this.getProfileById(followingId);
    if (!targetUser) return { status: 'none' };

    const existingIndex = this.data.follows.findIndex(
      (f) => f.follower_id === followerId && f.following_id === followingId
    );

    if (existingIndex >= 0) {
      this.data.follows.splice(existingIndex, 1);
      this.save();
      return { status: 'none' };
    }

    const followStatus: 'accepted' | 'pending' = targetUser.is_private ? 'pending' : 'accepted';
    this.data.follows.push({
      id: 'f-' + crypto.randomUUID().slice(0, 8),
      follower_id: followerId,
      following_id: followingId,
      status: followStatus,
      created_at: new Date().toISOString(),
    });

    this.createNotification({
      user_id: followingId,
      actor_id: followerId,
      type: followStatus === 'pending' ? 'follow_request' : 'follow',
    });

    this.save();
    return { status: followStatus === 'accepted' ? 'following' : 'pending' };
  }

  public respondToFollowRequest(requestId: string, action: 'accept' | 'reject', userId: string): boolean {
    const fIndex = this.data.follows.findIndex((f) => f.id === requestId && f.following_id === userId);
    if (fIndex === -1) return false;

    if (action === 'accept') {
      this.data.follows[fIndex].status = 'accepted';
      this.createNotification({
        user_id: this.data.follows[fIndex].follower_id,
        actor_id: userId,
        type: 'follow_accept',
      });
    } else {
      this.data.follows.splice(fIndex, 1);
    }
    this.save();
    return true;
  }

  // Saved posts
  public isPostSaved(userId: string, postId: string): boolean {
    return this.data.saved_posts.some((sp) => sp.user_id === userId && sp.post_id === postId);
  }

  public toggleSavePost(userId: string, postId: string): { saved: boolean } {
    const existingIndex = this.data.saved_posts.findIndex((sp) => sp.user_id === userId && sp.post_id === postId);
    if (existingIndex >= 0) {
      this.data.saved_posts.splice(existingIndex, 1);
      this.save();
      return { saved: false };
    } else {
      this.data.saved_posts.push({
        id: 'sp-' + crypto.randomUUID().slice(0, 8),
        user_id: userId,
        post_id: postId,
        created_at: new Date().toISOString(),
      });
      this.save();
      return { saved: true };
    }
  }

  public getSavedPosts(userId: string): Post[] {
    const postIds = this.data.saved_posts.filter((sp) => sp.user_id === userId).map((sp) => sp.post_id);
    return this.data.posts.filter((p) => postIds.includes(p.id));
  }

  // Stories
  public getActiveStories(): (Story & { user: Profile })[] {
    const now = new Date();
    // remove expired
    this.data.stories = this.data.stories.filter((s) => new Date(s.expires_at) > now);

    return this.data.stories
      .map((s) => {
        const user = this.getProfileById(s.user_id);
        return user ? { ...s, user } : null;
      })
      .filter(Boolean) as (Story & { user: Profile })[];
  }

  public createStory(userId: string, imageUrl: string): Story {
    const now = new Date();
    const expires = new Date(now.getTime() + 24 * 3600 * 1000);
    const story: Story = {
      id: 's-' + crypto.randomUUID().slice(0, 8),
      user_id: userId,
      image_url: imageUrl,
      created_at: now.toISOString(),
      expires_at: expires.toISOString(),
    };
    this.data.stories.push(story);
    this.save();
    return story;
  }

  public deleteStory(id: string, userId: string): boolean {
    const initLen = this.data.stories.length;
    this.data.stories = this.data.stories.filter((s) => s.id !== id || s.user_id !== userId);
    this.save();
    return this.data.stories.length < initLen;
  }

  // Messages
  public getConversations(userId: string): Array<{
    partner: Profile;
    lastMessage: Message;
    unreadCount: number;
  }> {
    const partnerIds = new Set<string>();
    for (const m of this.data.messages) {
      if (m.sender_id === userId) partnerIds.add(m.receiver_id);
      if (m.receiver_id === userId) partnerIds.add(m.sender_id);
    }

    const conversations: Array<{
      partner: Profile;
      lastMessage: Message;
      unreadCount: number;
    }> = [];

    for (const pid of partnerIds) {
      const partner = this.getProfileById(pid);
      if (!partner) continue;

      const userMessages = this.data.messages
        .filter((m) => (m.sender_id === userId && m.receiver_id === pid) || (m.sender_id === pid && m.receiver_id === userId))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      if (userMessages.length > 0) {
        const unreadCount = userMessages.filter((m) => m.receiver_id === userId && !m.is_read).length;
        conversations.push({
          partner,
          lastMessage: userMessages[0],
          unreadCount,
        });
      }
    }

    return conversations.sort((a, b) => new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime());
  }

  public getMessagesBetween(u1: string, u2: string): Message[] {
    const thread = this.data.messages
      .filter((m) => (m.sender_id === u1 && m.receiver_id === u2) || (m.sender_id === u2 && m.receiver_id === u1))
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    // Mark as read messages destined to u1
    let changed = false;
    for (const m of thread) {
      if (m.receiver_id === u1 && !m.is_read) {
        m.is_read = true;
        changed = true;
      }
    }
    if (changed) this.save();

    return thread;
  }

  public sendMessage(senderId: string, receiverId: string, content: string): Message {
    const msg: Message = {
      id: 'm-' + crypto.randomUUID().slice(0, 8),
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    this.data.messages.push(msg);
    this.save();
    return msg;
  }

  // Notifications
  public getNotifications(userId: string): Array<Notification & { actor: Profile; post?: Post }> {
    return this.data.notifications
      .filter((n) => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map((n) => {
        const actor = this.getProfileById(n.actor_id)!;
        const post = n.post_id ? this.getPostById(n.post_id) : undefined;
        return { ...n, actor, post };
      })
      .filter((n) => !!n.actor);
  }

  public createNotification(n: Omit<Notification, 'id' | 'created_at' | 'is_read'>): Notification {
    const notif: Notification = {
      ...n,
      id: 'n-' + crypto.randomUUID().slice(0, 8),
      is_read: false,
      created_at: new Date().toISOString(),
    };
    this.data.notifications.unshift(notif);
    this.save();
    return notif;
  }

  public markNotificationAsRead(id: string, userId: string): boolean {
    const notif = this.data.notifications.find((n) => n.id === id && n.user_id === userId);
    if (!notif) return false;
    notif.is_read = true;
    this.save();
    return true;
  }

  public markAllNotificationsAsRead(userId: string): void {
    let changed = false;
    for (const n of this.data.notifications) {
      if (n.user_id === userId && !n.is_read) {
        n.is_read = true;
        changed = true;
      }
    }
    if (changed) this.save();
  }

  // Reports
  public getReports(): Array<Report & { reporter: Profile }> {
    return this.data.reports
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map((r) => {
        const reporter = this.getProfileById(r.reporter_id) || {
          id: r.reporter_id,
          user_id: r.reporter_id,
          username: 'usuario',
          name: 'Usuário',
          email: '',
          password_hash: '',
          bio: '',
          avatar_url: '',
          website: '',
          is_private: false,
          is_suspended: false,
          role: 'user',
          created_at: '',
          updated_at: '',
        };
        return { ...r, reporter };
      });
  }

  public createReport(report: Omit<Report, 'id' | 'created_at' | 'status'>): Report {
    const newReport: Report = {
      ...report,
      id: 'rep-' + crypto.randomUUID().slice(0, 8),
      status: 'pendente',      created_at: new Date().toISOString(),
    };
    this.data.reports.unshift(newReport);
    this.save();
    return newReport;
  }

  public updateReportStatus(id: string, status: 'pendente' | 'analisando' | 'resolvido'): Report | undefined {
    const report = this.data.reports.find((r) => r.id === id);
    if (!report) return undefined;
    report.status = status;
    this.save();
    return report;
  }

  // Stats
  public getStats() {
    const totalUsers = this.data.profiles.length;
    const totalPosts = this.data.posts.length;
    const totalComments = this.data.comments.length;
    const totalLikes = this.data.likes.length;
    const pendingReports = this.data.reports.filter((r) => r.status === 'pendente').length;

    const oneDayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const newUsersToday = this.data.profiles.filter((p) => p.created_at >= oneDayAgo).length;
    const newPostsToday = this.data.posts.filter((p) => p.created_at >= oneDayAgo).length;

    return {
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      pendingReports,
      newUsersToday,
      newPostsToday,
    };
  }
}

export const db = new Database();