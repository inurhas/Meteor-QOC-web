//define global collection variable in client side
QocData = new Meteor.Collection('QocData')
//=====================================================================================================
//trial thirth collection and this is working model
/*
QocData.insert({
                 qoc:"which Server Technology should I choose",
                 description:"help you to find the best Server-side Technology with your own criteria",
                 type:"technology",
                 owner:"irawan",
                 duedate:new Date(), 
                 status:"open", 
                 options:[{
                            option:"ASP",
                            numselected:0,
                            criterias: [{
                                           criteria:"performance",
                                           value:20
                                         },{
                                           criteria:"complexity",
                                           value:30
                                         }]
                           },{
                            option:"python",
                            numselected:3,
                            criterias:[{
                                           criteria:"performance",
                                           value:40
                                        },{
                                           criteria:"complexity",
                                           value:40
                                        }]
                           },{
                             option:"Ruby",
                             numselected:1,
                             criterias:[{
                                           criteria:"performance",
                                           value:30
                                        },{
                                           criteria:"complexity",
                                           value:30
                                        }]
                           }]
           })
 */

//trial one collection model
/*
QocData.insert({
                 qoc:"which servers-side technology should I choose", 
                 description:"this QOC helps you to find out the best app that suit to your criteria", 
                 type:"programming",
                 owner:"irawan", 
                 criteria : [
                              {tittle:"performance"},
                              {tittle:"Acceptance in corporate markets"},
                              {tittle:"Complexity"}
                            ],
                 option : [
                            { 
                              name:"ASP",
                              value:[20,30,40]
                            },{
                              name:"python",
                              value:[10,40,30]
                            },{
                              name:"Java",
                              value:[40,40,30]
                            },{
                              name:"Ruby",
                              value:[30,30,30]
                            }
                           ]
               })
*/

//trial two collection model
/*
QocData.insert({
                 qoc:"which Server Technology should I choose",
                 description:"help you to find the best Server-side Technology with your own criteria",
                 type:"technology",
                 owner:"irawan",
                 options:[
                           {
                              option:"ASP",
                              criterias : [
                                            {
                                              criteria:"performance",
                                              value:20 
                                            },{
                                              criteria:"complexity",
                                              value:30
                                            }
                                           ]
                           },{
                               option:"python",
                               criterias : [
                                            {
                                              criteria:"performance",
                                              value:40
                                            },{
                                              criteria:"complexity",
                                              value:40
                                            }
                                           ]
                           },{
                               option:"Ruby",
                               criterias : [
                                            {
                                               criteria:"performance",
                                               value:30
                                            },{
                                               criteria:"complexity",
                                               value:30
                                            }
                                           ]
                           }]
              })
 */
