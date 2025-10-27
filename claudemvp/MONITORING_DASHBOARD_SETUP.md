# 📊 DELIVERABLE 3: MONITORING DASHBOARD SETUP GUIDE
## Iraqi Election Platform - Production Monitoring & Analytics

**Setup Time:** 2-3 hours  
**Cost:** $0 (all free tiers)  
**Purpose:** Sleep soundly knowing your platform is healthy

---

## 🎯 MONITORING STACK OVERVIEW

### What We're Setting Up:

1. **Sentry** - Error tracking & crash reporting
2. **UptimeRobot** - Uptime monitoring & alerts
3. **Google Analytics** - User behavior tracking
4. **Supabase Dashboard** - Database monitoring
5. **Custom Health Dashboard** - Real-time system health

### Why Each Tool:

| Tool | Purpose | Alert Type |
|------|---------|------------|
| Sentry | Catches code errors before users complain | Email, Slack |
| UptimeRobot | Tells you if site goes down | SMS, Email |
| Google Analytics | Shows what users do on site | Daily report |
| Supabase | Monitors database performance | Email |
| Custom Dashboard | Quick visual health check | Visual |

---

## 🔧 STEP 1: SENTRY ERROR TRACKING (30 minutes)

### 1.1 Sign Up for Sentry

```
1. Go to: https://sentry.io
2. Click "Sign Up" → Choose "Free Plan"
3. Create account with email
4. Verify email
```

**Free Tier Includes:**
- 5,000 errors/month
- 1 project
- 30-day history
- Email alerts

### 1.2 Create Project

```
1. Click "Create Project"
2. Select "Node.js" for backend
3. Name: "iraqi-election-backend"
4. Click "Create Project"
5. Copy the DSN (looks like: https://xxx@sentry.io/yyy)
```

### 1.3 Install Sentry in Backend

```bash
cd E:\HamletUnified\backend

# Install Sentry
npm install @sentry/node @sentry/tracing
```

### 1.4 Configure Sentry in server.js

Add at the TOP of server.js (before other imports):

```javascript
// Sentry Error Tracking
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN, // Add this to .env
  environment: process.env.NODE_ENV || "production",
  tracesSampleRate: 0.1, // Sample 10% of transactions
  
  // Release tracking (optional but recommended)
  release: `iraqi-election-backend@${require('./package.json').version}`,
  
  // Ignore common non-critical errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],
  
  // Set user context
  beforeSend(event, hint) {
    // Don't send events in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  }
});

// Sentry request handler (must be first)
app.use(Sentry.Handlers.requestHandler());

// Sentry tracing handler
app.use(Sentry.Handlers.tracingHandler());

// ... your other middleware and routes ...

// Sentry error handler (must be BEFORE other error handlers)
app.use(Sentry.Handlers.errorHandler());

// Your custom error handler comes after
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: 'Internal server error' });
});
```

### 1.5 Add DSN to Environment

**Backend .env file:**
```bash
SENTRY_DSN=https://YOUR_DSN_HERE@sentry.io/YOUR_PROJECT_ID
NODE_ENV=production
```

**Render Environment Variables:**
```
1. Go to Render dashboard
2. Select your backend service
3. Click "Environment"
4. Add:
   Key: SENTRY_DSN
   Value: https://YOUR_DSN_HERE@sentry.io/YOUR_PROJECT_ID
5. Click "Save"
6. Service will auto-restart
```

### 1.6 Test Sentry Integration

```bash
# Add a test error endpoint (remove after testing)
app.get('/test-error', (req, res) => {
  throw new Error('Sentry test error - please work!');
});

# Visit: https://your-backend.onrender.com/test-error
# Check Sentry dashboard - error should appear within 1 minute
```

### 1.7 Configure Sentry Alerts

```
1. Go to Sentry project settings
2. Click "Alerts" → "New Alert Rule"
3. Select "Issues"
4. Set conditions:
   - When: New issue is created
   - Then: Send notification to: [Your Email]
5. Click "Save Rule"
```

**Success Criteria:**
- ✅ Test error appears in Sentry dashboard
- ✅ You receive email alert
- ✅ Error details include stack trace

---

## 🚨 STEP 2: UPTIMEROBOT MONITORING (15 minutes)

### 2.1 Sign Up

```
1. Go to: https://uptimerobot.com
2. Click "Free Sign Up"
3. Create account
4. Verify email
```

**Free Tier Includes:**
- 50 monitors
- 5-minute check intervals
- Email & SMS alerts
- 2 months history

### 2.2 Create Backend Monitor

```
1. Click "Add New Monitor"
2. Monitor Type: HTTP(s)
3. Friendly Name: Iraqi Election Backend API
4. URL: https://your-backend.onrender.com/health
5. Monitoring Interval: 5 minutes
6. Monitor Timeout: 30 seconds
7. Click "Create Monitor"
```

### 2.3 Create Frontend Monitor

```
1. Click "Add New Monitor"
2. Monitor Type: HTTP(s)
3. Friendly Name: Iraqi Election Frontend
4. URL: https://your-site.vercel.app
5. Monitoring Interval: 5 minutes
6. Monitor Timeout: 30 seconds
7. Click "Create Monitor"
```

### 2.4 Set Up Alerts

```
1. Go to "My Settings" → "Alert Contacts"
2. Add Email:
   - Name: Primary Email
   - Email: your-email@example.com
   - Threshold: 1 (alert on first failure)
   
3. Add SMS (optional but recommended):
   - Name: Mobile Alert
   - Phone: +964XXXXXXXXX
   - Threshold: 2 (alert after 2 failures = 10 minutes down)
   
4. Edit each monitor:
   - Select alert contacts to notify
   - Save
```

### 2.5 Create Public Status Page

```
1. Click "Public Status Pages" → "Add New"
2. Name: Iraqi Election Platform Status
3. Select monitors to include:
   - ✅ Backend API
   - ✅ Frontend
4. Custom domain: status.iraqelection.app (optional)
5. Click "Create Status Page"
6. Copy public URL
7. Share with users if needed
```

**Success Criteria:**
- ✅ Both monitors show "Up"
- ✅ You receive test alert when manually pausing monitor
- ✅ Status page is accessible

---

## 📈 STEP 3: GOOGLE ANALYTICS (20 minutes)

### 3.1 Create Google Analytics Account

```
1. Go to: https://analytics.google.com
2. Click "Start measuring"
3. Account name: Iraqi Election Platform
4. Data sharing settings: (your choice)
5. Click "Next"
```

### 3.2 Create Property

```
Property details:
- Name: Iraqi Election Platform
- Reporting time zone: (GMT+3:00) Baghdad
- Currency: Iraqi Dinar (IQD)
- Click "Next"

Business details:
- Industry: Government/Non-profit
- Business size: Small
- Click "Next"

Business objectives:
- ✅ Examine user behavior
- Click "Create"
```

### 3.3 Set Up Data Stream

```
1. Platform: Web
2. Website URL: https://your-site.vercel.app
3. Stream name: Iraqi Election Platform - Production
4. Click "Create stream"
5. Copy "Measurement ID" (looks like: G-XXXXXXXXXX)
```

### 3.4 Install GA4 in Frontend

**Option A: Using next.js Script component**

Create `/frontend/components/Analytics.js`:

```javascript
import Script from 'next/script';

export default function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  if (!GA_MEASUREMENT_ID) {
    return null;
  }
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
```

Add to `/frontend/pages/_app.js`:

```javascript
import Analytics from '../components/Analytics';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

**Add to .env.local:**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Add to Vercel:**
```
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   Key: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   Environment: Production
4. Redeploy
```

### 3.5 Set Up Key Events (formerly Conversions)

```
In GA4 Dashboard:
1. Go to Admin → Data display → Events
2. Click "Create event"
3. Create these custom events:

Event 1: candidate_view
- Triggers when: User views candidate profile
- Implementation: Add to candidate page
  gtag('event', 'candidate_view', {
    'candidate_id': candidateId,
    'candidate_name': candidateName
  });

Event 2: candidate_compare
- Triggers when: User compares candidates
- Implementation: Add to compare page
  gtag('event', 'candidate_compare', {
    'candidate_1_id': id1,
    'candidate_2_id': id2
  });

Event 3: district_search
- Triggers when: User searches district
- Implementation: Add to search function
  gtag('event', 'district_search', {
    'district_name': districtName
  });
```

### 3.6 Create Custom Dashboard

```
1. Go to "Reports" → "Library"
2. Click "Create new report"
3. Name: "Election Platform Overview"
4. Add cards:

Card 1: Real-time Users
- Metric: Active users (last 30 minutes)
- Visualization: Number

Card 2: Top Pages
- Dimension: Page path
- Metric: Views
- Visualization: Table
- Rows: 10

Card 3: Traffic Sources
- Dimension: Source/Medium
- Metric: Users
- Visualization: Pie chart

Card 4: User Flow
- Visualization: Sankey diagram
- Starting point: Homepage
- Ending point: Compare page

Card 5: Device Breakdown
- Dimension: Device category
- Metric: Users
- Visualization: Bar chart

Card 6: Candidate Views
- Event: candidate_view
- Event parameter: candidate_id
- Visualization: Table

5. Save dashboard
6. Pin to home
```

### 3.7 Set Up Daily Email Report

```
1. Open your custom dashboard
2. Click "Share" → "Schedule email"
3. Settings:
   - Frequency: Daily
   - Time: 9:00 AM (Baghdad time)
   - Include: PDF attachment
   - Recipients: Your email
4. Click "Schedule"
```

**Success Criteria:**
- ✅ Real-time view shows active users
- ✅ Page views being tracked
- ✅ Custom events firing (test by triggering them)
- ✅ Daily email arrives on schedule

---

## 🗄️ STEP 4: SUPABASE DATABASE MONITORING (10 minutes)

### 4.1 Enable Database Metrics

```
1. Go to Supabase Dashboard
2. Select your project
3. Click "Database" → "Reports"
4. Enable:
   - ✅ Query performance
   - ✅ Connection pool usage
   - ✅ Disk usage
   - ✅ Index usage
```

### 4.2 Create Critical Queries to Monitor

Save these in Supabase SQL Editor for regular checks:

```sql
-- Query 1: Check candidate count (should be 7,769)
SELECT COUNT(*) as total_candidates 
FROM "Candidate";

-- Query 2: Top 10 viewed candidates
SELECT name, views, district, party
FROM "Candidate"
ORDER BY views DESC
LIMIT 10;

-- Query 3: View count distribution
SELECT 
  CASE 
    WHEN views = 0 THEN '0 views'
    WHEN views BETWEEN 1 AND 10 THEN '1-10 views'
    WHEN views BETWEEN 11 AND 50 THEN '11-50 views'
    WHEN views BETWEEN 51 AND 100 THEN '51-100 views'
    ELSE '100+ views'
  END as view_range,
  COUNT(*) as candidate_count
FROM "Candidate"
GROUP BY view_range
ORDER BY MIN(views);

-- Query 4: District engagement
SELECT 
  district,
  COUNT(*) as candidate_count,
  SUM(views) as total_views,
  AVG(views) as avg_views_per_candidate
FROM "Candidate"
GROUP BY district
ORDER BY total_views DESC;

-- Query 5: Database size
SELECT 
  pg_size_pretty(pg_database_size(current_database())) as db_size;

-- Query 6: Slow queries (if any)
SELECT 
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
WHERE mean_exec_time > 1000 -- queries taking more than 1 second
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### 4.3 Set Up Supabase Alerts

```
1. Go to Project Settings → Notifications
2. Enable:
   - ✅ Database disk usage > 80%
   - ✅ Connection pool > 90%
   - ✅ API response time > 2 seconds
3. Add email: your-email@example.com
4. Save
```

**Success Criteria:**
- ✅ All metrics show healthy status
- ✅ Queries run successfully
- ✅ Alerts configured

---

## 📊 STEP 5: CUSTOM HEALTH DASHBOARD (45 minutes)

### 5.1 Create Health Check Endpoint

Add to `/backend/routes/health.js`:

```javascript
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * GET /health
 * Basic health check - always returns 200 if server is running
 */
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * GET /health/detailed
 * Comprehensive health check including database
 */
router.get('/detailed', async (req, res) => {
  const checks = {
    timestamp: new Date().toISOString(),
    server: {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      nodeVersion: process.version
    },
    database: {
      status: 'unknown',
      candidateCount: 0,
      responseTime: 0
    },
    services: {
      sentry: process.env.SENTRY_DSN ? 'configured' : 'not configured'
    }
  };

  // Database check
  try {
    const start = Date.now();
    const count = await prisma.candidate.count();
    const end = Date.now();
    
    checks.database.status = count === 7769 ? 'healthy' : 'warning';
    checks.database.candidateCount = count;
    checks.database.responseTime = end - start;
    
    if (count !== 7769) {
      checks.database.message = `Expected 7769 candidates, found ${count}`;
    }
  } catch (error) {
    checks.database.status = 'unhealthy';
    checks.database.error = error.message;
  }

  // Overall status
  const overallHealthy = 
    checks.server.status === 'healthy' &&
    checks.database.status === 'healthy';
  
  checks.overall = overallHealthy ? 'healthy' : 'degraded';

  const statusCode = overallHealthy ? 200 : 503;
  res.status(statusCode).json(checks);
});

/**
 * GET /health/metrics
 * Prometheus-style metrics endpoint
 */
router.get('/metrics', async (req, res) => {
  try {
    const candidateCount = await prisma.candidate.count();
    const totalViews = await prisma.candidate.aggregate({
      _sum: { views: true }
    });
    
    const metrics = `
# HELP election_platform_candidates_total Total number of candidates
# TYPE election_platform_candidates_total gauge
election_platform_candidates_total ${candidateCount}

# HELP election_platform_views_total Total number of candidate views
# TYPE election_platform_views_total counter
election_platform_views_total ${totalViews._sum.views || 0}

# HELP election_platform_uptime_seconds Server uptime in seconds
# TYPE election_platform_uptime_seconds gauge
election_platform_uptime_seconds ${process.uptime()}

# HELP election_platform_memory_usage_bytes Memory usage in bytes
# TYPE election_platform_memory_usage_bytes gauge
election_platform_memory_usage_bytes ${process.memoryUsage().heapUsed}
    `.trim();
    
    res.type('text/plain').send(metrics);
  } catch (error) {
    res.status(500).type('text/plain').send('# Error generating metrics');
  }
});

module.exports = router;
```

Add to `server.js`:

```javascript
const healthRouter = require('./routes/health');
app.use('/health', healthRouter);
```

### 5.2 Create Simple Dashboard HTML

Create `/backend/public/dashboard.html`:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iraqi Election Platform - Health Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-size: 2.5rem;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: transform 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .card-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }
    
    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .status.healthy {
      background: #d4edda;
      color: #155724;
    }
    
    .status.warning {
      background: #fff3cd;
      color: #856404;
    }
    
    .status.unhealthy {
      background: #f8d7da;
      color: #721c24;
    }
    
    .metric {
      margin: 12px 0;
    }
    
    .metric-label {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 4px;
    }
    
    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      color: #333;
    }
    
    .metric-unit {
      font-size: 1rem;
      color: #999;
      margin-left: 8px;
    }
    
    .timestamp {
      text-align: center;
      color: white;
      margin-top: 20px;
      opacity: 0.8;
    }
    
    .loading {
      text-align: center;
      color: white;
      font-size: 1.2rem;
    }
    
    .error {
      background: #f8d7da;
      color: #721c24;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🇮🇶 Iraqi Election Platform</h1>
    <h2 style="color: white; text-align: center; margin-bottom: 40px;">Health Dashboard</h2>
    
    <div id="dashboard">
      <p class="loading">Loading metrics...</p>
    </div>
    
    <p class="timestamp" id="timestamp"></p>
  </div>

  <script>
    async function fetchHealth() {
      try {
        const response = await fetch('/health/detailed');
        const data = await response.json();
        
        const dashboard = document.getElementById('dashboard');
        dashboard.innerHTML = `
          <div class="grid">
            <!-- Overall Status -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">Overall Status</span>
                <span class="status ${data.overall}">${data.overall.toUpperCase()}</span>
              </div>
              <div class="metric">
                <div class="metric-label">Last Checked</div>
                <div class="metric-value" style="font-size: 1.2rem;">
                  ${new Date(data.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            
            <!-- Server Status -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">Server</span>
                <span class="status ${data.server.status}">${data.server.status.toUpperCase()}</span>
              </div>
              <div class="metric">
                <div class="metric-label">Uptime</div>
                <div class="metric-value">
                  ${Math.floor(data.server.uptime / 3600)}
                  <span class="metric-unit">hours</span>
                </div>
              </div>
              <div class="metric">
                <div class="metric-label">Memory Usage</div>
                <div class="metric-value" style="font-size: 1.5rem;">
                  ${Math.round(data.server.memory.heapUsed / 1024 / 1024)}
                  <span class="metric-unit">MB</span>
                </div>
              </div>
            </div>
            
            <!-- Database Status -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">Database</span>
                <span class="status ${data.database.status}">${data.database.status.toUpperCase()}</span>
              </div>
              <div class="metric">
                <div class="metric-label">Candidate Records</div>
                <div class="metric-value">
                  ${data.database.candidateCount.toLocaleString()}
                </div>
              </div>
              <div class="metric">
                <div class="metric-label">Response Time</div>
                <div class="metric-value" style="font-size: 1.5rem;">
                  ${data.database.responseTime}
                  <span class="metric-unit">ms</span>
                </div>
              </div>
              ${data.database.message ? `
                <div style="color: #856404; font-size: 0.9rem; margin-top: 12px;">
                  ⚠️ ${data.database.message}
                </div>
              ` : ''}
            </div>
            
            <!-- Services Status -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">Services</span>
              </div>
              <div class="metric">
                <div class="metric-label">Error Tracking (Sentry)</div>
                <div style="font-size: 1.2rem; font-weight: 600; color: ${data.services.sentry === 'configured' ? '#28a745' : '#dc3545'};">
                  ${data.services.sentry === 'configured' ? '✅ Active' : '❌ Not Configured'}
                </div>
              </div>
              <div class="metric">
                <div class="metric-label">Node Version</div>
                <div style="font-size: 1rem; color: #666;">
                  ${data.server.nodeVersion}
                </div>
              </div>
            </div>
          </div>
        `;
        
        document.getElementById('timestamp').textContent = 
          `Last updated: ${new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}`;
          
      } catch (error) {
        document.getElementById('dashboard').innerHTML = `
          <div class="error">
            <h3>❌ Failed to Load Health Data</h3>
            <p style="margin-top: 10px;">${error.message}</p>
            <button onclick="fetchHealth()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">
              Retry
            </button>
          </div>
        `;
      }
    }
    
    // Initial load
    fetchHealth();
    
    // Auto-refresh every 30 seconds
    setInterval(fetchHealth, 30000);
  </script>
</body>
</html>
```

Serve the dashboard in `server.js`:

```javascript
// Serve static dashboard
app.use(express.static('public'));

// Dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
```

**Access Dashboard:**
```
https://your-backend.onrender.com/dashboard
```

**Success Criteria:**
- ✅ Dashboard loads and shows metrics
- ✅ Auto-refreshes every 30 seconds
- ✅ All statuses show "healthy"

---

## 📋 STEP 6: INCIDENT RESPONSE PLAN (15 minutes)

### 6.1 Create Runbook Document

Create `/docs/INCIDENT_RESPONSE.md`:

```markdown
# 🚨 INCIDENT RESPONSE RUNBOOK
## Iraqi Election Platform

### Emergency Contacts
- Technical Lead: [Your Phone]
- Backup: [Backup Contact]
- Hosting Support: support@render.com (Backend)
- Hosting Support: vercel.com/support (Frontend)

---

## INCIDENT SEVERITY LEVELS

### P0 - CRITICAL (Full Outage)
**Definition:** Site completely down, no users can access
**Response Time:** Immediate (within 5 minutes)
**Escalation:** All hands on deck

### P1 - HIGH (Major Feature Down)
**Definition:** Critical feature broken (search, compare)
**Response Time:** Within 30 minutes
**Escalation:** Technical lead

### P2 - MEDIUM (Minor Feature Issue)
**Definition:** Non-critical feature issue
**Response Time:** Within 2 hours
**Escalation:** Normal priority

### P3 - LOW (Cosmetic Issue)
**Definition:** UI glitch, typo
**Response Time:** Within 24 hours
**Escalation:** Backlog

---

## INCIDENT RESPONSE PROCEDURES

### 🔴 INCIDENT 1: Site Completely Down

**Symptoms:**
- UptimeRobot sends alert
- Users report cannot access site
- Sentry shows connection errors

**Diagnosis Steps:**
1. Check UptimeRobot dashboard - what's down?
2. Check Render/Vercel status pages
3. Check custom health dashboard
4. Check DNS resolution: `nslookup your-site.com`

**Resolution:**

**If Backend Down (Render):**
```
1. Log into Render dashboard
2. Check deployment logs for errors
3. Try manual restart:
   - Services → Your Backend → Manual Deploy → Restart
4. If restart fails:
   - Check for recent code changes
   - Roll back to last working deployment
   - Check environment variables are set
5. If still down:
   - Contact Render support
   - Check billing status
```

**If Frontend Down (Vercel):**
```
1. Log into Vercel dashboard
2. Check deployment status
3. Try redeployment:
   - Deployments → Latest → Redeploy
4. If fails:
   - Check build logs for errors
   - Verify environment variables
   - Roll back to last working deployment
5. If still down:
   - Contact Vercel support
   - Check billing status
```

**Communication:**
```
Post on social media:
"🔧 We're experiencing technical difficulties.
Our team is working to resolve this ASAP.
ETA: [time]
We apologize for the inconvenience."

Update every 30 minutes until resolved.
```

---

### 🟡 INCIDENT 2: Database Connection Issues

**Symptoms:**
- Errors mentioning "ECONNREFUSED"
- Prisma connection timeout errors
- Sentry shows database errors

**Diagnosis:**
1. Check Supabase dashboard status
2. Verify DATABASE_URL environment variable
3. Check connection pool usage

**Resolution:**
```
1. Restart backend service (often fixes connection pool issues)
2. Check Supabase:
   - Project health
   - Connection limits
   - Active connections
3. If connection limit reached:
   - Reduce connection pool size in DATABASE_URL
   - Add ?connection_limit=10 to DATABASE_URL
4. If Supabase down:
   - Check their status page
   - Wait for recovery
   - Post maintenance message
```

---

### 🟡 INCIDENT 3: Slow Performance

**Symptoms:**
- Page load times > 5 seconds
- Google Analytics shows high bounce rate
- Users complain about slowness

**Diagnosis:**
1. Check health dashboard response times
2. Run Lighthouse audit
3. Check Supabase query performance
4. Check Render/Vercel metrics

**Resolution:**
```
1. Identify bottleneck:
   - Slow API responses? → Check database queries
   - Slow page loads? → Check frontend bundle size
   - Slow database? → Check indexes

2. Quick fixes:
   - Clear cache (if implemented)
   - Restart services
   - Scale up Render plan temporarily (if needed)

3. Long-term fixes:
   - Optimize slow queries
   - Add database indexes
   - Implement caching
   - Optimize images
```

---

### 🟢 INCIDENT 4: High Error Rate

**Symptoms:**
- Sentry shows spike in errors
- Specific feature failing for multiple users

**Diagnosis:**
1. Check Sentry for error patterns
2. Identify affected feature
3. Check recent deployments

**Resolution:**
```
1. If recent deployment caused it:
   - Roll back to previous version immediately
   - Fix issue in development
   - Test thoroughly
   - Redeploy

2. If specific feature:
   - Disable feature temporarily (if possible)
   - Fix and deploy
   - Re-enable feature

3. If data-related:
   - Check database integrity
   - Verify candidate count (should be 7,769)
   - Check for corrupted records
```

---

### 🟢 INCIDENT 5: Abuse / High Traffic

**Symptoms:**
- Rate limiters triggering frequently
- Unusual traffic patterns
- High view counts from single IP

**Diagnosis:**
1. Check server logs for suspicious IPs
2. Check Google Analytics for traffic sources
3. Check for bot patterns

**Resolution:**
```
1. If DDoS attack:
   - Enable Cloudflare (free tier)
   - Tighten rate limits
   - Block specific IPs if needed

2. If legitimate traffic spike:
   - Celebrate! 🎉
   - Scale up if performance degrades
   - Monitor closely
   - Prepare for sustained load

3. If scraping attempt:
   - Check robots.txt
   - Add stricter rate limits
   - Block user-agent if malicious
```

---

## POST-INCIDENT CHECKLIST

After resolving any incident:

- [ ] Update status page (if used)
- [ ] Post resolution on social media
- [ ] Document what happened
- [ ] Document what fixed it
- [ ] Create preventive measures
- [ ] Update runbook if needed
- [ ] Review monitoring alerts
- [ ] Schedule team debrief

---

## MONITORING CHECKLIST

### Daily (5 minutes):
- [ ] Check UptimeRobot - all monitors up?
- [ ] Check Sentry - any new critical errors?
- [ ] Check Google Analytics - traffic normal?
- [ ] Check health dashboard - all green?

### Weekly (15 minutes):
- [ ] Review Sentry error trends
- [ ] Review Google Analytics report
- [ ] Check database size in Supabase
- [ ] Verify candidate count = 7,769
- [ ] Review API response times

### Before Election Day:
- [ ] Run full smoke test
- [ ] Verify all monitoring active
- [ ] Test incident response procedures
- [ ] Have escalation contacts ready
- [ ] Scale up resources if needed
```

---

## 📊 STEP 7: METRICS TRACKING SPREADSHEET (10 minutes)

Create a Google Sheet with these tabs:

**Tab 1: Daily Metrics**
```
| Date | Unique Visitors | Page Views | Candidate Views | Compares | Social Followers | Media Mentions | Uptime % | Errors | Notes |
|------|----------------|------------|-----------------|----------|------------------|----------------|----------|---------|-------|
```

**Tab 2: Technical Health**
```
| Date | Backend Uptime | Frontend Uptime | Avg Response Time | Error Count | Database Size | Notes |
|------|---------------|-----------------|-------------------|-------------|---------------|-------|
```

**Tab 3: Incidents Log**
```
| Date | Time | Severity | Description | Impact | Resolution | Duration | Root Cause | Prevention |
|------|------|----------|-------------|--------|------------|----------|------------|------------|
```

**Set up daily reminder:**
- Calendar event at 9 AM daily
- "Update platform metrics spreadsheet"
- Link to spreadsheet
- Link to Google Analytics
- Link to UptimeRobot

---

## ✅ MONITORING SETUP COMPLETION CHECKLIST

Before considering monitoring complete:

### Error Tracking:
- [ ] Sentry account created
- [ ] Sentry installed in backend
- [ ] Test error appears in Sentry
- [ ] Alert emails configured
- [ ] DSN added to production environment

### Uptime Monitoring:
- [ ] UptimeRobot account created
- [ ] Backend monitor created (5-min intervals)
- [ ] Frontend monitor created (5-min intervals)
- [ ] Email alerts configured
- [ ] SMS alerts configured (optional)
- [ ] Status page created

### Analytics:
- [ ] Google Analytics account created
- [ ] GA4 property set up
- [ ] Measurement ID added to frontend
- [ ] Custom events configured
- [ ] Custom dashboard created
- [ ] Daily email report scheduled

### Database:
- [ ] Supabase metrics enabled
- [ ] Critical queries saved
- [ ] Alerts configured
- [ ] Health checks passing

### Custom Dashboard:
- [ ] Health endpoints created
- [ ] Dashboard HTML created
- [ ] Dashboard accessible at /dashboard
- [ ] Auto-refresh working
- [ ] All metrics showing

### Documentation:
- [ ] Incident response runbook created
- [ ] Contact information updated
- [ ] Procedures tested
- [ ] Team trained (if applicable)
- [ ] Metrics spreadsheet created

---

## 🎯 SUCCESS CRITERIA

Your monitoring is properly set up when:

1. **You Get Alerts:**
   - If site goes down, you know within 5 minutes
   - If errors spike, you get an email
   - If database struggles, you're notified

2. **You Have Visibility:**
   - You can see current system health at a glance
   - You know how many users are on site right now
   - You can track key metrics daily

3. **You Can Respond:**
   - You have clear procedures for common issues
   - You have escalation contacts ready
   - You can resolve issues quickly

4. **You Have Data:**
   - Daily metrics tracked
   - Incident history documented
   - Performance trends visible

---

## 📞 QUICK REFERENCE

### Monitoring URLs:
- Sentry: https://sentry.io/organizations/[your-org]/projects/
- UptimeRobot: https://uptimerobot.com/dashboard
- Google Analytics: https://analytics.google.com
- Supabase: https://supabase.com/dashboard/project/[project-id]
- Health Dashboard: https://your-backend.onrender.com/dashboard

### Emergency Actions:
```
Site Down?
1. Check UptimeRobot
2. Check Render/Vercel status
3. Try manual restart
4. Check recent deployments
5. Roll back if needed

High Errors?
1. Check Sentry
2. Identify pattern
3. Roll back recent changes
4. Fix and redeploy

Slow Performance?
1. Check health dashboard
2. Check database queries
3. Check API response times
4. Scale up if needed
```

---

## 🎉 MONITORING SETUP COMPLETE!

You now have:
- ✅ Error tracking (Sentry)
- ✅ Uptime monitoring (UptimeRobot)
- ✅ User analytics (Google Analytics)
- ✅ Database monitoring (Supabase)
- ✅ Custom health dashboard
- ✅ Incident response procedures
- ✅ Metrics tracking system

**You can now sleep soundly knowing you'll be alerted if anything goes wrong!**

---

**Next Steps:**
1. Test all monitoring systems
2. Bookmark all dashboards
3. Set up mobile alerts
4. Train backup person (if any)
5. Run through incident scenarios

**Total Setup Time:** ~2-3 hours  
**Daily Monitoring Time:** ~5 minutes  
**Peace of Mind:** Priceless 😊

---
