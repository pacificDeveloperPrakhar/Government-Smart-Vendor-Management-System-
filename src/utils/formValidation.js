export const validateCompanyForm = (data) => {
  const errors = {};

  // Company Name validation
  if (!data.companyName.trim()) {
    errors.companyName = 'Company name is required';
  }

  // Job Position validation
  if (!data.jobPosition.trim()) {
    errors.jobPosition = 'Job position is required';
  }

  // Contact Person validation
  if (!data.contactPerson.trim()) {
    errors.contactPerson = 'Contact person is required';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Address validation
  if (!data.address.trim()) {
    errors.address = 'Company address is required';
  }

  // Website validation (optional field)
  if (data.website.trim()) {
    const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (!urlRegex.test(data.website)) {
      errors.website = 'Please enter a valid website URL';
    }
  }

  return errors;
};