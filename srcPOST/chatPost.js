const handleChatPost = (db) => (req, res) => {
    const {uname,owner,message,subscribermsg} = req.body;
    if (!(uname && owner && message && subscribermsg))
    return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Chat")
      .insert({uname,owner,message,subscribermsg})
      .then((data)=>{
            return res.status(200).json("Chat send");
      })
      .catch((err)=>{
          res.status.status(404).json(err);
      })
  };
  
  module.exports = { handleChatPost };
  