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
  leapPlus?: boolean;
  roles?: string[];
}

export interface Category {
  id: string;
  name: string;
  serverId: string;
  isPrivate: boolean;
  channels: Channel[];
  permissions?: CategoryPermissions;
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
  permissions?: ChannelPermissions;
  lastMessage?: Message;
  pinnedMessages?: Message[];
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
  permissions?: ServerPermissions;
  invites?: ServerInvite[];
  verificationLevel?: 'none' | 'low' | 'medium' | 'high' | 'highest';
  moderationSettings?: ModerationSettings;
}

export interface Role {
  id: string;
  name: string;
  color: string;
  position: number;
  permissions: string[];
  mentionable: boolean;
  hoist: boolean;
}

export interface CustomEmoji {
  id: string;
  name: string;
  url: string;
  animated: boolean;
  creator?: string;
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
  isPinned?: boolean;
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

export interface ServerPermissions {
  manageServer: boolean;
  manageRoles: boolean;
  manageChannels: boolean;
  kickMembers: boolean;
  banMembers: boolean;
  createInvites: boolean;
  changeNickname: boolean;
  manageNicknames: boolean;
  manageEmojis: boolean;
  viewAuditLog: boolean;
  viewServerInsights: boolean;
}

export interface CategoryPermissions {
  viewCategory: boolean;
  manageCategory: boolean;
  createChannels: boolean;
  deleteChannels: boolean;
}

export interface ChannelPermissions {
  viewChannel: boolean;
  sendMessages: boolean;
  embedLinks: boolean;
  attachFiles: boolean;
  addReactions: boolean;
  useExternalEmoji: boolean;
  mentionEveryone: boolean;
  manageMessages: boolean;
  readMessageHistory: boolean;
  sendTTSMessages: boolean;
  useApplicationCommands: boolean;
  useVoiceActivity: boolean;
  prioritySpeaker: boolean;
  stream: boolean;
  connect: boolean;
  speak: boolean;
  video: boolean;
  muteMembers: boolean;
  deafenMembers: boolean;
  moveMembers: boolean;
}

export interface ServerInvite {
  code: string;
  creator: string;
  createdAt: number;
  expiresAt?: number;
  maxUses?: number;
  uses: number;
  temporary: boolean;
}

export interface ModerationSettings {
  verificationLevel: 'none' | 'low' | 'medium' | 'high' | 'highest';
  explicitContentFilter: 'disabled' | 'members_without_roles' | 'all_members';
  defaultMessageNotifications: 'all' | 'only_mentions';
  antiSpam: boolean;
  antiRaid: boolean;
  slowMode: boolean;
  memberVerification: boolean;
  memberScreening: boolean;
}