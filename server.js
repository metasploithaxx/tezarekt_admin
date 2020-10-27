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
const onlineusers = require('./showOnlineUsers');
const subscribe = require('./subscribe');
const getSubscriptionCount = require('./getSubscriptionCount');
const isSubscribed = require('./isSubscribed');
const privateChatPost = require('./privateChatPost');
const privateChatView = require('./privateChatView');
const setStatus = require('./setStatus');
const getStatus = require('./getStatus');
const getAllUser = require('./getAllUsers');
const checkPassword = require('./checkPassword');

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

app.post("/signin", signIn.handleSignin(db, bcrypt));
app.post('/signout',signIn.handleSignout(db));
app.post("/register", register.handleRegister(db));
app.get("/profile/self/:uname",selfprofile.handleViewSelf(db));
app.get("/profile/user/:uname",selfprofile.handleViewUser(db));
app.post("/updateUserProfile",updateUserProfile.handleUpdateProfile(db));
app.get("/chatAll/:owner/:uname",chatView.handleChatAllView(db));
app.get("/chatSubs/:owner/:uname",chatView.handleChatSubsView(db));
app.post("/chatPost",chatPost.handleChatPost(db));
app.get("/onlineUsers",onlineusers.handleOnlineUser(db));
app.post("/subscribe",subscribe.handleSubscribe(db));
app.get('/getSubscriptionCount/:from',getSubscriptionCount.handleViewSubscriptionCount(db));
app.get('/isSubscribed/:from/:to',isSubscribed.handleIsSubscribed(db));
app.post("/privateChatPost",privateChatPost.handlePrivateChatPost(db));
app.get('/privateChatView/:from/:to',privateChatView.handleChatPrivateView(db));
app.post('/setStatus',setStatus.handleSetStatus(db));
app.get('/getStatus/:uname',getStatus.handlegetStatus(db));
app.get('/getAllUsers',getAllUser.handlegetAllUser(db));
app.get('./checkPassword/:uname/:passhash',checkPassword.handlecheckPassword(db,bcrypt))

app.listen(
  process.env.PORT || 3000,
  console.log("watching on port " + (process.env.PORT || 3000))
);
