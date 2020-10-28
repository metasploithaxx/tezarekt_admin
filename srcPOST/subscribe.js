const handleSubscribe = (db) => (req, res) => {
  const { from, to, flag } = req.body;
  if (!(from && to && flag))
    return res.status(400).json("Fill in all details!");
  if (flag === "true") {
    db.select("*")
      .from("Subscription")
      .where({ from, to })
      .then((data) => {
        if (data.length) {
          return res.status(400).json("Already Subscribed");
        } else {
          db.select("balance")
            .from("Users")
            .where({ uname: to })
            .then((balance) => {
              db.select("subsrate")
                .from("Users")
                .where({ uname: from })
                .then((subsrate) => {
                  if (subsrate[0] <= balance[0]) {
                    db.select("*")
                      .from("Subscription")
                      .insert({ from, to })
                      .then((data1) => {
                        db.select("balance")
                          .from("Users")
                          .where({ uname: to })
                          .update({
                            balance: balance[0].balance - subsrate[0].subsrate,
                          })
                          .then((data2) => {})
                          .catch((err) => res.status(400).json("uname n&&&&"));
                        db.select("balance")
                          .from("Users")
                          .where({ uname: from })
                          .then((Bal)=>{
                            db.select("balance")
                            .from("Users")
                            .where({ uname: from })
                            .update({
                                balance : +Bal[0].balance + +subsrate[0].subsrate,
                              })
                              .then((data3) =>
                                res.status(200).json("Subscribed Successfully")
                              )
                              .catch((err) =>
                                res.status(400).json("uname not%%%%")
                              );
                            
                          })
                          .catch((err) =>
                                res.status(400).json("uname not###")
                              );
                          
                      })
                      .catch((err) => {
                        return res.status.status(404).json("Connection Error");
                      });
                  } else {
                    return res.status(404).json("Not Enough Balance");
                  }
                })
                .catch((err) => res.status(400).json("uname not found"));
            });
        }
      });
  } else {
    db.select("*")
      .from("Subscription")
      .where({ from, to })
      .then((data) => {
        if (data.length) {
          db.select("*")
            .from("Subscription")
            .where({ from, to })
            .del()
            .then((data) => res.status(200).json("Unsubscribed Successfully"))
            .catch((err) => {
              return res.status.status(404).json("Connection Error");
            });
        } else {
          res.status(200).json("Already Unsubscribed");
        }
      })
      .catch((err) => {
        return res.status.status(404).json("Connection Error");
      });
  }
};

module.exports = { handleSubscribe };
