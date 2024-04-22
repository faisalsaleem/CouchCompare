import { Injectable } from "@nestjs/common";
import { Connection } from 'mongoose';
import { MongoClient } from 'mongodb';
@Injectable()
export class DataBaseService{
    // constructor(private readonly connection: Connection) {}

    async getDatabaseNames(url: string) {
    
        const client = new MongoClient(url);
        await client.connect(); 
        const db = client.db();
        const adminDb = db;
        const databaseNames = await adminDb.listCollections();
        const data = await  databaseNames.map(col => col.name);
        console.log(data)
        // const collection = await databaseNames.totalSize;
        // return databaseNames.databases.map(db => db.name);

    //   const connection = this.connection.useDb(url);
    //   const adminDb = connection.db.admin();
    //   const databaseNames = await adminDb.listDatabases();
    //   return databaseNames.databases.map(db => db.name);
    }
  
    async compareData(db1Url: string, db2Url: string) {
      const db1DatabaseNames = await this.getDatabaseNames(db1Url);
    //   const db2DatabaseNames = await this.getDatabaseNames(db2Url);
    //   const db1Collections = await this.getDatabaseCollections(db1DatabaseNames);
    //   const db2Collections = await this.getDatabaseCollections(db2DatabaseNames);
//   return {db1Collections,db2Collections} 
  return [db1DatabaseNames]

  
      // Compare database names or perform further actions
      console.log('Databases in DB1:', db1DatabaseNames);
    //   console.log('Databases in DB2:', db2DatabaseNames);
    // console.log('Databases in DB1:', db1Url);
    // console.log('Databases in DB2:', db2Url);
    }

    private async fetchDataFromDatabase(url: string) {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db();
        const collections = await db.listCollections().toArray();
        const data = {};
    
        // Fetch data from each collection





      //   for (const { name: collectionName } of collections) {
      //     const collectionData = await db.collection(collectionName).find().toArray();
      //     data[collectionName] = collectionData;
      //   }
      //   await client.close();
      //   return data;
      // }




  // for (const { name: collectionName } of collections) {
  //         const collectionData = await db.collection(collectionName).aggregate([
  //           { $project: { email: 1, name: 1 ,userName:1,auther_id:1} }
  //         ]).toArray();
  //         data[collectionName] = collectionData;
  //       }
    
  //       await client.close();
  //       return data;
  //     }

  for (const { name: collectionName } of collections) {
    const views = await db.collection(collectionName).countDocuments();
    // const views = explain.executionStats.nReturned;
    // data[collectionName] = {
    //     views,
    // };
    data[collectionName] = views;
}
await client.close();
        return data;
    }



      async fetchDataFromDatabaseByUrl(url_1: string,url_2: string): Promise<any> {
        try {
           const db1 = await this.fetchDataFromDatabase(url_1);
          const db2 =  await this.fetchDataFromDatabase(url_2);
          return [
            db1,
            db2
          ]
        } catch (error) {
          console.error(`Error retrieving data from database '${url_1}': ${error.message}`);
          console.error(`Error retrieving data from database '${url_2}': ${error.message}`);
          throw error;
        }
      }
}





