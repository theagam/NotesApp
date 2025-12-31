Notes App (React Native + Supabase)
Setup Instructions

1. Clone Repository
   git clone https://github.com/theagam/NotesApp.git
   cd NotesApp

2. Install Dependencies
   npm install -f

3. Create .env File

Create a .env file in the project root:

SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key

.env file is not committed to GitHub.

4. Run App (Android)

Make sure emulator or device is connected.

npx react-native run-android

5. Build APK
   cd android
   ./gradlew assembleDebug

APK path:

android/app/build/outputs/apk/debug/app-debug.apk

6. Supabase

Authentication: Email & Password

Notes table with RLS enabled

Users can access only their own notes

That’s it.
No extra configuration required.
