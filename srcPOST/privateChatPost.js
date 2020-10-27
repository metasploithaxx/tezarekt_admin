const handlePrivateChatPost = (db) => (req, res) => {
    const {from,to,msg} = req.body;
    if (!(from && to && msg))
    return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("PrivateChat")
      .insert({from,to,msg})
      .then((data)=>{
            return res.status(200).json("Chat send");
      })
      .catch((err)=>{
          res.status.status(404).json(err);
      })
  };
  
  module.exports = { handlePrivateChatPost };
  