export enum Tab {
    EVALUATION = 'evaluatie',
    ANAMNESIS = 'anamnese',
    MEDICATION = 'medicatie',
    INFO = 'info'
  }
  
  export interface Medication {
    name: string;
    forms: string[];
    dosage: string;
    childDosage?: string;
    sideEffects: {
      doseDependent: string[];
      idiosyncratic: string[];
    };
    warnings?: string[];
    contraIndications?: string[];
    interactions?: string[];
  }
  
  export interface Interaction {
    drug: string;
    affects: string[];
    affectedBy: string[];
    decreasedBy: string[];
  }
  
  export interface CheckItem {
    id: string;
    label: string;
    category: 'voor' | 'tijdens' | 'na' | 'algemeen';
  }
  
  export enum EvaluationResultType {
    EMERGENCY = 'emergency',
    REFERRAL = 'referral',
    GP_CARE = 'gp_care',
    UNCERTAIN = 'uncertain'
  }