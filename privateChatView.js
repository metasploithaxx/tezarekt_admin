const handleChatPrivateView = (db) => (req, res) => {
    const { from, to } = req.params;
    if (!(from && to)) return res.status(400).json("Fill in all details!");
    db.select("*")
      .from("Chat")
      .where({from,to} || {to:from,from:to})
      .then((data) => {
        if (data.length) {
          return res.json(data);
        } else {
          return res.status(404).json("username not found");
        }
      })
      .catch((err) => res.status(400).json(err));
  };

  module.exports = {handleChatPrivateView};
