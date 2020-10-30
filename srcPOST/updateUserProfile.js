const handleUpdateProfile = (db) => (req, res) => {
    const {uname,fname,lname,instaid,twitterid,subsrate,bio,isinstaidpublic,istwitteridpublic} = req.body;
    if (!(uname && fname && lname&& subsrate && bio))
    return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Users")
      .where({ uname })
      .update({
        fname,lname,instaid,twitterid,subsrate,bio,isinstaidpublic,istwitteridpublic
      })
      .returning('*')
      .then((data) => {
        if (data.length) {
              return res.status(200).json("Successfully Updated");
        }
         else{
            return res.status(400).json("Unsuccessfull attempt to update");
         }
      })
      .catch((err) => res.status(400).json("connection error"));
  };
  
  const handleUpdateToi = (db) => (req, res) => {
    const {uname,toi} = req.body;
    if (!(toi && uname))
    return res.status(400).json("Fill in all details!");
   
    db.select("*")
      .from("Users")
      .where({ uname })
      .update({
        toi
      })
      .returning('*')
      .then((data) => {
        if (data.length) {
              return res.status(200).json("Successfully Updated");
        }
         else{
            return res.status(400).json("Unsuccessfull attempt to update");
         }
      })
      .catch((err) => res.status(400).json(err));
  };
  module.exports = { handleUpdateProfile ,handleUpdateToi };
  