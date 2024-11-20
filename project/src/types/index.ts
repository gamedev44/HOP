export type UserStatus = 'online' | 'idle' | 'dnd' | 'invisible';
export type ChannelType = 'river' | 'stream' | 'current' | 'hop' | 'leap' | 'burrow';
export type ServerTier = 'lilypad' | 'pond' | 'lake' | 'lagoon' | 'swamp';

export interface User {
  id: string;
  name: string;
  nickname?: string;
  isOnline: boolean;
  status: UserStatus;
  avatarUrl?: string;
  customStatus?: string;
  badges?: string[];
}

export interface Category {
  id: string;
  name: string;
  serverId: string;
  isPrivate: boolean;
  channels: Channel[];
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  serverId: string;
  categoryId: string;
  isPrivate: boolean;
  topic?: string;
  slowMode?: number;
  userLimit?: number;
}

export interface Server {
  id: string;
  name: string;
  iconUrl?: string;
  description?: string;
  tier: ServerTier;
  ownerId: string;
  categories: Category[];
  channels: Channel[];
  members: User[];
  roles: Role[];
  emojis: CustomEmoji[];
  boosts: number;
  features: string[];
}

export interface Role {
  id: string;
  name: string;
  color: string;
  position: number;
  permissions: string[];
  mentionable: boolean;
}

export interface CustomEmoji {
  id: string;
  name: string;
  url: string;
  animated: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  channelId: string;
  timestamp: number;
  editedAt?: number;
  attachments?: string[];
  embeds?: MessageEmbed[];
  reactions?: MessageReaction[];
  mentions?: string[];
  replyTo?: string;
}

export interface MessageEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: string;
  image?: string;
  thumbnail?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface PeerConnection {
  peerId: string;
  connection: SimplePeer.Instance;
}