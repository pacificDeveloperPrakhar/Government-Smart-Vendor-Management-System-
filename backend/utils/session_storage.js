const MongoStore=require("connect-mongo");
const session=require("express-session");
const { v4: uuidv4 } = require("uuid"); 
module.exports.session=session({
    resave:false,
    secret:process.env.SESSION_KEY,
    rolling:true,
    saveUninitialized:true,
    genid: function(req) {
        return uuidv4(); // use UUIDs for session IDs
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  
        collectionName: 'sessions_user_cadmax',        
        ttl: 3*60*60*10,           
        autoRemove: 'native'
      }),
})