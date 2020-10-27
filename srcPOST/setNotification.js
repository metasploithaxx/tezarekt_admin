const handleNotificationPost = (db) => (req, res) => {
    const { owner,msg } = req.body;
    if (!(owner && msg))
    return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Notification")
      .insert({owner,msg})
      .then((data)=>{
            return res.status(200).json("Notification send");
      })
      .catch((err)=>{
          res.status.status(404).json(err);
      })
  };
  
  module.exports = { handleNotificationPost };
  