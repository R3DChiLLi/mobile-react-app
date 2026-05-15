# Troubleshooting Guide

## Common Issues and Solutions

### 1. Android SDK Not Found

**Error:** `Failed to resolve the Android SDK path`

**Solutions:**

#### Option A: Use Expo Go (Easiest)
1. Download **Expo Go** app on your phone
2. Run `npm start` 
3. Scan the QR code with Expo Go app

#### Option B: Install Android Studio
1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio → More Actions → SDK Manager
3. Install Android SDK (latest version)
4. Set environment variable:
   - **Windows PowerShell:**
     ```powershell
     [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\YourUsername\AppData\Local\Android\Sdk', 'User')
     ```
   - **Windows Command Prompt:**
     ```cmd
     setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
     ```
5. Restart your terminal
6. Run `npm run android`

### 2. 'adb' is not recognized

**Error:** `'adb' is not recognized as an internal or external command`

**Solution:**
Add Android SDK platform-tools to your PATH:

**Windows:**
1. Open System Environment Variables
2. Edit PATH variable
3. Add: `C:\Users\YourUsername\AppData\Local\Android\Sdk\platform-tools`
4. Restart terminal

### 3. Package Version Mismatch

**Error:** `packages should be updated for best compatibility`

**Solution:**
```bash
npx expo install --fix
```

### 4. Metro Bundler Issues

**Error:** Metro bundler not starting or stuck

**Solution:**
```bash
# Clear cache and restart
npx expo start --clear
```

### 5. Web Version Not Working

**Error:** `It looks like you're trying to use web support but don't have the required dependencies`

**Solution:**
```bash
npx expo install react-dom react-native-web
```

### 6. Port Already in Use

**Error:** `Port 8081 already in use`

**Solution:**
```bash
# Kill the process using the port (Windows)
netstat -ano | findstr :8081
taskkill /PID <PID_NUMBER> /F

# Or use a different port
npx expo start --port 8082
```

### 7. TypeScript Errors

**Error:** TypeScript compilation errors

**Solution:**
```bash
# Check for errors
npx tsc --noEmit

# If needed, reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Recommended Testing Method

For the quickest testing experience **without Android Studio setup**:

1. **Install Expo Go** on your phone from the app store
2. **Run** `npm start` in your terminal
3. **Scan QR code** with Expo Go app
4. **Test** the app directly on your phone

This bypasses all Android SDK configuration issues!

## Web Testing

The simplest alternative is testing in a web browser:

```bash
npm run web
```

This will open the app at `http://localhost:8081` in your browser.

## Getting Help

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper Docs](https://callstack.github.io/react-native-paper/)
- [Expo Forums](https://forums.expo.dev/)

## System Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Expo Go**: Latest version from app store (for mobile testing)
- **Android Studio**: Latest version (only if using emulator)
- **Xcode**: Latest version (only for iOS on macOS)
