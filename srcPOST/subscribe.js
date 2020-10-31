const handleSubscribe = (db) => (req, res) => {
  const { from, to, flag } = req.body;
  if (!(from && to && flag))
    return res.status(400).json("Fill in all details!");

  // to is a user and from is a person to whom we are subscribing
  if (flag === "true") {
    db.select("*")
      .from("Subscription")
      .where({ from, to })
      .then((data) => {
        if (data.length) {
          return res.status(400).json("Already Subscribed");
        } else {
          var balanceFrom = 0,
            balanceTo = 0,
            subsrateFrom = 0;
          var toilistFrom = [],
            toilistTo = [];
          var mapToiTo = {};

          db.select("balance", "toi", "mapoftoi")
            .from("Users")
            .where({ uname: to })
            .then((TO) => {
              balanceTo = TO[0].balance;
              toilistTo = TO[0].toi;
              mapToiTo = TO[0].mapoftoi;
              db.select("subsrate", "balance", "toi")
                .from("Users")
                .where({ uname: from })
                .then((FROM) => {
                  balanceFrom = FROM[0].balance;
                  subsrateFrom = FROM[0].subsrate;
                  toilistFrom = FROM[0].toi;
                  console.log(subsrateFrom + " " + balanceTo);
                  if (+subsrateFrom <= +balanceTo) {
                    console.log("**");
                    db.select("*")
                      .from("Subscription")
                      .insert({ from, to })
                      .then((data1) => {
                        db.select("balance")
                          .from("Users")
                          .where({ uname: to })
                          .update({
                            balance: balanceTo - subsrateFrom,
                          })
                          .then((data2) => {
                            db.select("balance")
                              .from("Users")
                              .where({ uname: from })
                              .update({
                                balance: +balanceFrom + +subsrateFrom,
                              })
                              .then((data3) => {
                                console.log("subscrbe");
                                console.log(mapToiTo);
                                if (mapToiTo != null) {
                                  mapToiTo = JSON.parse(mapToiTo);
                                } else {
                                  mapToiTo = {};
                                }
                                console.log(mapToiTo);
                                for (let i = 0; i < toilistFrom.length; i++) {
                                  if (!(toilistFrom[i] in mapToiTo)) {
                                    mapToiTo[toilistFrom[i]] = 0;
                                  }
                                  mapToiTo[toilistFrom[i]] =
                                    +mapToiTo[toilistFrom[i]] + 1;
                                }
                                console.log(mapToiTo);

                                db.select("*")
                                  .from("Users")
                                  .where({ uname: to })
                                  .update({
                                    mapoftoi: mapToiTo,
                                  })
                                  .then((finalllly) => {
                                    return res
                                      .status(200)
                                      .json("Subscribed Successfully");
                                  })
                                  .catch((err) =>
                                    res.status(400).json("error in updating")
                                  );
                              })
                              .catch((err) => res.status(400).json(err));
                          })
                          .catch((err) => res.status(400).json("uname not###"));
                      })
                      .catch((err) => {
                        return res.status.status(404).json("Connection Error");
                      });
                  } else {
                    return res.status(404).json("Not Enough Balance");
                  }
                })
                .catch((err) => res.status(400).json("uname not found"));
            })
            .catch((err) => res.status(404).json(err));
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
            .then((data) => {
              var toilistFrom = [],
                toilistTo = [];
              var mapToiTo = {};

              db.select("balance", "toi", "mapoftoi")
                .from("Users")
                .where({ uname: to })
                .then((TO) => {
                  toilistTo = TO[0].toi;
                  mapToiTo = TO[0].mapoftoi;
                  db.select("subsrate", "balance", "toi")
                    .from("Users")
                    .where({ uname: from })
                    .then((FROM) => {
                      console.log("Unsubscrbe");
                      toilistFrom = FROM[0].toi;
                      console.log(mapToiTo);
                      if (mapToiTo != null) {
                        mapToiTo = JSON.parse(mapToiTo);
                      }
                      else{
                        mapToiTo = {};
                      }
                      
                      console.log(mapToiTo);
                      for (let i = 0; i < toilistFrom.length; i++) {
                        if (toilistFrom[i] in mapToiTo) {
                          mapToiTo[toilistFrom[i]] =
                            +mapToiTo[toilistFrom[i]] - 1;
                        }
                      }
                      console.log(mapToiTo);
                      db.select("*")
                        .from("Users")
                        .where({ uname: to })
                        .update({ mapoftoi: mapToiTo })
                        .then((finalllly) => {
                          return res
                            .status(200)
                            .json("Unsubscribed Successfully");
                        })
                        .catch((err) =>
                          res.status(400).json("error in updating")
                        );
                    })
                    .catch((err) => {});
                });
            })
            .catch((err) => {
              return res.status(404).json("Connection Error");
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
