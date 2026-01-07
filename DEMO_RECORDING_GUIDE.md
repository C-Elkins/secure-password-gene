# 🎬 Demo GIF Recording Guide

This guide will help you create an engaging animated GIF showcasing the SecurePass Generator in action.

## 🎯 What to Record

Create a ~10-15 second GIF that demonstrates the key features:

### Suggested Flow:
1. **Start** - Show the app with a generated password (2s)
2. **Adjust Length** - Move the slider to change password length (2s)
3. **Toggle Characters** - Turn off/on a character type toggle (2s)
4. **Select Preset** - Click preset dropdown and choose "Maximum Security" (3s)
5. **Generate New** - Click the "Generate New Password" button (2s)
6. **Copy Password** - Hover and click the copy button, show toast notification (2s)
7. **View Hashes** - Scroll down briefly to show the hash outputs (2s)

## 🛠️ Recommended Tools

### For macOS:
- **Gifski** (App Store) - Best quality, simple to use
- **LICEcap** - Free, lightweight
- **Kap** - Open source with great features

### For Windows:
- **ScreenToGif** - Free, powerful editor included
- **ShareX** - Free, feature-rich
- **Gifski** - Command line tool for high quality

### For Linux:
- **Peek** - Simple, GTK-based
- **byzanz** - Command line tool
- **gifski** - High quality conversion

### Online Tools:
- **CloudConvert** - Convert video to GIF
- **ezgif.com** - Online GIF maker and editor

## ⚙️ Recording Settings

### Optimal Settings:
- **Resolution**: 1280x800 or 1440x900 (2:1.25 ratio)
- **Frame Rate**: 15-20 FPS (smooth but small file size)
- **Duration**: 10-15 seconds
- **File Size Target**: < 5MB (for GitHub README)
- **Format**: GIF or optimized WebP

### Browser Window:
- Set zoom to 100%
- Remove browser chrome if possible (F11 fullscreen or app mode)
- Clear width: ~1200px for the centered card to look good

## 🎨 Recording Tips

1. **Slow Down** - Move cursor deliberately, pause briefly on actions
2. **Clean Setup** - Close unnecessary tabs, use incognito mode
3. **Smooth Movements** - Don't rush, let animations complete
4. **Show Results** - Pause after generation to show the new password
5. **Highlight Features** - Make sure strength meter and hash sections are visible

## 📝 Step-by-Step Instructions

### Using ScreenToGif (Windows):

1. Download and install [ScreenToGif](https://www.screentogif.com/)
2. Launch ScreenToGif and click "Recorder"
3. Position the recording frame around your browser (remove borders)
4. Click Record and perform the actions listed above
5. Click Stop when finished
6. In the editor:
   - Remove any dead time at start/end
   - Add a 1-2 second pause at the end
   - File → Save As → Choose quality (80-90%)
7. Save as `demo.gif` in the project root

### Using Kap (macOS):

1. Download and install [Kap](https://getkap.co/)
2. Launch Kap from menu bar
3. Select recording area (drag to resize)
4. Click record button
5. Perform the demo actions
6. Stop recording (Kap icon in menu bar)
7. Export as GIF with these settings:
   - FPS: 15
   - Quality: 80
   - Width: 1280px
8. Save as `demo.gif` in the project root

### Using Gifski (Command Line):

1. First, record a video using your OS screen recorder:
   - macOS: Cmd+Shift+5, select area, record
   - Windows: Win+G, record window
   - Linux: Use SimpleScreenRecorder or Kazam

2. Install gifski:
   ```bash
   # macOS
   brew install gifski
   
   # Windows
   scoop install gifski
   
   # Linux
   cargo install gifski
   ```

3. Convert video to GIF:
   ```bash
   gifski --fps 15 --width 1280 --quality 90 input.mp4 -o demo.gif
   ```

## ✂️ Optimization

If your GIF is too large (> 5MB):

### Using ezgif.com:
1. Go to https://ezgif.com/optimize
2. Upload your GIF
3. Try compression level 35-50
4. Or reduce colors to 128-256

### Using gifsicle (command line):
```bash
# Install
brew install gifsicle  # macOS
apt install gifsicle   # Linux

# Optimize
gifsicle -O3 --colors 256 --lossy=80 demo.gif -o demo-optimized.gif
```

## ✅ Final Checklist

Before committing your demo.gif:

- [ ] File size < 5MB
- [ ] Duration 10-15 seconds
- [ ] Shows password generation
- [ ] Shows length slider
- [ ] Shows character toggles
- [ ] Shows preset selection
- [ ] Shows copy action with toast
- [ ] Resolution at least 1280px wide
- [ ] Smooth, not too fast
- [ ] No sensitive information visible
- [ ] Loops seamlessly (optional but nice)

## 📍 File Location

Save the final GIF as:
```
/workspaces/spark-template/demo.gif
```

The README is already configured to display it!

---

**Need help?** Open an issue or check the recording tool's documentation for specific troubleshooting.
