# BloomHerbs Deployment Guide

## Prerequisites

- Node.js >= 18.x
- MongoDB Atlas account
- Cloudinary account
- Razorpay account
- Nodemailer (Gmail) account
- Vercel account
- Render account
- GitHub account

## Environment Variables

### Backend (Render)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | Yes |
| `PORT` | Server port (default: 5000) | Yes |
| `MONGO_URI` | MongoDB Atlas connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `JWT_COOKIE_EXPIRE` | JWT cookie expiration in days | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `RAZORPAY_KEY_ID` | Razorpay key ID | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | Yes |
| `SMTP_HOST` | SMTP host (smtp.gmail.com) | Yes |
| `SMTP_PORT` | SMTP port (587) | Yes |
| `SMTP_EMAIL` | Sender email address | Yes |
| `SMTP_PASSWORD` | Email app password | Yes |
| `FROM_EMAIL` | Default from email | Yes |
| `FROM_NAME` | Default sender name | Yes |
| `CLIENT_URL` | Frontend URL (Vercel URL) | Yes |

### Frontend (Vercel)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL (Render URL) | Yes |

## Step 1: MongoDB Atlas Setup

1. Create a new cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write permissions
3. Whitelist `0.0.0.0/0` (or your IP) in Network Access
4. Copy the connection string and replace `<password>` with your database user password
5. Use `mongodb+srv://<username>:<password>@cluster.mongodb.net/bloomherbs?retryWrites=true&w=majority` format

## Step 2: Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your `cloud_name`, `api_key`, and `api_secret` from Dashboard
3. Set up an upload preset with `unsigned` signing mode for client-side uploads (if needed)

## Step 3: Razorpay Setup

1. Sign up at [razorpay.com](https://razorpay.com)
2. Complete KYC to get live mode keys
3. Get `key_id` and `key_secret` from Settings > API Keys
4. Add authorized domains in Razorpay Dashboard

## Step 4: Email Setup (Nodemailer)

1. Use Gmail or any SMTP provider
2. For Gmail, enable 2FA and generate an App Password
3. Use the App Password in `SMTP_PASSWORD`

## Step 5: Deploy Backend to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set the **Root Directory** to `server`
5. Set **Runtime** to `Node`
6. Set **Build Command** to `npm install`
7. Set **Start Command** to `npm start`
8. Add all environment variables from the Backend table above
9. Deploy

Alternatively, use the included `render.yaml` for Infrastructure as Code:

```bash
# Install Render CLI
npm install -g @render/cli

# Deploy using render.yaml
render deploy
```

## Step 6: Deploy Frontend to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set **Root Directory** to `client`
4. Set **Framework Preset** to Vite
5. Add environment variable `VITE_API_URL` with your Render backend URL
6. Deploy

Alternatively, use the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel
```

## Step 7: Post-Deployment

1. Update `CLIENT_URL` in Render to your Vercel domain
2. Test health endpoint: `https://your-backend.onrender.com/api/v1/health`
3. Seed the database:
   ```bash
   # On Render, use the shell feature or a one-time script
   npm run seed
   ```
4. Test Razorpay webhooks (update webhook URL in Razorpay Dashboard)
5. Configure custom domains if needed

## Step 8: CI/CD (Optional)

The project includes GitHub Actions configuration (Task 7). Enable it for automated testing and deployment.

## Security Notes

- Never commit `.env` files
- Rotate secrets regularly
- Use strong JWT_SECRET (min 32 characters)
- Enable HTTPS on both Vercel and Render
- Set `secure: true` on cookies in production
- Review CORS settings to allow only your Vercel domain
