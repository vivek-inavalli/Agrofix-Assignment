# Agrofix Assignment

## Backend Setup

Follow these steps to set up and run the backend:

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the required dependencies:

   ```bash
   npm i
   ```

3. Create a `.env` file in the `backend` directory and add the necessary environment variables. Example:

   ```env
   DATABASE_URL=your_database_url use_postgresql_connection_string
   JWT_SECRET=your_secret_key
   PORT = 3000
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate dev --name database
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Frontend Setup

Follow these steps to set up and run the frontend:

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm i
   ```

---

## Notes

- Ensure that the backend is running before starting the frontend.
- Replace placeholder values in the `.env` file with actual values specific to your environment.
- For database migrations or schema updates, use Prisma commands as needed.
