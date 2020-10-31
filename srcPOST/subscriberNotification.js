const handleSubNotificationPost = (db) => (req, res) => {
    const {owner} = req.body;
    if (!(owner))
    return res.status(400).json("Fill in all details!");
    db.select("to")
      .from("Subscription")
      .where({from:owner})
      .then((data)=>{
        const fieldsToInsert = data.map(field =>
            ({ owner: field['to'],
               msg: owner+" has started streaming" }));         
        db.select("*")
        .from("Notification")
        .insert(fieldsToInsert)
        .then((data1)=>{
                return res.status(200).json("streaming notification send");
        })
        .catch((err)=>{
            res.status(404).json(err);
        });
      })
      .catch((err)=>{
          res.status(404).json(err);
      });
  };
  
  module.exports = { handleSubNotificationPost };
  