/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { WorkforceOverview } from './components/views/WorkforceOverview';
import { AIExposureAnalysis } from './components/views/AIExposureAnalysis';
import { JobArchitectureView } from './components/views/JobArchitectureView';
import { CapabilityLibraryView } from './components/views/CapabilityLibraryView';
import { EmployeeProfileView } from './components/views/EmployeeProfileView';
import { FutureRolesView } from './components/views/FutureRolesView';
import { RedeploymentMobilityView } from './components/views/RedeploymentMobilityView';
import { LearningPlanView } from './components/views/LearningPlanView';
import { DecisionEngineView } from './components/views/DecisionEngineView';
import { TransformationImpactView } from './components/views/TransformationImpactView';
import { EmployeeDetailModal } from './components/EmployeeDetailModal';
import { StrategicBriefingModal } from './components/StrategicBriefingModal';
import { RoadmapModal } from './components/RoadmapModal';
import { LaborRegulationModal } from './components/LaborRegulationModal';
import { ToastProvider } from './context/ToastContext';
import { DecisionCategory, EmployeeRecord, NavTab } from './types/meridian';
import { MERIDIAN_EMPLOYEES } from './data/meridianData';

export default function App() {
  // Start on Workforce Overview as requested (real intelligence platform starting point)
  const [activeTab, setActiveTab] = useState<NavTab>('workforce');
  const [categoryFilter, setCategoryFilter] = useState<DecisionCategory | 'all'>('all');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('EMP-1001');
  const [modalEmployee, setModalEmployee] = useState<EmployeeRecord | null>(null);

  // Strategic modals accessible on-demand via top CTAs and sidebar
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleSelectEmployee = (emp: EmployeeRecord) => {
    setSelectedEmployeeId(emp.id);
    setModalEmployee(emp);
  };

  return (
    <ToastProvider>
      <div className="flex min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800 antialiased">
        {/* Fixed Left Sidebar with clean, focused navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenBriefing={() => setIsBriefingOpen(true)}
          onOpenRoadmap={() => setIsRoadmapOpen(true)}
          onOpenLegal={() => setIsLegalOpen(true)}
          isMobileOpen={isMobileNavOpen}
          onMobileClose={() => setIsMobileNavOpen(false)}
        />
        {isMobileNavOpen && (
          <button
            type="button"
            aria-label="Tutup navigasi"
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileNavOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex h-dvh min-w-0 flex-1 flex-col overflow-y-auto">
          {/* Top Header with Breadcrumb & Module indicator */}
          <TopHeader activeTab={activeTab} setActiveTab={setActiveTab} onOpenMenu={() => setIsMobileNavOpen(true)} />

          {/* Viewport Content */}
          <main className="mx-auto w-full max-w-7xl flex-1 p-3 sm:p-5 lg:p-6">
            {activeTab === 'workforce' && (
              <WorkforceOverview onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'exposure' && (
              <AIExposureAnalysis onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'jobs' && (
              <JobArchitectureView onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'capabilities' && (
              <CapabilityLibraryView onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'people' && (
              <EmployeeProfileView
                onNavigate={(tab) => setActiveTab(tab)}
                selectedEmployeeId={selectedEmployeeId}
                setSelectedEmployeeId={setSelectedEmployeeId}
              />
            )}

            {activeTab === 'future-roles' && (
              <FutureRolesView onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'redeployment' && (
              <RedeploymentMobilityView
                onNavigate={(tab) => setActiveTab(tab)}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                onSelectEmployee={handleSelectEmployee}
              />
            )}

            {activeTab === 'learning' && (
              <LearningPlanView
                onNavigate={(tab) => setActiveTab(tab)}
                selectedEmployeeId={selectedEmployeeId}
              />
            )}

            {activeTab === 'decision' && (
              <DecisionEngineView
                onNavigate={(tab) => setActiveTab(tab)}
                selectedEmployeeId={selectedEmployeeId}
                setSelectedEmployeeId={setSelectedEmployeeId}
              />
            )}

            {activeTab === 'impact' && (
              <TransformationImpactView onNavigate={(tab) => setActiveTab(tab)} />
            )}
          </main>
        </div>

        {/* Employee Detail Modal */}
        <EmployeeDetailModal
          employee={modalEmployee}
          onClose={() => setModalEmployee(null)}
          onSelectAnother={(id) => {
            const emp = MERIDIAN_EMPLOYEES.find((e) => e.id === id);
            if (emp) {
              setSelectedEmployeeId(emp.id);
              setModalEmployee(emp);
            }
          }}
          allEmployees={MERIDIAN_EMPLOYEES}
        />

        {/* Strategic Briefing Context Modal (On-demand via CTA) */}
        <StrategicBriefingModal
          isOpen={isBriefingOpen}
          onClose={() => setIsBriefingOpen(false)}
          onNavigate={(tab) => setActiveTab(tab)}
        />

        {/* 90-Day Implementation Roadmap Modal (On-demand via CTA) */}
        <RoadmapModal
          isOpen={isRoadmapOpen}
          onClose={() => setIsRoadmapOpen(false)}
        />

        {/* Legal & Labor Regulation Modal (On-demand via CTA) */}
        <LaborRegulationModal
          isOpen={isLegalOpen}
          onClose={() => setIsLegalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
