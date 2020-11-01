const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const signIn = require('./srcPOST/signin');
const register = require('./srcPOST/register');
const selfprofile = require('./srcGET/profileView');
const updateUserProfile = require('./srcPOST/updateUserProfile');
const chatView = require('./srcGET/chatView');
const chatPost = require('./srcPOST/chatPost');
const onlineusers = require('./srcGET/showOnlineUsers');
const subscribe = require('./srcPOST/subscribe');
const getSubscriptionCount = require('./srcGET/getSubscriptionCount');
const isSubscribed = require('./srcGET/isSubscribed');
const privateChatPost = require('./srcPOST/privateChatPost');
const privateChatView = require('./srcGET/privateChatView');
const setStatus = require('./srcPOST/setStatus');
const getStatus = require('./srcGET/getStatus');
const getAllUser = require('./srcGET/getAllUsers');
const checkPassword = require('./srcPOST/checkPassword');
const viewNotification = require('./srcGET/viewNotification');
const setNotification = require('./srcPOST/setNotification');
const delNotification = require('./srcPOST/deleteNotification');
const streamingNotification = require('./srcPOST/subscriberNotification');
const getrecommendedusers = require('./srcGET/getRecommendedUsers');
const addSchedule = require('./srcPOST/addSchedule')
const getSchedule = require('./srcGET/getSchedule')

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
app.post('/checkPassword',checkPassword.handlecheckPassword(db,bcrypt))
app.post('/setNotification',setNotification.handleNotificationPost(db));
app.get('/getNotification/:uname',viewNotification.handlegetNotification(db));
app.post('/delNotification',delNotification.handleNotificationDelete(db));
app.get('/viewAllSubscriber/:to',getSubscriptionCount.handleViewSubscribers(db));
app.get('/getToi/:uname',selfprofile.handleViewTOI(db));
app.post('/setTOI',updateUserProfile.handleUpdateToi(db));
app.post('/subscriberNotification',streamingNotification.handleSubNotificationPost(db));
app.get('/getrecommendedusers/:uname',getrecommendedusers.handlegetRecommendedUsers(db));
app.put('/streamEnd/:uname',streamingNotification.handleEndStream(db));
app.post('/schedule/add',addSchedule.handleSchedulePost(db));
app.get('/schedule/:owner',getSchedule.handlegetSchedule(db));


app.listen(
  process.env.PORT || 3000,
  console.log("watching on port " + (process.env.PORT || 3000))
);
