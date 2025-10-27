'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MilestonesSection from './MilestonesSection'
import TeamMembersSection from './TeamMembersSection'
import ProjectsSection from './ProjectsSection'
import BlogSection from './BlogSection'

type SectionType = 'milestones' | 'projects' | 'blogs' | 'team_members'

export default function AdminSectionsPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') as SectionType | null

  const [activeSection, setActiveSection] = useState<SectionType>('milestones')

  useEffect(() => {
    if (tab) setActiveSection(tab)
  }, [tab])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Only content now */}
      <main className="flex-1 p-6">
        {activeSection === 'milestones' && <MilestonesSection />}
        {activeSection === 'team_members' && <TeamMembersSection />}
        {activeSection === 'projects' && <ProjectsSection />}
        {activeSection === 'blogs' && <BlogSection />}
      </main>
    </div>
  )
}
