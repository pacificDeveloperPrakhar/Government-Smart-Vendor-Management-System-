module.exports= function(err,req,res,next){
  console.log("erro has been ecnountered")
  let status=err["status code"]||500;
  status=(err.isOperational&&500)||status
  console.log(err)
  res.status(err['status code']).json({...err})

}