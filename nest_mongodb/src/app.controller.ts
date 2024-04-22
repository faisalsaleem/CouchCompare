// app.controller.ts

import { Body, Controller, HttpException, HttpStatus, Post, Req, Res  } from '@nestjs/common';
import { DataDto } from './types/data.dto';
import * as nano from 'nano';
import { Request, Response, response } from 'express';
import { AppService } from './app.service';
@Controller("data")
export class AppController {
  constructor(private readonly appService: AppService) {}
  private databaseData:any;
  private URL:any;

  @Post("submit")
 
  async addData(@Body() data:DataDto, @Req() req: Request, @Res() res: Response){
    try {
      // console.log("body",data)
      let urlArr1 = data.url1.split('/');
      let urlArr2 = data.url2.split('/');
      let finalUrl1 =  `${urlArr1[0]}//${data.userName1}:${data.password1}@${urlArr1[2]}`;
      let finalUrl2 =  `${urlArr2[0]}//${data.userName2}:${data.password2}@${urlArr2[2]}`;
      this.URL=[finalUrl1,finalUrl2];
      const dbData = await this.getViewsCounts11(finalUrl1,finalUrl2);
  this.databaseData=dbData;
  // console.log("dbData",dbData)
  if(!dbData[0]  || !dbData[1] ){
    return(
      res.send({
        statusCode:401,
        message:"Error Occur",
        urlName:dbData
      })
    ) 
  }
  if(dbData[0] == "unauthorized" || dbData[1] == "unauthorized" ){
    return(
      res.send(
      {
        statusCode:401,
        message:"unauthorized",
        urlName:dbData
      })
    ) 
  }

  return(
    res.send({
      dataBase:dbData,
      url:this.URL
    })
  ) 
      
    } catch (error) {
      return(
        res.send({
          statusCode:404,
          message:"invalid User"
        })
      )
    } 
  }

 async getViewsCounts11( db1Url: string, db2Url :string ) {
    const viewsCountsPromises1 = await this.getViewsCount11(db1Url) ;
    const viewsCountsPromises2 = await this.getViewsCount11(db2Url);
    // console.log("viewsCountsPromises1",viewsCountsPromises1);
    // console.log("viewsCountsPromises2",viewsCountsPromises2);
    return [viewsCountsPromises1,viewsCountsPromises2];
 }
 private async getViewsCount11(dbUrl: string) {
  try {
    const couchDB = nano(dbUrl);
    const allDatabases = await couchDB.db.list();
   return allDatabases
  } catch (error) {
    // console.log("ERRRRRRRRRRRRO",error.error)
     return error.error
  }
  
 }




    @Post("/test")
 async root3(@Req() req: Request, @Res() res: Response) {
  let url=req.body.url;
let db=req.body.db;
  const viewData =  await this.getDesignDocs1(url,db);
  // console.log(viewData)
  res.send({
    views:viewData,
    dbName:db
  })

 }

    async getDesignDocs1( db1Url: string,db:string) {
      const couchDB1 = nano(db1Url);
      const designDocs1 = await this.getDesignDocuments12(couchDB1,db);
      return {view1:designDocs1};
    }
  
    private async getDesignDocuments12(couchDB: nano.ServerScope,db1:string): Promise<any[]> {
      // console.log(db1)
      
     
        const db = couchDB.use(db1);
        const response = await db.list({
          startkey: '_design/',
          endkey: '_design0',
          include_docs: true
        });
        // console.log(response.rows.map((row) => row.doc))
        return response.rows.map((row) => row.doc);
  
    }




    @Post("updateView")
    async root4(@Req() req: Request, @Res() res: Response) {
      let url=req.body.url;
    let db=req.body.db;
    let designView=req.body.designView;
    let view=req.body.view;
    let mapData=req.body.mapData;


    console.log(req.body)
      const checkData =  await this.appService.getUrlAndDb1(url,db,designView,view,mapData);
      // console.log("checkDatacheckDatacheckData",checkData)
      if(checkData.error === "file_exists"){
        const checkDesignView =  await this.appService.getUrlAndDb2(url,db,designView,view,mapData);
      // console.log("checkDatacheckDatacheckData",checkDesignView);
      if(checkDesignView.error==="not_found"){
        const checkView =  await this.appService.getUrlAndDb3(url,db,designView,view,mapData);
        console.log("checkDatacheckDatacheckData",checkView);
         return res.send({
          response:checkView
        })
      }
      return res.send({
        response:checkDesignView
      })
      }
      return res.send({
        response:checkData
      })
    
     }


     @Post("getDBS")
 
     async getDBS(@Req() req: Request, @Res() res: Response){
       try {
         // console.log("body",data)
         let url1 = req.body.url1;
         let url2 = req.body.url2;
       
      
         const dbData1 = await this.getListOfDB(url1);
         const dbData2 = await this.getListOfDB(url2);
        let db= [dbData1,dbData2]
    //  console.log("dbData",dbData)

     return(
       res.send({
         dataBase:db,
       })
     ) 
         
       } catch (error) {
         return(
           res.send({
             statusCode:404,
             message:"invalid User"
           })
         )
       } 
     }
   
    
    private async getListOfDB(dbUrl: string) {
     try {
       const couchDB = nano(dbUrl);
       const allDatabases = await couchDB.db.list();
      return allDatabases
     } catch (error) {
       // console.log("ERRRRRRRRRRRRO",error.error)
        return error.error
     }
     
    }
   

    
   
}