import established_connection from "@/lib/mongodb";

async function handler(req, res){
    if(req.method === "GET")
    {
        const client = await established_connection;
        const db = client.db();
        const movies = db.collection("movies").find().toArray();
        res.status(200).json(movies);
    }
}