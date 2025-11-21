import React from 'react';
import { X, AlertTriangle, Syringe } from 'lucide-react';
import { ACUTE_TREATMENT } from '../constants';

interface AcuteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcuteModal: React.FC<AcuteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border-t-8 border-alert-red">
        <div className="p-4 bg-alert-red text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            SPOED: Couperen Insult
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-bold text-red-800 mb-2">Status Epilepticus (> 5 min)</h3>
            <ul className="list-disc pl-5 space-y-1 text-red-900 font-medium">
                {ACUTE_TREATMENT.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Syringe className="w-5 h-5 text-medical-600" />
                Rectaal Diazepam Dosering
            </h3>
            <div className="grid gap-2">
                {ACUTE_TREATMENT.medication.map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-md flex justify-between items-center ${item.note ? 'bg-yellow-50 text-sm italic text-yellow-800' : 'bg-slate-100'}`}>
                        {item.note ? (
                            <span>{item.note}</span>
                        ) : (
                            <>
                                <span className="font-medium text-slate-700">{item.label}</span>
                                <span className="font-bold text-medical-700">{item.dose}</span>
                            </>
                        )}
                    </div>
                ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
             <strong>Bel 115</strong> bij respiratoir falen of onvoldoende effect na 2e dosis.
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button onClick={onClose} className="px-6 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg">
                Sluiten
            </button>
        </div>
      </div>
    </div>
  );
};