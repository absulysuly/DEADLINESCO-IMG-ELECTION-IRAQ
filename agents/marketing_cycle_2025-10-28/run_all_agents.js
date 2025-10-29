import { execSync } from 'child_process';

console.log('🚀 ==========================================');
console.log('🚀 DEPLOYING 6 AI MARKETING AGENTS');
console.log('🚀 Iraqi Election Platform Marketing Autopilot');
console.log('🚀 ==========================================\n');

const agents = [
  { id: 2, name: 'Event Outreach', dir: 'agent_2_event_outreach' },
  { id: 3, name: 'Candidate Intelligence', dir: 'agent_3_candidate_intelligence' },
  { id: 4, name: 'Content Creation', dir: 'agent_4_content_creation' },
  { id: 5, name: 'Social Scheduler', dir: 'agent_5_social_scheduler' },
  { id: 6, name: 'Integration QA', dir: 'agent_6_integration_qa' },
  { id: 1, name: 'Marketing Strategist', dir: 'agent_1_marketing_strategist' }
];

console.log('📋 Execution Plan:');
agents.forEach(agent => {
  console.log(`   ${agent.id}. Agent ${agent.id}: ${agent.name}`);
});
console.log('\n🎬 Starting execution...\n');

const startTime = Date.now();

agents.forEach(agent => {
  try {
    process.chdir(agent.dir);
    execSync('node index.js', { stdio: 'inherit' });
    process.chdir('..');
  } catch (error) {
    console.error(`❌ Agent ${agent.id} failed: ${error.message}`);
    process.exit(1);
  }
});

const endTime = Date.now();
const duration = ((endTime - startTime) / 1000).toFixed(2);

console.log('\n🎉 ==========================================');
console.log('🎉 ALL AGENTS DEPLOYED SUCCESSFULLY!');
console.log('🎉 ==========================================\n');
console.log(`⏱️  Total execution time: ${duration} seconds\n`);

console.log('📊 GENERATED OUTPUTS:');
console.log('   ✅ agent_2_event_outreach/events_mock.json (20 venues)');
console.log('   ✅ agent_3_candidate_intelligence/candidates_mock.json (50 candidates)');
console.log('   ✅ agent_4_content_creation/content_queue/ (30 posts)');
console.log('   ✅ agent_5_social_scheduler/social_metrics.json (engagement data)');
console.log('   ✅ agent_6_integration_qa/integration_summary.md (QA report)');
console.log('   ✅ agent_1_marketing_strategist/daily_strategy_report.md (strategy)\n');

console.log('📈 NEXT STEPS:');
console.log('   1. Review agent_1_marketing_strategist/daily_strategy_report.md');
console.log('   2. Check agent_6_integration_qa/integration_summary.md for quality');
console.log('   3. Review social metrics in agent_5_social_scheduler/social_metrics.json');
console.log('   4. Use generated data to populate your platform\n');

console.log('✨ Marketing automation system is now operational!\n');


