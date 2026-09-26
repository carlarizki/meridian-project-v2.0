import React, { useState } from 'react';
import {
  Zap,
  Sun,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Layers,
  Sparkles,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';
import { RECEIVING_CLUSTERS } from '../../data/meridianData';

interface FutureRolesViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const FutureRolesView: React.FC<FutureRolesViewProps> = ({ onNavigate }) => {
  const [selectedClusterIndex, setSelectedClusterIndex] = useState(0);

  const growthClusters = [
    {
      id: 1,
      name: 'Smart Energy & Grid Digitalization',
      icon: Zap,
      capacity: '~1,800 Staf',
      role: 'Smart Meter Operations Specialist',
      badge: 'Growth Role',
      description: 'Operate and monitor smart metering systems, analyze telemetry data, and ensure AMI grid service reliability.',
      pills: {
        family: 'Operations',
        level: 'L3',
        demand: 'High',
        timeline: '0-2 years',
      },
      capabilitiesRequired: [
        { name: 'Field Operations', level: 'L3' },
        { name: 'Digital Monitoring', level: 'L3' },
        { name: 'Data Analysis', level: 'L3' },
        { name: 'Troubleshooting', level: 'L3' },
        { name: 'Customer Communication', level: 'L2' },
      ],
    },
    {
      id: 2,
      name: 'Renewable Energy & Green Solutions',
      icon: Sun,
      capacity: '~1,400 Staf',
      role: 'Solar PV Maintenance Specialist',
      badge: 'High Growth',
      description: 'Install, inspect, and maintain decentralized rooftop and ground-mounted photovoltaic systems across regional units.',
      pills: {
        family: 'Engineering & Renewables',
        level: 'L2-L3',
        demand: 'Critical',
        timeline: '1-3 years',
      },
      capabilitiesRequired: [
        { name: 'PV Rooftop Safety & K3', level: 'L4' },
        { name: 'Inverter Diagnostics', level: 'L3' },
        { name: 'Thermal Imaging Inspection', level: 'L3' },
        { name: 'Preventive Asset Maintenance', level: 'L3' },
        { name: 'Site Dispatch Protocol', level: 'L2' },
      ],
    },
    {
      id: 3,
      name: 'Customer Experience & Energy Services',
      icon: Users,
      capacity: '~800 Staf',
      role: 'Customer Energy Advisor',
      badge: 'Strategic Role',
      description: 'Consult residential and commercial clients on time-of-use tariffs, smart portal adoption, and billing resolutions.',
      pills: {
        family: 'Commercial & Customer',
        level: 'L2-L3',
        demand: 'High',
        timeline: '0-1 year',
      },
      capabilitiesRequired: [
        { name: 'Customer Communication', level: 'L4' },
        { name: 'Smart Billing Dispute Resolution', level: 'L3' },
        { name: 'Peak-Hour Demand Auditing', level: 'L3' },
        { name: 'Digital App Guidance', level: 'L3' },
        { name: 'Energy Conservation Advice', level: 'L2' },
      ],
    },
  ];

  const current = growthClusters[selectedClusterIndex];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Context matching Screen 7 */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Future Work & Roles Architecture
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Identify which tasks will change and define verified growth roles in the clean energy transition.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Total Absorbing Target:</span>
          <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            ~4,200 Pegawai Metering
          </span>
        </div>
      </div>

      {/* Main Grid: Clusters on Left, Role Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Business Growth Clusters (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
          <div className="px-2 py-1 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
            Business Growth Clusters (3)
          </div>

          <div className="space-y-1.5">
            {growthClusters.map((cluster, idx) => {
              const Icon = cluster.icon;
              const isSelected = selectedClusterIndex === idx;
              return (
                <button
                  key={cluster.id}
                  onClick={() => setSelectedClusterIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-medium transition-all text-left ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{cluster.name}</div>
                      <div className="text-[10px] text-slate-500">{cluster.capacity}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Growth Role Card matching Screen 7 (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900">{current.role}</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {current.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <CurrentIcon className="w-4 h-4 text-blue-600" />
              <span>{current.capacity}</span>
            </div>
          </div>

          {/* Role Metadata Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 text-[10px] block">Job Family</span>
              <span className="font-bold text-slate-900">{current.pills.family}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 text-[10px] block">Level</span>
              <span className="font-bold text-slate-900 font-mono">{current.pills.level}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 text-[10px] block">Market Demand</span>
              <span className="font-bold text-rose-600">{current.pills.demand}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 text-[10px] block">Target Timeline</span>
              <span className="font-bold text-slate-900 font-mono">{current.pills.timeline}</span>
            </div>
          </div>

          {/* Key Capabilities Required matching Screen 7 */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Capabilities Required
            </h3>

            <div className="flex flex-wrap gap-2">
              {current.capabilitiesRequired.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50/70 border border-blue-200 text-xs"
                >
                  <span className="font-medium text-slate-800">{cap.name}</span>
                  <span className="font-mono font-bold text-blue-700 bg-white px-1.5 py-0.2 rounded border border-blue-200 text-[11px]">
                    {cap.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Jalur transisi ini dirancang untuk mempertahankan legal grade dan perlindungan hak pekerja.
            </span>
            <button
              onClick={() => onNavigate('learning')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <span>Lihat Kurikulum Reskilling</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
