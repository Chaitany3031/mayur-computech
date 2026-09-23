import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from '../../data/coursesData';
import { PermissionCode, EnquiryLead } from '../../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = 'SUPER_ADMIN' | 'CLIENT_ADMIN';

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<UserRole>('SUPER_ADMIN');
  const [activeTab, setActiveTab] = useState<'courses' | 'leads' | 'cms_blocks' | 'rbac_matrix'>('courses');
  const [leads, setLeads] = useState<EnquiryLead[]>([]);
  const [courseList, setCourseList] = useState(COURSES_DATA);

  // Section visibility / order state for headless CMS
  const [sectionConfig, setSectionConfig] = useState([
    { id: 'hero', name: 'Hero Authority & Google Rating', enabled: true },
    { id: 'courses', name: '12 Courses Catalog & Syllabus', enabled: true },
    { id: 'why-us', name: 'Why Choose Mayur Computech Matrix', enabled: true },
    { id: 'mentor', name: 'Meet Mayur Sir Spotlight', enabled: true },
    { id: 'reviews', name: 'Verified Google Business Reviews (4.9★)', enabled: true },
    { id: 'faq', name: 'Interactive FAQ Accordion', enabled: true },
    { id: 'contact', name: 'Center Address & Admission Form', enabled: true },
  ]);

  // Load leads from storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('mc_leads') || '[]');
    if (stored.length === 0) {
      const sampleLeads: EnquiryLead[] = [
        {
          id: 'lead-1',
          fullName: 'Abhishek Patil',
          phone: '9820123456',
          course: 'Marathi Typing (CCTP) 30 WPM',
          message: 'Interested in morning 8am batch for MPSC typing',
          status: 'enrolled',
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: 'lead-2',
          fullName: 'Sneha More',
          phone: '9867543210',
          course: 'Tally Prime with GST & Payroll',
          message: 'Need 0% EMI monthly fee option',
          status: 'contacted',
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'lead-3',
          fullName: 'Prathamesh Kadam',
          phone: '9930887766',
          course: 'Full Stack Web Development',
          message: 'Can I attend Saturday demo class?',
          status: 'new',
          date: new Date().toISOString(),
        },
      ];
      setLeads(sampleLeads);
      localStorage.setItem('mc_leads', JSON.stringify(sampleLeads));
    } else {
      setLeads(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Granular RBAC Permissions
  const permissions: Record<UserRole, PermissionCode[]> = {
    SUPER_ADMIN: [
      'courses.view',
      'courses.edit',
      'courses.publish',
      'sections.reorder',
      'gallery.manage',
      'enquiries.manage',
      'users.manage',
      'audit.view',
    ],
    CLIENT_ADMIN: [
      'courses.view',
      'courses.edit',
      'sections.reorder',
      'gallery.manage',
      'enquiries.manage',
    ],
  };

  const hasPermission = (code: PermissionCode) => {
    return permissions[role].includes(code);
  };

  const updateLeadStatus = (leadId: string, newStatus: EnquiryLead['status']) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem('mc_leads', JSON.stringify(updated));
  };

  const toggleSection = (id: string) => {
    setSectionConfig((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative my-6 max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h2 className="text-xl font-bold text-white">Mayur Computech CMS & RBAC Console</h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Center Code: <span className="font-mono text-amber-300">78210482</span> · Granular Role-Based Access Control
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => setRole('SUPER_ADMIN')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  role === 'SUPER_ADMIN'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                👑 Super Admin
              </button>
              <button
                onClick={() => setRole('CLIENT_ADMIN')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  role === 'CLIENT_ADMIN'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                🏢 Client Admin
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-neutral-800 py-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'courses' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            📚 Courses Manager ({courseList.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'leads' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            📋 Admission Leads CRM ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('cms_blocks')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'cms_blocks' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🧩 Page Section Layout
          </button>
          <button
            onClick={() => setActiveTab('rbac_matrix')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rbac_matrix' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🔒 RBAC Permissions Matrix
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Courses Manager */}
          {activeTab === 'courses' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Role: <strong className="text-white">{role}</strong>
                  {hasPermission('courses.publish') ? (
                    <span className="text-emerald-400 ml-2 font-mono">✓ Direct Publish Access</span>
                  ) : (
                    <span className="text-amber-400 ml-2 font-mono">⚠️ Draft Only (Requires Super Admin Approval)</span>
                  )}
                </span>
                <span className="text-xs text-neutral-400">Total 12 Active Courses</span>
              </div>

              <div className="border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] font-mono border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Course Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Govt. / Industry Badge</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {courseList.map((course) => (
                      <tr key={course.id} className="hover:bg-neutral-800/40">
                        <td className="p-3 font-semibold text-white">{course.title}</td>
                        <td className="p-3 capitalize text-neutral-400">{course.category}</td>
                        <td className="p-3 font-mono text-amber-300">{course.duration}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300 border border-neutral-700/60">
                            {course.badge}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {hasPermission('courses.edit') ? (
                            <button
                              onClick={() => alert(`Course "${course.title}" editor opened.`)}
                              className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-[11px] cursor-pointer"
                            >
                              Edit Details
                            </button>
                          ) : (
                            <span className="text-neutral-600 text-[11px]">View Only</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Admission Leads CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Incoming student enquiries & trial class requests:</span>
                <span>{leads.length} Records</span>
              </div>

              <div className="border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] font-mono border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Course Program</th>
                      <th className="p-3">Notes</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-neutral-800/40">
                        <td className="p-3 font-semibold text-white">{lead.fullName}</td>
                        <td className="p-3 font-mono text-amber-300">
                          <a href={`tel:${lead.phone}`} className="hover:underline">
                            {lead.phone}
                          </a>
                        </td>
                        <td className="p-3 text-neutral-200">{lead.course}</td>
                        <td className="p-3 text-neutral-400 text-[11px] max-w-[180px] truncate">
                          {lead.message || '—'}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              lead.status === 'enrolled'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : lead.status === 'contacted'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'contacted')}
                            className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] cursor-pointer"
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'enrolled')}
                            className="px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-[10px] cursor-pointer"
                          >
                            Enrolled
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section Layout / Headless CMS */}
          {activeTab === 'cms_blocks' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                Live layout orchestrator for Mayur Computech landing blocks. Toggle sections to simulate dynamic CMS publishing:
              </p>

              <div className="space-y-2">
                {sectionConfig.map((sec) => (
                  <div
                    key={sec.id}
                    className="flex items-center justify-between p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-500 font-mono text-xs">⠿</span>
                      <span className="text-xs font-semibold text-white">{sec.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          sec.enabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {sec.enabled ? 'Active / Visible' : 'Hidden'}
                      </span>
                      <button
                        onClick={() => toggleSection(sec.id)}
                        className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs text-white cursor-pointer"
                      >
                        Toggle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RBAC Matrix */}
          {activeTab === 'rbac_matrix' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                Security & Role-Based Access Control specification for Mayur Computech multi-tenant administration:
              </p>

              <div className="border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] font-mono border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Permission Code</th>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-center">Super Admin</th>
                      <th className="p-3 text-center">Client Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-mono text-[11px]">
                    <tr>
                      <td className="p-3 text-amber-300">courses.view</td>
                      <td className="p-3 font-sans text-neutral-400">View course catalog and modules</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-amber-300">courses.edit</td>
                      <td className="p-3 font-sans text-neutral-400">Draft syllabus & course changes</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-amber-300">courses.publish</td>
                      <td className="p-3 font-sans text-neutral-400">Publish courses live to website</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                      <td className="p-3 text-center text-red-400">✕ DENY (Review Req)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-amber-300">enquiries.manage</td>
                      <td className="p-3 font-sans text-neutral-400">Update admission leads & calls</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-amber-300">sections.reorder</td>
                      <td className="p-3 font-sans text-neutral-400">Customize block display order</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-amber-300">users.manage</td>
                      <td className="p-3 font-sans text-neutral-400">Create & manage staff accounts</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                      <td className="p-3 text-center text-red-400">✕ DENY</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-amber-300">audit.view</td>
                      <td className="p-3 font-sans text-neutral-400">Access security & access logs</td>
                      <td className="p-3 text-center text-emerald-400">✓ ALLOW</td>
                      <td className="p-3 text-center text-red-400">✕ DENY</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Active Role: <strong className="text-amber-400">{role}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold cursor-pointer"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
