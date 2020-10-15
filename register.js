const handleRegister = (db) => (req, res) => {
    const { passHash, username,firstname,lastname,subsrate,info} = (req.body);
    if(!(username && firstname && subsrate && passHash && lastname))
    return res.status(400).json('Fill in all details!')
    db.transaction(trx => {
        trx.insert({
            uname: username,         // inside Credential
            passhash: passHash
        })
            .into('Credentials')
            .returning('uname')
            .then(username => {
                return trx('Users')
                    .returning('*')
                    .insert({
                        uname: username[0],
                        fname: firstname,
                        lname: lastname,
                        subsrate: subsrate,
                        bio: info

                    }).then(username => res.json(username[0]))
            })
            .then(trx.commit)
            .catch(err => res.status(400).json(err))

    })
        .catch(err => res.status(400).json(err))
}

module.exports=({handleRegister})