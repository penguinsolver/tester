import React from 'react';
import { DIFFERENTIAL_DIAGNOSIS } from '../constants';
import { HelpCircle, Stethoscope } from 'lucide-react';

export const InfoTab: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-medical-800 mb-4 flex items-center gap-2">
          <Stethoscope className="w-6 h-6" />
          Differentiaal Diagnose
        </h2>
        <div className="space-y-4">
          {DIFFERENTIAL_DIAGNOSIS.map((item, idx) => (
            <div key={idx} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-medical-50 p-4 rounded-xl border border-medical-100 text-medical-900">
        <h3 className="font-bold mb-2 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Wanneer neuroloog?
        </h3>
        <ul className="list-disc pl-5 text-sm space-y-2">
            <li>Na elke <strong>eerste</strong> epileptische aanval (voor EEG/MRI).</li>
            <li>Bij onduidelijke diagnose (twijfel tussen syncope/epilepsie).</li>
            <li>Bij falen van ingestelde therapie.</li>
            <li>Bij zwangerschapswens.</li>
        </ul>
      </div>
      
      <div className="p-4 text-center text-xs text-slate-400">
        Gebaseerd op SPAOGS Richtlijn S35 Epilepsie (Suriname).
      </div>
    </div>
  );
};