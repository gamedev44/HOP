// Update the channel type icons
const getChannelIcon = (type: Channel['type']) => {
  switch (type) {
    case 'hop':
    case 'croak':
      return Volume2;
    case 'leap':
      return Video;
    case 'burrow':
      return Lock;
    case 'stream':
      return Play;
    default:
      return Hash;
  }
};

export const ServerNavigation: React.FC = () => {
  // Component implementation remains the same, just updated to use the new types and icons
};