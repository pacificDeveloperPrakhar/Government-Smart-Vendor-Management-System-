const catchAsync = require("../../utils/catchAsync");
const Company = require("../../model/RegisterCompany");

const getCompanies = catchAsync(async (req, res) => {
    const { search, verified, limit = 10, page = 1 } = req.query;
    
    // Build query
    let query = {};
    
    if (search) {
        query.$or = [
            { companyName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }
    
    if (verified !== undefined) {
        query.isVerified = verified === 'true';
    }

    // Execute query with pagination
    const companies = await Company.find(query)
        .populate('contactPerson', 'name email phone')
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const total = await Company.countDocuments(query);

    res.status(200).json({
        status: "success",
        data: companies,
        pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        }
    });
});

module.exports = getCompanies;
