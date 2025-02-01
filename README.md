# MindTale 📖✨

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Now-%23007EC6?logo=google-chrome&logoColor=white)](https://mindtale.site)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-%2343853D?logo=mongodb&logoColor=white)](https://www.mongodb.com/resources/languages/mern-stack)
[![AI-Powered](https://img.shields.io/badge/AI-Powered-%23FF6F00?logo=googlegemini&logoColor=white)](https://gemini.google/advanced/)

**MindTale** redefines storytelling by merging literature with artificial intelligence, empowering users to co-create immersive narratives. Designed to foster a love for reading among Filipinos, this interactive platform enhances reading comprehension through personalized, choice-driven adventures.

---

## 🌟 Features

- **AI-Driven Story Evolution**: Dynamic narratives adapt to user choices in real-time.
- **Interactive Decision-Making**: Shape the plot through critical choices at key story junctions.
- **Personalized Reading Journeys**: Tailored stories based on user preferences and reading history.
- **Progress Tracking**: Monitor reading comprehension improvements with analytics.
- **Culturally Inclusive**: Stories and themes resonate with Filipino readers.

---

## 🛠️ Tech Stack

- **Frontend**: React.js,
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Engine**: Gemini
- **Authentication**: JWT, Google Auth
- **Deployment**: Docker, Google Compute Engine, Cloudflare

---

## 🖥️ Local Development

### Requirements

- Docker and Docker Compose
- API keys for integrated services (Gemini, Cloudinary, etc.)

### Setup Instructions

1. **Create Backend Environment File**:
   ```bash
   cd backend
   touch .env
   ```
2. **Configure `.env` File**:

   ```ini
   # Database
   DB_TEST_URI=<your_mongodb_uri>

   # Authentication
   JWT_SECRET=<your_jwt_secret>
   ADMIN_USERNAME=<admin_account>
   ADMIN_PASSWORD=<secure_password>

   # API Keys
   GEMINI_API_KEY=<gemini_ai_key>
   GETIMG_API_KEY=<getimg_api_key>
   CLOUDINARY_CLOUD_NAME=<your_cloud_name>
   CLOUDINARY_API_KEY=<your_api_key>
   CLOUDINARY_API_SECRET=<your_api_secret>
   RESEND_API_KEY=<resend_email_key>

   # Google Services
   GOOGLE_OAUTH_KEY=<oauth_client_id>
   GOOGLE_CLIENT_EMAIL=<service_account_email>
   GOOGLE_PRIVATE_KEY=<service_account_private_key>

   # Application
   APP_ORIGIN=https://auth.localhost
   ```

3. **Launch Containers**:

   ```bash
   docker-compose up --build
   ```

4. Access the application at `http://localhost:3000`

---

## 📖 How It Works

1. **Sign Up/Login**: Secure JWT-based authentication
2. **Choose Your Adventure**: Select from genre-based story templates
3. **Shape the Narrative**: Make decisions that alter the story's course
4. **AI Magic**: Watch as GPT dynamically generates new story branches
5. **Track Progress**: View reading stats and comprehension scores

---

**Crafted with ❤️ by Team Arrow Funk-tion**  
📣 Visit our [Facebook Page](https://www.facebook.com/mindtaleapp/).
