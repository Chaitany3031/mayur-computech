export type CourseCategory = 'all' | 'beginner' | 'tech' | 'business';

export interface SyllabusModule {
  moduleNumber: number;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'beginner' | 'tech' | 'business';
  duration: string;
  level: string;
  tagline: string;
  description: string;
  badge: string;
  features: string[];
  syllabus: SyllabusModule[];
  careerProspects: string[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  bgColor: string;
  course: string;
  badge: string;
  reviewText: string;
  rating: number;
  timeAgo: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'courses' | 'admissions' | 'certificates';
}

export interface EnquiryLead {
  id: string;
  fullName: string;
  phone: string;
  course: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'enrolled';
  date: string;
}

export type PermissionCode =
  | 'courses.view'
  | 'courses.edit'
  | 'courses.publish'
  | 'sections.reorder'
  | 'gallery.manage'
  | 'enquiries.manage'
  | 'users.manage'
  | 'audit.view';

export interface AdminRole {
  roleName: 'SUPER_ADMIN' | 'CLIENT_ADMIN' | 'INSTRUCTOR';
  label: string;
  permissions: PermissionCode[];
}
