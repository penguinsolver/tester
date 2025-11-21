import React, { useState } from 'react';
import { CHECKLIST_ITEMS } from '../constants';
import { CheckSquare, Square, ClipboardList } from 'lucide-react';

export const AnamnesisTab: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCheckedItems(newSet);
  };

  const renderCategory = (title: string, category: string, colorClass: string) => (
    <div className="mb-6 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className={`px-4 py-3 font-bold text-lg ${colorClass} border-b border-slate-100 flex items-center gap-2`}>
        <ClipboardList className="w-5 h-5 opacity-70" />
        {title}
      </div>
      <div className="divide-y divide-slate-50">
        {CHECKLIST_ITEMS.filter(i => i.category === category).map(item => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="w-full px-4 py-4 flex items-center gap-3 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            {checkedItems.has(item.id) ? (
              <CheckSquare className="w-6 h-6 text-medical-600 shrink-0" />
            ) : (
              <Square className="w-6 h-6 text-slate-300 shrink-0" />
            )}
            <span className={checkedItems.has(item.id) ? "text-slate-900 font-medium" : "text-slate-600"}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-2 pb-20">
      <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-900 text-sm">
        Vraag (hetero)anamnese uit. Videomateriaal van de aanval is zeer waardevol.
      </div>
      
      {renderCategory("Voor de aanval (Prodromen/Uitlokkers)", "voor", "bg-orange-50 text-orange-900")}
      {renderCategory("Tijdens de aanval (Ictaal)", "tijdens", "bg-red-50 text-red-900")}
      {renderCategory("Na de aanval (Post-ictaal)", "na", "bg-slate-100 text-slate-800")}

      <div className="mt-8">
        <button 
            onClick={() => setCheckedItems(new Set())}
            className="w-full py-3 text-slate-400 text-sm font-medium hover:text-slate-600"
        >
            Reset Checklist
        </button>
      </div>
    </div>
  );
};