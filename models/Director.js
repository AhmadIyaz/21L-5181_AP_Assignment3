import clientPromise from '@/lib/mongodb';

export async function getAllDirectors() {
  const client = await clientPromise;
  const db = client.db("Movies");
  
  const directors = await db
    .collection("directors")
    .find({})
    .sort({ name: 1 })
    .toArray();

  return directors;
}

export async function getDirectorById(id) {
  const client = await clientPromise;
  const db = client.db("Movies");
  
  const director = await db
    .collection("directors")
    .findOne({ id: id });

  if (!director) return null;

  // Get movies directed by this director
  const movies = await db
    .collection("movies")
    .find({ directorId: id })
    .sort({ rating: -1 })
    .toArray();

  return {
    ...director,
    movies
  };
} 