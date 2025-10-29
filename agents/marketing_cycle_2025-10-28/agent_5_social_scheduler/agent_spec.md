# Agent 5: Social Media Scheduler

## Agent Identity
- **Agent ID**: `Agent5_SocialScheduler`
- **Type**: Content & Engagement Agent
- **Execution Order**: 4 (after Agent 4 creates content)

## Role & Responsibilities

The Social Media Scheduler simulates the publishing and tracking of social media content. It generates mock engagement metrics for posts created by Agent 4, providing realistic performance data for analysis.

### Primary Functions
1. **Content Queue Processing**: Read posts from Agent 4's content queue
2. **Publishing Simulation**: Simulate posting to FB, Twitter/X, Instagram
3. **Metrics Generation**: Create realistic engagement metrics (views, likes, shares, comments)
4. **Performance Tracking**: Aggregate metrics by platform, governorate, and language
5. **Engagement Analysis**: Calculate engagement rates and reach

## Input Dependencies

### Required Input
- `../agent_4_content_creation/content_queue/*.json` - All generated content posts

### Configuration Input
- `config.json` - Engagement ranges, platform behaviors, simulation rules

## Output Specifications

### Primary Output: `social_metrics.json`

**Structure:**
```json
{
  "metrics": [
    {
      "postId": "post_001",
      "platform": "facebook",
      "views": 1250,
      "likes": 87,
      "shares": 12,
      "comments": 5,
      "reach": 3400,
      "engagement": 0.0688,
      "governorate": "Baghdad",
      "language": "ar",
      "publishedAt": "2025-10-29T10:00:00Z",
      "timestamp": "2025-10-28T14:00:00Z",
      "agentSignature": "Agent5_SocialScheduler"
    }
  ],
  "summary": {
    "totalPosts": 30,
    "totalViews": 45000,
    "totalLikes": 2800,
    "totalShares": 420,
    "totalComments": 180,
    "totalEngagement": 3400,
    "averageEngagementRate": 0.0756,
    "topPerformingGovernorate": "Baghdad",
    "topPerformingPlatform": "facebook",
    "topPerformingLanguage": "ar",
    "estimatedReach": 95000
  },
  "platformBreakdown": {
    "facebook": {
      "posts": 12,
      "views": 20000,
      "engagement": 1500,
      "avgEngagementRate": 0.075
    },
    "twitter": {
      "posts": 9,
      "views": 12000,
      "engagement": 900,
      "avgEngagementRate": 0.075
    },
    "instagram": {
      "posts": 9,
      "views": 13000,
      "engagement": 1000,
      "avgEngagementRate": 0.077
    }
  },
  "governorateBreakdown": {
    "National": {
      "posts": 10,
      "views": 18000,
      "engagement": 1400
    },
    "Baghdad": {
      "posts": 3,
      "views": 6000,
      "engagement": 480
    },
    "Basra": {
      "posts": 2,
      "views": 3500,
      "engagement": 270
    }
  },
  "metadata": {
    "generatedAt": "2025-10-28T14:00:00Z",
    "agentSignature": "Agent5_SocialScheduler",
    "simulationMode": true
  }
}
```

### Secondary Output: `scheduler_log.json`

Records the scheduling and metrics generation process:
```json
{
  "timestamp": "2025-10-28T14:00:00Z",
  "agentSignature": "Agent5_SocialScheduler",
  "executionStats": {
    "postsProcessed": 30,
    "postsScheduled": 30,
    "metricsGenerated": 30,
    "totalEstimatedReach": 95000
  },
  "qualityMetrics": {
    "averageEngagementRate": 0.0756,
    "highPerformingPosts": 8,
    "lowPerformingPosts": 3
  },
  "errors": []
}
```

## Metrics Generation Logic

### Phase 1: Content Queue Ingestion
1. Read all JSON files from `content_queue/` directory
2. Extract post metadata (postId, platform, governorate, language)
3. Validate required fields
4. Sort by scheduledFor timestamp

### Phase 2: Publishing Simulation
1. Assign "published" timestamp to each post
2. Respect scheduling intervals (2 hours apart)
3. Distribute across optimal posting times (8 AM - 8 PM)
4. Log publishing simulation

### Phase 3: Metrics Generation
For each post, generate realistic metrics based on:
1. **Platform behavior** (FB has higher shares, IG has higher likes)
2. **Governorate size** (Baghdad gets more views than Muthanna)
3. **Language preference** (Arabic slightly higher in most regions, Kurdish dominant in KRG)
4. **Content type** (Call-to-action gets more engagement)
5. **Time of posting** (Morning/evening posts perform better)

### Phase 4: Engagement Calculation
```
Engagement Rate = (Likes + Shares + Comments) / Views
Reach = Views × Reach Multiplier (platform-specific)
```

### Phase 5: Aggregation
1. Calculate summary statistics
2. Generate platform breakdown
3. Generate governorate breakdown
4. Identify top performers

### Phase 6: Output Generation
1. Write metrics to social_metrics.json
2. Generate scheduler_log.json
3. Include timestamp and agent signature

## Engagement Metrics Formulas

### Views (Impressions)
```
Base Views = Random(minViews, maxViews) for platform
Governorate Multiplier = Population weight (Baghdad: 1.5x, Small: 0.7x)
Language Multiplier = Regional preference (Arabic: 1.0, Kurdish in KRG: 1.2)
Content Type Multiplier = (CTA: 1.2, Educational: 1.0, Event: 0.9)
Time Multiplier = (Peak hours: 1.3, Off-peak: 0.8)

Final Views = Base Views × Governorate × Language × Content × Time
```

### Likes (Reactions)
```
Like Rate = 5-8% of views (platform-dependent)
Likes = Views × Like Rate × Random(0.9, 1.1)
```

### Shares (Retweets/Reposts)
```
Share Rate = 1-2% of views (platform-dependent)
Facebook: Higher share rate (2%)
Twitter: Medium share rate (1.5%)
Instagram: Lower share rate (1%)
Shares = Views × Share Rate × Random(0.8, 1.2)
```

### Comments
```
Comment Rate = 0.5-1% of views
Comments = Views × Comment Rate × Random(0.7, 1.3)
```

### Reach
```
Reach Multiplier by platform:
- Facebook: 2.5x (algorithm boost, shares increase reach)
- Twitter: 3.0x (retweets amplify)
- Instagram: 2.0x (limited viral spread)

Reach = Views × Reach Multiplier
```

### Engagement Rate
```
Total Engagement = Likes + Shares + Comments
Engagement Rate = Total Engagement / Views
Target Range: 5-10% (good performance)
```

## Platform-Specific Behaviors

### Facebook
- **Views**: 800-2500 per post
- **Like Rate**: 7%
- **Share Rate**: 2%
- **Comment Rate**: 0.8%
- **Reach Multiplier**: 2.5x
- **Best Content**: Long-form, community discussions

### Twitter/X
- **Views**: 500-1800 per post
- **Like Rate**: 6%
- **Share Rate**: 1.5%
- **Comment Rate**: 0.6%
- **Reach Multiplier**: 3.0x
- **Best Content**: Short, impactful, news-oriented

### Instagram
- **Views**: 600-2000 per post
- **Like Rate**: 8%
- **Share Rate**: 1%
- **Comment Rate**: 1%
- **Reach Multiplier**: 2.0x
- **Best Content**: Visual storytelling, inspirational

## Governorate Weighting

### High-Population Governorates (1.3-1.5x multiplier)
- Baghdad: 1.5x
- Basra: 1.4x
- Nineveh: 1.4x
- Erbil: 1.3x

### Medium-Population Governorates (1.0-1.2x multiplier)
- Sulaymaniyah: 1.2x
- Duhok: 1.1x
- Anbar: 1.1x
- Diyala: 1.0x
- Kirkuk: 1.0x
- Najaf: 1.0x
- Karbala: 1.0x

### Low-Population Governorates (0.7-0.9x multiplier)
- All others: 0.7-0.9x

### National Content
- Multiplier: 1.8x (appeals to all)

## Time-Based Performance

### Peak Posting Hours (1.3x multiplier)
- Morning: 8:00-10:00 AM
- Evening: 6:00-8:00 PM

### Good Posting Hours (1.0x multiplier)
- Midday: 12:00-2:00 PM
- Afternoon: 3:00-5:00 PM

### Off-Peak Hours (0.8x multiplier)
- Early morning: 6:00-7:59 AM
- Late evening: 8:01-10:00 PM

## Success Criteria

- ✅ Processes all 30 posts from content queue
- ✅ Generates realistic metrics for each post
- ✅ Total estimated reach > 50,000 views
- ✅ Average engagement rate between 5-10%
- ✅ All metrics conform to metrics_schema.json
- ✅ Execution completes within 30 seconds
- ✅ Output file is valid JSON

## Error Handling

### Missing Content Queue
- Log error
- Exit with status message
- No metrics generated

### Invalid Post Format
- Skip malformed posts
- Log skipped items
- Continue processing valid posts

### Duplicate Post IDs
- Keep first occurrence
- Log duplicate warning

## Integration Points

### With Backend (Future)
- Metrics sync to analytics database
- Powers real-time dashboard
- Triggers performance alerts

### With Other Agents
- Agent 1 analyzes metrics for strategy
- Agent 6 validates metric ranges
- Influences future content decisions

## Execution Command (Conceptual)

```bash
npm run agent:scheduler
# or
node dist/agents/agent_5_social_scheduler/index.js
```

## Notes
- Metrics are simulated but statistically realistic
- Can be replaced with real social media APIs in production
- Engagement rates based on industry benchmarks for civic/political content
- Designed to test platform analytics infrastructure
- Future enhancement: A/B testing simulation


