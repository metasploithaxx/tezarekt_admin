const handleSchedulePost = (db) => (req, res) => {
    const {owner,time,date,description} = req.body;
    if (!(time && owner && date && description))
    return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Schedule")
      .insert({owner,time,date,description})
      .then((data)=>{
            console.log("Success")
            return res.status(200).json("Schedule updated successfully");
      })
      .catch((err)=>{
          console.log(err);
          return res.status(404).json(err);
      })
  };
  
  module.exports = { handleSchedulePost };
  