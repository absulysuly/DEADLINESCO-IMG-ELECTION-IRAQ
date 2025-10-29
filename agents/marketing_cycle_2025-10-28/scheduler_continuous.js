import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';

console.log('🔥 ==========================================');
console.log('🔥 CONTINUOUS AGENT MODE - NON-STOP');
console.log('🔥 Agents run every 10 minutes automatically');
console.log('🔥 MAXIMUM DATA COLLECTION SPEED!');
console.log('🔥 ==========================================\n');

// ⚡ CHANGE THIS TO CONTROL FREQUENCY ⚡
const MINUTES_BETWEEN_RUNS = 10; // 10 minutes = fast data collection!

const CYCLE_INTERVAL = MINUTES_BETWEEN_RUNS * 60 * 1000; // Convert to milliseconds
const LOG_FILE = './scheduler_log.txt';

let cycleCount = 0;

// Ensure log file exists
if (!existsSync(LOG_FILE)) {
  writeFileSync(LOG_FILE, '=== CONTINUOUS AGENT SCHEDULER LOG ===\n\n');
}

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(message);
  
  try {
    appendFileSync(LOG_FILE, logEntry);
  } catch (err) {
    console.error('Failed to write to log:', err);
  }
}

async function runAgentCycle() {
  cycleCount++;
  const cycleStart = Date.now();
  const cycleId = new Date().toISOString().replace(/[:.]/g, '-');
  
  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`🚀 CYCLE #${cycleCount} STARTING: ${new Date().toLocaleString()}`);
  logMessage(`${'='.repeat(80)}`);
  
  try {
    // Create archive directory for this cycle
    const archiveDir = `./archive/cycle_${cycleCount}_${cycleId}`;
    if (!existsSync('./archive')) {
      mkdirSync('./archive');
    }
    
    logMessage(`📋 Running all 6 agents (Cycle #${cycleCount})...`);
    
    // Run all agents
    execSync('node run_all_agents.js', { stdio: 'inherit' });
    
    const cycleEnd = Date.now();
    const duration = ((cycleEnd - cycleStart) / 1000).toFixed(2);
    
    logMessage(`✅ CYCLE #${cycleCount} COMPLETED in ${duration} seconds`);
    logMessage(`📊 New data generated: 48 candidates, 20 venues, 30 posts`);
    logMessage(`⏰ Next cycle in ${MINUTES_BETWEEN_RUNS} minutes at ${new Date(Date.now() + CYCLE_INTERVAL).toLocaleString()}`);
    logMessage(`📈 Total cycles completed today: ${cycleCount}`);
    
    return true;
  } catch (error) {
    logMessage(`❌ CYCLE #${cycleCount} FAILED: ${error.message}`);
    logMessage(`⏰ Will retry in ${MINUTES_BETWEEN_RUNS} minutes`);
    return false;
  }
}

// Calculate daily production
const cyclesPerDay = Math.floor((24 * 60) / MINUTES_BETWEEN_RUNS);
const candidatesPerDay = cyclesPerDay * 48;
const venuesPerDay = cyclesPerDay * 20;
const postsPerDay = cyclesPerDay * 30;

logMessage('🔥 CONTINUOUS SCHEDULER ACTIVATED!');
logMessage(`⚡ Frequency: Every ${MINUTES_BETWEEN_RUNS} minutes`);
logMessage(`📊 Cycles per day: ${cyclesPerDay}`);
logMessage(`👥 Candidates per day: ${candidatesPerDay}`);
logMessage(`🏛️ Venues per day: ${venuesPerDay}`);
logMessage(`✍️ Posts per day: ${postsPerDay}`);
logMessage('');

// Run first cycle immediately
logMessage('🎬 Starting first cycle NOW...\n');
runAgentCycle().then(() => {
  logMessage(`\n✅ First cycle complete! Agents will run again in ${MINUTES_BETWEEN_RUNS} minutes`);
  logMessage('📝 Check scheduler_log.txt for full execution history');
  logMessage('🛑 Press Ctrl+C to stop the scheduler\n');
});

// Schedule recurring cycles
setInterval(async () => {
  await runAgentCycle();
}, CYCLE_INTERVAL);

// Keep the process running
process.on('SIGINT', () => {
  logMessage('\n🛑 Scheduler stopped by user');
  logMessage(`✅ Total cycles completed: ${cycleCount}`);
  logMessage(`📊 Total candidates generated: ${cycleCount * 48}`);
  logMessage(`🏛️ Total venues generated: ${cycleCount * 20}`);
  logMessage(`✍️ Total posts generated: ${cycleCount * 30}`);
  logMessage('✅ All agent work has been saved');
  process.exit(0);
});

logMessage('✨ Agents are now in CONTINUOUS mode!');
logMessage(`🔄 Running every ${MINUTES_BETWEEN_RUNS} minutes`);
logMessage('📂 Logs saved to: scheduler_log.txt');
logMessage('🔥 MAXIMUM DATA COLLECTION ACTIVATED!\n');


