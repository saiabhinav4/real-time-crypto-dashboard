import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.${process.env.MONGODB_CLUSTER_IDENTIFIER}.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocuments(client, collection, documents) {
  const db = client.db();

  const result = await db.collection(collection).insertMany(documents);

  return result;
}

export async function getAllDocuments(client, collection, find, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .limit(10)
    .toArray();

  return documents;
}