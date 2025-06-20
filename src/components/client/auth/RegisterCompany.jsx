import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from "../../input/input.jsx";
import { Label } from "../../label/label.jsx";
import { cn } from "../../../utils/clsx_util";
import { FaBuilding, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaFacebook, FaUpload, FaInstagram, FaGithub, FaGlobe } from 'react-icons/fa';
import { addCompanyAction } from '../../../slices/companySlice.jsx';
const RegisterCompany = () => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        companyName: '',
        cin: '',
        panGst: '', 
        email: '',
        phone: '',
        address: '',
        website: '',
        socialMedia: {
            twitterUrl: '',
            linkedinUrl: '',
            facebookUrl: '',
            instagramUrl: '',
            githubUrl: ''
        },
        companyLogo: null, 
        documents: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name.includes('Url')) {
            // Handle social media URLs
            setFormData(prev => ({
                ...prev,
                socialMedia: {
                    ...prev.socialMedia,
                    [name]: value
                }
            }));
        } else {
            // Handle other fields
            setFormData(prev => ({
                ...prev,
                [name]: files ? files[0] : value
            }));
        }
    };

    const validateStep1 = () => {
        let errors = {};

        if (!formData.companyName.trim()) {
            errors.companyName = "Company name is required";
        }
        if (!formData.cin.trim()) {
            errors.cin = "CIN is required";
        }
        if (!formData.panGst.trim()) {
            errors.panGst = "GST/PAN is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        }
        if (!formData.address.trim()) {
            errors.address = "Address is required";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
        dispatch(addCompanyAction(formData));
    };

    return (
        <div className="container mx-auto py-10">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Register Company</h1>
                    <p className="text-gray-500 dark:text-gray-400">Fill in the details to register your company</p>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <LabelInputContainer>
                                <Label htmlFor="companyName" className="text-sm font-medium">
                                    <FaBuilding className="inline mr-2 h-4 w-4" />Company Name
                                </Label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    placeholder="Enter company name"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="cin" className="text-sm font-medium">
                                    <FaIdCard className="inline mr-2 h-4 w-4" />CIN Number
                                </Label>
                                <Input
                                    id="cin"
                                    name="cin"
                                    placeholder="Enter CIN Number"
                                    type="text"
                                    value={formData.cin}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.cin && <p className="text-sm text-red-500">{errors.cin}</p>}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="panGst" className="text-sm font-medium">
                                    <FaIdCard className="inline mr-2 h-4 w-4" />GST/PAN
                                </Label>
                                <Input
                                    id="panGst"
                                    name="panGst"
                                    placeholder="GST/PAN"
                                    type="text"
                                    value={formData.panGst}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.panGst && <p className="text-sm text-red-500">{errors.panGst}</p>}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="email" className="text-sm font-medium">
                                    <FaEnvelope className="inline mr-2 h-4 w-4" />Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="phone" className="text-sm font-medium">
                                    <FaPhone className="inline mr-2 h-4 w-4" />Phone
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone"
                                    type="text"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="address" className="text-sm font-medium">
                                    <FaMapMarkerAlt className="inline mr-2 h-4 w-4" />Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="Address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="website" className="text-sm font-medium">
                                    <FaGlobe className="inline mr-2 h-4 w-4" />Website
                                </Label>
                                <Input
                                    id="website"
                                    name="website"
                                    placeholder="Company Website URL (optional)"
                                    type="url"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <button 
                                type="button" 
                                onClick={nextStep} 
                                className="w-full h-10 px-4 py-2 bg-[#030711] text-white rounded-md hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <LabelInputContainer>
                                <Label htmlFor="twitterUrl" className="text-sm font-medium">
                                    <FaTwitter className="inline mr-2 h-4 w-4" />Twitter URL
                                </Label>
                                <Input
                                    id="twitterUrl"
                                    name="twitterUrl"
                                    placeholder="Enter Twitter URL"
                                    type="url"
                                    value={formData.socialMedia.twitterUrl}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="linkedinUrl" className="text-sm font-medium">
                                    <FaLinkedin className="inline mr-2 h-4 w-4" />LinkedIn URL
                                </Label>
                                <Input
                                    id="linkedinUrl"
                                    name="linkedinUrl"
                                    placeholder="Enter LinkedIn URL"
                                    type="url"
                                    value={formData.socialMedia.linkedinUrl}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="facebookUrl" className="text-sm font-medium">
                                    <FaFacebook className="inline mr-2 h-4 w-4" />Facebook URL
                                </Label>
                                <Input
                                    id="facebookUrl"
                                    name="facebookUrl"
                                    placeholder="Enter Facebook URL"
                                    type="url"
                                    value={formData.socialMedia.facebookUrl}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="instagramUrl" className="text-sm font-medium">
                                    <FaInstagram className="inline mr-2 h-4 w-4" />Instagram URL
                                </Label>
                                <Input
                                    id="instagramUrl"
                                    name="instagramUrl"
                                    placeholder="Enter Instagram URL"
                                    type="url"
                                    value={formData.socialMedia.instagramUrl}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="githubUrl" className="text-sm font-medium">
                                    <FaGithub className="inline mr-2 h-4 w-4" />GitHub URL
                                </Label>
                                <Input
                                    id="githubUrl"
                                    name="githubUrl"
                                    placeholder="Enter GitHub URL"
                                    type="url"
                                    value={formData.socialMedia.githubUrl}
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="companyLogo" className="text-sm font-medium">
                                    <FaUpload className="inline mr-2 h-4 w-4" />Upload Logo
                                </Label>
                                <Input
                                    id="companyLogo"
                                    name="companyLogo"
                                    type="file"
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="documents" className="text-sm font-medium">
                                    <FaUpload className="inline mr-2 h-4 w-4" />Upload Documents
                                </Label>
                                <Input
                                    id="documents"
                                    name="documents"
                                    type="file"
                                    onChange={handleChange}
                                    className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </LabelInputContainer>

                            <div className="flex gap-4">
                                <button 
                                    type="button" 
                                    onClick={prevStep}
                                    className="flex-1 h-10 px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                                >
                                    Previous
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 h-10 px-4 py-2 bg-[#030711] text-white rounded-md hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

const LabelInputContainer = ({ children, className }) => (
    <div className={cn("space-y-2", className)}>
        {children}
    </div>
);

export default RegisterCompany;