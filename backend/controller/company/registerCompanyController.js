const catchAsync = require("../../utils/catchAsync");
const appErrors = require("../../utils/appErrors");
const Company = require("../../model/RegisterCompany");
const Profile = require("../../model/profile");
const { uploadToS3 } = require("../../utils/s3upload");

const registerCompany = catchAsync(async (req, res, next) => {
    const {
        companyName,
        cin,
        panGst,
        email,
        phone,
        address,
        website,
        password,
        twitterUrl,
        facebookUrl,
        instagramUrl,
        githubUrl,
        linkedinUrl
    } = req.body;

    const existingCompany = await Company.findOne({ 
        $or: [
            { email },
            { cin },
            { panGst }
        ]
    });

    if (existingCompany) {
        return next(new appErrors("Company already exists", 400));
    }

    let logoUrl, documentUrls = [];
    if (req.files) {
        if (req.files.companyLogo) {
            logoUrl = await uploadToS3(req.files.companyLogo[0]);
        }
        if (req.files.documents) {
            documentUrls = await Promise.all(
                req.files.documents.map(file => uploadToS3(file))
            );
        }
    }

    // Create company
    const newCompany = await Company.create({
        companyName,
        cin,
        panGst,
        email,
        phone,
        address,
        website,
        password,
        companyLogo: logoUrl,
        documents: documentUrls,
        contactPerson: req.session.userId, // Assuming the logged-in user is the contact person
        socialMedia: {
            twitterUrl,
            facebookUrl,
            instagramUrl,
            githubUrl,
            linkedinUrl
        }
    });

    res.status(201).json({
        status: "success",
        message: "Company registered successfully",
        data: newCompany
    });
});

module.exports = registerCompany;
