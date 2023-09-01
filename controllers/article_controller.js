module.exports.article= function(req, res) {
    console.log(req.params);

    let str="";

    if(req.params.str1=="search"){
        str = "search";

    }else{

        if(req.params.str1!='trending'){
            str = req.params.str1+" ";
        }
        str= str+req.params.str2+" "+req.params.str3;
    }
 
 
     return res.render('article', {
         Title: "scams",
         Str: str,
        
         
     });
    //  return res.send("articlepage")
    
 
 
 }
