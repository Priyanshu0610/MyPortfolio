import csv

ngo_data = [
    {
        "NGO Name": "Pratham Education Foundation",
        "Sector": "Education",
        "Year of Establishment": 1995,
        "Founder(s)": "Dr. Madhav Chavan, Farida Lambay",
        "Mission & Vision": "Mission: Every Child in School and Learning Well. Vision: To make schools and communities future-ready.",
        "Key Programs/Projects": "Early Years, Elementary Education (TaRL), ASER, Second Chance Program, Youth & Skilling.",
        "Area of Operation": "Over 26 states in India",
        "Official Website & Social Media Links": "Website: pratham.org",
        "Impact Statistics": "Reaches millions of children, youth, and women annually",
        "Contact Information": "2, 4th Floor, Yashwantrao Chavan Pratishthan, Mumbai",
        "Funding Sources": "Individual donors, corporate partnerships, international chapters"
    },
    {
        "NGO Name": "Akshaya Patra Foundation",
        "Sector": "Education/Hunger",
        "Year of Establishment": 2000,
        "Founder(s)": "Sri Madhu Pandit Dasa",
        "Mission & Vision": "Mission: To eliminate classroom hunger. Vision: No child in India shall be deprived of education because of hunger.",
        "Key Programs/Projects": "Mid-Day Meal Programme (PM POSHAN)",
        "Area of Operation": "Multiple states and UTs in India",
        "Official Website & Social Media Links": "Website: akshayapatra.org",
        "Impact Statistics": "Serves over 2 million children daily; billions of cumulative meals served",
        "Contact Information": "infodesk@akshayapatra.org, +91 80 3014 3400 (Bengaluru HQ)",
        "Funding Sources": "Public-Private Partnership (PPP), CSR, individual donations, government subsidies"
    },
    {
        "NGO Name": "Goonj",
        "Sector": "Community Development",
        "Year of Establishment": 1999,
        "Founder(s)": "Anshu Gupta, Meenakshi Gupta",
        "Mission & Vision": "Mission: Bridge gap between urban surplus and rural needs. Vision: Create equitable relationship between city and village.",
        "Key Programs/Projects": "Dignity for Work, Rahat (Disaster Relief), Not Just a Piece of Cloth, School to School",
        "Area of Operation": "23 states in India",
        "Official Website & Social Media Links": "Website: goonj.org",
        "Impact Statistics": "Transforms millions of kgs of urban surplus into rural development resources",
        "Contact Information": "mail@goonj.org, 011-41401216 (New Delhi HQ)",
        "Funding Sources": "Individual donations, corporate partnerships, social business models"
    },
    {
        "NGO Name": "Smile Foundation",
        "Sector": "Education/Healthcare/Women Empowerment",
        "Year of Establishment": 2002,
        "Founder(s)": "Santanu Mishra",
        "Mission & Vision": "Mission: Empower underprivileged children, youth, and women. Vision: Civic Driven Change.",
        "Key Programs/Projects": "Mission Education, Smile on Wheels, Swabhiman (Women Empowerment)",
        "Area of Operation": "25-27 states in India",
        "Official Website & Social Media Links": "Website: smilefoundationindia.org",
        "Impact Statistics": "Impacted over 2 million people annually",
        "Contact Information": "161 B/4, Gulmohar House, Yusuf Sarai, New Delhi",
        "Funding Sources": "Corporate partnerships, individual support, volunteer initiatives"
    },
    {
        "NGO Name": "Teach For India",
        "Sector": "Education",
        "Year of Establishment": 2008,
        "Founder(s)": "Shaheen Mistri",
        "Mission & Vision": "Mission: End educational inequity. Vision: One day, all children will attain an excellent education.",
        "Key Programs/Projects": "TFI Fellowship, Alumni Movement, Firki, TFIx",
        "Area of Operation": "Mumbai, Pune, Delhi, Chennai, Hyderabad, Ahmedabad, Bengaluru, Kolkata",
        "Official Website & Social Media Links": "Website: teachforindia.org",
        "Impact Statistics": "Thousands of Fellows; Alumni founded 150+ orgs",
        "Contact Information": "Godrej One, Vikhroli (East), Mumbai",
        "Funding Sources": "Donations, corporate partnerships, grants"
    },
    {
        "NGO Name": "CRY (Child Rights and You)",
        "Sector": "Child Rights",
        "Year of Establishment": 1979,
        "Founder(s)": "Rippan Kapur",
        "Mission & Vision": "Mission: Enable children to realize full potential. Vision: Build a society with dignity, justice, and equality.",
        "Key Programs/Projects": "Right to Development, Right to Survival, Right to Protection, Right to Participation",
        "Area of Operation": "Across various states in India",
        "Official Website & Social Media Links": "Website: cry.org",
        "Impact Statistics": "Impacted over 4.7 million children over 4 decades",
        "Contact Information": "writetous@crymail.org, +91 9115 9115 00 (Mumbai HQ)",
        "Funding Sources": "Individual and corporate (CSR) contributions. No direct government funding."
    },
    {
        "NGO Name": "Wildlife SOS",
        "Sector": "Animal Welfare/Conservation",
        "Year of Establishment": 1995,
        "Founder(s)": "Kartick Satyanarayan, Geeta Seshamani",
        "Mission & Vision": "Mission: Protect and conserve India's natural heritage. Vision: Human-wildlife coexistence.",
        "Key Programs/Projects": "Species Conservation, Community Empowerment (Kalandar), Conflict Mitigation",
        "Area of Operation": "12 rescue centers across India",
        "Official Website & Social Media Links": "Website: wildlifesos.org",
        "Impact Statistics": "Ended 'dancing bear' practice in India; operates India's first elephant hospital",
        "Contact Information": "press@wildlifesos.org (New Delhi HQ)",
        "Funding Sources": "Individual donations, CSR, grants"
    },
    {
        "NGO Name": "HelpAge India",
        "Sector": "Elderly Care",
        "Year of Establishment": 1978,
        "Founder(s)": "Samson Daniel, Cecil Jackson Cole",
        "Mission & Vision": "Mission: Improve quality of life for disadvantaged older persons. Vision: Society for active, dignified life.",
        "Key Programs/Projects": "Mobile Medical Units (MMUs), Elder-Self-Help-Groups, AgeCare, National Elder Helpline",
        "Area of Operation": "Across India",
        "Official Website & Social Media Links": "Website: helpageindia.org",
        "Impact Statistics": "Serves over 2 million senior citizens annually",
        "Contact Information": "headoffice@helpageindia.org, 1800-180-1253",
        "Funding Sources": "Individual donations, CSR, grants"
    },
    {
        "NGO Name": "Project Nanhi Kali",
        "Sector": "Girl Child Education",
        "Year of Establishment": 1996,
        "Founder(s)": "Anand Mahindra",
        "Mission & Vision": "Mission: Empower underprivileged girls by supporting 10 years of schooling. Vision: Ensure girls reach full potential.",
        "Key Programs/Projects": "Academic Support Centres, Material Support (uniforms, bags), 21st-century skills training",
        "Area of Operation": "Multiple states and districts in India",
        "Official Website & Social Media Links": "Website: nanhikali.org",
        "Impact Statistics": "Supported over 940,000 girls to date",
        "Contact Information": "K.C. Mahindra Education Trust, Mumbai",
        "Funding Sources": "Individual and corporate sponsorships"
    },
    {
        "NGO Name": "Snehalaya",
        "Sector": "Women & Child Welfare",
        "Year of Establishment": 1989,
        "Founder(s)": "Dr. Girish Kulkarni",
        "Mission & Vision": "Mission: Rescue, rights, and rehabilitative services. Vision: Life free from inequality and discrimination.",
        "Key Programs/Projects": "Healthcare & Rehab, Snehankur Adoption Centre, Women's Helplines, Himmatgram organic farm",
        "Area of Operation": "Ahmednagar district, Maharashtra",
        "Official Website & Social Media Links": "Website: snehalaya.org",
        "Impact Statistics": "Supports approx 15,000–17,000 beneficiaries annually",
        "Contact Information": "info@snehalaya.org, +91 0241 2778353 (Ahmednagar)",
        "Funding Sources": "Government agencies, CSR, private donations"
    }
]

headers = ngo_data[0].keys()

with open('NGO_Research_Data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(ngo_data)

print("Successfully generated NGO_Research_Data.csv")
