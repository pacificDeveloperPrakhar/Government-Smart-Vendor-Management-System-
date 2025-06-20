const Profiles = require('../model/profile');
const Company = require('../model/RegisterCompany');

const emailFetcher=async function(profileId) {
    const profiles = await Profiles.find({ role: { $in: ['admin'] } });
    const profile2=await Profiles.findById(profileId);
    console.log(profile2)
    const emails=[...profiles,profile2].map((profile)=>{
        return profile.email;
        })
        const uniqueEmails = [...new Set(emails)];
        return uniqueEmails.join(' ');
    
}

const emailFetcherCompany=async function(companyId,contactId) {
    const company = await Company.findById(companyId);
    const contact=await Profiles.findById(contactId);
    const admins=await Profiles.find({role:{$in:['admin']}})
    const emails=[company,contact,...admins].map((profile)=>{
        return profile.email;
        })
    const uniqueEmails = [...new Set(emails)];
        return uniqueEmails.join(' ');
    ;
}
exports.emailFetcher=emailFetcher;
exports.emailFetcherCompany=emailFetcherCompany;