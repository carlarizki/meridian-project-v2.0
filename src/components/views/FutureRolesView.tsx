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

// One icon + a couple of framing pills per real RECEIVING_CLUSTERS entry
// (id -> presentation only; the underlying name/capacity/roles/skills all
// come from meridianData.ts, not invented here).
const CLUSTER_PRESENTATION: Record<string, { icon: React.ElementType; badge: string; demand: string }> = {
  'smart-grid': { icon: Zap, badge: 'Growth Role', demand: 'High' },
  'solar-om': { icon: Sun, badge: 'High Growth', demand: 'Critical' },
  'customer-energy': { icon: Users, badge: 'Strategic Role', demand: 'High' },
  'facility-vers': { icon: Users, badge: 'Dignified Transition', demand: 'Low' },
};

export const FutureRolesView: React.FC<FutureRolesViewProps> = ({ onNavigate }) => {
  const [selectedClusterIndex, setSelectedClusterIndex] = useState(0);

  // Previously this view had its own 3 fully-invented clusters (capacities
  // summing to 4,000, roles/skills made up) while the real RECEIVING_CLUSTERS
  // data sat imported but unused. Now sourced directly from it.
  const growthClusters = RECEIVING_CLUSTERS.map((cluster) => {
    const presentation = CLUSTER_PRESENTATION[cluster.id] || { icon: Layers, badge: 'Growth Role', demand: 'Medium' };
    return {
      id: cluster.id,
      name: cluster.name,
      icon: presentation.icon,
      capacity: `~${cluster.capacity.toLocaleString('id-ID')} Staf`,
      role: cluster.targetRoles[0],
      badge: presentation.badge,
      description: cluster.adjacencyReason,
      pills: {
        targetRoles: cluster.targetRoles.join(', '),
        curriculum: cluster.curriculumWeeks,
        demand: presentation.demand,
        capacity: `${cluster.capacity.toLocaleString('id-ID')} Staf`,
      },
      capabilitiesRequired: cluster.keySkillsTrained.map((name) => ({ name })),
    };
  });

  const totalCapacity = RECEIVING_CLUSTERS.reduce((sum, c) => sum + c.capacity, 0);

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
          <span className="text-slate-500">Total Kapasitas Klaster Penerima:</span>
          <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            ~{totalCapacity.toLocaleString('id-ID')} Staf
          </span>
        </div>
      </div>

      {/* Main Grid: Clusters on Left, Role Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Business Growth Clusters (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
          <div className="px-2 py-1 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
            Business Growth Clusters ({growthClusters.length})
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
              <span className="text-slate-500 text-[10px] block">Target Roles</span>
              <span className="font-bold text-slate-900">{current.pills.targetRoles}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 text-[10px] block">Kurikulum</span>
              <span className="font-bold text-slate-900 font-mono">{current.pills.curriculum}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 text-[10px] block">Market Demand</span>
              <span className="font-bold text-rose-600">{current.pills.demand}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 text-[10px] block">Kapasitas</span>
              <span className="font-bold text-slate-900 font-mono">{current.pills.capacity}</span>
            </div>
          </div>

          {/* Key Skills Trained — sourced from RECEIVING_CLUSTERS.keySkillsTrained.
              No per-skill proficiency level shown: the underlying data doesn't
              define one, and inventing L1-L5 badges here would repeat the same
              fabrication pattern already fixed elsewhere in the app. */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Skills Trained
            </h3>

            <div className="flex flex-wrap gap-2">
              {current.capabilitiesRequired.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50/70 border border-blue-200 text-xs"
                >
                  <span className="font-medium text-slate-800">{cap.name}</span>
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
