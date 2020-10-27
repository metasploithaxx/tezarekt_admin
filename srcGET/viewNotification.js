const handlegetNotification = (db) => (req, res) => {
    const {uname} = req.params;
    if (!uname ) return res.status(400).json("Fill in all details!");
    db.select('*')
      .from("Notification")
      .where({ owner : uname })
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
        } 
        else
         return res.status(400).json("username not registered or no new Notification");
      })
      .catch((err) => res.status(400).json(err));
  };
  module.exports = { handlegetNotification };