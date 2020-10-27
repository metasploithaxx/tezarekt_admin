const handlegetAllUser = (db) => (req, res) => {
    db.select('uname')
      .from("Users")
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
        } 
        else
         return res.status(400).json("username not registered");
      })
      .catch((err) => res.status(400).json(err));
  };
module.exports = { handlegetAllUser };