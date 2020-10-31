const handlecheckPassword = (db, bcrypt) => (req, res) => {
    const { uname,passhash} = req.body;
    if (!uname || !passhash) return res.status(400).json("Fill in all details!");
    db.select("passhash","uname")
      .from("Credentials")
      .where({ uname })
      .then((data) => {
        
        if (data.length) {
          if (bcrypt.compareSync(passhash, data[0].passhash)) {
             return res.status(200).json(true);
          } else return res.status(400).json(false);
        } else return res.status(404).json("username not registered");
      })
      .catch((err) => res.status(400).json("connection error"));
  };
  module.exports = { handlecheckPassword};