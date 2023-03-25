const enquirySchema = require('../models/enquiryModelSchema')

const enquiry = async (req,res) => {
    try {
        const Data = await new enquirySchema(req.body)
        const info = Data.save();
        res.status(200).json({
            success : "success",
            message :"your enquiry will be saved"
        });
    }catch(err){
        res.status(400).json({
            success : "failure",
            error : err.message
        })
    }
}

module.exports = {
    enquiry
}