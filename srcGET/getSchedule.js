const handlegetSchedule = (db) => (req, res) => {
    const {owner}=req.params;
    if(!owner)
        return res.status(400).json("Specify channel to retrieve schedule");
    db.select('*')
      .from("Schedule")
      .where({owner})
      .then((data) => {
        if (data.length) {
            // console.log(data);
          return res.status(200).json(data);
        } 
        else
         return res.status(400).json("username not registered");
      })
      .catch((err) => res.status(400).json(err));
  };
module.exports = { handlegetSchedule };