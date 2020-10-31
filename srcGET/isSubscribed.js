const handleIsSubscribed = (db) => (req, res) => {
    const { from ,to} = req.params;
    if (!from || !to) return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Subscription")
      .where({from,to})
      .then((data) => {
          return res.status(200).json(data.length);
      })
      .catch((err) => res.status(400).json(err));
  };
  
  module.exports = { handleIsSubscribed };
  