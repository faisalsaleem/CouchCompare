import { Injectable } from "@nestjs/common";
import * as nano from 'nano';
// const nano = require('nano')('http://localhost:5984'); // Connect to CouchDB
// Define an interface for the design document

@Injectable()
export class AppService {

  // private db: nano.DocumentScope<any>;
  private couch: nano.ServerScope;

  // constructor() {
  //   this.couch = nano('http://localhost:5984');
  // }




  async getUrlAndDb(url: any, dbName: any, designView: any, view: any, mapData: any) {
    try {

      // if (url) {
      //   this.couch = nano(url);
      // }

      const couchDBURL = url; // CouchDB server URL
      const couchDBName = dbName; // CouchDB database name
      const couch = nano(couchDBURL);
      const designDoc = couch.use(couchDBName);
      console.log("designDocdesignDocdesignDocdesignDoc", designDoc)
      // console.log("URL",couchDBURL);
      // console.log("couchDBName",couchDBName);
      // console.log("couch",couch);
      // console.log("designDoc",designDoc);



      if (!designDoc) {
        // try {

        //   const designDoc = couch.use(couchDBName);

        //   await couch.db.create(couchDBName);

        //   const useDb = couch.use(couchDBName)

        //   const changeViews = {};
        //   changeViews[view] = { map: mapData.map };

        //   // console.log("viewsviewsviews", changeViews)

        //   const designDoc1 = {
        //     _id: designView,
        //     views: changeViews
        //   };
        //   // console.log(designDoc1.views)
        //   useDb.insert(designDoc1);

        // } catch (error) {
        //   console.log(error)
        // }




      }

      else if (designDoc) {
        try {
          const getdesignView = await couch.use(couchDBName).get(designView);
          console.log("HEEEELLLLLLLLLLOOOOOOOOOOOOOOOOO", getdesignView);

          const changeViews = {};
          changeViews[view] = { map: mapData.map };




          designDoc.get(designView, async (err: any, designDoc: any) => {
            if (err) {
              console.error('Error fetching design document:', err);
              return;
            }

            // Update the design document with the new view
            designDoc.views.newView = changeViews;

            // Save the updated design document
            couch.use(couchDBName).insert(designDoc, (err, body) => {
              if (err) {
                console.error('Error updating design document:', err);
                return;
              }
              console.log('Design document updated successfully:', body);
            });


          }
          )

        } catch (error) {
          if (error.error === "not_found") {
            console.log("hhheeeeeeellllllllllooooooooo")
            const useDb = couch.use(couchDBName)

            const changeViews = {};
            changeViews[view] = { map: mapData.map };

            // console.log("viewsviewsviews", changeViews)

            const designDoc1 = {
              _id: designView,
              views: changeViews
            };
            // console.log(designDoc1.views)
            useDb.insert(designDoc1);
          }
          // return error.error
        }
        // console.log("HEEEELLLLLLLLLLOOOOOOOOOOOOOOOOO");

        // const getdesignView = await couch.use(couchDBName).get(designView);
        // console.log("HEEEELLLLLLLLLLOOOOOOOOOOOOOOOOO",getdesignView);


        // if (!getdesignView) {

        //   const useDb = couch.use(`${couchDBName}3`)

        //   const changeViews = {};
        //   changeViews[view] = { map: mapData.map };

        //   // console.log("viewsviewsviews", changeViews)

        //   const designDoc1 = {
        //     _id: designView,
        //     views: changeViews
        //   };
        //   // console.log(designDoc1.views)
        //   useDb.insert(designDoc1);
        // }

        // else {


        //   const changeViews = {};
        //   changeViews[view] = { map: mapData.map };




        //   designDoc.get(designView, async (err: any, designDoc: any) => {
        //     if (err) {
        //       console.error('Error fetching design document:', err);
        //       return;
        //     }

        //     // Update the design document with the new view
        //     designDoc.views.newView = changeViews;

        //     // Save the updated design document
        //     couch.use(couchDBName).insert(designDoc, (err, body) => {
        //       if (err) {
        //         console.error('Error updating design document:', err);
        //         return;
        //       }
        //       console.log('Design document updated successfully:', body);
        //     });


        //   }
        //   )


        // }


      }
















      // // single DB
      // await couch.db.create(`${couchDBName}3`);

      // const useDb = couch.use(`${couchDBName}3`)
      // // single designView

      // const changeViews = {};
      // changeViews[view] = { map: mapData.map };

      // console.log("viewsviewsviews", changeViews)



      // const designDoc1 = {
      //   _id: designView,
      //   views: changeViews
      // };
      // console.log(designDoc1.views)
      // useDb.insert(designDoc1);


      // const designDoc1 = {
      //       _id: designView,
      //       views:view
      //     };





      //     await this.couch.db.create(`${couchDBName}6`);

      //     // Use the created database
      //     const db = this.couch.use(`${couchDBName}6`);

      // await db.insert(designDoc1);













      // const designDoc = await couch.use(couchDBName).get(designView);





      // const response = await check.list({
      //   startkey: '_design/',
      //   endkey: '_design0',
      //   include_docs: true
      // })

      // response.rows.map((item) => {
      //   if (designView === item.id) {
      //     console.log(item.doc)


      //   }

      // })

      //   if (!('views' in designDoc)) {
      //     throw new Error('Design document does not contain any views');
      //   }

      //   Object.keys(designDoc.views).forEach(key => {
      //     const value = designDoc.views[key];
      //     arr.push({key:value})
      //     // console.log(` ${key}:${value}`);
      // });



      // console.log("ARRAY",arr)

      // console.log(designDoc)
      // await this.nanoInstance.use(db).insert(designDoc);
      // console.log('Design document updated successfully');




    } catch (error) {
      const err = new Error("Erroe occur")
      console.log(err)
      //  const designDoc = couch.use(couchDBName);

      await nano(url).db.create(dbName);

      const useDb = nano(url).use(dbName)

      const changeViews = {};
      changeViews[view] = { map: mapData.map };

      // console.log("viewsviewsviews", changeViews)

      const designDoc1 = {
        _id: designView,
        views: changeViews
      };
      // console.log(designDoc1.views)
      useDb.insert(designDoc1);

    }







  }



  async getUrlAndDb1(url: any, dbName: any, designView: any, view: any, mapData: any) {


try {
  nano(url).use(dbName);
       await nano(url).db.create(dbName)
         nano(url).use(dbName)
        const changeViews = {};
        changeViews[view] = { map: mapData.map };
        const designDoc1 = {
          _id: designView,
          views: changeViews
        };
        nano(url).use(dbName).insert(designDoc1);
        return({
          response:'Database created successfully.'
        })

} catch (error) {
  return({
    error:error.error
  })
  
}

     




      // try {
      //   await nano(url).use(dbName).get(designView);
      //   const changeViews = {};
      //   changeViews[view] = { map: mapData.map };
      //   nano(url).use(dbName).get(designView, async (err: any, designDoc: any) => {
      //     if (err) {
      //       console.error('Error fetching design document:', err);
      //       return;
      //     }
      //     designDoc.views.changeViews;
      //     nano(url).use(dbName).insert(designDoc, (err, body) => {
      //       if (err) {
      //         console.error('Error updating design document:', err);
      //         return;
      //       }
      //       console.log('Design document updated successfully:', body);
      //     });
      //   }
      //   )

      // } catch (error) {
      //   if (error.error === "not_found") {
      //     const useDb = nano(url).use(dbName)
      //     const changeViews = {};
      //     changeViews[view] = { map: mapData.map };
      //     const designDoc1 = {
      //       _id: designView,
      //       views: changeViews
      //     };
      //     useDb.insert(designDoc1);
      //   }
      // }
    }

    async getUrlAndDb2(url: any, dbName: any, designView: any, view: any, mapData: any) {


    
            try {
              console.log("check")
             await nano(url).use(dbName).get(designView);
              const changeViews = {};
              changeViews[view] = { map: mapData.map };
             await  nano(url).use(dbName).get(designView, async (err:any ,designDoc: any) => {
              if(err){
                console.log(err)
              }
                else{
                designDoc.views[view]={ map: mapData.map };
               await nano(url).use(dbName).insert(designDoc);
              }
              }
              )
              return({
                response:'add view into designView.'
              })
      
            } catch (error) {
              return({
                error:error.error
              })

            }
          }


          async getUrlAndDb3(url: any, dbName: any, designView: any, view: any, mapData: any) {


    
            try {
              console.log("check1")
                 const useDb = nano(url).use(dbName)
                const changeViews = {};
                changeViews[view] = { map: mapData.map };
                const designDoc1 = {
                  _id: designView,
                  views: changeViews
                };
                useDb.insert(designDoc1);
              return({
                response:'add designView into designView.'
              })
      
            } catch (error) {
              return({
                error:error
              })
             
            }
          }
   
   
           
      
      
      
      
          //   try {
          //     console.log("check")
          //     await nano(url).use(dbName).get(designView);
          //     const changeViews = {};
          //     changeViews[view] = { map: mapData.map };
          //     nano(url).use(dbName).get(designView, async (err: any, designDoc: any) => {
          //       if (err) {
          //         console.error('Error fetching design document:', err);
          //         return;
          //       }
          //       designDoc.views.newView=changeViews;
          //       nano(url).use(dbName).insert(designDoc, (err, body) => {
          //         if (err) {
          //           console.error('Error updating design document:', err);
          //           return;
          //         }
          //         console.log('Design document updated successfully:', body);
          //       });
          //     }
          //     )
      
          //   } catch (error) {
          //     if (error.error === "not_found") {
          //       const useDb = nano(url).use(dbName)
          //       const changeViews = {};
          //       changeViews[view] = { map: mapData.map };
          //       const designDoc1 = {
          //         _id: designView,
          //         views: changeViews
          //       };
          //       useDb.insert(designDoc1);
          //     }
          //   }
          // }
   


}