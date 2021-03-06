const handleSignin = (db, bcrypt) => (req, res) => {
  const { uname, passhash, ip} = req.body;
  if (!uname || !passhash) return res.status(400).json("Fill in all details!");
  db.select("*")
    .from("Credentials")
    .where({ uname })
    .then((data) => {
      if (data.length) {
        if (bcrypt.compareSync(passhash, data[0].passhash)) {
            db.select("uname")
            .from("Users")
            .where({uname})
            .update({ ip })
            .then((data)=>
              res.status(200).json(data)
            )
            .catch((err)=>
            res.status(400).json("error in updating ip")
            )
        } else return res.status(400).json("invalid password");
      } else return res.status(404).json("username not registered");
    })
    .catch((err) => res.status(400).json("connection error"));
};
const handleSignout=(db) => (req,res)=>{
  const {uname} = req.body;
  if(!uname) return res.status(400).json("Fill in all details!");
  db.select('uname')
      .from("Users")
      .where({uname})
      .update({ isonline:false ,lastseen:db.fn.now()})
      .then((data)=>{ 
        if(data.length)
        return res.status(200).json("success");
        else
        return res.status(400).json("Username does not exist");
      })
      .catch((err)=>{
        res.status(400).json("Connection error")
      })
}
module.exports = { handleSignin, handleSignout };
