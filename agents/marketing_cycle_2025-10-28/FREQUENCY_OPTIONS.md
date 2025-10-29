# ⚡ AGENT FREQUENCY OPTIONS

## 🎯 Choose Your Speed!

You can control HOW OFTEN the agents run. Here are your options:

---

## 🔥 OPTION 1: NON-STOP MODE (Recommended for Beginning!)

**File**: `scheduler_continuous.js`  
**Frequency**: Every 10 minutes  
**Start**: Double-click `START_AGENTS_NONSTOP.bat`

### Daily Production:
- **144 cycles per day** (one every 10 minutes)
- **6,912 candidates per day**
- **2,880 venues per day**
- **4,320 posts per day**

### Per Hour:
- 6 cycles
- 288 candidates
- 120 venues
- 180 posts

**Best for**: Initial data collection, building up your database quickly!

---

## ⚡ OPTION 2: RAPID MODE

**Edit**: `scheduler_continuous.js` line 13  
**Change to**: `const MINUTES_BETWEEN_RUNS = 5;`

### Daily Production:
- **288 cycles per day** (one every 5 minutes!)
- **13,824 candidates per day**
- **5,760 venues per day**
- **8,640 posts per day**

**Best for**: MAXIMUM data collection speed!

---

## 🚀 OPTION 3: FREQUENT MODE

**Edit**: `scheduler_continuous.js` line 13  
**Change to**: `const MINUTES_BETWEEN_RUNS = 30;`

### Daily Production:
- **48 cycles per day** (one every 30 minutes)
- **2,304 candidates per day**
- **960 venues per day**
- **1,440 posts per day**

**Best for**: Steady data collection without overwhelming your system

---

## 🕐 OPTION 4: HOURLY MODE

**Edit**: `scheduler_continuous.js` line 13  
**Change to**: `const MINUTES_BETWEEN_RUNS = 60;`

### Daily Production:
- **24 cycles per day** (one every hour)
- **1,152 candidates per day**
- **480 venues per day**
- **720 posts per day**

**Best for**: Consistent data flow throughout the day

---

## 🌙 OPTION 5: STANDARD MODE (Current Default)

**File**: `scheduler.js`  
**Frequency**: Every 6 hours  
**Start**: Double-click `START_AGENTS.bat`

### Daily Production:
- **4 cycles per day**
- **192 candidates per day**
- **80 venues per day**
- **120 posts per day**

**Best for**: Maintenance mode after initial collection

---

## 📊 COMPARISON TABLE

| Mode | Frequency | Cycles/Day | Candidates/Day | Venues/Day | Posts/Day |
|------|-----------|------------|----------------|------------|-----------|
| **RAPID** 🔥 | 5 min | 288 | 13,824 | 5,760 | 8,640 |
| **NON-STOP** ⚡ | 10 min | 144 | 6,912 | 2,880 | 4,320 |
| **FREQUENT** 🚀 | 30 min | 48 | 2,304 | 960 | 1,440 |
| **HOURLY** 🕐 | 60 min | 24 | 1,152 | 480 | 720 |
| **STANDARD** 🌙 | 6 hours | 4 | 192 | 80 | 120 |

---

## 💡 RECOMMENDATIONS

### For Starting Out (First Week):
✅ **Use NON-STOP MODE** (10 minutes)
- Builds database quickly
- Generates thousands of profiles
- Ready for platform launch in days

### After 1 Week:
✅ **Switch to FREQUENT MODE** (30 minutes)
- Steady data flow
- Less system load
- Still adds 2,000+ candidates daily

### For Maintenance:
✅ **Switch to STANDARD MODE** (6 hours)
- Light data refresh
- Keep content fresh
- Minimal resource usage

---

## ⚙️ HOW TO CHANGE FREQUENCY

### Method 1: Use Pre-configured Files
```
NON-STOP (10 min): Double-click START_AGENTS_NONSTOP.bat
STANDARD (6 hours): Double-click START_AGENTS.bat
```

### Method 2: Edit the Frequency Yourself

**Open**: `scheduler_continuous.js`

**Find Line 13**:
```javascript
const MINUTES_BETWEEN_RUNS = 10; // CHANGE THIS NUMBER!
```

**Change to your desired frequency**:
```javascript
const MINUTES_BETWEEN_RUNS = 5;  // Every 5 minutes (RAPID)
const MINUTES_BETWEEN_RUNS = 10; // Every 10 minutes (NON-STOP)
const MINUTES_BETWEEN_RUNS = 30; // Every 30 minutes (FREQUENT)
const MINUTES_BETWEEN_RUNS = 60; // Every 60 minutes (HOURLY)
```

**Save and run**:
```
node scheduler_continuous.js
```

---

## 🎯 RECOMMENDED STRATEGY

### Phase 1: Initial Collection (Days 1-7)
**Use**: NON-STOP MODE (10 minutes)
**Goal**: Collect ~48,000 candidates, ~20,000 venues
**Duration**: Run for 1 week

### Phase 2: Growth Phase (Weeks 2-4)
**Use**: FREQUENT MODE (30 minutes)  
**Goal**: Add ~16,000 candidates/week
**Duration**: 3 weeks

### Phase 3: Maintenance (Ongoing)
**Use**: STANDARD MODE (6 hours)
**Goal**: Keep data fresh
**Duration**: Forever

---

## 🔥 START NON-STOP MODE NOW!

**To begin maximum data collection**:

1. **Double-click**: `START_AGENTS_NONSTOP.bat`
2. **Wait**: Agents run in ~20 seconds
3. **Repeat**: Agents run again in 10 minutes automatically
4. **Result**: Thousands of new profiles every day!

---

**Current Setup**: 6 hours (slow)  
**Recommended**: 10 minutes (fast) ⚡  
**Maximum Speed**: 5 minutes (EXTREME) 🔥

**Choose your speed and start collecting!** 🚀


