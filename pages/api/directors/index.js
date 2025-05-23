import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Movies");
    
    const directors = await db
      .collection("directors")
      .find({})
      .sort({ name: 1 })
      .toArray();

    res.status(200).json(directors);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ message: 'Error fetching directors' });
  }
}
