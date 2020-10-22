const handleChatAllView = (db) => (req, res) => {
  const { uname, owner } = req.params;
  if (!uname && !owner) return res.status(400).json("Fill in all details!");
  db.select("*")
    .from("Chat")
    .where({owner,subscribermsg:false})
    .then((data) => {
      if (data.length) {
        return res.json(data);
      } else {
        return res.status(404).json("username not found");
      }
    })
    .catch((err) => res.status(400).json(err));
};
const handleChatSubsView = (db) => (req, res) => {
  const { uname, owner } = req.params;
  if (!uname && !owner) return res.status(400).json("Fill in all details!");
  db.select("*")
    .from("Chat")
    .where({owner,subscribermsg:true})
    .then((data) => {
      if (data.length) {
        return res.json(data);
      } else {
        return res.status(404).json("username not found");
      }
    })
    .catch((err) => res.status(400).json(err));
};
const handleChatPrivateView = (db) => (req, res) => {
  const { uname, owner } = req.params;
  if (!uname && !owner) return res.status(400).json("Fill in all details!");
  db.select("*")
    .from("Chat")
    .where({owner,uname})
    .then((data) => {
      if (data.length) {
        return res.json(data);
      } else {
        return res.status(404).json("username not found");
      }
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = { handleChatAllView,handleChatSubsView ,handleChatPrivateView  };
