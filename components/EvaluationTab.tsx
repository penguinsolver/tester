import React, { useState } from 'react';
import { AlertTriangle, Check, ChevronRight, RotateCcw, Activity, FileText } from 'lucide-react';
import { RED_FLAGS } from '../constants';
import { EvaluationResultType } from '../types';

export const EvaluationTab: React.FC = () => {
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<{type: EvaluationResultType, message: string, details?: string} | null>(null);

  const reset = () => {
    setStep(0);
    setHistory([]);
    setResult(null);
  };

  const handleAnswer = (answer: boolean, nextStepId?: number) => {
    // Logic based on PDF Page 1 Algorithm
    
    // Step 0: Red Flags
    if (step === 0) {
      if (answer) { // Has Red Flags
        setResult({
            type: EvaluationResultType.EMERGENCY,
            message: "SPOED / CITO Verwijzing",
            details: "Patiënt hemodynamisch instabiel of Red Flags aanwezig. Bel 115 of stuur direct in."
        });
      } else {
        setStep(1);
      }
      return;
    }

    // Step 1: Eerste aanval?
    if (step === 1) {
        if (answer) { // Yes, first seizure
            setStep(2);
        } else { // No, not first
            setResult({
                type: EvaluationResultType.GP_CARE,
                message: "Overweeg andere diagnose of bekende epilepsie",
                details: "Bekijk differentiaal diagnose of behandel volgens bestaand behandelplan (zie medicatie tab)."
            });
        }
        return;
    }

    // Step 2: Uitlokkende factoren?
    if (step === 2) {
        if (answer) { // Yes, triggers present
            setResult({
                type: EvaluationResultType.GP_CARE,
                message: "Waarschijnlijk Gelegenheidsinsult",
                details: "Geen anti-epileptica starten. Adviseer vermijden van triggers (slaaptekort, alcohol, etc.)."
            });
        } else {
            setStep(3);
        }
        return;
    }

    // Step 3: Lab onderzoek afwijkend?
    if (step === 3) {
        if (answer) { // Yes, lab abnormal
            setResult({
                type: EvaluationResultType.GP_CARE,
                message: "Symptomatisch insult (Metabool/Toxisch)",
                details: "Corrigeer de onderliggende afwijking (glucose, elektrolyten). Geen anti-epileptica starten tenzij recidief."
            });
        } else { // No, lab normal
            setResult({
                type: EvaluationResultType.REFERRAL,
                message: "Verwijzing Neuroloog",
                details: "Geen verklarende afwijking gevonden. Start (hetero)anamnese, EEG, MRI. Start geen medicatie na slechts 1 aanval zonder diagnose."
            });
        }
        return;
    }
  };

  if (result) {
    return (
      <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className={`p-6 rounded-xl text-center flex-grow flex flex-col items-center justify-center gap-4 ${
            result.type === EvaluationResultType.EMERGENCY ? 'bg-red-50 text-red-900' :
            result.type === EvaluationResultType.REFERRAL ? 'bg-orange-50 text-orange-900' :
            'bg-green-50 text-green-900'
        }`}>
            {result.type === EvaluationResultType.EMERGENCY && <AlertTriangle className="w-16 h-16 text-red-600" />}
            {result.type === EvaluationResultType.REFERRAL && <FileText className="w-16 h-16 text-orange-600" />}
            {result.type === EvaluationResultType.GP_CARE && <Check className="w-16 h-16 text-green-600" />}
            
            <h2 className="text-2xl font-bold">{result.message}</h2>
            <p className="text-lg opacity-90">{result.details}</p>
        </div>
        <button 
            onClick={reset}
            className="mt-4 w-full py-4 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-slate-700"
        >
            <RotateCcw className="w-5 h-5" /> Nieuwe Evaluatie
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between text-slate-500 text-sm mb-2">
           <span>Stap {step + 1} van 4</span>
           <Activity className="w-4 h-4" />
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-medical-600 h-full transition-all duration-300" style={{ width: `${(step + 1) * 25}%` }}></div>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {step === 0 && (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Zijn er RED FLAGS?</h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                    <ul className="grid grid-cols-1 gap-2 text-red-800 font-medium">
                        {RED_FLAGS.map((flag, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 mt-1 shrink-0" />
                                {flag}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}

        {step === 1 && (
            <div>
                <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Betreft het de EERSTE epileptische aanval?</h2>
                <p className="text-slate-600 text-center mb-8">Heeft de patiënt nooit eerder een insult gehad?</p>
            </div>
        )}

        {step === 2 && (
             <div>
                <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Zijn er UITLOKKENDE factoren?</h2>
                <div className="space-y-2 mb-8 max-w-md mx-auto text-slate-700 bg-white p-4 rounded-lg shadow-sm border">
                    <p>Bijv:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Slaapdeprivatie</li>
                        <li>Alcohol onttrekking</li>
                        <li>Lichtflitsen</li>
                        <li>Acute stress / emoties</li>
                    </ul>
                </div>
            </div>
        )}

        {step === 3 && (
             <div>
                <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Zijn er VERKLARENDE afwijkingen in het LAB?</h2>
                <div className="space-y-2 mb-8 max-w-md mx-auto text-slate-700 bg-white p-4 rounded-lg shadow-sm border">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Glucose (Hypo/Hyper)</li>
                        <li>Natrium (Laag)</li>
                        <li>Calcium, Magnesium</li>
                        <li>Nierfunctie/Ureum</li>
                        <li>Intoxicaties</li>
                    </ul>
                </div>
            </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <button 
            onClick={() => handleAnswer(true)}
            className={`py-4 px-6 rounded-xl font-bold text-lg shadow-md transition-transform active:scale-95 flex flex-col items-center justify-center gap-1
                ${step === 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-medical-600 text-white hover:bg-medical-700'}
            `}
        >
            <Check className="w-6 h-6" />
            {step === 0 ? 'JA (Alarm)' : 'JA'}
        </button>
        <button 
            onClick={() => handleAnswer(false)}
            className="py-4 px-6 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-lg shadow-sm hover:bg-slate-50 transition-transform active:scale-95 flex flex-col items-center justify-center gap-1"
        >
             <span className="text-2xl font-bold">&times;</span>
             NEE
        </button>
      </div>
    </div>
  );
};