import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

console.log('🔄 ==========================================');
console.log('🔄 CONTINUOUS AGENT SCHEDULER ACTIVATED');
console.log('🔄 Agents will run every 6 hours automatically');
console.log('🔄 ==========================================\n');

const CYCLE_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const LOG_FILE = './scheduler_log.txt';

// Ensure log file exists
if (!existsSync(LOG_FILE)) {
  writeFileSync(LOG_FILE, '');
}

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(message);
  
  try {
    const fs = await import('fs');
    fs.appendFileSync(LOG_FILE, logEntry);
  } catch (err) {
    console.error('Failed to write to log:', err);
  }
}

async function runAgentCycle() {
  const cycleStart = Date.now();
  const cycleId = new Date().toISOString().replace(/[:.]/g, '-');
  
  logMessage(`\n${'='.repeat(60)}`);
  logMessage(`🚀 STARTING NEW AGENT CYCLE: ${cycleId}`);
  logMessage(`${'='.repeat(60)}`);
  
  try {
    // Create archive directory for this cycle
    const archiveDir = `./archive/cycle_${cycleId}`;
    if (!existsSync('./archive')) {
      mkdirSync('./archive');
    }
    if (!existsSync(archiveDir)) {
      mkdirSync(archiveDir, { recursive: true });
    }
    
    logMessage('📋 Running all 6 agents...');
    
    // Run all agents
    execSync('node run_all_agents.js', { stdio: 'inherit' });
    
    const cycleEnd = Date.now();
    const duration = ((cycleEnd - cycleStart) / 1000).toFixed(2);
    
    logMessage(`✅ CYCLE COMPLETED in ${duration} seconds`);
    logMessage(`📊 New data generated and ready for use`);
    logMessage(`⏰ Next cycle in 6 hours at ${new Date(Date.now() + CYCLE_INTERVAL).toLocaleString()}`);
    
    return true;
  } catch (error) {
    logMessage(`❌ CYCLE FAILED: ${error.message}`);
    logMessage(`⏰ Will retry in 6 hours`);
    return false;
  }
}

// Run first cycle immediately
logMessage('🎬 SCHEDULER STARTING - First cycle beginning now...');
runAgentCycle().then(() => {
  logMessage('\n⏰ Scheduler active - agents will run every 6 hours');
  logMessage('📝 Check scheduler_log.txt for execution history');
  logMessage('🛑 Press Ctrl+C to stop the scheduler\n');
});

// Schedule recurring cycles
setInterval(async () => {
  await runAgentCycle();
}, CYCLE_INTERVAL);

// Keep the process running
process.on('SIGINT', () => {
  logMessage('\n🛑 Scheduler stopped by user');
  logMessage('✅ All agent work has been saved');
  process.exit(0);
});

logMessage('\n✨ Continuous scheduler is now running!');
logMessage('📊 Agents will execute every 6 hours automatically');
logMessage('📂 Logs saved to: scheduler_log.txt');
logMessage('🔄 This process will run until you stop it\n');


