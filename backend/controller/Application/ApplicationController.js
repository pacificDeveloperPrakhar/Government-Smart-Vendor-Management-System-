const catchAsync = require("../../utils/catchAsync");
const appErrors = require("../../utils/appErrors");
const applications = require('../../model/Applications');
const profiles = require('../../model/profile');
const jobpostings = require('../../model/Jobpostings');
const companies = require('../../model/RegisterCompany');

const registerApplication = catchAsync(async function(req, res, next) {
    const { experiences, cover_letter, resume, role } = req.body;
    const { companyId, jobpostId } = req.query; // Corrected this line
    const profileId = req.session.userId;

    // Find company and job posting
    const company = await companies.findById(companyId);
    const jobposting = await jobpostings.findById(jobpostId);

    // Handle errors if company or job posting isn't found
    if (!company) {
        return next(new appErrors("Company not found", 404));
    }

    if (!jobposting) {
        return next(new appErrors("Job posting not found", 404));
    }


    const newApplication = new applications({
        experiences,
        cover_letter,
        resume,
        role,
        companyId,
        jobpostId,
        profileId,
    });

    await newApplication.save();
    res.status(201).json({
        status: "success",
        message: "Application registered successfully",
        data: newApplication
    });
});

module.exports = registerApplication;
