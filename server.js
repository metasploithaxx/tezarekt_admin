const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const signIn=require('./signin');
const register = require('./register');
const selfprofile = require('./profileView');
const updateUserProfile = require('./updateUserProfile');
const chatView = require('./chatView');
const chatPost = require('./chatPost');

const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var db = require("knex")({
  client: "pg",
  connection: {
    host:"ec2-34-234-185-150.compute-1.amazonaws.com",
    port:5432,
    database:"d47hu7e2vvm9nn",
    timezone: 'IST',
    user:"wvfzgszdbsiutx",
    password:"91765eb1c50258cb38df2b627e89aca61bed766410125d0774cab3c461296ec2",
    // connectionString: process.env.DATABASE_URL,
    ssl: true,
    typeCast: function (field, next) {
      if (field.type == 'timestamp') {
        return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
      }
      return next();
    }
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.get("/", getUsers.handleUsers(db));
app.post("/signin", signIn.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db));
app.get("/profile/self/:uname",selfprofile.handleViewSelf(db));
app.post("/updateUserProfile",updateUserProfile.handleUpdateProfile(db));
app.get("/chat/:owner/:uname",chatView.handleChatView(db));
app.post("/chatPost",chatPost.handleChatPost(db));
// app.get("/profile/:id", profile.getProfile(db));
// app.delete("/profile/:id", profile.deleteProfile(db));
// app.put("/image", image.handleImage(db));
// app.post("/imageAPI", image.handleAPI);
// app.post("/profile/:id", profile.changePass(db));

app.listen(
  process.env.PORT || 3000,
  console.log("watching on port " + (process.env.PORT || 3000))
);
