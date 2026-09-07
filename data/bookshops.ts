// Realistic mock data per Placeholder Data Policy (02-features.md).
// Columns confirmed in 02-features.md §9: Bookshop, Address, Contact, Email,
// Google Map link, Availability.

export interface Bookshop {
  name: string;
  address: string;
  contact: string;
  email: string;
  mapUrl: string;
  availability: "In Stock" | "Limited Stock" | "Out of Stock";
}

export const bookshops: Bookshop[] = [
  {
    name: "EPD Book Centre — Colombo",
    address: "No. 285, Nawala Road, Nugegoda",
    contact: "+94 11 285 1234",
    email: "colombo.shop@epd.gov.lk",
    mapUrl: "https://maps.google.com/?q=Nawala+Road+Nugegoda",
    availability: "In Stock",
  },
  {
    name: "EPD Book Centre — Kandy",
    address: "No. 45, Peradeniya Road, Kandy",
    contact: "+94 81 222 3456",
    email: "kandy.shop@epd.gov.lk",
    mapUrl: "https://maps.google.com/?q=Peradeniya+Road+Kandy",
    availability: "In Stock",
  },
  {
    name: "EPD Book Centre — Galle",
    address: "No. 12, Wackwella Road, Galle",
    contact: "+94 91 223 7890",
    email: "galle.shop@epd.gov.lk",
    mapUrl: "https://maps.google.com/?q=Wackwella+Road+Galle",
    availability: "Limited Stock",
  },
  {
    name: "EPD Book Centre — Jaffna",
    address: "No. 78, Hospital Road, Jaffna",
    contact: "+94 21 222 4567",
    email: "jaffna.shop@epd.gov.lk",
    mapUrl: "https://maps.google.com/?q=Hospital+Road+Jaffna",
    availability: "In Stock",
  },
  {
    name: "EPD Book Centre — Anuradhapura",
    address: "No. 33, Maithripala Senanayake Mawatha, Anuradhapura",
    contact: "+94 25 222 6543",
    email: "anuradhapura.shop@epd.gov.lk",
    mapUrl: "https://maps.google.com/?q=Anuradhapura",
    availability: "Out of Stock",
  },
];
