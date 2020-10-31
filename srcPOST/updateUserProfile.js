const handleUpdateProfile = (db) => (req, res) => {
  const {
    uname,
    fname,
    lname,
    instaid,
    twitterid,
    subsrate,
    bio,
    isinstaidpublic,
    istwitteridpublic,
  } = req.body;
  if (!(uname && fname && lname && subsrate && bio))
    return res.status(400).json("Fill in all details!");
  db.select("*")
    .from("Users")
    .where({ uname })
    .update({
      fname,
      lname,
      instaid,
      twitterid,
      subsrate,
      bio,
      isinstaidpublic,
      istwitteridpublic,
    })
    .returning("*")
    .then((data) => {
      if (data.length) {
        return res.status(200).json("Successfully Updated");
      } else {
        return res.status(400).json("Unsuccessfull attempt to update");
      }
    })
    .catch((err) => res.status(400).json("connection error"));
};

const handleUpdateToi = (db) => (req, res) => {
  const { uname, toi } = req.body;
  if (!(toi && uname)) return res.status(400).json("Fill in all details!");
  db.select("toi")
    .from("Users")
    .where({ uname })
    .then((oldToidata) => {
      var oldtoilist = oldToidata[0].toi;
      console.log(oldtoilist);
      if (oldToidata != null) {
        for (let k = 0; k < oldtoilist.length; k++) {
          db.select("*")
            .from("Tags")
            .where({ tagname: oldtoilist[k] })
            .then((tagsData) => {
              if (tagsData.length) {
                var userlistOldtoi = tagsData[0].users;
                function arrayRemove(arr, value) {
                  return arr.filter(function (geeks) {
                    return geeks != value;
                  });
                }

                var result = arrayRemove(userlistOldtoi, uname);
                db.select("*")
                  .from("Tags")
                  .where({ tagname: oldtoilist[k] })
                  .update({ users: result })
                  .then((data) => {});
              }
            })
            .catch((err) => res.status(400).json("old toi iterating error"));
        }
      }
      db.select("*")
        .from("Users")
        .where({ uname })
        .update({
          toi,
        })
        .returning("*")
        .then((data) => {
          if (data.length) {
            console.log(toi);
            for (let i = 0; i < toi.length; i++) {
              db.select("*")
                .from("Tags")
                .where({ tagname: toi[i] })
                .then((tagsData) => {
                  if (tagsData.length) {
                    var users = tagsData[0].users;
                    var set = new Set();
                    for (let j = 0; j < users.length; j++) {
                      set.add(users[j]);
                    }
                    set.add(uname);

                    var finalusersList = [];

                    finalusersList = Array.from(set);
                    console.log("if part");
                    console.log(finalusersList);

                    db.select("*")
                      .from("Tags")
                      .where({ tagname: toi[i] })
                      .update({ users: finalusersList })
                      .then((finaldata) => {})
                      .catch((err1) => res.status(400).json("unsecess"));
                  } else {
                    var finalusersList = [];
                    finalusersList.push(uname);

                    console.log(finalusersList);

                    db.select("*")
                      .from("Tags")
                      .insert({
                        users: finalusersList,
                        tagname: toi[i],
                      })
                      .then((finaldata) => {})
                      .catch((err1) => {
                        return res.status(400).json("unsucess");
                      });
                  }
                })
                .catch((err2) => {
                  return res.status(400).json("error in iterating");
                });
            }

            return res.status(200).json("Successfully Updated*");
          } else {
            return res.status(400).json("Unsuccessfull attempt to update");
          }
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((erroldToi) => {
      return res.status(400).json("unsuccess oldToi");
    });
};
module.exports = { handleUpdateProfile, handleUpdateToi };
