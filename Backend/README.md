# Backend - Online Rentals System

Quick steps to run the backend and connect to MongoDB using environment variables.

Prerequisites
- Node.js (LTS) installed
- npm or yarn
- MongoDB (local or Atlas) or Docker (for running mongo container)

Setup
1. Install dependencies:
```powershell
cd Backend
npm install
```
2. Create environment variables (copy the example and edit values):
```powershell
cp .env.example .env
# edit .env with your favorite editor
notepad .env
```
3. Start a local MongoDB service or a Docker container if you don't have MongoDB installed:
- Docker (recommended for testing):
```powershell
docker run -d -p 27017:27017 --name rentals-mongo -e MONGO_INITDB_DATABASE=rentalsdb mongo:6.0
```

Or use Docker Compose provided in the repo root within `Backend`:
```powershell
cd Backend
docker-compose up -d
```
- Windows Service (if installed):
```powershell
net start MongoDB
```
4. Start the backend:
```powershell
npm run dev    # uses nodemon
# or
npm start
```

Notes
- Use the `MONGO_URI` variable in `.env` to point to your MongoDB instance.
- If using MongoDB Atlas, set your `MONGO_URI` to the Atlas connection string.
- The backend will attempt to connect to the MongoDB instance on startup and will exit if it cannot connect.
 - The backend will attempt to connect to the MongoDB instance on startup and will exit if it cannot connect after a few retries.
 - You can control the retry behavior via environment variables in `.env`:
	 - `DB_CONNECT_RETRIES` — number of attempts (default 5)
	 - `DB_CONNECT_RETRY_DELAY_MS` — delay between retries in ms (default 2000)
