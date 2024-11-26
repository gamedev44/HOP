# 👋 Welcome all Devs!

This project contains the foundation for **HØP** - A Discord Alternative, created by **Asterisk**.

I’ve created this application to address the ongoing concerns with Discord's increasing costs, questionable user privacy practices, and overall management. If you believe in making a change, and you have the power, then you have the obligation to do so. 

That's why I, **Asterisk**, have started to further develop **HØP**. I’ve already made a very simple yet crude proof of [Concept Web Version](https://hop-socialize.w3spaces.com/) which I am now re-writing as a real-deal fullstack application.

---

## 🐸 Support Cape Rain Frogs and Other Causes

### Our Commitment
**HØP Social** is deeply committed to making the world a better place. As part of our fundraising goals:
- **20% of our first million dollars raised** will go directly towards saving the planet's frog species, starting with the **Cape Rain Frog**.
- The second million will allocate **20% to conserving lizards and snakes**.
- The third million will allocate **20% to ducks and geese conservation**.
- The fourth million will allocate **20% towards combating poverty and improving underprivileged areas to better humanity**.
- For every subsequent million, **20% will be allocated to meaningful causes**.

By using **HØP**, you are not only connecting with friends and communities but also supporting life-saving initiatives globally.

---

## Key Features

- **Real-time Chatting:** Enjoy seamless real-time messaging with friends and communities. Send text messages instantly and engage in conversations effortlessly.
- **Voice and Video Calls:** Connect with friends through high-quality voice and video calls. Experience crystal-clear audio and video communication, whether chatting one-on-one or in a group.
- **Server and Channel Management:** Create and manage servers and channels to organize your communities efficiently. Customize permissions and roles to maintain control over your server environment.
- **Direct Messages:** Chat with any server members privately. You can initiate voice or video calls directly from the direct messages.
- **Rich Media Support:** Share images, videos, GIFs, and other media files within your conversations. Express yourself with a wide range of multimedia options.
- **Emojis and Reactions:** Spruce up your conversations with emojis and reactions. Add a touch of fun to your messages by using emojis and reacting to others' messages.


## Newly Added & Completed Features to v2.1.0 Alpha

- **Leap+ Integration**: Replaced "Nitro" with "Leap+" throughout the app, including a leaping frog icon for improved visual representation.
- **File Sharing and Media Uploads**: Integrated UploadThing for secure and user-friendly file sharing in chat.
- **Server Moderation Tools**: Introduced a robust moderation suite, including:
  - Role and permissions management.
  - Content control options for improved server administration.

- **DM Sidebar Expansion**:  
  - Clicking the "Home" button now shows a dropdown sidebar of recent direct messages.  
  - The chat header dynamically displays the selected friend's name and avatar during DM conversations.

- **Improved Server Sidebar**:  
  - Server icons are now circular by default, fully filling the button space with cropped images.  
  - Transition to slightly rounded squares on hover with smooth animations for better visual feedback.

- **Channel Themes**: Updated channel creation modal to reflect new themed names:
  - **River**: General discussion categories.
  - **Hop In**: Voice chat channels.
  - **Leap of Faith**: Video chat channels.
  - **Streams**: Streaming channels.
  - **Burrow**: Private threads or categories.

- **Enhanced UI Layout**:  
  - Prevented overflow of the friends/members list below the chat bar, maintaining a clean and intuitive design.  
  - Fixed scrolling behavior to remain within the viewport.

- **Server and Home Button Toggles**:  
  - Added toggle functionality for the Home button and servers in the sidebar, allowing dynamic navigation.  

This release lays the groundwork for communication, customization, and moderation features, with voice/video functionality in progress and open for contributions.

## coming next and being added ( Still in Active Early Development as of v2.1.0 Alpha )

- **Emoji Reactions**: emoji reactions in messages using emoji-mart, enhancing user interaction within chats.

**Real-time Communication (Early Development)**:  
  - Voice and video calls using PeerJS have been added but remain in early development.  
  - Testing is pending due to required debugging of the PostgreSQL NeonDB database, Prisma setup, and Clerk integration. **Help Wanted** for these areas to finalize and test features online.
---

## 💻 Tech Stack

### **Frontend:**
- Next.js 14
- React
- TailwindCSS
- ClerkJS
- UploadThing
- ShadCN UI
- Axios
- React Query
- TypeScript
- p5.JS
- emoji-mart
- peerJS
- Socket.IO
- Tadpoledb (PostgreSQL Database)

### **Backend:**
- Node.js
- Prisma
- MySQL

### **Database:**
- Tadpole-db (built atop of neon-db)

---

## Local Development

### Fork the Repo
To contribute to **HØP**, you must first fork the repository.

### Clone the Repo
Clone your GitHub forked repo:

#### Web URL
```sh
https://github.com/gamedev44/HOP.git
```

#### SSH Command
```sh
git@github.com:gamedev44/HOP.git
```

#### GitHub CLI
```bash
gh repo clone gamedev44/HOP
```

Navigate to the HOP directory (modify as needed):
```sh
cd main-folder\HOP\HOP\
```

### Install Dependencies
Install the dependencies in the root of the repo:
```sh
npm install
```

Copy the example `.env.local.example` to `.env.local`:
```sh
cp .env.local.example .env.local
```

### Setup Environment Variables
- Create a `.env.local` file in your root directory.
- Visit [UploadThing](https://uploadthing.com/dashboard) to create a new app and get its app ID and secret key.
- Visit [ClerkJS](https://clerk.com/docs/references/javascript/overview) to create a new app and get its public key and secret key.
- Configure the rest of your environment variables accordingly.

### Install Dependencies 
To begin, ensure you have **npm**, **Node.js**, and **Prisma** installed for React development. Additionally, the following dependencies are required:

1. **Install npm**:
   ```sh
   npm install
   ```

2. **New Dependencies**:
   - **Socket.IO**: For WebSocket-based real-time communication.
   - **PeerJS**: For peer-to-peer voice and video calls.
   - **@prisma/client** and `prisma`: For database interactions with PostgreSQL (NeonDB supported this is Required for our database named tadpoledb to work as its based on neonDB).
   - **Clerk**: For user authentication and management.
   - **emoji-mart**: For emoji reactions in messages.
   - **p5.js**: For video background customization.
   - **UploadThing**: For file sharing and uploads.

   If not already installed:
   ```sh
   npm install socket.io peerjs @prisma/client prisma @clerk/clerk-sdk-node emoji-mart p5 uploadthing
   ```

### Testing
To start a development server:
```sh
npm run dev
```
Visit the app at [http://localhost:3000/](http://localhost:3000/).

To start the database using Prisma Studio:
```sh
npx prisma studio
```
Visit the database at [http://localhost:5555/](http://localhost:5555/).

### Deployment
For deployment, use services like **Railway**, **Digital Ocean**, **AWS**, **Google Cloud**, **Azure**, etc.

> Note: Debugging and configuration for PostgreSQL NeonDB, Prisma, and Clerk integration may be required to fully deploy real-time communication features. **Help Wanted** for database and deployment optimization. 

---

## 🌟 Features and Themes

### **Tiers**
- **Lake:** Serverless Hosted Cloud App with Leap+.
- **Pond:** Serverless Hosted Cloud App with Hop+.
- **Lagoon:** Large-scale server for communities with 300-5000 concurrent users.
- **Swamp:** Community and family-friendly server type.
- **Lilypad:** Basic server for friends.

### **Core Features**
- **River:** Categories for organizing discussions.
- **Channels:** Regular text or voice communication channels.
- **Streams:** Live streaming capabilities.
- **Currents:** General chat areas.
- **Ribbits:** Direct messages.
- **Croaks:** Voice snippet messages.
- **Burrow:** Private categories.
- **Hop In:** Voice call feature.
- **Leap of Faith:** Video call feature.

---

## 💡 Suggestions or Contributions?
Feel free to leave notes in the issue tracker or on our [GitHub](https://github.com/gamedev44/HOP) page about any new features or changes you’d like to see incorporated.

---

### 📣 Please Consider Donating!
[Send Donations](https://www.patreon.com/iu_pgd/membership) to boost our platform and take all our projects to the next level. Together, we can build something amazing while supporting meaningful causes like saving the Cape Rain Frog.

---

For any questions or collaboration inquiries:
- **Asterisk (Developer)**
- GitHub: [https://github.com/gamedev44](https://github.com/gamedev44)
- Email: [herrell4@gmail.com](mailto:herrell4@gmail.com)
```