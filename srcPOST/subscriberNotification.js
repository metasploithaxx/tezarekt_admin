const handleSubNotificationPost = (db) => (req, res) => {
    const {owner,audioport,videoport} = req.body;
    if (!(owner&&audioport&&videoport))
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
            db.select("*")
            .from("Users")
            .where({uname:owner})
            .update({
                isstreaming:true,
                audioport,
                videoport
            })
            .then(()=>{
                return res.status(200).json("streaming notification sent");
            })
            .catch((err)=>{
                return res.status(400).json("Error updating streaming info")
            })
                
        })
        .catch((err)=>{
            res.status(404).json(err);
        });
      })
      .catch((err)=>{
          res.status(404).json(err);
      });
  };

  const handleEndStream = (db) => (req,res) => {
    const {uname} = req.params;
    if (!(uname))
    return res.status(400).json("Please specify user whose stream ended");
    db.select("isstreaming")
        .from("Users")
        .where({uname})
        .update({isstreaming:false})
        .then(()=>{
            return res.json("Stream ended successfully")
        })
        .catch(()=>{
            return res.status(400).json("Some error  occured")
        })
  }
  
  module.exports = { handleSubNotificationPost , handleEndStream};
  