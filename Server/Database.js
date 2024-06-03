const mongoose=require('mongoose');

exports.MongoDb=async()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log('MongoDB Connected')
       
} catch(e){
    console.log('Error:',e)
}
}
