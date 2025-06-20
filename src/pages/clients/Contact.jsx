import { ContactInfo, ContactForm, SocialLinks } from "../../components/index";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ContactInfo />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
              <SocialLinks />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
