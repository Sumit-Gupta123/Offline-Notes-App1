# 📱 Offline Multi-User Notes App

A local-first, offline-capable mobile application built with **React Native** and **Expo**. This app allows multiple users to securely store notes and images on a single device using a unique "Offline Authentication" system.



## ✨ Key Features

* **🔐 Offline Authentication:** Custom Sign Up & Login system working entirely offline.
* **👥 Multi-User Support:** Multiple accounts can exist on one device; data is strictly isolated per user.
* **📝 Rich Notes:** Create, Read, Update, and Delete (CRUD) notes with titles and body text.
* **📸 Image Support:** Attach images to notes via **Camera** or **Gallery**.
* **🔍 Search & Sort:** Real-time filtering by text and sorting (Date, A-Z).
* **💾 Persistence:** All data is stored locally using AsyncStorage; no internet connection required.

---

## 🛠 Tech Stack & Libraries

This project was initialized using the **Expo (Blank)** template.

### Core
* **React Native**: Mobile UI primitives.
* **Expo**: Framework and platform management.
* **React Hooks**: Used for State management (`useState`, `useContext`, `useMemo`).

### Dependencies
| Library | Purpose |
| :--- | :--- |
| **@react-navigation/native** | Routing and navigation container. |
| **@react-navigation/stack** | Stack-based navigation (Login → Home → Details). |
| **@react-native-async-storage/async-storage** | Local, unencrypted, persistent, key-value storage system. |
| **expo-image-picker** | Accessing device camera and photo library. |
| **@expo/vector-icons** | Icons for UI elements (trash can, logout, search, etc.). |

---

## 🚀 Setup Instructions (For Developers)

Follow these steps to run the code locally on your machine.

### Prerequisites
* Node.js (LTS version recommended)
* Git
* Expo Go app installed on your physical device (iOS/Android)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/OfflineNotesApp.git](https://github.com/YOUR_USERNAME/OfflineNotesApp.git)
    cd OfflineNotesApp
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the Development Server**
    ```bash
    npx expo start
    ```

4.  **Run on Device**
    * Scan the QR code displayed in the terminal using the **Expo Go** app.
    * Ensure your phone and computer are on the **same Wi-Fi network**.

---

## 📲 How to Install the APK (Android Users)

If you do not want to run the code and just want to use the app:

1.  Go to the **[Releases](../../releases)** section of this repository.
2.  Download the latest `.apk` file (e.g., `OfflineNotes-v1.0.apk`).
3.  Transfer the file to your Android device.
4.  Tap the file to install.
    * *Note: You may need to allow "Install from Unknown Sources" in your settings.*

---

## 📂 Project Structure

```text
OfflineNotesApp/
├── assets/                # Images and icons
├── src/
│   ├── context/
│   │   └── GlobalContext.js  # Handles Auth & Database logic
│   ├── screens/
│   │   ├── AuthScreen.js     # Login / Signup
│   │   ├── HomeScreen.js     # List of notes, search, sort
│   │   └── NoteEditorScreen.js # Create/Edit note + Image handling
├── App.js                 # Main entry point & Navigation setup
├── app.json               # Expo configuration
└── package.json           # Dependencies list