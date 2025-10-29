import { writeFileSync } from 'fs';

console.log('👥 Agent 3: Candidate Intelligence - STARTING...\n');

const governorates = [
  "Baghdad", "Basra", "Nineveh", "Erbil", "Sulaymaniyah", "Duhok",
  "Anbar", "Diyala", "Kirkuk", "Najaf", "Karbala", "Babil",
  "Dhi Qar", "Maysan", "Wasit", "Saladin", "Muthanna", "Qadisiyyah"
];

const parties = [
  { ar: "تحالف الوطن", en: "National Coalition" },
  { ar: "التحالف الكردستاني", en: "Kurdistan Alliance" },
  { ar: "الحزب الديمقراطي الكردستاني", en: "Kurdistan Democratic Party" },
  { ar: "الاتحاد الوطني الكردستاني", en: "Patriotic Union of Kurdistan" },
  { ar: "التيار الصدري", en: "Sadrist Movement" },
  { ar: "تحالف الفتح", en: "Fatah Alliance" },
  { ar: "تحالف النصر", en: "Victory Alliance" },
  { ar: "حركة التغيير", en: "Change Movement" },
  { ar: "مستقل", en: "Independent" }
];

const arabicFirstNames = ["محمد", "أحمد", "علي", "حسن", "حسين", "عمر", "خالد", "يوسف", "فاطمة", "زينب", "مريم", "عائشة", "سارة", "نور"];
const arabicFamilyNames = ["الجبوري", "التميمي", "الدليمي", "الكردي", "البصري", "الموصلي", "النجفي", "الكربلائي", "العبيدي", "الشمري"];
const kurdishFirstNames = ["هیوا", "آواز", "دلوفان", "دیاکو", "رەشید", "کریم", "شیلان", "هەڵۆ"];
const professions = ["Lawyer", "Doctor", "Engineer", "University Professor", "Business Owner", "Civil Society Activist", "Former Government Official"];

const governorateTargets = {
  "Baghdad": 5, "Basra": 4, "Nineveh": 4, "Erbil": 4,
  "Sulaymaniyah": 3, "Duhok": 2, "Anbar": 3, "Diyala": 2,
  "Kirkuk": 3, "Najaf": 2, "Karbala": 2, "Babil": 2,
  "Dhi Qar": 2, "Maysan": 2, "Wasit": 2, "Saladin": 2,
  "Muthanna": 2, "Qadisiyyah": 2
};

const candidates = [];
const timestamp = new Date().toISOString();
let candidateId = 1;

for (const [governorate, count] of Object.entries(governorateTargets)) {
  for (let i = 0; i < count; i++) {
    const isKurdish = ["Erbil", "Sulaymaniyah", "Duhok"].includes(governorate);
    const firstName = isKurdish 
      ? kurdishFirstNames[Math.floor(Math.random() * kurdishFirstNames.length)]
      : arabicFirstNames[Math.floor(Math.random() * arabicFirstNames.length)];
    const familyName = arabicFamilyNames[Math.floor(Math.random() * arabicFamilyNames.length)];
    const party = parties[Math.floor(Math.random() * parties.length)];
    const profession = professions[Math.floor(Math.random() * professions.length)];
    const age = 25 + Math.floor(Math.random() * 45);
    const phone = `+964-77${Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    
    const nameEnglish = `${firstName} ${familyName}`.replace(/[^\x00-\x7F]/g, '');
    const usernameBase = nameEnglish.toLowerCase().replace(/\s+/g, '');
    
    candidates.push({
      id: `cand_${String(candidateId).padStart(3, '0')}`,
      name: `${firstName} ${familyName}`,
      nameEnglish: nameEnglish || `Candidate ${candidateId}`,
      governorate: governorate,
      party: party.ar,
      partyEnglish: party.en,
      contact: phone,
      email: `${usernameBase}${candidateId}@example.iq`,
      socialMedia: {
        facebook: `https://facebook.com/${usernameBase}${candidateId}`,
        twitter: `https://twitter.com/${usernameBase}${candidateId}`,
        instagram: `https://instagram.com/${usernameBase}${candidateId}`
      },
      bio: `${profession} with ${Math.floor(Math.random() * 20) + 5} years of experience in civic work and community service.`,
      bioEnglish: `${profession} with ${Math.floor(Math.random() * 20) + 5} years of experience in civic work and community service.`,
      age: age,
      education: `Bachelor of ${profession === "Lawyer" ? "Law" : profession === "Doctor" ? "Medicine" : "Science"}`,
      experience: profession,
      verified: false,
      timestamp: timestamp,
      agentSignature: "Agent3_CandidateIntelligence"
    });
    
    candidateId++;
  }
}

const output = {
  candidates: candidates,
  metadata: {
    totalCount: candidates.length,
    lastUpdated: timestamp,
    governoratesCovered: governorates.length,
    partiesRepresented: parties.length,
    languagesUsed: ["ar", "ku", "en"]
  }
};

writeFileSync('./candidates_mock.json', JSON.stringify(output, null, 2));

const governorateBreakdown = {};
governorates.forEach(gov => {
  governorateBreakdown[gov] = candidates.filter(c => c.governorate === gov).length;
});

const log = {
  timestamp: timestamp,
  agentSignature: "Agent3_CandidateIntelligence",
  executionStats: {
    totalCandidatesCreated: candidates.length,
    fromExistingCSV: 0,
    mockGenerated: candidates.length,
    governoratesCovered: governorates.length,
    partiesRepresented: parties.length
  },
  governorateBreakdown: governorateBreakdown,
  dataQuality: {
    withSocialMedia: candidates.length,
    withEmail: candidates.length,
    withBio: candidates.length,
    withWebsite: 0
  }
};

writeFileSync('./intelligence_log.json', JSON.stringify(log, null, 2));

console.log('✅ Agent 3: COMPLETE');
console.log(`   Generated ${candidates.length} candidates across ${governorates.length} governorates`);
console.log(`   Output: candidates_mock.json`);
console.log(`   Log: intelligence_log.json\n`);


