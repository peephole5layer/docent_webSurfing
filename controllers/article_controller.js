module.exports.article= function(req, res) {
    console.log(req.params);

    let str;

    if(req.params.str1=="search"){
        str = "search";

    }else{
        str=req.params.str1+" "+req.params.str2+" "+req.params.str3;
    }
 
 
     return res.render('article', {
         Title: "scams",
         Str: str,
        
         
     });
    //  return res.send("articlepage")
    
 
 
 }
