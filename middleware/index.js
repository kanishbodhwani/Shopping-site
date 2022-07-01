module.exports = async function validateCookie (req, res, next) {
    const { cookies , header } = req;
    
    if(!cookies && !req.headers.cookie) {
        return res.status(401).json({msg: "Cookie not found"});
    }
 
    try {
        
        if("session_id" in cookies) {
            if(cookies.session_id === id) next();
            else return res.status(403).send({msg: "Not authenticated"})
        } else return res.status(403).send({msg: "Not authenticated"})
    } catch (err) {
        return res.status(401).json({msg: "Token not valid"});
    }
}