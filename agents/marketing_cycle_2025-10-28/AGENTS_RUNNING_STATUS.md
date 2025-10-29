# 🔄 AGENTS RUNNING IN CONTINUOUS MODE

## 🎯 System Status

**Mode**: CONTINUOUS OPERATION  
**Schedule**: Every 6 hours automatically  
**Status**: ✅ READY TO START

---

## 🚀 How to Start the Agents (CONTINUOUS MODE)

### Option 1: Double-click the batch file
```
📂 Double-click: START_AGENTS.bat
```

### Option 2: Run from command line
```bash
cd E:\HamletUnified\agents\marketing_cycle_2025-10-28
npm run agents:continuous
```

### Option 3: Run directly
```bash
node scheduler.js
```

---

## 📊 What Happens When Running

### Immediate (First Run)
1. ✅ All 6 agents execute immediately
2. ✅ Generate fresh data:
   - 48-50 new candidates
   - 20 new event venues
   - 30 new social posts
   - Complete metrics and reports

### Every 6 Hours After
1. 🔄 Agents automatically run again
2. 🔄 Generate NEW data each time
3. 🔄 Update all files with fresh content
4. 🔄 Archive previous data
5. 🔄 Generate new reports

---

## ⏰ Execution Schedule

| Time | Action |
|------|--------|
| **Now** | First execution (immediate) |
| **+6 hours** | Second execution |
| **+12 hours** | Third execution |
| **+18 hours** | Fourth execution |
| **+24 hours** | Fifth execution |
| **...** | Continues indefinitely |

**Example**:
- Start: 8:00 PM Monday
- Run 1: 8:00 PM Monday (immediate)
- Run 2: 2:00 AM Tuesday
- Run 3: 8:00 AM Tuesday
- Run 4: 2:00 PM Tuesday
- Run 5: 8:00 PM Tuesday
- ... continues forever

---

## 📝 Logs & Monitoring

### Execution Log
**File**: `scheduler_log.txt`

**Contains**:
```
[2025-10-28T19:30:00.000Z] 🚀 STARTING NEW AGENT CYCLE
[2025-10-28T19:30:19.320Z] ✅ CYCLE COMPLETED in 19.32 seconds
[2025-10-28T19:30:19.320Z] ⏰ Next cycle in 6 hours at 1:30 AM
```

### Agent Outputs
Each cycle generates:
- `agent_2_event_outreach/events_mock.json` (updated)
- `agent_3_candidate_intelligence/candidates_mock.json` (updated)
- `agent_4_content_creation/content_queue/*.json` (30 new files)
- `agent_5_social_scheduler/social_metrics.json` (updated)
- `agent_6_integration_qa/integration_summary.md` (updated)
- `agent_1_marketing_strategist/daily_strategy_report.md` (updated)

---

## 🛑 How to Stop the Agents

### Option 1: Double-click the stop file
```
📂 Double-click: STOP_AGENTS.bat
```

### Option 2: Press Ctrl+C in the terminal
```
Press: Ctrl + C
Agents will save current work and stop gracefully
```

### Option 3: Close the terminal window
```
Close the command prompt window
All work is automatically saved
```

---

## 📊 Performance Expectations

### Per Cycle (every 6 hours)
- **Execution Time**: ~15-30 seconds
- **New Candidates**: 48-50 profiles
- **New Venues**: 20 listings
- **New Posts**: 30 social media posts (15 AR + 15 KU)
- **Metrics**: Complete engagement data
- **Reports**: 2 comprehensive reports (QA + Strategy)

### Daily Production (4 cycles)
- **192-200 candidate profiles per day**
- **80 venue listings per day**
- **120 social media posts per day**
- **4 strategic reports per day**

### Weekly Production (28 cycles)
- **1,344-1,400 candidates per week**
- **560 venues per week**
- **840 posts per week**

---

## 💾 Data Management

### Current Data
- Always in main agent folders
- Updated every 6 hours
- Latest version always available

### Archived Data (Optional)
- Previous cycles saved to `archive/cycle_[timestamp]/`
- Keeps history of all executions
- Can review past data anytime

---

## 🎯 Use Cases

### For Election Platform
- Continuously fresh candidate data
- Always up-to-date profiles
- Regular content for social media
- Ongoing engagement metrics

### For Event Management
- Constantly updated venue listings
- New service providers added regularly
- Fresh event promotion content
- Performance analytics updated

### For Marketing
- New social posts every 6 hours
- Fresh content for scheduling
- Updated engagement metrics
- Strategic insights 4x daily

---

## ⚡ Quick Start Commands

### Start the agents (continuous mode)
```bash
npm run agents:start
```

### Run agents once (manual trigger)
```bash
npm run agents:run-once
```

### Check if agents are running
```bash
# Look for node.exe process running scheduler.js
```

---

## 🔧 Configuration

### Change Execution Frequency

Edit `scheduler.js` line 6:
```javascript
const CYCLE_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours

// Change to:
const CYCLE_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours
const CYCLE_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours
const CYCLE_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
```

### Customize Agent Behavior

Each agent has a `config.json` you can modify:
- Change target counts
- Adjust governorate priorities
- Modify content themes
- Update platform distribution

---

## ✅ System Requirements

- ✅ Node.js installed
- ✅ Windows PC (or keep terminal open on Mac/Linux)
- ✅ ~100MB free disk space per day
- ✅ Stable system (doesn't need to be always-on, just when you want agents working)

---

## 💡 Pro Tips

### Running 24/7
- Leave the terminal window open
- Or run as a background service
- Computer must stay on

### Running During Work Hours
- Start agents in the morning
- Let them run during your workday
- Stop them when you're done

### Running as Needed
- Start when you need new data
- Let it run one cycle
- Stop after completion

---

## 🎉 READY TO START!

**To begin continuous operation:**
1. Double-click `START_AGENTS.bat`
2. Watch the first cycle execute
3. Leave it running - agents will work automatically
4. Check `scheduler_log.txt` for execution history

**Your agents will now work for you around the clock!** 🚀

---

**Created**: 2025-10-28  
**Status**: ✅ READY FOR CONTINUOUS OPERATION  
**Mode**: Automated 6-hour cycles


