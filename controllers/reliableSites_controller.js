module.exports.reliableSites = function(req,res){

    console.log('reliable sites controller loaded');

    console.log(req.params.index);





    return res.render('reliableSites.ejs',{
        Title : 'Reliable Sites',
        PageIndex : req.params.index
    });
}