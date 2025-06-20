const catchAsync = require("../../utils/catchAsync");
const appErrors = require("../../utils/appErrors");
const emailFetcher = require("../../utils/emailUtilities").emailFetcherCompany;
const applications = require('../../model/Applications');
const profiles = require('../../model/profile');
const JobPost = require('../../model/Job');
const companies = require('../../model/RegisterCompany');
exports.addJobPost=catchAsync(async function(req,res,next){
    const userId=req.session.userId;
    const {companyId}=req.query;
    const company=companyId?await companies.findById(companyId):await companies.findOne({contactPerson:userId});
    if(!company)
        return next(new appErrors(`no company registered found with data company:${companyId},profile:${userId}`,400))
    const { position, location, requirements, jobDescription, expectedSalary, type,linkedin,twitter,instagram } = req.body;
const tip_regex = /#\w+/g;
const tooltips = jobDescription.match(tip_regex) || []; 

const jobPost = await JobPost.create({
  companyId: company._id,
  profileId: req.profile._id,
  position,
  location,
  requirements,
  jobDescription,
  expectedSalary,
  type,
  companyName: company.companyName, 
  tooltips, 
  twitter,linkedin,instagram,
});
req.body.to=await emailFetcher(company._id,req.profile._id);
req.body.from = process.env.EMAIL_ID;
req.body.subject = `New Job Post from ${jobPost.companyName},Role ${jobPost.position}`;
req.response=`job posted successfully`
req.body.url="/jobpost"
next()

})
exports.searchJobPost=catchAsync(async function(req,res,next){
    const {companyId,profileId}=req.query
    let jobposts=[];
    jobposts=await JobPost.find({companyId,profileId})
    res.status(200).json({
        success: true,
        count: jobposts.length,
        data: jobposts,
    });
    
})