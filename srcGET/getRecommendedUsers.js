const handlegetRecommendedUsers = (db) => (req, res) => {
    const {uname} = req.params;
    if (!uname ) return res.status(400).json("Fill in all details!");
    var toiList=[];
    var mapoftoiUser = {};
    db.select('toi','mapoftoi')
      .from("Users")
      .where({uname})
      .then((data) => {
        if (data.length) {
            toiList = data[0].toi;
            mapoftoiUser = data[0].mapoftoi;
            if(mapoftoiUser!=null){
              mapoftoiUser = JSON.parse(mapoftoiUser);
            }
            else{
              mapoftoiUser={};
            }
            if(toiList==null){
              toiList = [];
            }
            for(let i=0;i<toiList.length;i++){
              if (!(toiList[i] in mapoftoiUser)) {
                mapoftoiUser[toiList[i]] = 0;
              }
              mapoftoiUser[toiList[i]] =
                +mapoftoiUser[toiList[i]] + 10;
            }

            console.log(mapoftoiUser);
            
            var rankOfUser = {};
            db.select('*')
            .from('Tags')
            .then((iterator)=>{
              console.log(iterator);
              for(let i=0;i<iterator.length;i++){
                let tagname = iterator[i].tagname;
                let rankofTag=0;
                if(tagname in mapoftoiUser){
                  rankofTag = mapoftoiUser[tagname];
                }
                for(let j=0;j<iterator[i].users.length;j++){
                  if(iterator[i].users[j] in rankOfUser){
                    rankOfUser[iterator[i].users[j]] = +rankOfUser[iterator[i].users[j]] + +rankofTag;
                  }
                  else{
                    rankOfUser[iterator[i].users[j]]= rankofTag;
                  }
                }
              }
              console.log(rankOfUser);
              var alluser = [];
              db.select('uname')
              .from('Users')
              .then((users)=>{
                for(let k=0;k<users.length;k++){
                  alluser.push(users[k].uname);
                }
                console.log(alluser);
                alluser.sort(function(a,b){
                  if(!(a in rankOfUser))
                  rankOfUser[a]=0;
                  if(!(b in rankOfUser))
                  rankOfUser[b]=0;
                  return rankOfUser[b]-rankOfUser[a];
                })
                console.log(alluser);
                res.status(200).json(alluser);
              })

              
            })
            .catch((err)=>res.status(400).json("ranking error"))

        } 
        else
         return res.status(400).json("username not registered");
      })
      .catch((err) => res.status(400).json(err));
  };
module.exports = { handlegetRecommendedUsers };