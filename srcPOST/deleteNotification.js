const handleNotificationDelete = (db) => (req, res) => {
    const { index} = req.body;
    if (!(index ))
    return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Notification")
      .where({index})
      .del()
      .then((data)=>{
            return res.status(200).json("Notification deleted");
      })
      .catch((err)=>{
          res.status.status(404).json(err);
      })
  };
  
  module.exports = { handleNotificationDelete };
  