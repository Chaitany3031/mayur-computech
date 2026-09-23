import { FAQ, Testimonial } from '../types';

export const INSTITUTE_INFO = {
  name: 'Mayur Computech',
  legalStatus: 'Government Authorised Computer Training Institute',
  centerCode: '78210482',
  tagline: 'Learn Today • Build Tomorrow',
  address: 'Shop No 5, Plot No 18, Ambe Bhumi CHS, Sector 5, Ghansoli, Navi Mumbai – 400701, Maharashtra',
  phone: '8655050595',
  phoneDisplay: '+91 86550 50595',
  whatsappUrl: 'https://wa.me/918655050595?text=Hello%20Mayur%20Computech%2C%20I%20would%20like%20to%20enquire%20about%20your%20courses.',
  googleReviewUrl: 'https://g.page/r/Cbr2GCg8dQWrEBM/review',
  googleRating: 4.9,
  totalReviews: '200+',
  labTimings: '7:30 AM – 9:30 PM (Daily)',
  stats: {
    studentsTrained: '5,000+',
    passRate: '98%',
    experienceYears: '13+',
    coursesOffered: '12'
  },
  socialLinks: {
    youtube: 'https://youtube.com/@mayurcomputech4334?si=MPwhi8qKSkTXziT6',
    instagram: 'https://www.instagram.com/mayurcomputech',
    facebook: 'https://www.facebook.com/share/1CHipnyFJn/?mibextid=wwXIfr',
    telegram: 'https://t.me/mayurcomputech'
  },
  mentor: {
    name: 'Mayur Sir',
    role: 'Founder & Chief Technical Mentor',
    credentials: 'Computer Diploma · 13+ Years Teaching Experience (Since 2014)',
    bio: 'Dedicated educator and tech mentor who has empowered over 5,000 students to secure government jobs, banking positions, and IT software careers. Known for clear bilingual instruction (Marathi, Hindi, English) and 100% hands-on laboratory mentoring.',
    phone: '8655050595'
  }
};

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Abhishek Patil',
    initials: 'AP',
    bgColor: '#e37400',
    course: 'Marathi & English Typing (CCTP) 30/40',
    badge: 'Govt. Exam Cleared 1st Attempt',
    rating: 5,
    timeAgo: '2 months ago',
    reviewText: 'Joined for Marathi 30 and English 40 WPM CCTP typing. Mayur Sir\'s accuracy drills and daily timer tests helped me crack the Maharashtra govt typing exam on my very first attempt! Best guidance, great speed software and very affordable fees.'
  },
  {
    id: '2',
    name: 'Rahul Shinde',
    initials: 'RS',
    bgColor: '#7c3aed',
    course: 'Tally Prime GST & Advanced Excel',
    badge: 'Placed as Junior Accountant in Vashi',
    rating: 5,
    timeAgo: '1 month ago',
    reviewText: 'Practical GST entries, e-way bills, and VLOOKUP / Pivot tables taught by Mayur Sir helped me crack my corporate interview with ease. Got placed as Junior Accounts Executive in Vashi within 1 month of completing the course. Thank you Mayur Sir!'
  },
  {
    id: '3',
    name: 'Shraddha More',
    initials: 'SM',
    bgColor: '#dc2626',
    course: 'AI & Robotics with Power BI',
    badge: 'Robotics Project Finalist',
    rating: 5,
    timeAgo: '2 months ago',
    reviewText: 'Learning AI & Robotics with real hardware sensors, machine learning algorithms, and Power BI dashboards gave me immense confidence. Mayur Sir provides top-tier 1-on-1 project guidance with zero rush. Proud to learn at Mayur Computech!'
  },
  {
    id: '4',
    name: 'Prathamesh Kadam',
    initials: 'PK',
    bgColor: '#059669',
    course: 'Full Stack Web Development & Python',
    badge: 'Verified Student',
    rating: 5,
    timeAgo: '3 weeks ago',
    reviewText: 'Positive and friendly atmosphere. Mayur Sir gives personal 1:1 attention to every coding exercise and practical assignment. 100% practical oriented training with individual workstations. Highly recommend for any beginner or IT graduate!'
  },
  {
    id: '5',
    name: 'Sneha Jadhav',
    initials: 'SJ',
    bgColor: '#d97706',
    course: 'MS-CIT & MS Office 2021 Suite',
    badge: 'Scored 94% in MS-CIT Exam',
    rating: 5,
    timeAgo: '1 month ago',
    reviewText: 'Center code 78210482 is fully genuine. The computer lab is modern and Mayur Sir explains concepts very patiently in Marathi and Hindi. The 1000+ mock MCQs helped me score 94% in the final state exam.'
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: '1',
    category: 'certificates',
    question: 'Is Mayur Computech a Government Authorised Computer Institute?',
    answer: 'Yes, absolutely! Mayur Computech is an officially Authorised Computer Training Institute (Center Code: 78210482). All MS-CIT and CCTP Typing certifications issued are officially recognized by the Maharashtra State Government, MPSC, Police Bharti, banking exams, and corporate recruiters.'
  },
  {
    id: '2',
    category: 'general',
    question: 'What are the institute lab timings and flexible batch options?',
    answer: 'Our high-tech computer lab is open every day from 7:30 AM to 9:30 PM. We offer flexible 1-hour and 2-hour batches throughout the morning, afternoon, and evening. Special weekend batches are also available for college students and working professionals.'
  },
  {
    id: '3',
    category: 'admissions',
    question: 'Can I attend a free demo trial session before taking admission?',
    answer: 'Yes! We offer up to 2 free trial demo sessions so that students and parents can experience our teaching methodology, inspect our lab facilities, and consult with Mayur Sir about the best career path.'
  },
  {
    id: '4',
    category: 'general',
    question: 'Can I practice in the computer lab outside my batch time?',
    answer: 'Yes, 100%! We provide unlimited extra lab practice hours at no additional charge. Every student gets their own dedicated computer workstation to complete coding projects, typing speed drills, and practical assignments.'
  },
  {
    id: '5',
    category: 'admissions',
    question: 'Is there an installment / EMI facility for course fees?',
    answer: 'Yes, we offer easy monthly installment (EMI) options with 0% interest to ensure quality computer education is accessible for all families. Special fee concessions are also available on combo course packages.'
  },
  {
    id: '6',
    category: 'courses',
    question: 'Do you provide study notes, shortcut cheat-sheets, and exam software?',
    answer: 'Yes. Every enrolled student gets complete course books/PDF notes, keyboard shortcut cheat-sheets, and 24/7 access to mock exam simulation software with over 1,000+ MCQs to guarantee first-attempt success.'
  }
];
