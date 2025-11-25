# Profile Photo Setup Guide

This guide will help you add your professional profile photo to your portfolio in the best locations.

## 📁 File Location

Place your profile photo in:
```
public/images/profile-photo.jpg
```

## 📸 Photo Requirements

### Recommended Specifications:
- **Format**: JPG or PNG
- **Filename**: `profile-photo.jpg` (or `.png`)
- **Size**: 800x800px to 1200x1200px (square ratio recommended)
- **File Size**: Under 500KB for optimal performance
- **Quality**: Professional headshot or portrait
- **Background**: Solid color or blurred background works best

### Photo Tips:
- ✅ Use a professional headshot
- ✅ Good lighting and clear image
- ✅ Centered face, shoulders visible
- ✅ Neutral or professional background
- ✅ High resolution but optimized file size
- ❌ Avoid group photos
- ❌ Avoid low-quality or blurry images
- ❌ Avoid overly casual photos

## 🎯 Where Your Photo Appears

### 1. **About Page** (Primary Location) ⭐
   - **Location**: Left side in a split layout
   - **Size**: Large square format with glass effect
   - **Style**: Professional frame with hover effects
   - **Best for**: Main professional showcase

### 2. **Home Page Hero** (Secondary Location)
   - **Location**: Above your name in the hero section
   - **Size**: Circular profile photo
   - **Style**: Rounded with animated border
   - **Best for**: First impression when visitors land

## 📝 Steps to Add Your Photo

### Step 1: Prepare Your Photo

1. Choose or take a professional headshot
2. Edit if needed (crop, adjust lighting, resize)
3. Save as `profile-photo.jpg` or `profile-photo.png`
4. Optimize file size (use tools like TinyPNG or ImageOptim)

### Step 2: Add to Project

1. Copy your photo file
2. Navigate to `public/images/` folder in your project
3. Paste your photo and name it exactly: `profile-photo.jpg`

**File structure should be:**
```
portfolio/
├── public/
│   ├── images/
│   │   └── profile-photo.jpg  ← Your photo here
│   └── ...
```

### Step 3: Test

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Check both locations:
   - **Home page**: `http://localhost:3000/` - Should show circular photo above name
   - **About page**: `http://localhost:3000/about` - Should show large photo on left side

3. Verify:
   - Photo loads correctly
   - Image is clear and well-positioned
   - Hover effects work smoothly
   - Looks good on mobile devices

## 🔧 Customization Options

### Change Photo File Name

If you want to use a different filename, update the image paths in:

1. **About Page** (`src/pages/About.jsx`):
   ```jsx
   src="/images/profile-photo.jpg"
   ```

2. **Home Page** (`src/pages/Home.jsx`):
   ```jsx
   src="/images/profile-photo.jpg"
   ```

Replace `profile-photo.jpg` with your filename.

### Use Different Formats

The code supports JPG, PNG, and other web formats. Just change the file extension:
- `profile-photo.png`
- `profile-photo.webp` (recommended for smaller file size)

### Adjust Photo Size/Position

**About Page Photo:**
- Located in `src/pages/About.jsx`
- Change `max-w-sm` class to adjust size
- Modify `aspect-square` for different ratios

**Home Page Photo:**
- Located in `src/pages/Home.jsx`
- Change `w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48` for different sizes
- Adjust responsive breakpoints as needed

## 🎨 Photo Display Features

Both photo locations include:
- ✅ **Glass morphism effect** - Modern frosted glass look
- ✅ **Hover animations** - Smooth scale and glow effects
- ✅ **Gradient borders** - Animated gradient on hover
- ✅ **Responsive design** - Adapts to all screen sizes
- ✅ **Lazy loading** - Optimized performance
- ✅ **Error handling** - Graceful fallback if image missing

## ❓ Troubleshooting

### Photo Not Showing?

1. **Check file name**: Must be exactly `profile-photo.jpg` (case-sensitive)
2. **Check file location**: Must be in `public/images/` folder
3. **Check file format**: Use JPG or PNG format
4. **Clear browser cache**: Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
5. **Restart dev server**: Stop and restart `npm run dev`

### Photo Looks Blurry?

1. **Use higher resolution**: At least 800x800px for square photos
2. **Optimize file size**: Use tools like TinyPNG to compress without quality loss
3. **Check image format**: Use PNG for transparency, JPG for smaller file size

### Photo Not Loading on Mobile?

1. **Check file size**: Keep under 500KB
2. **Verify path**: Should be `/images/profile-photo.jpg`
3. **Test on different devices**: Ensure responsive design works

### Want to Remove Photo?

If you want to remove the photo from Home page only:

1. Open `src/pages/Home.jsx`
2. Find the profile photo section (around line 169)
3. Comment out or remove the entire `<motion.div>` section with the photo

To remove from About page:
1. Open `src/pages/About.jsx`
2. Modify the grid layout to single column
3. Remove the photo section

## 💡 Best Practices

1. **Use Professional Photos**: Choose a clean, professional headshot
2. **Optimize Size**: Compress images to improve page load speed
3. **Consistent Style**: Match photo style with your portfolio's aesthetic
4. **Regular Updates**: Keep your photo current and professional
5. **Test Responsively**: Verify it looks good on all devices

## 📱 Mobile Considerations

Both photo implementations are fully responsive:
- **Desktop**: Large, prominent display
- **Tablet**: Medium size, still prominent
- **Mobile**: Slightly smaller, still visible and professional

## ✨ Next Steps

After adding your photo:
1. ✅ Test on different devices
2. ✅ Check loading speed
3. ✅ Verify hover animations work
4. ✅ Ensure photo looks professional
5. ✅ Get feedback from others

---

**Need Help?** If you encounter any issues, check:
- File naming (must match exactly)
- File location (must be in `public/images/`)
- Browser console for errors
- File permissions

**Note**: If the photo file doesn't exist, a placeholder will automatically appear. Once you add the photo file, it will replace the placeholder automatically.

