const handleOnlineUser = (db) => (req, res) => {
    db.select('uname',)
      .from("Users")
      .where({ isonline:true })
      .then((data) => {
        if (data.length) {
          return res.json(data);
        } 
        else
         return res.status(404).json("username not registered");
      })
      .catch((err) => res.status(400).json(err));
  };
  
  module.exports = { handleOnlineUser };
  