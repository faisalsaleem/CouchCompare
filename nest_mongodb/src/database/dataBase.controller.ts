import { Controller, Post, Body, ConsoleLogger } from '@nestjs/common';
import { DataBaseService } from './dataBase.service';
import * as nano from 'nano';

@Controller("data")
export class DataBaseController{
    
    constructor(private readonly dataService: DataBaseService) {}

// MongoDb

    @Post('compare')
    async compareData(@Body() requestBody: { db1Url: string, db2Url: string }) {
        // console.log(requestBody)
      return this.dataService.compareData(requestBody.db1Url, requestBody.db2Url);
    }

    @Post('collections')
    async getCollections(@Body() requestBody: { db1Url: string, db2Url: string }): Promise<string[]> {
      return this.dataService.fetchDataFromDatabaseByUrl(requestBody.db1Url, requestBody.db2Url);

    }


// CouchDb

    @Post("db")
    async getViewsCounts(@Body() requestBody: { dbUrls: string[] }): Promise<number[]> {
      const dbUrls = requestBody.dbUrls;
      const viewsCountsPromises = dbUrls.map(dbUrl => this.getViewsCount(dbUrl));
      return Promise.all(viewsCountsPromises);
    }
  
    private async getViewsCount(dbUrl: string): Promise<number> {
      const couchDB = nano(dbUrl);
      const designDocs = await this.getDesignDocuments(couchDB);
      const viewsCount = designDocs.reduce((count, designDoc) => {
        return count + Object.keys(designDoc.views || {}).length;
      }, 0);
      return viewsCount;
    }
  
    private async getDesignDocuments(couchDB: nano.ServerScope): Promise<any[]> {
      const allDatabases = await couchDB.db.list();

      const designDocsPromises = allDatabases.map(async dbName => {
        const db = couchDB.use(dbName);
        
        try {
          const doc = (await db.list()).rows;
          // console.log(doc)
          doc.map((item)=>{
 console.log(item.value.rev)
            
          
          })
          // console.log(doc)
          return doc;
        } catch (error) {
          // Ignore errors for databases without design documents
          return null;
        }
      });
      const designDocs = await Promise.all(designDocsPromises);
      // Filter out null values (databases without design documents)
      return designDocs.filter(doc => doc !== null);
    }

    

    @Post("check")
    async getDesignDocs(@Body() requestBody: { db1Url: string, db2Url: string }) {
      const db1Url = requestBody.db1Url;
      const db2Url = requestBody.db2Url;
      const couchDB1 = nano(db1Url);
      const couchDB2 = nano(db2Url);
      const designDocs1 = await this.getDesignDocuments1(couchDB1);
      const designDocs2 = await this.getDesignDocuments1(couchDB2);

      return {view1:designDocs1, view2:designDocs2};
    }
  
    private async getDesignDocuments1(couchDB: nano.ServerScope): Promise<any[]> {
      const dbNames = await couchDB.db.list();
      
      const designDocsPromises = dbNames.map(async dbName => {
        const db = couchDB.use(dbName);
        const response = await db.list({
          startkey: '_design/',
          endkey: '_design0',
          include_docs: true
        });
        return response.rows.map((row) => row.doc);
      });
      const designDocs = await Promise.all(designDocsPromises);
      return designDocs.flat();
    }




// Get list of db
@Post("dataBase")
async getViewsCounts11(@Body() requestBody: { dbUrls: string[] }) {
  const dbUrls = requestBody.dbUrls;
  const viewsCountsPromises = dbUrls.map(dbUrl => this.getViewsCount11(dbUrl));
  return Promise.all(viewsCountsPromises);
}

private async getViewsCount11(dbUrl: string) {
  const couchDB = nano(dbUrl);
  const allDatabases = await couchDB.db.list();
 return allDatabases
}



}