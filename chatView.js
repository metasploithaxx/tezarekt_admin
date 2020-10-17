const handleChatView = (db) => (req, res) => {
  const { uname, owner } = req.params;
  if (!uname && !owner) return res.status(400).json("Fill in all details!");
  db.select("*")
    .from("Chat")
    .where({owner})
    .then((data) => {
      if (data.length) {
        return res.json(data);
      } else {
        return res.status(404).json("username not found");
      }
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = { handleChatView };
