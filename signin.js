const handleSignin = (db, bcrypt) => (req, res) => {
  const { uname, passhash } = req.body;
  if (!uname || !passhash) return res.status(400).json("Fill in all details!");
  db.select("*")
    .from("Credentials")
    .where({ uname })
    .then((data) => {
      if (data.length) {
        if (bcrypt.compareSync(passhash, data[0].passhash)) {
            res.status(200).json("success");
        } else return res.status(400).json("invalid password");
      } else return res.status(404).json("username not registered");
    })
    .catch((err) => res.status(400).json("connection error"));
};

module.exports = { handleSignin: handleSignin };
