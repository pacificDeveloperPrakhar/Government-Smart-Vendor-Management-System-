import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", name: "Home" },
  { to: "/courses", name: "Courses" },
  { to: "/vacancy", name: "Vacancy" },
  { to: "/sales", name: "Buy Tools" },
  { to: "/contact", name: "Contact Us" },
  { to: "/about", name: "About Us" },
];

function FooterNavLinks() {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4">Quick Links</h4>
      <ul className="space-y-2">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterNavLinks;
