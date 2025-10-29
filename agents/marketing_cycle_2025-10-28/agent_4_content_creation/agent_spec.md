# Agent 4: Content Creation Agent

## Agent Identity
- **Agent ID**: `Agent4_ContentCreation`
- **Type**: Content & Engagement Agent
- **Execution Order**: 3 (after Agents 2 & 3 provide data)

## Role & Responsibilities

The Content Creation Agent generates culturally appropriate, politically neutral social media content in Arabic and Kurdish to promote civic engagement, election awareness, and platform features.

### Primary Functions
1. **Content Generation**: Create social media posts for Facebook, Twitter/X, and Instagram
2. **Bilingual Output**: Produce content in both Arabic and Kurdish
3. **Visual Descriptions**: Describe accompanying images/graphics for each post
4. **Hashtag Strategy**: Generate relevant, trending hashtags
5. **Governorate Targeting**: Tailor content to specific regions

## Input Dependencies

### Optional Data Sources (for context-aware content)
- `../agent_2_event_outreach/events_mock.json` - To promote events
- `../agent_3_candidate_intelligence/candidates_mock.json` - For candidate spotlights

### Configuration Input
- `config.json` - Content themes, platforms, language distribution

## Output Specifications

### Primary Output: `content_queue/` directory

Individual post files named `post_XXX_[lang].json`:
- `post_001_ar.json` (Arabic content)
- `post_002_ku.json` (Kurdish content)
- `post_003_ar.json` (Arabic content)
- etc.

**File Structure:**
```json
{
  "postId": "post_001",
  "language": "ar",
  "platform": "facebook",
  "content": "🗳️ صوتك مهم! شارك في بناء مستقبل العراق من خلال التسجيل للانتخابات. زر موقعنا للتعرف على المرشحين والفعاليات في محافظتك.",
  "hashtags": ["#العراق", "#الانتخابات", "#صوتك_مهم", "#المشاركة_المدنية"],
  "governorate": "Baghdad",
  "targetAudience": "18-35",
  "scheduledFor": "2025-10-29T10:00:00Z",
  "visualDescription": "Illustration of an Iraqi citizen casting a ballot, with the Iraqi flag colors in the background. Clean, modern design with Arabic text overlay.",
  "tone": "engaging",
  "contentType": "call-to-action",
  "neutralityScore": 1.0,
  "timestamp": "2025-10-28T11:00:00Z",
  "agentSignature": "Agent4_ContentCreation"
}
```

### Secondary Output: `content_log.json`

Records the content generation process:
```json
{
  "timestamp": "2025-10-28T11:00:00Z",
  "agentSignature": "Agent4_ContentCreation",
  "executionStats": {
    "totalPostsCreated": 30,
    "arabicPosts": 15,
    "kurdishPosts": 15,
    "platformDistribution": {
      "facebook": 12,
      "twitter": 9,
      "instagram": 9
    },
    "contentTypes": {
      "call-to-action": 10,
      "educational": 8,
      "event-promotion": 7,
      "civic-engagement": 5
    }
  },
  "governorateTargeting": {
    "National": 10,
    "Baghdad": 3,
    "Basra": 2,
    "Erbil": 2,
    "Nineveh": 2,
    "Other": 11
  },
  "neutralityCheck": {
    "averageScore": 1.0,
    "allPassed": true
  }
}
```

## Content Themes & Templates

### Theme 1: Civic Participation
**Purpose**: Encourage voter registration and participation

**Arabic Template**:
```
🗳️ صوتك مهم! [Call to action]
📍 [Governorate-specific detail]
#العراق #الانتخابات #صوتك_مهم
```

**Kurdish Template**:
```
🗳️ دەنگت گرنگە! [Call to action]
📍 [Governorate-specific detail]
#عێراق #هەڵبژاردن #دەنگت_گرنگە
```

**Visual**: Iraqi citizens voting, hopeful and engaged expressions

### Theme 2: Candidate Transparency
**Purpose**: Promote informed voting through candidate profiles

**Arabic Template**:
```
👤 تعرف على مرشحيك
[Brief neutral description]
زر موقعنا للمزيد من المعلومات
#شفافية_الانتخابات #اعرف_مرشحك
```

**Kurdish Template**:
```
👤 کاندیدەکانت بناسە
[Brief neutral description]
سەردانی ماڵپەڕەکەمان بکە بۆ زانیاری زیاتر
#شەفافیەتی_هەڵبژاردن
```

**Visual**: Professional headshots grid, diverse candidates

### Theme 3: Event Promotion
**Purpose**: Drive attendance to town halls, debates, forums

**Arabic Template**:
```
📅 فعالية قادمة في [Governorate]
[Event details]
انضم إلينا لمناقشة مستقبل مجتمعك
#فعاليات_انتخابية #[محافظة]
```

**Kurdish Template**:
```
📅 بۆنەیەکی داهاتوو لە [Governorate]
[Event details]
پێوەمان ببە بۆ باسکردنی داهاتووی کۆمەڵگاکەت
#بۆنەکانی_هەڵبژاردن
```

**Visual**: Event venue photo, date/time overlay, welcoming atmosphere

### Theme 4: Platform Features
**Purpose**: Educate users about platform capabilities

**Arabic Template**:
```
💡 هل تعلم؟
منصتنا توفر [feature description]
اكتشف المزيد → [link]
#منصة_الانتخابات #العراق_الرقمي
```

**Kurdish Template**:
```
💡 ئایا دەزانی؟
پلاتفۆرمەکەمان [feature description] پێشکەش دەکات
زیاتر بدۆزەرەوە → [link]
#پلاتفۆرمی_هەڵبژاردن
```

**Visual**: App screenshot, feature highlight, clean UI design

### Theme 5: Civic Education
**Purpose**: Inform about voting process, rights, responsibilities

**Arabic Template**:
```
📚 دليل الناخب
[Educational tip]
تعرف على حقوقك وواجباتك كمواطن
#التوعية_المدنية #حقوق_الناخبين
```

**Kurdish Template**:
```
📚 ڕێنمایی دەنگدەر
[Educational tip]
مافەکانت و ئەرکەکانت وەک هاوڵاتییەک بزانە
#خوێندنەوەی_مەدەنی
```

**Visual**: Infographic style, voting process steps, accessible design

## Content Generation Logic

### Phase 1: Planning
1. Load content themes from config
2. Determine language split (50/50 Arabic/Kurdish)
3. Allocate posts across platforms
4. Assign governorate targeting

### Phase 2: Content Creation
1. Select theme based on distribution targets
2. Generate content text in specified language
3. Create appropriate hashtags
4. Write visual description
5. Assign neutrality score
6. Set scheduling timestamp

### Phase 3: Validation
1. Check character limits per platform:
   - Twitter/X: 280 characters
   - Facebook: 5000 characters (recommended < 500)
   - Instagram: 2200 characters (recommended < 300)
2. Verify political neutrality (no partisan language)
3. Ensure cultural appropriateness
4. Validate hashtag format

### Phase 4: Output Generation
1. Create individual JSON file for each post
2. Name files sequentially: `post_001_ar.json`, `post_002_ku.json`, etc.
3. Write to `content_queue/` directory
4. Generate content_log.json summary

## Platform-Specific Guidelines

### Facebook
- **Character limit**: Flexible (recommend < 500)
- **Tone**: Conversational, community-focused
- **Hashtags**: 3-5 per post
- **Visual**: High-quality images, can be detailed
- **Frequency**: 40% of total content

### Twitter/X
- **Character limit**: 280 characters strict
- **Tone**: Concise, impactful
- **Hashtags**: 2-3 per post
- **Visual**: Simple graphics, text-heavy images
- **Frequency**: 30% of total content

### Instagram
- **Character limit**: 2200 (recommend < 300)
- **Tone**: Visual-first, inspirational
- **Hashtags**: 5-10 per post
- **Visual**: Aesthetic priority, vibrant colors
- **Frequency**: 30% of total content

## Hashtag Strategy

### Core Hashtags (Always Include)
- Arabic: `#العراق` `#الانتخابات`
- Kurdish: `#عێراق` `#هەڵبژاردن`

### Theme-Specific Hashtags
- Civic Participation: `#صوتك_مهم` `#دەنگت_گرنگە`
- Transparency: `#شفافية_الانتخابات` `#شەفافیەت`
- Events: `#فعاليات_انتخابية` `#بۆنەکان`
- Education: `#التوعية_المدنية` `#خوێندنەوە`

### Governorate-Specific Hashtags
- `#بغداد` `#البصرة` `#الموصل` `#أربيل`
- `#بەغدا` `#بەسرە` `#مووسڵ` `#هەولێر`

## Neutrality Guidelines

### ✅ Allowed Content
- Information about voting process
- Neutral candidate profiles (all candidates equally)
- Event announcements (open to all)
- Platform feature explanations
- Civic education
- Voter registration reminders

### ❌ Prohibited Content
- Endorsements of specific candidates or parties
- Partisan political commentary
- Negative campaigning
- Religious or sectarian language
- Divisive rhetoric
- Unverified claims

### Neutrality Scoring
- 1.0 = Fully neutral (target)
- 0.8-0.99 = Minor partisan elements (flag for review)
- < 0.8 = Not neutral (reject)

## Success Criteria

- ✅ Generates exactly 30 social media posts
- ✅ 50/50 split between Arabic and Kurdish
- ✅ Content distributed across FB, Twitter, Instagram
- ✅ All posts conform to content_schema.json
- ✅ All neutrality scores = 1.0
- ✅ Execution completes within 1 minute
- ✅ All files properly formatted JSON

## Error Handling

### Character Limit Exceeded
- Truncate content intelligently
- Preserve hashtags and core message
- Log truncation in content_log.json

### Invalid Language Code
- Default to Arabic
- Log warning

## Integration Points

### With Backend (Future)
- Content queue feeds into CMS
- Posts can be reviewed/edited before publishing
- Scheduling system triggers automated posting

### With Other Agents
- Agent 5 uses this queue for "publishing"
- Agent 1 analyzes content distribution
- Agent 6 validates neutrality

## Execution Command (Conceptual)

```bash
npm run agent:content
# or
node dist/agents/agent_4_content_creation/index.js
```

## Notes
- Content should be culturally sensitive and regionally appropriate
- Kurdish content should use Sorani script (most common in Iraq)
- Visual descriptions enable future image generation (DALL-E, Midjourney)
- This agent can be enhanced with AI language models for richer content


