
export interface AreaCode {
  code: string;
  location: string;
}

export interface PhoneNumber {
  number: string;
  location: string;
  price: string;
}

export interface CountryPhoneData {
  areaCodes: AreaCode[];
  sampleNumbers: PhoneNumber[];
}

export const COUNTRY_PHONE_DATA: Record<string, CountryPhoneData> = {
  US: {
    areaCodes: [
      { code: "212", location: "New York, NY" },
      { code: "213", location: "Los Angeles, CA" },
      { code: "312", location: "Chicago, IL" },
      { code: "415", location: "San Francisco, CA" },
      { code: "617", location: "Boston, MA" },
      { code: "305", location: "Miami, FL" },
      { code: "702", location: "Las Vegas, NV" },
    ],
    sampleNumbers: [
      { number: "+1 (212) 555-0123", location: "New York, NY", price: "$1.00/month" },
      { number: "+1 (213) 555-0234", location: "Los Angeles, CA", price: "$1.00/month" },
      { number: "+1 (312) 555-0345", location: "Chicago, IL", price: "$1.00/month" },
      { number: "+1 (415) 555-0456", location: "San Francisco, CA", price: "$1.00/month" },
      { number: "+1 (617) 555-0567", location: "Boston, MA", price: "$1.00/month" },
      { number: "+1 (305) 555-0678", location: "Miami, FL", price: "$1.00/month" },
      { number: "+1 (702) 555-0789", location: "Las Vegas, NV", price: "$1.00/month" },
    ]
  },
  CA: {
    areaCodes: [
      { code: "416", location: "Toronto, ON" },
      { code: "604", location: "Vancouver, BC" },
      { code: "514", location: "Montreal, QC" },
      { code: "403", location: "Calgary, AB" },
      { code: "613", location: "Ottawa, ON" },
    ],
    sampleNumbers: [
      { number: "+1 (416) 555-0123", location: "Toronto, ON", price: "$1.00/month" },
      { number: "+1 (604) 555-0234", location: "Vancouver, BC", price: "$1.00/month" },
      { number: "+1 (514) 555-0345", location: "Montreal, QC", price: "$1.00/month" },
      { number: "+1 (403) 555-0456", location: "Calgary, AB", price: "$1.00/month" },
      { number: "+1 (613) 555-0567", location: "Ottawa, ON", price: "$1.00/month" },
      { number: "+1 (416) 555-0678", location: "Toronto, ON", price: "$1.00/month" },
      { number: "+1 (604) 555-0789", location: "Vancouver, BC", price: "$1.00/month" },
    ]
  },
  GB: {
    areaCodes: [
      { code: "020", location: "London" },
      { code: "0121", location: "Birmingham" },
      { code: "0161", location: "Manchester" },
      { code: "0113", location: "Leeds" },
      { code: "0131", location: "Edinburgh" },
    ],
    sampleNumbers: [
      { number: "+44 20 7123 4567", location: "London, UK", price: "$1.00/month" },
      { number: "+44 121 234 5678", location: "Birmingham, UK", price: "$1.00/month" },
      { number: "+44 161 345 6789", location: "Manchester, UK", price: "$1.00/month" },
      { number: "+44 113 456 7890", location: "Leeds, UK", price: "$1.00/month" },
      { number: "+44 131 567 8901", location: "Edinburgh, UK", price: "$1.00/month" },
      { number: "+44 20 7234 5678", location: "London, UK", price: "$1.00/month" },
      { number: "+44 121 345 6789", location: "Birmingham, UK", price: "$1.00/month" },
    ]
  },
  AU: {
    areaCodes: [
      { code: "02", location: "Sydney, NSW" },
      { code: "03", location: "Melbourne, VIC" },
      { code: "07", location: "Brisbane, QLD" },
      { code: "08", location: "Perth, WA" },
      { code: "08", location: "Adelaide, SA" },
    ],
    sampleNumbers: [
      { number: "+61 2 8123 4567", location: "Sydney, NSW", price: "$1.00/month" },
      { number: "+61 3 9234 5678", location: "Melbourne, VIC", price: "$1.00/month" },
      { number: "+61 7 3345 6789", location: "Brisbane, QLD", price: "$1.00/month" },
      { number: "+61 8 6456 7890", location: "Perth, WA", price: "$1.00/month" },
      { number: "+61 8 8567 8901", location: "Adelaide, SA", price: "$1.00/month" },
      { number: "+61 2 8234 5678", location: "Sydney, NSW", price: "$1.00/month" },
      { number: "+61 3 9345 6789", location: "Melbourne, VIC", price: "$1.00/month" },
    ]
  },
  DE: {
    areaCodes: [
      { code: "030", location: "Berlin" },
      { code: "089", location: "Munich" },
      { code: "040", location: "Hamburg" },
      { code: "0221", location: "Cologne" },
      { code: "069", location: "Frankfurt" },
    ],
    sampleNumbers: [
      { number: "+49 30 1234 5678", location: "Berlin, Germany", price: "$1.00/month" },
      { number: "+49 89 2345 6789", location: "Munich, Germany", price: "$1.00/month" },
      { number: "+49 40 3456 7890", location: "Hamburg, Germany", price: "$1.00/month" },
      { number: "+49 221 4567 8901", location: "Cologne, Germany", price: "$1.00/month" },
      { number: "+49 69 5678 9012", location: "Frankfurt, Germany", price: "$1.00/month" },
      { number: "+49 30 2345 6789", location: "Berlin, Germany", price: "$1.00/month" },
      { number: "+49 89 3456 7890", location: "Munich, Germany", price: "$1.00/month" },
    ]
  },
  FR: {
    areaCodes: [
      { code: "01", location: "Paris" },
      { code: "04", location: "Lyon" },
      { code: "04", location: "Marseille" },
      { code: "05", location: "Toulouse" },
      { code: "02", location: "Nantes" },
    ],
    sampleNumbers: [
      { number: "+33 1 45 67 89 10", location: "Paris, France", price: "$1.00/month" },
      { number: "+33 4 78 12 34 56", location: "Lyon, France", price: "$1.00/month" },
      { number: "+33 4 91 23 45 67", location: "Marseille, France", price: "$1.00/month" },
      { number: "+33 5 61 34 56 78", location: "Toulouse, France", price: "$1.00/month" },
      { number: "+33 2 40 45 67 89", location: "Nantes, France", price: "$1.00/month" },
      { number: "+33 1 46 78 90 12", location: "Paris, France", price: "$1.00/month" },
      { number: "+33 4 79 23 45 67", location: "Lyon, France", price: "$1.00/month" },
    ]
  },
  JP: {
    areaCodes: [
      { code: "03", location: "Tokyo" },
      { code: "06", location: "Osaka" },
      { code: "052", location: "Nagoya" },
      { code: "011", location: "Sapporo" },
      { code: "092", location: "Fukuoka" },
    ],
    sampleNumbers: [
      { number: "+81 3 1234 5678", location: "Tokyo, Japan", price: "$1.00/month" },
      { number: "+81 6 2345 6789", location: "Osaka, Japan", price: "$1.00/month" },
      { number: "+81 52 345 6789", location: "Nagoya, Japan", price: "$1.00/month" },
      { number: "+81 11 456 7890", location: "Sapporo, Japan", price: "$1.00/month" },
      { number: "+81 92 567 8901", location: "Fukuoka, Japan", price: "$1.00/month" },
      { number: "+81 3 2345 6789", location: "Tokyo, Japan", price: "$1.00/month" },
      { number: "+81 6 3456 7890", location: "Osaka, Japan", price: "$1.00/month" },
    ]
  },
  SG: {
    areaCodes: [
      { code: "6", location: "Singapore" },
    ],
    sampleNumbers: [
      { number: "+65 6123 4567", location: "Singapore", price: "$1.00/month" },
      { number: "+65 6234 5678", location: "Singapore", price: "$1.00/month" },
      { number: "+65 6345 6789", location: "Singapore", price: "$1.00/month" },
      { number: "+65 6456 7890", location: "Singapore", price: "$1.00/month" },
      { number: "+65 6567 8901", location: "Singapore", price: "$1.00/month" },
      { number: "+65 6678 9012", location: "Singapore", price: "$1.00/month" },
      { number: "+65 6789 0123", location: "Singapore", price: "$1.00/month" },
    ]
  },
  NO: {
    areaCodes: [
      { code: "22", location: "Oslo" },
      { code: "55", location: "Bergen" },
      { code: "73", location: "Trondheim" },
      { code: "38", location: "Kristiansand" },
    ],
    sampleNumbers: [
      { number: "+47 22 12 34 56", location: "Oslo, Norway", price: "$1.00/month" },
      { number: "+47 55 23 45 67", location: "Bergen, Norway", price: "$1.00/month" },
      { number: "+47 73 34 56 78", location: "Trondheim, Norway", price: "$1.00/month" },
      { number: "+47 38 45 67 89", location: "Kristiansand, Norway", price: "$1.00/month" },
      { number: "+47 22 23 45 67", location: "Oslo, Norway", price: "$1.00/month" },
      { number: "+47 55 34 56 78", location: "Bergen, Norway", price: "$1.00/month" },
      { number: "+47 73 45 67 89", location: "Trondheim, Norway", price: "$1.00/month" },
    ]
  },
  SE: {
    areaCodes: [
      { code: "08", location: "Stockholm" },
      { code: "031", location: "Gothenburg" },
      { code: "040", location: "Malmö" },
      { code: "018", location: "Uppsala" },
    ],
    sampleNumbers: [
      { number: "+46 8 123 456 78", location: "Stockholm, Sweden", price: "$1.00/month" },
      { number: "+46 31 234 567 89", location: "Gothenburg, Sweden", price: "$1.00/month" },
      { number: "+46 40 345 678 90", location: "Malmö, Sweden", price: "$1.00/month" },
      { number: "+46 18 456 789 01", location: "Uppsala, Sweden", price: "$1.00/month" },
      { number: "+46 8 234 567 89", location: "Stockholm, Sweden", price: "$1.00/month" },
      { number: "+46 31 345 678 90", location: "Gothenburg, Sweden", price: "$1.00/month" },
      { number: "+46 40 456 789 01", location: "Malmö, Sweden", price: "$1.00/month" },
    ]
  },
  DK: {
    areaCodes: [
      { code: "3", location: "Copenhagen" },
      { code: "8", location: "Aarhus" },
      { code: "6", location: "Odense" },
      { code: "9", location: "Aalborg" },
    ],
    sampleNumbers: [
      { number: "+45 33 12 34 56", location: "Copenhagen, Denmark", price: "$1.00/month" },
      { number: "+45 86 23 45 67", location: "Aarhus, Denmark", price: "$1.00/month" },
      { number: "+45 66 34 56 78", location: "Odense, Denmark", price: "$1.00/month" },
      { number: "+45 98 45 67 89", location: "Aalborg, Denmark", price: "$1.00/month" },
      { number: "+45 33 23 45 67", location: "Copenhagen, Denmark", price: "$1.00/month" },
      { number: "+45 86 34 56 78", location: "Aarhus, Denmark", price: "$1.00/month" },
      { number: "+45 66 45 67 89", location: "Odense, Denmark", price: "$1.00/month" },
    ]
  },
  NL: {
    areaCodes: [
      { code: "020", location: "Amsterdam" },
      { code: "010", location: "Rotterdam" },
      { code: "070", location: "The Hague" },
      { code: "030", location: "Utrecht" },
    ],
    sampleNumbers: [
      { number: "+31 20 123 4567", location: "Amsterdam, Netherlands", price: "$1.00/month" },
      { number: "+31 10 234 5678", location: "Rotterdam, Netherlands", price: "$1.00/month" },
      { number: "+31 70 345 6789", location: "The Hague, Netherlands", price: "$1.00/month" },
      { number: "+31 30 456 7890", location: "Utrecht, Netherlands", price: "$1.00/month" },
      { number: "+31 20 234 5678", location: "Amsterdam, Netherlands", price: "$1.00/month" },
      { number: "+31 10 345 6789", location: "Rotterdam, Netherlands", price: "$1.00/month" },
      { number: "+31 70 456 7890", location: "The Hague, Netherlands", price: "$1.00/month" },
    ]
  },
  IT: {
    areaCodes: [
      { code: "06", location: "Rome" },
      { code: "02", location: "Milan" },
      { code: "081", location: "Naples" },
      { code: "055", location: "Florence" },
      { code: "011", location: "Turin" },
    ],
    sampleNumbers: [
      { number: "+39 06 1234 5678", location: "Rome, Italy", price: "$1.00/month" },
      { number: "+39 02 2345 6789", location: "Milan, Italy", price: "$1.00/month" },
      { number: "+39 081 345 6789", location: "Naples, Italy", price: "$1.00/month" },
      { number: "+39 055 456 7890", location: "Florence, Italy", price: "$1.00/month" },
      { number: "+39 011 567 8901", location: "Turin, Italy", price: "$1.00/month" },
      { number: "+39 06 2345 6789", location: "Rome, Italy", price: "$1.00/month" },
      { number: "+39 02 3456 7890", location: "Milan, Italy", price: "$1.00/month" },
    ]
  },
  ES: {
    areaCodes: [
      { code: "91", location: "Madrid" },
      { code: "93", location: "Barcelona" },
      { code: "95", location: "Seville" },
      { code: "96", location: "Valencia" },
      { code: "94", location: "Bilbao" },
    ],
    sampleNumbers: [
      { number: "+34 91 123 4567", location: "Madrid, Spain", price: "$1.00/month" },
      { number: "+34 93 234 5678", location: "Barcelona, Spain", price: "$1.00/month" },
      { number: "+34 95 345 6789", location: "Seville, Spain", price: "$1.00/month" },
      { number: "+34 96 456 7890", location: "Valencia, Spain", price: "$1.00/month" },
      { number: "+34 94 567 8901", location: "Bilbao, Spain", price: "$1.00/month" },
      { number: "+34 91 234 5678", location: "Madrid, Spain", price: "$1.00/month" },
      { number: "+34 93 345 6789", location: "Barcelona, Spain", price: "$1.00/month" },
    ]
  },
  TR: {
    areaCodes: [
      { code: "212", location: "Istanbul (European)" },
      { code: "216", location: "Istanbul (Asian)" },
      { code: "312", location: "Ankara" },
      { code: "232", location: "Izmir" },
      { code: "224", location: "Bursa" },
    ],
    sampleNumbers: [
      { number: "+90 212 123 4567", location: "Istanbul, Turkey", price: "$1.00/month" },
      { number: "+90 216 234 5678", location: "Istanbul, Turkey", price: "$1.00/month" },
      { number: "+90 312 345 6789", location: "Ankara, Turkey", price: "$1.00/month" },
      { number: "+90 232 456 7890", location: "Izmir, Turkey", price: "$1.00/month" },
      { number: "+90 224 567 8901", location: "Bursa, Turkey", price: "$1.00/month" },
      { number: "+90 212 234 5678", location: "Istanbul, Turkey", price: "$1.00/month" },
      { number: "+90 216 345 6789", location: "Istanbul, Turkey", price: "$1.00/month" },
    ]
  }
};
