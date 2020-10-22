const handleViewSubscriptionCount = (db) => (req, res) => {
    const { from } = req.params;
    if (!from) return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Subscription")
      .where({from})
      .then((data) => {
          return res.status(200).json(data.length);
      })
      .catch((err) => res.status(400).json(err));
  };
  
  module.exports = { handleViewSubscriptionCount };