import { writeFileSync } from 'fs';

console.log('🏛️  Agent 2: Event Outreach - STARTING...\n');

const governorates = [
  "Baghdad", "Basra", "Nineveh", "Erbil", "Sulaymaniyah", "Duhok",
  "Anbar", "Diyala", "Kirkuk", "Najaf", "Karbala", "Babil",
  "Dhi Qar", "Maysan", "Wasit", "Saladin", "Muthanna", "Qadisiyyah"
];

const categories = [
  "Hospitality", "Media", "Logistics", "Sponsors",
  "NGOs", "Security", "Transport", "Tech", "Medical"
];

const venues = [
  // Hospitality
  { name: "Al-Rashid Hotel", category: "Hospitality", services: ["Catering", "AV Equipment", "Parking"], capacity: 500 },
  { name: "Basra Grand Hotel", category: "Hospitality", services: ["Conference Rooms", "Catering", "Accommodation"], capacity: 300 },
  { name: "Erbil Rotana", category: "Hospitality", services: ["Banquet Hall", "Catering", "Parking"], capacity: 400 },
  { name: "Baghdad Convention Center", category: "Hospitality", services: ["Large Halls", "AV Equipment", "Catering"], capacity: 1000 },
  { name: "Elite Catering Services", category: "Hospitality", services: ["Food Service", "Event Catering"], capacity: 200 },
  
  // Media
  { name: "Iraq Media Center", category: "Media", services: ["Press Rooms", "Broadcasting Equipment"], capacity: 100 },
  { name: "Al-Iraqiya Press Room", category: "Media", services: ["Journalism Support", "Live Streaming"], capacity: 50 },
  
  // Logistics
  { name: "Baghdad Logistics Hub", category: "Logistics", services: ["Equipment Rental", "Storage"], capacity: 150 },
  { name: "Quick Setup Services", category: "Logistics", services: ["Event Setup", "Breakdown Services"], capacity: 100 },
  { name: "Event Equipment Rental", category: "Logistics", services: ["Tables", "Chairs", "Tents"], capacity: 200 },
  
  // Sponsors
  { name: "Zain Iraq", category: "Sponsors", services: ["Telecom Sponsorship", "Internet Services"], capacity: 20 },
  { name: "Rasheed Bank", category: "Sponsors", services: ["Financial Sponsorship"], capacity: 15 },
  { name: "Iraqi Business Council", category: "Sponsors", services: ["Corporate Sponsorship"], capacity: 30 },
  { name: "AsiaCell Communications", category: "Sponsors", services: ["Telecom Sponsorship"], capacity: 25 },
  
  // NGOs
  { name: "Iraqi Elections Watch", category: "NGOs", services: ["Election Monitoring"], capacity: 40 },
  { name: "Democracy Center Iraq", category: "NGOs", services: ["Civic Education"], capacity: 50 },
  
  // Security
  { name: "Elite Security Services", category: "Security", services: ["Venue Security", "Crowd Control"], capacity: 30 },
  
  // Transport
  { name: "Baghdad Transport Co", category: "Transport", services: ["Bus Rental", "Shuttle Services"], capacity: 100 },
  
  // Tech
  { name: "Iraq Telecom", category: "Tech", services: ["Internet", "AV Equipment"], capacity: 40 },
  
  // Medical
  { name: "Red Crescent Iraq", category: "Medical", services: ["Emergency Medical", "First Aid"], capacity: 20 }
];

const events = [];
const timestamp = new Date().toISOString();

venues.forEach((venue, index) => {
  const govIndex = index % governorates.length;
  const phone = `+964-77${String(index).padStart(1, '0')}-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  
  events.push({
    id: `evt_${String(index + 1).padStart(3, '0')}`,
    governorate: governorates[govIndex],
    category: venue.category,
    name: venue.name,
    contact: phone,
    capacity: venue.capacity,
    services: venue.services,
    address: `${venue.name}, ${governorates[govIndex]}`,
    verified: false,
    timestamp: timestamp,
    agentSignature: "Agent2_EventOutreach"
  });
});

const output = {
  events: events,
  categories: categories,
  metadata: {
    totalCount: events.length,
    lastUpdated: timestamp,
    governoratesCovered: governorates.length,
    categoriesUsed: categories.length
  }
};

writeFileSync('./events_mock.json', JSON.stringify(output, null, 2));

const log = {
  timestamp: timestamp,
  agentSignature: "Agent2_EventOutreach",
  executionStats: {
    totalVenuesCreated: events.length,
    governoratesCovered: governorates.length,
    categoriesUsed: categories.length,
    dataSourcesProcessed: ["mock_generation"]
  },
  categoryBreakdown: {
    "Hospitality": events.filter(e => e.category === "Hospitality").length,
    "Media": events.filter(e => e.category === "Media").length,
    "Logistics": events.filter(e => e.category === "Logistics").length,
    "Sponsors": events.filter(e => e.category === "Sponsors").length,
    "NGOs": events.filter(e => e.category === "NGOs").length,
    "Security": events.filter(e => e.category === "Security").length,
    "Transport": events.filter(e => e.category === "Transport").length,
    "Tech": events.filter(e => e.category === "Tech").length,
    "Medical": events.filter(e => e.category === "Medical").length
  }
};

writeFileSync('./outreach_log.json', JSON.stringify(log, null, 2));

console.log('✅ Agent 2: COMPLETE');
console.log(`   Generated ${events.length} venues across ${governorates.length} governorates`);
console.log(`   Output: events_mock.json`);
console.log(`   Log: outreach_log.json\n`);


