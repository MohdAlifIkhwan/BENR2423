const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:satu1234@sandbox.5ovvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs")


client.connect(err => {
    if (err) {
      console.log(err.message)
      return
    }
    console.log('Connected to MongoDB');
  
    const saltRounds = 10;
    const username = faker.internet.userName();
    const password = faker.internet.password();
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
            throw saltError
        } else {
            bcrypt.hash(password, salt, function(hashError, hash) {
                if (hashError) {
                    throw hashError
                }  else {
                    //console.log(hash);
                    client.db("sample_training").collection("try").insertOne({
                        "userName": username,
                        "Password": hash});
                }
                console.log("Inserted!!!")
            })
        }
    })
        
    
  
  });