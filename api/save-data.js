import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  // Only allow POST requests (sending data)
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = request.body;
  const client = await db.connect();

  try {
    // This safely inserts your data into the table we created
    await client.sql`INSERT INTO messages (content) VALUES (${text});`;
    return response.status(200).json({ message: 'Success!' });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
