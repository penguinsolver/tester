import { CheckItem, Interaction, Medication } from "./types";

export const RED_FLAGS = [
  "GCS < 15",
  "Focale neurologische uitval",
  "Acute hoofdpijn",
  "Schedeltrauma",
  "Tekenen ↑ intracraniële druk",
  "Hoofdpijn + insulten",
  "Graviditeit",
  "VG carcinoom",
  "R/anticoagulantia",
  "Chronisch alcoholisme"
];

export const ACUTE_TREATMENT = {
  title: "Couperen Insult (Convulsie > 5 min)",
  steps: [
    "ABCDE + stabiel zijligging",
    "Bel 115 cito overleg dmv SBAR / START BLS",
    "Respiratoir falen → O2 10-15 L/min",
    "Bloedsuikermeting"
  ],
  medication: [
    { label: "Volwassenen", dose: "Rectaal Diazepam 10-20 mg" },
    { label: "Kind < 6 mnd", dose: "2.5 mg (let op: halve rectiole v 5 mg)" },
    { label: "Kind 6 mnd - 3j", dose: "5 mg" },
    { label: "Kind > 3j", dose: "10 mg" },
    { note: "Herhaal 2e dosis convulsies 10 min na toediening 1e dosis" }
  ]
};

export const MEDICATIONS: Medication[] = [
  {
    name: "Carbamazepine",
    forms: ["Tabl 100, 200, 400mg", "Ret.tabl 200, 400 mg", "Susp 20 mg/ml"],
    dosage: "3 dd 200-400 mg of 2 dd 200-600 mg (retard)",
    childDosage: "10-25 mg/kg/d",
    sideEffects: {
      doseDependent: ["Diplopie", "ataxie", "sedatie", "misselijkheid", "wazig zien", "hoofdpijn", "neutropenie", "hyponatriëmie"],
      idiosyncratic: ["Rash", "Stevens-Johnson", "agranulocytose", "aplastische anemie", "hepatotoxiciteit", "lupusachtig beeld"]
    },
    warnings: ["Let op interacties met coumarines en DOACs!"]
  },
  {
    name: "Valproaat",
    forms: ["Tabl 300, 500 mg", "Ret. tabl 500 mg", "Drank/stroop 60 mg/ml"],
    dosage: "600-2000 mg/d",
    childDosage: "20-40 mg/kg/d",
    sideEffects: {
      doseDependent: ["Misselijkheid", "braken", "sedatie", "tremor", "haaruitval", "parkinsonisme", "gewichtstoename"],
      idiosyncratic: ["Hepatotoxiciteit", "pancreatitis", "trombocytopenie", "PCOS", "encefalopathie"]
    },
    contraIndications: ["Niet bij meisjes/vrouwen in de vruchtbare leeftijd (teratogeen)"]
  },
  {
    name: "Levetiracetam",
    forms: ["Tabl 250, 500, 1000 mg", "Drank 100 mg/ml", "Inj 100 mg/ml"],
    dosage: "2 dd 500 - 1500 mg",
    childDosage: "20 – 40 mg/kg/d",
    sideEffects: {
      doseDependent: ["Sedatie", "asthenie", "ataxie", "misselijkheid", "hoofdpijn"],
      idiosyncratic: ["Prikkelbaarheid", "Rash", "Gedragsverandering"]
    },
    warnings: ["Relatieve contra-indicatie bij psychiatrische voorgeschiedenis"]
  },
  {
    name: "Clobazam",
    forms: ["Tab 10 mg", "orale susp 1 mg/ml"],
    dosage: "Volw: start 5-15 mg/d, max 80 mg/d",
    childDosage: "≥ 6j: start 5 mg/d, onderhoud 0.3-1 mg/kg",
    sideEffects: {
      doseDependent: ["Somnolentie", "vermoeidheid (>10%)"],
      idiosyncratic: ["Afhankelijkheid"]
    },
    warnings: ["Invloed op rijvaardigheid"]
  },
  {
    name: "Lamotrigine",
    forms: ["Tabl 2, 5, 25, 50, 100, 200 mg"],
    dosage: "Mono: 100-200 mg/dag",
    sideEffects: {
      doseDependent: ["Hoofdpijn", "duizeligheid"],
      idiosyncratic: ["Huiduitslag (Rash) - start langzaam!"]
    },
    warnings: ["Bij combi met Valproaat dosis halveren"]
  }
];

export const CHECKLIST_ITEMS: CheckItem[] = [
  { id: 'voortekenen', label: 'Voorafgaande tekenen (infectie)', category: 'voor' },
  { id: 'intox', label: 'Intoxicatie (drugs, alcohol)', category: 'voor' },
  { id: 'meds', label: 'Medicatie wijziging/staken', category: 'voor' },
  { id: 'slaap', label: 'Slaapdeprivatie', category: 'voor' },
  { id: 'omgeving', label: 'Omstandigheden (stress, licht, etc.)', category: 'voor' },
  
  { id: 'bewustzijn', label: 'Bewustzijnsverlies', category: 'tijdens' },
  { id: 'motorisch', label: 'Motorisch: Ritme, stijf, slap', category: 'tijdens' },
  { id: 'huid', label: 'Kleur: Blauw/Bleek', category: 'tijdens' },
  { id: 'tong', label: 'Tongbeet (zijkant)', category: 'tijdens' },
  { id: 'urine', label: 'Urine incontinentie', category: 'tijdens' },
  
  { id: 'na_verward', label: 'Verwardheid', category: 'na' },
  { id: 'na_slaap', label: 'Slaperigheid', category: 'na' },
  { id: 'na_spier', label: 'Spierpijn', category: 'na' },
  { id: 'na_focaal', label: 'Focale uitval (Todd\'s parese)', category: 'na' }
];

export const DIFFERENTIAL_DIAGNOSIS = [
  { title: "Syncope", desc: "Cardiaal, Reflex, Orthostatisch. Kenmerken: Bleek, kortdurend, snel herstel." },
  { title: "Functioneel (PNEA)", desc: "Vaak langere duur, gesloten ogen, wild bewegen, kan onderbroken worden." },
  { title: "Hyperventilatie/Paniek", desc: "Onrust, tintelingen, angst." },
  { title: "Migraine", desc: "Aura kan lijken op focale aanval." }
];