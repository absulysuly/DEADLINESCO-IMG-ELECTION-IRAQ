# Agent 3: Candidate Intelligence Agent

## Agent Identity
- **Agent ID**: `Agent3_CandidateIntelligence`
- **Type**: Data Intelligence Agent
- **Execution Order**: 1 (runs early in sequence, parallel with Agent 2)

## Role & Responsibilities

The Candidate Intelligence Agent gathers, enriches, and structures candidate profile data from existing sources and generates mock profiles for demonstration purposes. This agent supports the Candidate Directory module of the platform.

### Primary Functions
1. **Data Extraction**: Pull candidate data from existing CSV files
2. **Profile Enrichment**: Add contact information, social media, and bios
3. **Governorate Distribution**: Ensure balanced coverage across all 18 governorates
4. **Mock Generation**: Create realistic candidate profiles for demonstration
5. **Data Structuring**: Format data according to candidate schema

## Input Dependencies

### Data Sources
- Existing candidate CSVs in `E:\HamletUnified\data\` and `E:\HamletUnified\clean_election_data\`
- Goldmine candidate data in `E:\HamletUnified\reuseable-asset-goldmine\`
- Mock data generation for gaps

### Configuration Input
- `config.json` - Target count, governorate list, party affiliations

## Output Specifications

### Primary Output: `candidates_mock.json`

**Structure:**
```json
{
  "candidates": [
    {
      "id": "cand_001",
      "name": "محمد أحمد الجبوري",
      "nameEnglish": "Mohammed Ahmed Al-Jubouri",
      "governorate": "Baghdad",
      "party": "تحالف الوطن",
      "partyEnglish": "National Coalition",
      "contact": "+964-770-123-4567",
      "email": "mohammed.jubouri@example.iq",
      "socialMedia": {
        "facebook": "https://facebook.com/mjubouri",
        "twitter": "https://twitter.com/mjubouri",
        "instagram": "https://instagram.com/mjubouri"
      },
      "bio": "محامي ومناصر لحقوق الإنسان مع 15 عامًا من الخبرة في العمل المدني",
      "bioEnglish": "Lawyer and human rights advocate with 15 years of civic work experience",
      "age": 45,
      "education": "Bachelor of Law - University of Baghdad",
      "experience": "Civil Rights Lawyer, Community Organizer",
      "campaignWebsite": "https://mjubouri-campaign.iq",
      "verified": false,
      "timestamp": "2025-10-28T10:00:00Z",
      "agentSignature": "Agent3_CandidateIntelligence"
    }
  ],
  "metadata": {
    "totalCount": 50,
    "lastUpdated": "2025-10-28T10:00:00Z",
    "governoratesCovered": 18,
    "partiesRepresented": 12,
    "languagesUsed": ["ar", "ku", "en"]
  }
}
```

### Secondary Output: `intelligence_log.json`

Records the data collection process:
```json
{
  "timestamp": "2025-10-28T10:00:00Z",
  "agentSignature": "Agent3_CandidateIntelligence",
  "executionStats": {
    "totalCandidatesCreated": 50,
    "fromExistingCSV": 15,
    "mockGenerated": 35,
    "governoratesCovered": 18,
    "partiesRepresented": 12
  },
  "governorateBreakdown": {
    "Baghdad": 5,
    "Basra": 4,
    "Nineveh": 4,
    "Erbil": 4,
    "Sulaymaniyah": 3,
    "Duhok": 2,
    "Anbar": 3,
    "Diyala": 2,
    "Kirkuk": 3,
    "Najaf": 2,
    "Karbala": 2,
    "Babil": 2,
    "Dhi Qar": 2,
    "Maysan": 2,
    "Wasit": 2,
    "Saladin": 2,
    "Muthanna": 2,
    "Qadisiyyah": 2
  },
  "dataQuality": {
    "withSocialMedia": 45,
    "withEmail": 50,
    "withBio": 50,
    "withWebsite": 30
  }
}
```

## Data Processing Logic

### Phase 1: Existing Data Import
1. Scan `data/` and `clean_election_data/` folders for candidate CSVs
2. Parse CSV files and extract candidate information
3. Standardize field names and formats
4. Remove duplicates based on name + governorate

### Phase 2: Data Enrichment
1. Generate unique candidate IDs (cand_001, cand_002, etc.)
2. Add formatted contact information
3. Create plausible social media handles
4. Generate biographical information
5. Add education and experience fields
6. Assign party affiliations

### Phase 3: Mock Generation
1. Calculate gap to reach target count (50 candidates)
2. Generate mock candidates distributed across governorates
3. Ensure diversity in:
   - Age ranges (25-70)
   - Professions (lawyers, doctors, teachers, engineers, activists)
   - Party affiliations
   - Gender representation
4. Create realistic Arabic and Kurdish names

### Phase 4: Validation
1. Ensure minimum candidates per governorate (high-priority: 3+, others: 2+)
2. Verify phone number format
3. Check all required fields populated
4. Validate no duplicate IDs
5. Ensure balanced party representation

### Phase 5: Output Generation
1. Structure data according to candidate_schema.json
2. Add metadata statistics
3. Include agent signature and timestamp
4. Write JSON to output file
5. Generate intelligence log

## Mock Candidate Generation Rules

### Name Generation
- **Arabic names**: [First Name] [Father's Name] [Family Name]
  - Examples: محمد أحمد الجبوري، فاطمة حسن الكردي
- **Kurdish names**: [First Name] [Father's Name] [Family Name]
  - Examples: هیوا رەشید محمود، آواز کریم احمد

### Governorate Distribution
- Baghdad: 5 candidates (10%)
- Basra, Nineveh, Erbil: 4 each (24%)
- Sulaymaniyah, Anbar, Kirkuk: 3 each (18%)
- All others: 2 each (48%)

### Party Affiliations (Representative Sample)
- تحالف الوطن (National Coalition)
- التحالف الكردستاني (Kurdistan Alliance)
- الحزب الديمقراطي الكردستاني (Kurdistan Democratic Party)
- الاتحاد الوطني الكردستاني (Patriotic Union of Kurdistan)
- Independent candidates

### Professional Backgrounds
- Lawyers (15%)
- Doctors (10%)
- Engineers (10%)
- Teachers/Professors (15%)
- Business owners (15%)
- Civil society activists (20%)
- Government officials (10%)
- Other (5%)

### Age Distribution
- 25-35: 20%
- 36-45: 30%
- 46-55: 30%
- 56-70: 20%

### Contact Information
- Phone: +964-[770-781]-[XXX]-[XXXX] (Iraqi mobile formats)
- Email: [firstname].[lastname]@example.iq
- Social media handles based on romanized names

## Success Criteria

- ✅ Generates exactly 50 candidate profiles
- ✅ Covers all 18 Iraqi governorates
- ✅ Represents at least 10 different political parties
- ✅ All entries conform to candidate_schema.json
- ✅ Execution completes within 30 seconds
- ✅ Output file is valid JSON
- ✅ Balanced distribution across governorates

## Error Handling

### Missing CSV Files
- Log warning
- Proceed with 100% mock generation
- Flag in intelligence_log.json

### Malformed CSV Data
- Skip invalid rows
- Log parsing errors
- Continue processing valid entries

### Duplicate Detection
- Compare name + governorate combinations
- Keep first occurrence
- Log duplicates removed

## Integration Points

### With Backend (Future)
- Candidate profiles sync to database
- Powers Candidate Directory module
- Enables candidate comparison features

### With Other Agents
- Agent 1 analyzes candidate distribution
- Agent 4 may create candidate spotlight content
- Agent 6 validates data structure and neutrality

## Political Neutrality Guidelines

- No promotional language in bios
- Balanced representation across party spectrum
- No preferential treatment in data quality
- Factual, objective biographical information only
- No partisan commentary or endorsements

## Execution Command (Conceptual)

```bash
npm run agent:candidates
# or
node dist/agents/agent_3_candidate_intelligence/index.js
```

## Notes
- Names should be culturally authentic
- Respect Kurdish linguistic conventions
- Verified field starts as `false` (pending manual verification)
- This agent can be enhanced to pull from real social media APIs
- Ensure gender diversity in generated profiles


