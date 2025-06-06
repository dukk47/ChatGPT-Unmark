
# Invisible Character Remover & Unicode Text Cleaner

A powerful, privacy-first web application for detecting and removing invisible Unicode characters from text. Perfect for cleaning AI-generated content, removing watermarks, and fixing text formatting issues.

🔗 **Live Demo**: [Try it now](https://lovable.dev/projects/576094fd-dc83-413e-af3c-2206bc22fd60)

## Features

### 🔍 Detection & Analysis
- **Real-time scanning** for invisible Unicode characters
- **Visual highlighting** of problematic characters in text
- **Detailed character information** with Unicode codepoints
- **Statistics** showing characters found and removed

### 🧹 Cleaning Capabilities
- Remove **Zero Width Space** (U+200B)
- Remove **Zero Width Non-Joiner** (U+200C) 
- Remove **Zero Width Joiner** (U+200D)
- Remove **Narrow No-Break Space** (U+202F)
- Remove various other invisible control characters

### 🤖 AI Content Cleaning
- **ChatGPT watermark removal** - Clean AI-generated text
- **Claude & other AI models** - Remove tracking characters
- **Copy-paste fixes** - Clean text from websites and PDFs

### 🔒 Privacy & Security
- **100% client-side processing** - No data sent to servers
- **Complete privacy protection** - Text never leaves your browser
- **No registration required** - Use instantly without signup

### 🚀 User Experience
- **One-click cleaning** - Remove all invisible characters instantly
- **Copy to clipboard** - Quick copy of cleaned text
- **Download files** - Save cleaned text as .txt files
- **Responsive design** - Works on desktop and mobile
- **Multilingual** - Available in German and English

## Use Cases

### Web Development
- Fix HTML/CSS rendering issues
- Clean database imports
- Improve search functionality
- SEO content optimization

### Content Creation
- Clean AI-generated articles
- Fix copy-paste formatting
- Prepare text for publishing
- Remove unwanted watermarks

### Data Processing
- Clean CSV file imports
- Prepare datasets for analysis
- Fix API data issues
- Text preprocessing for ML

### Academic & Professional
- Clean research documents
- Fix citation formatting
- Prepare manuscripts
- Remove AI detection markers

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## How It Works

1. **Paste or type text** containing invisible characters
2. **Real-time detection** identifies problematic Unicode characters
3. **Visual highlighting** shows exact locations of invisible characters
4. **One-click removal** cleans all detected characters
5. **Export options** to copy or download cleaned text

## Supported Character Types

### Invisible Characters
- Zero Width Space (ZWSP)
- Zero Width Non-Joiner (ZWNJ)
- Zero Width Joiner (ZWJ)
- Word Joiner
- Soft Hyphen

### Control Characters
- Line/Paragraph Separators
- Bidirectional Text Marks
- Format Characters
- Private Use Characters

### AI Watermarks
- ChatGPT tracking characters
- Claude watermarks
- Other AI model markers

## Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Include appropriate tests

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

### Lovable Platform
The easiest way to deploy is using the Lovable platform:
1. Click "Publish" in the Lovable editor
2. Your app will be live instantly

### Custom Domain
Connect your own domain in Project Settings > Domains

### Self-Hosting
The built application can be deployed to any static hosting provider:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- And many others

## Support

- 📧 **Issues**: Report bugs via GitHub Issues
- 💬 **Community**: Join our Discord community
- 📖 **Documentation**: Visit our documentation site

## Roadmap

- [ ] Batch file processing
- [ ] Custom character removal rules
- [ ] API integration
- [ ] Browser extension
- [ ] Advanced text analytics

---

**Made with ❤️ using AI-powered development**

This application was built 100% with AI assistance, demonstrating the power of modern AI development tools for creating professional web applications.
