import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}
if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri)
  globalWithMongo._mongoClientPromise = client.connect()
}
clientPromise = globalWithMongo._mongoClientPromise

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
