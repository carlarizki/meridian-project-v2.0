import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { NavTab, DecisionCategory, EmployeeRecord } from '../../types/meridian';
import { MERIDIAN_EMPLOYEES, MACRO_SPLIT_DATA } from '../../data/meridianData';

interface RedeploymentMobilityViewProps {
  onNavigate: (tab: NavTab) => void;
  categoryFilter: DecisionCategory | 'all';
  setCategoryFilter: (cat: DecisionCategory | 'all') => void;
  onSelectEmployee: (emp: EmployeeRecord) => void;
}

export const RedeploymentMobilityView: React.FC<RedeploymentMobilityViewProps> = ({
  onNavigate,
  categoryFilter,
  setCategoryFilter,
  onSelectEmployee,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'id' | 'name' | 'exposure' | 'fit'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter logic
  const filtered = MERIDIAN_EMPLOYEES.filter((emp) => {
    if (categoryFilter !== 'all' && emp.officialDecision !== categoryFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      emp.id.toLowerCase().includes(q) ||
      emp.name.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q) ||
      (emp.futureRoleTarget && emp.futureRoleTarget.toLowerCase().includes(q))
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'id') {
      return sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    }
    if (sortField === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortField === 'exposure') {
      return sortDirection === 'asc' ? a.exposure - b.exposure : b.exposure - a.exposure;
    }
    if (sortField === 'fit') {
      const fitA = a.fit ?? -1;
      const fitB = b.fit ?? -1;
      return sortDirection === 'asc' ? fitA - fitB : fitB - fitA;
    }
    return 0;
  });

  const handleSort = (field: 'id' | 'name' | 'exposure' | 'fit') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getDecisionBadge = (decision: DecisionCategory) => {
    switch (decision) {
      case 'Redeploy':
        return (
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
            Redeploy
          </span>
        );
      case 'Reskill -> Redeploy':
        return (
          <span className="text-[11px] font-bold text-blue-800 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
            Reskill &rarr; Redeploy
          </span>
        );
      case 'Reskill':
        return (
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
            Reskill
          </span>
        );
      case 'Further Assessment':
        return (
          <span className="text-[11px] font-bold text-purple-800 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded">
            Further Assessment
          </span>
        );
      case 'Voluntary Transition Review':
        return (
          <span className="text-[11px] font-bold text-rose-800 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded">
            Voluntary Transition
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 5 Decision Category Cards matching Screen 8 (Reconciled with PRD: 1.200 / 1.800 / 1.500 / 900 / 600) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {MACRO_SPLIT_DATA.map((item) => {
          const isSelected = categoryFilter === item.category;
          return (
            <button
              key={item.category}
              onClick={() => setCategoryFilter(isSelected ? 'all' : item.category)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {item.category}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">
                    {item.count.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    ({item.percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="text-[10px] text-slate-600">Populasi Pilot 6.000</div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-700">
                  Sampel: {item.sampleCount} orang
                </span>
                <span className="text-blue-600 font-bold">&rarr;</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobility Fit vs AI Exposure Scatter Matrix matching Screen 8 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Mobility Fit vs AI Exposure Matrix
            </h2>
            <p className="text-xs text-slate-600">
              Plotting capability fit against automation risk across the 24 pilot sample employees
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 font-medium text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Redeploy
            </span>
            <span className="flex items-center gap-1 font-medium text-blue-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Reskill &rarr; Redeploy
            </span>
            <span className="flex items-center gap-1 font-medium text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Reskill
            </span>
            <span className="flex items-center gap-1 font-medium text-purple-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Further Assessment
            </span>
            <span className="flex items-center gap-1 font-medium text-rose-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Voluntary Transition
            </span>
          </div>
        </div>

        {/* 2D Quadrant Canvas Container */}
        <div className="relative w-full h-56 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-4">
          {/* Axis Labels */}
          <div className="absolute left-2 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            100% Fit &uarr;
          </div>
          <div className="absolute left-2 bottom-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            0% Fit
          </div>
          <div className="absolute right-2 bottom-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            100% AI Exposure &rarr;
          </div>

          {/* Grid lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px border-r border-dashed border-slate-300"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-slate-300"></div>

          {/* Plotting 24 records */}
          {MERIDIAN_EMPLOYEES.map((emp) => {
            const xPercent = emp.exposure; // 0 - 100%
            const yPercent = emp.fit !== null ? 100 - emp.fit : 85; // inverted for CSS top
            let dotColor = 'bg-blue-600';
            if (emp.officialDecision === 'Redeploy') dotColor = 'bg-emerald-500 ring-2 ring-emerald-300';
            else if (emp.officialDecision === 'Reskill -> Redeploy') dotColor = 'bg-blue-600 ring-2 ring-blue-300';
            else if (emp.officialDecision === 'Reskill') dotColor = 'bg-amber-500 ring-2 ring-amber-300';
            else if (emp.officialDecision === 'Further Assessment') dotColor = 'bg-purple-500 ring-2 ring-purple-300';
            else if (emp.officialDecision === 'Voluntary Transition Review') dotColor = 'bg-rose-500 ring-2 ring-rose-300';

            return (
              <button
                key={emp.id}
                onClick={() => onSelectEmployee(emp)}
                className={`absolute w-3.5 h-3.5 rounded-full ${dotColor} transition-transform hover:scale-150 cursor-pointer shadow-xs`}
                style={{
                  left: `calc(${xPercent}% - 7px)`,
                  top: `calc(${yPercent}% - 7px)`,
                }}
                title={`${emp.id}: ${emp.name} (${emp.role}) - Fit: ${emp.fitRaw}, Exposure: ${emp.exposure}%, Decision: ${emp.officialDecision}`}
              />
            );
          })}
        </div>
      </div>

      {/* Roster Table matching Screen 8 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table header & Search bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID, nama, jabatan, peran target..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">
              Menampilkan <strong className="text-slate-900 font-mono">{sorted.length}</strong> dari 24 sampel
            </span>
            {categoryFilter !== 'all' && (
              <button
                onClick={() => setCategoryFilter('all')}
                className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Nama Pegawai</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Jabatan Eksisting</th>
                <th
                  onClick={() => handleSort('exposure')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Exposure</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fit')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Fit Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold text-center">Feasibility</th>
                <th className="py-3 px-4 font-semibold text-center">Evidence</th>
                <th className="py-3 px-4 font-semibold">Decision Output</th>
                <th className="py-3 px-4 font-semibold">Target Peran</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => onSelectEmployee(emp)}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">
                    {emp.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {emp.name}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {emp.role}
                  </td>
                  <td className="py-3 px-4 font-mono text-right text-rose-600 font-semibold">
                    {emp.exposure}%
                  </td>
                  <td className="py-3 px-4 font-mono text-right">
                    {emp.fitRaw === '— (data kosong)' ? (
                      <span className="text-slate-400 italic">data kosong</span>
                    ) : (
                      <span className="font-bold text-slate-900">{emp.fitRaw}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700">
                    {emp.feasibility}
                  </td>
                  <td className="py-3 px-4 text-center font-medium">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        emp.evidence === 'High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : emp.evidence === 'Medium'
                          ? 'bg-blue-100 text-blue-800'
                          : emp.evidence === 'Low'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {emp.evidence}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getDecisionBadge(emp.officialDecision)}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {emp.futureRoleTarget ? (
                      <span className="font-medium text-slate-900">{emp.futureRoleTarget}</span>
                    ) : (
                      <span className="text-slate-400 italic">Pending Assessment</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-blue-600 group-hover:translate-x-1 inline-block transition-transform">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
