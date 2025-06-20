import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  { to: "/facebook", icon: Facebook, label: "Facebook" },
  { to: "/twitter", icon: Twitter, label: "Twitter" },
  { to: "/linkedin", icon: Linkedin, label: "LinkedIn" },
  { to: "/instagram", icon: Instagram, label: "Instagram" },
];

function FooterSocialLinks() {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
      <div className="flex space-x-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link
              key={index}
              to={social.to}
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label={social.label}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FooterSocialLinks;
