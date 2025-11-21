import React, { useState } from 'react';
import { Activity, ClipboardList, Pill, Info, AlertTriangle } from 'lucide-react';
import { EvaluationTab } from './components/EvaluationTab';
import { AnamnesisTab } from './components/AnamnesisTab';
import { MedicationTab } from './components/MedicationTab';
import { InfoTab } from './components/InfoTab';
import { AcuteModal } from './components/AcuteModal';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.EVALUATION);
  const [isAcuteModalOpen, setIsAcuteModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.EVALUATION:
        return <EvaluationTab />;
      case Tab.ANAMNESIS:
        return <AnamnesisTab />;
      case Tab.MEDICATION:
        return <MedicationTab />;
      case Tab.INFO:
        return <InfoTab />;
      default:
        return <EvaluationTab />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 max-w-md mx-auto shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="bg-medical-700 text-white p-4 shadow-md flex justify-between items-center shrink-0 z-10">
        <div>
          <h1 className="font-bold text-lg leading-tight">Epilepsie Richtlijn</h1>
          <p className="text-xs text-medical-100">Eerste Lijn (S35)</p>
        </div>
        <button 
          onClick={() => setIsAcuteModalOpen(true)}
          className="bg-alert-red hover:bg-red-600 text-white px-3 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm animate-pulse"
        >
          <AlertTriangle className="w-5 h-5" />
          <span>ACUUT</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-4 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-200 fixed bottom-0 w-full max-w-md flex justify-between px-2 py-2 pb-safe z-10">
        <button 
          onClick={() => setActiveTab(Tab.EVALUATION)}
          className={`flex flex-col items-center p-2 rounded-lg flex-1 transition-colors ${activeTab === Tab.EVALUATION ? 'text-medical-600 bg-medical-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Activity className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Evaluatie</span>
        </button>
        
        <button 
          onClick={() => setActiveTab(Tab.ANAMNESIS)}
          className={`flex flex-col items-center p-2 rounded-lg flex-1 transition-colors ${activeTab === Tab.ANAMNESIS ? 'text-medical-600 bg-medical-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <ClipboardList className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Anamnese</span>
        </button>

        <button 
          onClick={() => setActiveTab(Tab.MEDICATION)}
          className={`flex flex-col items-center p-2 rounded-lg flex-1 transition-colors ${activeTab === Tab.MEDICATION ? 'text-medical-600 bg-medical-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Pill className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Medicatie</span>
        </button>

        <button 
          onClick={() => setActiveTab(Tab.INFO)}
          className={`flex flex-col items-center p-2 rounded-lg flex-1 transition-colors ${activeTab === Tab.INFO ? 'text-medical-600 bg-medical-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Info className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Info & DD</span>
        </button>
      </nav>

      {/* Modals */}
      <AcuteModal isOpen={isAcuteModalOpen} onClose={() => setIsAcuteModalOpen(false)} />
    </div>
  );
};

export default App;