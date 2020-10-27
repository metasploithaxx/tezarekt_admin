const handleSetStatus = (db) => (req,res)=>{
    const {uname} = req.body;
    if(!uname) return res.status(400).json("Fill in all details!");
    db.select('isonline')
        .from('Users')
        .where({uname})
        .then((data)=>{ 
          if(data.length){
              if(data[0].isonline==false){
               db.select('isonline')
               .from('Users')
               .where({uname})
               .update({isonline:true})
               .then((data)=>{res.status(200).json(true)})
               .catch((err)=>res.status(400).json(err))   
              }
              else{
                db.select('isonline')
                .from('Users')
                .where({uname})
                .update({isonline:false,lastseen:db.fn.now()})
                .then((data)=>{res.status(200).json(false)})
               .catch((err)=>res.status(400).json(err))   
              }
          }
          else
          return res.status(400).json("Username does not exist");
        })
        .catch((err)=>{
          res.status(400).json("Connection error"+err)
        })
  }
  module.exports = { handleSetStatus };