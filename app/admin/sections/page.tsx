'use client'

import { useState } from 'react'
import MilestonesSection from './MilestonesSection'
import TeamMembersSection from './TeamMembersSection'
import ProjectsSection from './ProjectsSection'
// import BlogSection from './sections/BlogSection'

type SectionType = 'milestones' | 'projects' | 'blogs' | 'team_members'

export default function AdminSectionsPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('milestones')

  const sections: { label: string; key: SectionType }[] = [
    { label: 'Milestones', key: 'milestones' },
    {label: 'Team Members', key: 'team_members'},
    { label: 'Projects', key: 'projects' },
    { label: 'Blogs', key: 'blogs' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-bold mb-6">Admin Sections</h2>
        <ul className="space-y-2">
          {sections.map(sec => (
            <li key={sec.key}>
              <button
                onClick={() => setActiveSection(sec.key)}
                className={`w-full text-left px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
                  activeSection === sec.key ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {sec.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        {activeSection === 'milestones' && <MilestonesSection />}
        {activeSection === 'team_members' && <TeamMembersSection />}
        {activeSection === 'projects' && <ProjectsSection />}
        {/* {activeSection === 'blogs' && <BlogSection />} */}
      </main>
    </div>
  )
}
