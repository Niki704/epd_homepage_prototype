// Realistic mock data per Placeholder Data Policy (02-features.md).
// Names/photos/messages are NOT real — pending stakeholder-supplied content.

export interface CommissionerGeneralData {
  name: string;
  photo: string;
  message: string;
  telephone: string;
  fax: string;
  email: string;
}

export interface CommissionerData {
  name: string;
  title: string;
  photo: string;
  telephone: string;
  email: string;
}

export const commissionerGeneral: CommissionerGeneralData = {
  name: "Mrs. Chandrika Wijesuriya",
  photo: "/images/commissioners/commissioner-general.jpg",
  message:
    "It is my privilege to lead the Educational Publications Department in its mission to provide every Sri Lankan student with access to quality, affordable learning materials. We remain committed to accuracy, accessibility, and continuous improvement across all our publications.",
  telephone: "+94 11 269 4521",
  fax: "+94 11 269 4522",
  email: "commissioner.general@epd.gov.lk",
};

export const additionalCommissioners: CommissionerData[] = [
  {
    name: "Mr. Ranjith Perera",
    title: "Commissioner (Production & Distribution)",
    photo: "/images/commissioners/commissioner-1.jpg",
    telephone: "+94 11 269 4530",
    email: "commissioner.production@epd.gov.lk",
  },
  {
    name: "Mrs. Nirmala Fernando",
    title: "Commissioner (Curriculum Development)",
    photo: "/images/commissioners/commissioner-2.jpg",
    telephone: "+94 11 269 4535",
    email: "commissioner.curriculum@epd.gov.lk",
  },
];
