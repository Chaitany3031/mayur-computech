import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'mscit',
    slug: 'mscit-course',
    title: 'MS-CIT Course',
    category: 'beginner',
    duration: '3 Months',
    level: 'Beginner',
    tagline: 'Govt. Valid Computer Literacy Certification with AI Productivity Tools',
    description: 'Maharashtra State Certificate in Information Technology (MS-CIT) is the gold-standard IT literacy course certified by MKCL. Essential for government jobs, banking, and professional office careers.',
    badge: 'Govt. Valid · Center: 78210482',
    popular: true,
    features: [
      'Govt. Recognized Certification (Center: 78210482)',
      'MS-Office 2021 Suite with AI Tools',
      '1000+ Govt. Exam Mock MCQs Practice',
      'Daily 1-on-1 Hands-on Lab Time'
    ],
    careerProspects: ['Govt. Job Eligibility (MPSC/Police Bharti)', 'Office Executive', 'Data Entry Specialist', 'Administrative Assistant'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Computer Fundamentals & Windows 11',
        topics: ['Hardware Components & Storage', 'Operating System Navigation', 'File & Folder Management', 'Troubleshooting & Security Basics']
      },
      {
        moduleNumber: 2,
        title: 'MS Word 2021 with AI Tools',
        topics: ['Document Design & Typography', 'Tables, Templates & Mail Merge', 'AI Writing Assistance & Summarization', 'Exporting & Printing Standards']
      },
      {
        moduleNumber: 3,
        title: 'MS Excel 2021 & Data Analysis',
        topics: ['Formulas: SUM, AVERAGE, IF, COUNTIF', 'Charts & Visual Reports', 'Data Sorting & Conditional Formatting', 'Basic Pivot Tables']
      },
      {
        moduleNumber: 4,
        title: 'MS PowerPoint 2021 & Presentation Design',
        topics: ['Slide Transitions & Animations', 'Professional Corporate Decks', 'SmartArt & Visual Infographics', 'Presenter View & Delivery Techniques']
      },
      {
        moduleNumber: 5,
        title: 'Internet, Cyber Security & Government Portals',
        topics: ['DigiLocker, Aadhaar & Online Services', 'Cyber Hygiene & Scam Detection', 'Cloud Storage (Google Drive/OneDrive)', 'Mock Final Online Exam Practice']
      }
    ]
  },
  {
    id: 'msoffice',
    slug: 'ms-office-suite',
    title: 'MS Office 2021 Suite',
    category: 'beginner',
    duration: '3–4 Months',
    level: 'Beginner to Intermediate',
    tagline: 'Complete Office Productivity with Modern AI Capabilities',
    description: 'Master industry-standard corporate documentation, financial spreadsheets, email management, and presentation decks used by fortune 500 companies.',
    badge: 'Industry Standard',
    features: [
      'Deep Dive: Word, Excel, PowerPoint, Outlook',
      'AI Prompting for Office Productivity',
      'Corporate Letter & Resume Formatting',
      'Real-world Office Case Studies'
    ],
    careerProspects: ['Corporate Office Assistant', 'Back-Office Executive', 'Virtual Assistant', 'Documentation Specialist'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Advanced Microsoft Word',
        topics: ['Document Structuring & Styles', 'Multi-level Outlining & Indexing', 'Collaborative Track Changes & Comments', 'Corporate Contract Formatting']
      },
      {
        moduleNumber: 2,
        title: 'Business Spreadsheet Mastery',
        topics: ['Formulas & Mathematical Functions', 'Data Validation & Protection', 'Interactive Chart Creation', 'Financial Summary Reports']
      },
      {
        moduleNumber: 3,
        title: 'Executive Presentations (PowerPoint)',
        topics: ['Master Slides & Custom Layouts', 'Dynamic Data Linking from Excel', 'Multimedia Integration', 'Public Pitch Deck Structuring']
      },
      {
        moduleNumber: 4,
        title: 'Microsoft Outlook & Workflows',
        topics: ['Email Management & Rules', 'Calendar Scheduling & Meeting Invites', 'Contacts & Distribution Lists', 'Productivity AI Integrations']
      }
    ]
  },
  {
    id: 'adv-excel',
    slug: 'advanced-excel',
    title: 'Advanced Excel & Business Analytics',
    category: 'business',
    duration: '3–4 Months',
    level: 'Intermediate to Advanced',
    tagline: 'XLOOKUP, Dynamic Dashboards, Data Cleansing & Automation',
    description: 'Transform raw data into executive decision dashboards. Covers modern functions like XLOOKUP, INDEX-MATCH, nested formulas, Pivot Tables, and automated macros.',
    badge: 'High Demand',
    popular: true,
    features: [
      'XLOOKUP, INDEX/MATCH, Dynamic Arrays',
      'Interactive KPI Dashboards with Slicers',
      'Data Cleaning, Text Functions & Power Query',
      '260+ Practical MCQs & Real Dataset Projects'
    ],
    careerProspects: ['MIS Executive', 'Business Analyst Assistant', 'Financial Data Operator', 'Operations Analyst'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Lookup & Reference Functions',
        topics: ['VLOOKUP & HLOOKUP Mastery', 'Modern XLOOKUP (Exact & Approximate)', 'INDEX & MATCH Duo', 'INDIRECT, OFFSET & CHOOSE']
      },
      {
        moduleNumber: 2,
        title: 'Logical, Math & Text Formulas',
        topics: ['Nested IF, AND, OR, IFS', 'SUMIFS, COUNTIFS, AVERAGEIFS', 'TEXTSPLIT, CONCAT, TEXTJOIN', 'Date & Time Calculations']
      },
      {
        moduleNumber: 3,
        title: 'Pivot Tables & Dynamic Dashboards',
        topics: ['Pivot Tables & Calculated Fields', 'Timeline & Multi-Select Slicers', 'Interactive Executive Dashboards', 'Conditional Formatting Heatmaps']
      },
      {
        moduleNumber: 4,
        title: 'Data Cleansing & Automation',
        topics: ['Intro to Power Query & ETL', 'Removing Duplicates & Handling Errors', 'Data Validation & Dropdowns', 'Macro Recording & Automation Basics']
      }
    ]
  },
  {
    id: 'tally-prime',
    slug: 'tally-prime-gst',
    title: 'Tally Prime with GST & Payroll',
    category: 'business',
    duration: '3 Months',
    level: 'Beginner to Professional',
    tagline: 'Certified Accounting, e-Invoicing, GST Returns & Banking',
    description: 'Comprehensive practical accounting training on latest Tally Prime. Learn ledger creation, purchase/sales vouchers, GST calculation, e-way bill generation, TDS, and payroll.',
    badge: '100% Practical Accounting',
    popular: true,
    features: [
      'Latest Tally Prime Interface & Shortcuts',
      'GST Invoicing, e-Way Bills & Tax Compliance',
      'Bank Reconciliation & Cash Flow Management',
      'Hands-on Practical Journal Entry Drills'
    ],
    careerProspects: ['Junior Accountant', 'Accounts Executive', 'Billing Clerk', 'GST Filing Assistant'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Accounting Fundamentals & Company Setup',
        topics: ['Golden Rules of Accounting', 'Creating Company & Financial Years', 'Ledger Groups & Chart of Accounts', 'Opening Balances & Inventory Setup']
      },
      {
        moduleNumber: 2,
        title: 'Voucher Entries & Inventory',
        topics: ['Purchase, Sales, Receipt & Payment', 'Contra & Journal Vouchers', 'Stock Items, Units & Godown Tracking', 'Debit Note & Credit Note Workflows']
      },
      {
        moduleNumber: 3,
        title: 'GST Compliance & Taxation',
        topics: ['CGST, SGST, IGST Calculation', 'Tax Invoicing & HSN/SAC Codes', 'e-Way Bill Generation & e-Invoicing', 'GSTR-1, GSTR-3B Reconciliation']
      },
      {
        moduleNumber: 4,
        title: 'Payroll, TDS & Financial Reports',
        topics: ['Employee Pay Heads & Salary Slips', 'TDS Deduction on Vendor Payments', 'Bank Reconciliation Statement (BRS)', 'Balance Sheet & P&L Statement Analysis']
      }
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    category: 'business',
    duration: '6 Months',
    level: 'Beginner to Intermediate',
    tagline: 'SEO, Google Ads, Meta Ads, WordPress & Lead Generation',
    description: 'Master organic and paid digital marketing channels. Learn to rank websites on Google, run high-converting Meta and Google search campaigns, and build marketing funnels.',
    badge: 'Agency Skills',
    features: [
      'Search Engine Optimization (On-Page/Off-Page)',
      'Google Search & Display Ads (PPC)',
      'Facebook & Instagram Ads Manager',
      'WordPress Website Setup & Canva Graphics'
    ],
    careerProspects: ['Digital Marketing Executive', 'SEO Specialist', 'Social Media Manager', 'Freelance Marketer'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Digital Strategy & Website Creation',
        topics: ['Marketing Funnel Fundamentals', 'Domain, Hosting & WordPress Setup', 'Landing Page Conversion Architecture', 'Canva Design & Social Creatives']
      },
      {
        moduleNumber: 2,
        title: 'Search Engine Optimization (SEO)',
        topics: ['Keyword Research & Competitor Analysis', 'On-Page SEO & Content Strategy', 'Technical SEO & Core Web Vitals', 'Link Building & Local Google Business Profile']
      },
      {
        moduleNumber: 3,
        title: 'Performance Marketing (Ads)',
        topics: ['Google Ads Search Campaigns & Bidding', 'Negative Keywords & Quality Score', 'Meta Ads Campaign Structure & Audience Targeting', 'Ad Copywriting & A/B Testing']
      },
      {
        moduleNumber: 4,
        title: 'Analytics, Email & Automation',
        topics: ['Google Analytics 4 (GA4) Tracking', 'Conversion Tracking & Pixels', 'Email Marketing Newsletters', 'Freelance Pitching & Client Acquisition']
      }
    ]
  },
  {
    id: 'c-cpp',
    slug: 'c-cpp-programming',
    title: 'Programming in C & C++',
    category: 'tech',
    duration: '3–4 Months',
    level: 'Beginner to Intermediate',
    tagline: 'Fundamental Logic, OOP, Pointers & Data Structures',
    description: 'The foundation of all software engineering. Ideal for diploma, BCA, BCS, and engineering students preparing for university exams and technical coding interviews.',
    badge: 'Engineering Essential',
    features: [
      'Strong Logic Building & Algorithm Formulation',
      'Pointers, Dynamic Memory & References',
      'Object Oriented Programming (OOP) in C++',
      'University Syllabus Coverage & Lab Practice'
    ],
    careerProspects: ['Software Developer Trainee', 'Embedded Systems Junior', 'Competitive Programmer', 'Systems Programmer'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'C Fundamentals & Control Structures',
        topics: ['Data Types, Operators & Expressions', 'Conditional Statements (if-else, switch)', 'Loops (for, while, do-while)', 'Functions & Scope of Variables']
      },
      {
        moduleNumber: 2,
        title: 'Arrays, Strings & Pointers',
        topics: ['1D and 2D Arrays', 'String Manipulation Library', 'Pointers Arithmetic & Pointer to Pointer', 'Dynamic Memory (malloc, calloc, free)']
      },
      {
        moduleNumber: 3,
        title: 'Structures, Unions & File Handling',
        topics: ['User Defined Data Types (Struct)', 'File Operations (fopen, fread, fwrite)', 'Preprocessor Directives', 'Error Handling in C']
      },
      {
        moduleNumber: 4,
        title: 'C++ & Object Oriented Principles',
        topics: ['Classes, Objects & Constructors', 'Function & Operator Overloading', 'Inheritance & Virtual Functions', 'Templates & Standard Template Library (STL)']
      }
    ]
  },
  {
    id: 'fullstack',
    slug: 'fullstack-web-development',
    title: 'Full Stack Web Development',
    category: 'tech',
    duration: '3–4 Months',
    level: 'Intermediate',
    tagline: 'Modern HTML5, CSS3, JavaScript, PHP & Database Projects',
    description: 'Learn to design, develop, and deploy dynamic websites. Covers modern semantic HTML5, flexbox/grid layout design, JavaScript DOM manipulation, server-side PHP, and MySQL database integration.',
    badge: 'Portfolio Ready',
    popular: true,
    features: [
      '100% Practical Coding Lab Sessions',
      'Responsive Mobile-First UI Design',
      'JavaScript ES6+ & Interactive DOM',
      'Live Client Style Project & Portfolio Deployment'
    ],
    careerProspects: ['Junior Web Developer', 'Frontend Developer', 'UI Designer / Developer', 'Freelance Web Designer'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Modern HTML5 & Semantic Web',
        topics: ['HTML5 Document Architecture', 'Forms, Inputs & Validation Attributes', 'Multimedia (Video, Audio, Canvas)', 'SEO Best Practices for Markup']
      },
      {
        moduleNumber: 2,
        title: 'CSS3, Flexbox & Grid Systems',
        topics: ['CSS Selectors & Specificity', 'Flexbox Alignment & Spacing', 'CSS Grid Layouts', 'Media Queries & Responsive Design']
      },
      {
        moduleNumber: 3,
        title: 'JavaScript Essentials (ES6+)',
        topics: ['Variables (let/const), Arrays & Objects', 'DOM Selection & Event Listeners', 'Fetch API, Promises & Async/Await', 'Form Validation & Dynamic UI Modals']
      },
      {
        moduleNumber: 4,
        title: 'Backend Integration with PHP & MySQL',
        topics: ['PHP Server Basics & GET/POST Handling', 'MySQL Database Connection & Queries', 'User Authentication (Register/Login)', 'Hosting, FTP & Live Deployment']
      }
    ]
  },
  {
    id: 'java',
    slug: 'java-programming',
    title: 'Java Programming Language',
    category: 'tech',
    duration: '3–4 Months',
    level: 'Intermediate',
    tagline: 'Core Java, OOP, Exception Handling & Collections',
    description: 'Master industry-standard enterprise Java. Learn platform independence, JVM architecture, multithreading, collections framework, and prepare for campus placement coding rounds.',
    badge: 'Enterprise Standard',
    features: [
      'JVM, JRE & JDK Internals',
      'Object Oriented Programming Architecture',
      'Java Collections Framework (List, Map, Set)',
      'College Curriculum & Interview Preparation'
    ],
    careerProspects: ['Java Developer Trainee', 'Software Engineer', 'Backend Specialist', 'Android Apprentice'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Java Language Basics & Architecture',
        topics: ['JVM, Bytecode & Class Loaders', 'Primitive Types & Type Casting', 'Control Flow Statements', 'Methods & Memory Allocation (Stack vs Heap)']
      },
      {
        moduleNumber: 2,
        title: 'Object Oriented Java',
        topics: ['Class Design & Encapsulation', 'Inheritance & Polymorphism', 'Abstract Classes vs Interfaces', 'Package Structuring & Access Modifiers']
      },
      {
        moduleNumber: 3,
        title: 'Exception Handling & Multithreading',
        topics: ['Try-Catch-Finally Blocks', 'Custom Exception Creation', 'Thread Lifecycle & Runnable Interface', 'Synchronization & Thread Safety']
      },
      {
        moduleNumber: 4,
        title: 'Collections Framework & File I/O',
        topics: ['ArrayList, LinkedList & Vector', 'HashSet, TreeSet & Map Interfaces', 'Iterators & Generics', 'File Streams & Serialization']
      }
    ]
  },
  {
    id: 'typing-marathi',
    slug: 'marathi-typing-cctp-30',
    title: 'Marathi Typing (CCTP) 30 WPM',
    category: 'beginner',
    duration: '2–3 Months',
    level: 'Beginner',
    tagline: 'Maharashtra Govt. Approved GCC-TBC Speed & Accuracy Drills',
    description: 'Mandatory certificate for Maharashtra State Government recruitment, MPSC clerk-typist, Court clerk, and Talathi recruitment. Master Marathi Remington and Inscript keyboard layouts.',
    badge: 'Govt. GCC-TBC Certified',
    features: [
      'Official Maharashtra Govt. Syllabus & Software',
      'Special Focus on Finger Placement & Accuracy',
      'Daily Timed Speed Drills (30 WPM Target)',
      '1st Attempt Exam Passing Track Record'
    ],
    careerProspects: ['Govt. Clerk-Typist (MPSC)', 'Court Assistant Typist', 'Talathi Office Assistant', 'Municipal Corporation Typist'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Marathi Keyboard Ergonomics',
        topics: ['Finger Position on Home Row', 'Key Combinations for Matras & Half-letters', 'Remington Keyboard Practice', 'Inscript Keyboard Layout Overview']
      },
      {
        moduleNumber: 2,
        title: 'Speed Drills & Word Practice',
        topics: ['Two-letter & Three-letter Words', 'Common Marathi Vocabulary', 'Punctuation & Number Row', 'Avoiding Backspace Habits']
      },
      {
        moduleNumber: 3,
        title: 'Government Letter & Statement Formatting',
        topics: ['Official Marathi Letter Layout', 'Tabular Statements Formatting', 'Speed Test Passages (7 Minutes)', 'Real Mock Exam Simulation']
      }
    ]
  },
  {
    id: 'typing-english',
    slug: 'english-typing-cctp-30-40',
    title: 'English Typing (CCTP) 30/40 WPM',
    category: 'beginner',
    duration: '2–3 Months',
    level: 'Beginner',
    tagline: 'Govt. Valid Touch Typing for Banking & Corporate Careers',
    description: 'Learn touch typing without looking at the keyboard. Certified under GCC-TBC / CCTP format. Essential for SSC, Railway, Banking, Court, and corporate transcription roles.',
    badge: 'Govt. & Corporate Valid',
    features: [
      'Touch Typing Methodology (No Keyboard Looking)',
      'Target 30 WPM and 40 WPM Certification',
      'Official Speed Test Software Practice',
      'Letter, Statement & Email Formatting'
    ],
    careerProspects: ['Govt. Typist & Stenographer', 'Bank Data Entry Clerk', 'BPO / Call Center Representative', 'Medical Transcriptionist'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Touch Typing Foundations',
        topics: ['Home Row (ASDF - JKL;)', 'Upper Row & Bottom Row Navigation', 'Shift Key & Capitalization Ergonomics', 'Rhythm & Accuracy Drills']
      },
      {
        moduleNumber: 2,
        title: 'Speed Acceleration to 30/40 WPM',
        topics: ['Timed Paragraph Drills', 'Numeric Keypad Touch Typing', 'Error Reduction Strategies', 'Real-Time WPM Tracking Software']
      },
      {
        moduleNumber: 3,
        title: 'Govt. Exam Format Preparation',
        topics: ['Business Letter Structure', 'Statistical Table Typing', 'Passage Typing with Zero Errors', 'Final GCC-TBC Mock Exams']
      }
    ]
  },
  {
    id: 'ai-robotics',
    slug: 'ai-machine-learning-robotics',
    title: 'AI & Machine Learning (Robotics)',
    category: 'tech',
    duration: '4–6 Months',
    level: 'Intermediate to Advanced',
    tagline: 'Python, Neural Networks, Computer Vision & Hardware Sensors',
    description: 'Next-generation technical program combining Python coding, sensor hardware, computer vision, and machine learning models. Build real autonomous robotics projects.',
    badge: 'Future Tech',
    popular: true,
    features: [
      'Python for Machine Learning & Data Science',
      'Sensor Hardware & Microcontroller Programming',
      'Computer Vision with OpenCV',
      'Build Real Autonomous Rover & IoT Projects'
    ],
    careerProspects: ['AI Junior Developer', 'Robotics Systems Technician', 'Python Developer', 'IoT Solutions Assistant'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Python for AI & Numerical Computing',
        topics: ['Python Syntax, Lists & Dictionaries', 'NumPy Matrix Computations', 'Pandas Data Handling', 'Matplotlib Data Visualization']
      },
      {
        moduleNumber: 2,
        title: 'Machine Learning Fundamentals',
        topics: ['Supervised vs Unsupervised Learning', 'Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Model Evaluation & Accuracy Metrics']
      },
      {
        moduleNumber: 3,
        title: 'Computer Vision & Deep Learning',
        topics: ['OpenCV Image Processing Basics', 'Face & Object Detection', 'Intro to Neural Networks', 'TensorFlow / PyTorch Overview']
      },
      {
        moduleNumber: 4,
        title: 'Robotics & Hardware Integration',
        topics: ['Microcontrollers & Sensor Inputs', 'Motor Drivers & Actuators', 'Autonomous Obstacle Avoiding Rover', 'Live Capstone Project Demo']
      }
    ]
  },
  {
    id: 'power-bi',
    slug: 'microsoft-power-bi',
    title: 'Microsoft Power BI',
    category: 'business',
    duration: '2–3 Months',
    level: 'Intermediate',
    tagline: 'Data Ingestion, DAX Calculations, KPI Visuals & Executive Dashboards',
    description: 'Transform complex business data into stunning interactive visual dashboards. Learn Power Query ETL, relational data modeling, DAX formulas, and cloud publishing.',
    badge: 'High Salary Potential',
    features: [
      'Power Query Data Cleaning & Transformation',
      'Star Schema Data Modeling & Relationships',
      'Essential DAX (CALCULATE, RELATED, SUMX)',
      'Publish to Power BI Service & Mobile Layout'
    ],
    careerProspects: ['Power BI Developer', 'BI Analyst', 'Reporting Specialist', 'Corporate Data Visualizer'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Power Query & Data Cleaning',
        topics: ['Connecting to Excel, CSV & SQL Databases', 'Transforming Columns & Unpivoting Data', 'Merging & Appending Queries', 'Handling Missing & Dirty Data']
      },
      {
        moduleNumber: 2,
        title: 'Data Modeling & Relationships',
        topics: ['Star Schema vs Snowflake Schema', 'One-to-Many & Many-to-Many Relationships', 'Active vs Inactive Relationships', 'Date Tables & Calendar Creation']
      },
      {
        moduleNumber: 3,
        title: 'DAX (Data Analysis Expressions)',
        topics: ['Calculated Columns vs Measures', 'CALCULATE: The Heart of DAX', 'Time Intelligence (YTD, QTD, MoM)', 'FILTER, ALL, RELATED, SUMX Functions']
      },
      {
        moduleNumber: 4,
        title: 'Dashboard Design & Publishing',
        topics: ['KPI Cards, Gauges & Drill-Throughs', 'Visual Hierarchy & UI Color Themes', 'Bookmarks & Interactive Toggle Buttons', 'Publishing to Power BI Service']
      }
    ]
  }
];
