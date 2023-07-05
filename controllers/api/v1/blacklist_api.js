const Links = require('../../../models/links');

module.exports.index = async function(req,res){


    let links = await Links.find({});

    return res.json(200,{
        message: "List of all reported website links ",
        allLinks : links
    });
}


module.exports.destroy = async function(req,res){
    try{


        let tmp = await Links.findById(req.params.id);
        let url = tmp.url;

        let link = await Links.findByIdAndRemove(req.params.id);
    

       

        return res.json(200,{
            message : "Reported link removed successfully",
            url : url
        });

    }catch(err){

        console.log("*************",err);

        return res.json(500,{

            message :"Internal server error"
        });

    }
}


