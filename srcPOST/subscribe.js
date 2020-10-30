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

          var balanceFrom=0,balanceTo=0,subsrateFrom=0;
          var toilistFrom = [] , toilistTo = [] , rtoiTo = [];
          var mapToiTo = {};

          db.select('balance','toi','rtoi','mapoftoi')
            .from("Users")
            .where({ uname: to })
            .then((TO) => {
              balanceTo = TO[0].balance;
              toilistTo = TO[0].toi;
              rtoiTo = TO[0].rtoi;
              mapToiTo = JSON.parse(TO[0].mapoftoi);
              db.select('subsrate','balance','toi')
                .from("Users")
                .where({ uname: from })
                .then((FROM) => {
                  balanceFrom = FROM[0].balance;
                  subsrateFrom = FROM[0].subsrate;
                  toilistFrom  = FROM[0].toi; 
                  console.log(subsrateFrom +" "+balanceTo);
                  if ( +subsrateFrom <= +balanceTo) {
                    console.log("**")
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
                                    balance:
                                      +balanceFrom + +subsrateFrom,
                                  })
                                  .then((data3) => {
                                    var mapToiTo1 = new Map();
                                    for(let i=0;i<toilistFrom.length;i++){
                                      if(mapToiTo1.has(toilistFrom[i])){
                                        mapToiTo1[toilistFrom[i]]++;
                                      }
                                      else{
                                        mapToiTo1.set(toilistFrom[i],1);
                                      }
                                    }
                                    mapToiTo1.set(toilistFrom[1],4);
                                    console.log(mapToiTo1);
                                    let obj = {};

                                    mapToiTo1.forEach(function(value, key){
                                        obj[key] = value
                                    });

                                    console.log(obj);

                                    var set = new Set();
                                    console.log(toilistFrom)
                                    if(rtoiTo!=null)
                                    for(let i=0;i<rtoi.length;i++){
                                      set.add(rtoiTo[i]);
                                    }
                                    for(let i=0;i<toilistFrom.length;i++){
                                      set.add(toilistFrom[i]);
                                    }
                                    var finallist = [];
                                    function printOne(values) 
                                    { 
                                        finallist.push(values); 
                                    } 
                                    set.forEach(printOne); 
                                    
                                    finallist.sort(function(a, b) {
                                      return obj[b]-obj[a]
                                    });
                                    console.log(finallist);
                                    return res
                                      .status(200)
                                      .json("Subscribed Successfully");
                                  })
                                  .catch((err) =>
                                  {console.log(err)
                                    return res.status(400).json("uname not%%%%")}
                                  );
                              
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
