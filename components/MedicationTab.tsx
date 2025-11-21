import React, { useState } from 'react';
import { MEDICATIONS } from '../constants';
import { Pill, AlertCircle, ChevronDown, ChevronUp, Baby, AlertTriangle } from 'lucide-react';

export const MedicationTab: React.FC = () => {
  const [expandedDrug, setExpandedDrug] = useState<string | null>(null);

  const toggleDrug = (name: string) => {
    if (expandedDrug === name) {
      setExpandedDrug(null);
    } else {
      setExpandedDrug(name);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 flex gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
            <p className="font-bold">Let op interacties!</p>
            <p>Controleer altijd comedicatie (o.a. DOACs, Anticonceptie) bij start anti-epileptica.</p>
        </div>
      </div>

      <div className="space-y-3">
        {MEDICATIONS.map((drug) => {
          const isExpanded = expandedDrug === drug.name;
          
          return (
            <div key={drug.name} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all">
              <button 
                onClick={() => toggleDrug(drug.name)}
                className="w-full px-4 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-medical-100 p-2 rounded-full text-medical-600">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-900">{drug.name}</h3>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{drug.forms[0]}</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0 text-sm space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="h-px bg-slate-100 w-full my-2" />
                  
                  <div>
                    <h4 className="font-bold text-slate-700 mb-1">Dosering Volwassenen</h4>
                    <p className="text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">{drug.dosage}</p>
                  </div>

                  {drug.childDosage && (
                    <div>
                      <h4 className="font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Baby className="w-4 h-4" /> Kind
                      </h4>
                      <p className="text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">{drug.childDosage}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <h4 className="font-bold text-slate-700 mb-1">Bijwerkingen (Dosisafhankelijk)</h4>
                      <ul className="list-disc pl-5 text-slate-600 text-xs space-y-1">
                        {drug.sideEffects.doseDependent.map((se, i) => <li key={i}>{se}</li>)}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-700 mb-1">Bijwerkingen (Idiosyncratisch)</h4>
                      <ul className="list-disc pl-5 text-slate-600 text-xs space-y-1">
                        {drug.sideEffects.idiosyncratic.map((se, i) => <li key={i}>{se}</li>)}
                      </ul>
                    </div>
                  </div>

                  {(drug.warnings || drug.contraIndications) && (
                    <div className="bg-red-50 p-3 rounded border border-red-100 text-red-900 mt-2">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <AlertCircle className="w-4 h-4" />
                        Waarschuwingen
                      </div>
                      <ul className="list-disc pl-5 text-xs space-y-1">
                        {drug.warnings?.map((w, i) => <li key={`w-${i}`}>{w}</li>)}
                        {drug.contraIndications?.map((c, i) => <li key={`c-${i}`}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};