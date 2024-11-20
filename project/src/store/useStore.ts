import { create } from 'zustand';
import type { User, Message, Server, Channel, Category } from '../types';
import Cookies from 'js-cookie';

interface Store {
  currentUser: User | null;
  users: User[];
  messages: Message[];
  servers: Server[];
  currentServer: Server | null;
  currentChannel: Channel | null;
  isAuthenticated: boolean;
  activeTab: 'home' | 'friends' | 'servers' | 'settings' | 'server-settings';
  friendsTab: 'all' | 'pending' | 'blocked' | 'add';
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setActiveTab: (tab: Store['activeTab']) => void;
  setFriendsTab: (tab: Store['friendsTab']) => void;
  setCurrentServer: (server: Server | null) => void;
  setCurrentChannel: (channel: Channel | null) => void;
  addMessage: (message: Message) => void;
  addCategory: (category: Category) => void;
  addChannel: (channel: Channel) => void;
  addServer: (server: Server) => void;
  joinServer: (serverId: string) => void;
  addServerBoost: () => void;
}

const validCredentials = [
  { username: "Test", password: "1234" },
  { username: "Guest", password: "0000" },
  { username: "Dev", password: "dev123" },
  { username: "Asterisk", password: "7946" },
  { username: "Josh", password: "7946" },
  { username: "Lesa", password: "1945" },
  { username: "reimon", password: "rsk8" },
  { username: "User", password: "Pass" },
  { username: "Spark", password: "Boog" },
  { username: "Mandiblueyes22", password: "MB22" },
  { username: "Wolfie", password: "wlf4" },
  { username: "Hamza", password: "4042" },
  { username: "Techno", password: "Wambo" },
  { username: "Trident", password: "Horizon" }
];


const defaultUsers: User[] = validCredentials.map(cred => ({
  id: Math.random().toString(36).substring(2),
  name: cred.username,
  isOnline: false,
  status: 'offline',
  customStatus: '',
  badges: []
}));

const defaultServer: Server = {
  id: '1',
  name: 'My Lake',
  tier: 'lake',
  ownerId: defaultUsers[0].id,
  categories: [
    {
      id: '1',
      name: 'TEXT CHANNELS',
      serverId: '1',
      isPrivate: false,
      channels: []
    },
    {
      id: '2',
      name: 'VOICE CHANNELS',
      serverId: '1',
      isPrivate: false,
      channels: []
    }
  ],
  channels: [
    {
      id: '1',
      name: 'general',
      type: 'river',
      serverId: '1',
      categoryId: '1',
      isPrivate: false,
      topic: 'General discussion'
    },
    {
      id: '2',
      name: 'voice',
      type: 'hop',
      serverId: '1',
      categoryId: '2',
      isPrivate: false
    }
  ],
  members: defaultUsers,
  roles: [],
  emojis: [],
  boosts: 0,
  features: []
};

export const useStore = create<Store>((set, get) => ({
  currentUser: null,
  users: defaultUsers,
  messages: [],
  servers: [defaultServer],
  currentServer: null,
  currentChannel: null,
  isAuthenticated: false,
  activeTab: 'servers',
  friendsTab: 'all',

  setActiveTab: (tab) => set({ activeTab: tab }),
  setFriendsTab: (tab) => set({ friendsTab: tab }),
  setCurrentServer: (server) => set({ currentServer: server }),
  setCurrentChannel: (channel) => set({ currentChannel: channel }),

  addMessage: (message) => set(state => ({
    messages: [...state.messages, message]
  })),

  addCategory: (category) => set(state => {
    if (!state.currentServer) return state;
    const updatedServer = {
      ...state.currentServer,
      categories: [...state.currentServer.categories, category]
    };
    return {
      currentServer: updatedServer,
      servers: state.servers.map(s => 
        s.id === updatedServer.id ? updatedServer : s
      )
    };
  }),

  addChannel: (channel) => set(state => {
    if (!state.currentServer) return state;
    const updatedServer = {
      ...state.currentServer,
      channels: [...state.currentServer.channels, channel]
    };
    return {
      currentServer: updatedServer,
      servers: state.servers.map(s => 
        s.id === updatedServer.id ? updatedServer : s
      )
    };
  }),

  addServer: (server) => set(state => ({
    servers: [...state.servers, server],
    currentServer: server,
    currentChannel: server.channels[0]
  })),

  joinServer: (serverId) => set(state => {
    const server = state.servers.find(s => s.id === serverId);
    if (!server) return state;
    return {
      currentServer: server,
      currentChannel: server.channels[0]
    };
  }),

  addServerBoost: () => set(state => {
    if (!state.currentServer) return state;
    const updatedServer = {
      ...state.currentServer,
      boosts: state.currentServer.boosts + 1
    };
    return {
      currentServer: updatedServer,
      servers: state.servers.map(s => 
        s.id === updatedServer.id ? updatedServer : s
      )
    };
  }),

  login: (username: string, password: string) => {
    const matchedCred = validCredentials.find(
      cred => cred.username.toLowerCase() === username.toLowerCase() && 
              cred.password === password
    );

    if (matchedCred) {
      const user = defaultUsers.find(u => u.name === matchedCred.username);
      if (user) {
        const sessionId = Math.random().toString(36).substring(2);
        set({ 
          currentUser: { ...user, isOnline: true, status: 'online' },
          isAuthenticated: true,
          users: defaultUsers.map(u => 
            u.id === user.id ? { ...u, isOnline: true, status: 'online' } : u
          ),
          currentServer: defaultServer,
          currentChannel: defaultServer.channels[0]
        });
        
        Cookies.set('sessionId', sessionId, { expires: 7 });
        Cookies.set('currentUser', JSON.stringify(user), { expires: 7 });
        
        return true;
      }
    }
    return false;
  },

  logout: () => {
    Cookies.remove('sessionId');
    Cookies.remove('currentUser');
    set({
      currentUser: null,
      isAuthenticated: false,
      users: defaultUsers.map(u => ({ ...u, isOnline: false, status: 'offline' })),
      currentServer: null,
      currentChannel: null,
      activeTab: 'servers',
      friendsTab: 'all'
    });
  }
}));