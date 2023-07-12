import { MongoClient, ObjectId, WithId } from "mongodb";

export interface Document {
  _id?: ObjectId;
  name: string;
  date: Date | null;
  status: string;
}

export interface InsertData {
  name: string;
  date: Date | null;
  status: string;
}

export class DatabaseConnector {
  private client: MongoClient;
  constructor(uri: string) {
    this.client = new MongoClient(uri);
  }

  private async openCollection() {
    try {
      await this.client.connect();
      const database = this.client.db("task");
      return database.collection<Document>("taskList");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async insertDataToDB(validData: InsertData) {
    try {
      const collection = await this.openCollection();
      await collection.insertOne(validData);
    } catch (err) {
      console.log(err);
    } finally {
      this.client.close();
    }
  }

  async getDataFromDB() {
    let documents: Array<WithId<Document>> = [];
    try {
      const collection = await this.openCollection();
      const cursor = collection.find({});
      documents = await cursor.toArray();
    } catch (err) {
      console.log(err);
    } finally {
      this.client.close();
    }
    return documents;
  }

  async deleteDataFromDB(taskId: string): Promise<void> {
    try {
      const collection = await this.openCollection();
      await collection.deleteOne({ _id: new ObjectId(taskId) });
    } catch (err) {
      console.log(err);
    } finally {
      this.client.close();
    }
  }

  async updateDB(filter: object, update: object) {
    try {
      const collection = await this.openCollection();
      await collection.updateOne(filter, update);
    } catch (err) {
      console.log(err);
    } finally {
      this.client.close();
    }
  }
}
