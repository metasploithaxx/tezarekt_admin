const handleViewSelf = (db) => (req, res) => {
    const {uname} = req.params;
    if (!uname ) return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Users")
      .where({ uname })
      .then((data) => {
        if (data.length) {
          return res.json(data[0]);
        } 
        else
         return res.status(404).json("username not registered");
      })
      .catch((err) => res.status(400).json(err));
  };
  const handleViewUser = (db) => (req, res) => {
    const {uname} = req.params;
    if (!uname ) return res.status(400).json("Fill in all details!");
    db.select('*')
      .from("Users")
      .where({ uname })
      .then((data) => {
        if (data.length) {
          return res.json(data[0]);
        } 
        else
         return res.status(404).json("username not registered");
      })
      .catch((err) => res.status(400).json(err));
  };
  
  module.exports = { handleViewSelf,handleViewUser };
  