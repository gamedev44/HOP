# 👋 Welcome all Dev's!
This project contains the foundation for **HØP** - A Discord Alternative, created by **Asterisk**.

I’ve created this browser-based application to address the ongoing concerns with Discord's increasing costs, questionable user privacy practices, and overall management. If you believe in making a change, you have the power—and the obligation—to do so. That's why I, **Asterisk**, have developed **HOP**.

## Key Features

- **Real-time Chatting:** Enjoy seamless real-time messaging with friends and communities. Send text messages instantly and engage in conversations effortlessly.
- **Voice and Video Calls:** Connect with friends through high-quality voice and video calls. Experience crystal-clear audio and video communication, whether chatting one-on-one or in a group.
- **Server and Channel Management:** Create and manage servers and channels to organize your communities efficiently. Customize permissions and roles to maintain control over your server environment.
- **Direct Messages:** Chat with any server members privately. You can initiate voice or video calls directly from the direct messages.
- **Rich Media Support:** Share images, videos, GIFs, and other media files within your conversations. Express yourself with a wide range of multimedia options.
- **Emojis and Reactions:** Spruce up your conversations with emojis and reactions. Add a touch of fun to your messages by using emojis and reacting to others' messages.

## 💻 Tech Stack

**Frontend:**

- Next.js 14
- React
- TailwindCSS
- ClerkJS
- UploadThing
- ShadCN UI
- Axios
- React Query
- TypeScript

**Backend:**

- Node.js
- Prisma
- MySQL

**Database:**
- tadpole-db (built atop of neon-db)

## Contact Me for Collab or Contributions.
- **Asterisk (Developer)**
- GitHub: [https://github.com/gamedev44](https://github.com/gamedev44)
- Email: [herrell4@gmail.com](mailto:herrell4@gmail.com)

## Local Development

### Fork the Repo

To contribute to **HOP**, you must first fork the repository.

### Clone the Repo

Clone your GitHub forked repo:

web url
```sh
https://github.com/gamedev44/HOP.git
```

ssh command
```sh
git@github.com:gamedev44/HOP.git
```

github cli
```bash
gh repo clone gamedev44/HOP
```

Navigate to the Hop directory:

```sh
cd main-folder\HOP\HOP\App\HOP # modify this to your need enable to run the server this should be where the HOP\HOP\App\HOP Folder is.
```

### Install Dependencies

Install the dependencies in the root of the repo:

```sh
npm install # install dependencies
```

Copy the example `.env.local.example` to `.env.local`

```sh
cp .env.local.example .env.local
```

### Setup Environment Variables

- Create a `.env.local` file in your root directory.
- Visit [UploadThing](https://uploadthing.com/dashboard) to create a new app and get its app ID and secret key.
- Visit [ClerkJS](https://clerk.com/docs/references/javascript/overview) to create a new app and get its public key and secret key.
- Configure the rest of your environment variables accordingly.

### Testing

To start a development server:

```sh
npm run dev # starts the development server.
```

Visit App at [http://localhost:3000/](http://localhost:3000/).

```sh
npx prisma studio # starts up the TADPOLE database.
```

Visit DataBase at [http://localhost:5555/](http://localhost:5555/).

### Deployment

For deployment, use services like **Railway**, **Digital Ocean**, **AWS**, **Google Cloud**, **Azure**, etc.

## Documentation

### App Routes

- **auth** -> For authentication using ClerkJS.
- **invite** -> For inviting users to existing servers.
- **main** -> Contains routes for server, channel, and conversation pages.
  - **/servers/serverId** -> Server-specific route.
    - **/channels/channelId** -> Channel-specific route.
  - **/conversations/memberId** -> Private conversation between server members.
- **setup** -> To create and configure servers via modal.
- **api** -> For API handling.


# Theme

### **Tiers**

- **Lake**: 
  - **Description**: Serverless Hosted Cloud App with Leap+.
  - **Features**: No setup necessary. Semi-open source with nightly build updates and frequent stable updates.

- **Pond**:
  - **Description**: Serverless Hosted Cloud App with Hop+.
  - **Features**: Fully scalable with no setup necessary.

- **Lagoon**: 
  - **Description**: Large-scale server.
  - **Usage**: Ideal for communities with 300 to 5000 concurrent users. Perfect for serious Discord server owners.

- **Swamp**:
  - **Description**: Community and family-friendly server type.
  
- **Lilypad**:
  - **Description**: Basic server for friends.
  - **Features**: Similar to a basic Discord server. Free to use, no setup required.

### **Core Features**

- **River**: Categories for organizing discussions.
- **Channels**: Regular text or voice communication channels.
- **Streams**: Live streaming capabilities.
- **Currents**: General chat areas.
- **Ribbits**: Direct messages.
- **Croaks**: Voice snippet messages.
- **Burrow**: Private categories.
- **Hop In**: Voice call feature.
- **Leap of Faith**: Video call feature.

### feel free to leave notes in the issue or in our github link above regarding any new features or changes you might like to see incorperated.

### Please Consider Donating!
[Send Donations](https://www.patreon.com/iu_pgd/membership) to boost our platform and take all of our projects to the next level; we ask that you please help by donating towards our cause if it's not too much to ask.

