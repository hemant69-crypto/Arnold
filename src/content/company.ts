// Profile/company LinkedIn: 7 October 2026. Logo and business-card details:
// supplied directly by the user for website use, 11 October 2026.
export const company = {
  name: "Arnold Consulting",
  legalName: "Arnold Consulting Private Limited",
  tagline: "Partnering to Succeed",
  description:
    "Business consulting connected to talent acquisition and executive search, workforce solutions, background verification and HR advisory.",
  location: "India",
  clientContext: "Serving clients in the USA",
  linkedin: "https://in.linkedin.com/company/arnold-consulting-pvt-ltd",
  email: "cyril.nazareth@arnoldconsultants.com",
  phone: "+91 90084 66881",
  phoneHref: "tel:+919008466881",
  contactPerson: {
    name: "Cyril Nandan Nazareth",
    role: "Managing Director",
  },
  address: {
    lines: [
      "No. 10, 1st Floor, Synerge Workspace",
      "14th Main, Sector 5, HSR Layout",
      "Bangalore – 560 102, India",
    ],
    streetAddress:
      "No. 10, 1st Floor, Synerge Workspace, 14th Main, Sector 5, HSR Layout",
    addressLocality: "Bangalore",
    postalCode: "560102",
    addressCountry: "IN",
  },
  logo: "/media/brand/arnold-logo.svg",
} as const;

// Search the supplied street address; no unverified coordinates or place ID.
export const companyMapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${company.address.streetAddress}, ${company.address.addressLocality} ${company.address.postalCode}, India`,
  );
