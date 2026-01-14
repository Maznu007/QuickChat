🎉 QuickChat: The Retro-Modern Messaging App 📟💬
— Crafted with pixels, powered by real-time magic

🧠 Overview

QuickChat is a real-time, retro-themed chat application built with React and powered by ZEGOCLOUD's ZIM SDK. It combines the charm of old-school UI design with modern-day messaging features to deliver a smooth, functional, and nostalgic chatting experience.

It's not just a chat app—it's a throwback with power moves.

🚀 Tech Stack
Tech	Purpose
React	UI framework
Tailwind CSS	Fast utility-first styling
ZEGOCLOUD ZIM	Real-time messaging SDK
Vite	Lightning-fast build tool
💡 Core Functionality
✅ User Login System

Two predefined users: Bacchu and Rahul

User selects identity and logs in with a unique ZEGOCLOUD token

Seamless login interface with retro vibes

💬 One-on-One Real-Time Messaging

Messages are sent/received instantly via ZIM

Conversation is synced live without page reloads

Messages auto-scroll to the latest on arrival

🎨 Retro UI Design

Pixel font: 'Press Start 2P' for a vintage feel

Monochrome buttons, soft borders, and old-school layout

Styled using Tailwind CSS and custom overrides

🔊 Sound Effects

Send Sound: plays a retro "beep" when user sends a message

Receive Sound: plays a "ding" on receiving a message

Sounds enhance the nostalgic feel and user feedback

😂 Emoji Reactions

Hover over any message to see quick emoji options (❤️ 😂 🔥 👍 💀 💖)

Click to react — emoji appears below the message

One reaction per message (currently stored locally via state)

📦 Component Architecture

App.jsx: Root of the app

Index.jsx: Handles login state and message logic

LoginBox.jsx: Login interface

ChatWindow.jsx: Main chat interface (messages, input, reactions)

avatarMap.js: (Optional) Avatar mapping logic (currently not used)

public/sounds: Includes send.mp3 and receive.mp3

<img width="1890" height="876" alt="QuickChat1" src="https://github.com/user-attachments/assets/edbe6728-cebc-4972-8f92-694e5c4951fb" />
<img width="1828" height="836" alt="quicchat2" src="https://github.com/user-attachments/assets/c4ad1ee2-84c9-4d2e-a774-46c73b6a5990" />


📜 Summary

QuickChat delivers a nostalgic, minimalist interface with modern features:

Log in as a preset user


Chat in real-time

Add emoji reactions

Hear sounds for every action

See chats styled like an 80s arcade game
