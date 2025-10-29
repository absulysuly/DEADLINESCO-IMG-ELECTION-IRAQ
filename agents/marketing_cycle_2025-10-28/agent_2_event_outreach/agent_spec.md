# Agent 2: Event Outreach Agent

## Agent Identity
- **Agent ID**: `Agent2_EventOutreach`
- **Type**: Data Intelligence Agent
- **Execution Order**: 1 (runs early in sequence)

## Role & Responsibilities

The Event Outreach Agent builds and maintains a comprehensive directory of event venues, service providers, and event infrastructure across all 18 Iraqi governorates. This agent supports the Event Management module of the platform.

### Primary Functions
1. **Venue Discovery**: Identify hotels, conference centers, and event spaces
2. **Service Provider Cataloging**: Map catering, AV, logistics, and support services
3. **Sponsor Identification**: Locate potential corporate and NGO sponsors
4. **Category Classification**: Organize venues by 9 event management categories
5. **Data Structuring**: Format data for backend integration

## Input Dependencies

### Data Sources
- Local goldmine folders (`E:\HamletUnified\reuseable-asset-goldmine\`)
- Existing venue lists in CSV format
- Mock data generation for demonstration purposes

### Configuration Input
- `config.json` - Governorate list, category definitions, target counts

## Output Specifications

### Primary Output: `events_mock.json`

**Structure:**
```json
{
  "events": [
    {
      "id": "evt_001",
      "governorate": "Baghdad",
      "category": "Hospitality",
      "name": "Al-Rashid Hotel",
      "contact": "+964-770-123-4567",
      "capacity": 500,
      "services": ["Catering", "AV Equipment", "Parking"],
      "address": "Al-Karrada, Baghdad",
      "website": "https://example.com",
      "verified": false,
      "timestamp": "2025-10-28T10:00:00Z",
      "agentSignature": "Agent2_EventOutreach"
    }
  ],
  "categories": [
    "Hospitality", "Media", "Logistics", "Sponsors",
    "NGOs", "Security", "Transport", "Tech", "Medical"
  ],
  "metadata": {
    "totalCount": 20,
    "lastUpdated": "2025-10-28T10:00:00Z",
    "governoratesCovered": 18,
    "categoriesUsed": 9
  }
}
```

### Secondary Output: `outreach_log.json`

Records the data collection process:
```json
{
  "timestamp": "2025-10-28T10:00:00Z",
  "agentSignature": "Agent2_EventOutreach",
  "executionStats": {
    "totalVenuesCreated": 20,
    "governoratesCovered": 18,
    "categoriesUsed": 9,
    "dataSourcesProcessed": ["goldmine_folders", "mock_generation"]
  },
  "categoryBreakdown": {
    "Hospitality": 5,
    "Media": 2,
    "Logistics": 3,
    "Sponsors": 4,
    "NGOs": 2,
    "Security": 1,
    "Transport": 1,
    "Tech": 1,
    "Medical": 1
  }
}
```

## Event Management Categories

### 1. Hospitality
- Hotels, conference centers, banquet halls
- Catering services, food vendors
- Target: 25% of total venues

### 2. Media
- Press rooms, media centers
- Broadcasting facilities
- Photography/videography services
- Target: 10% of total venues

### 3. Logistics
- Warehouse space, storage facilities
- Equipment rental companies
- Setup/breakdown services
- Target: 15% of total venues

### 4. Sponsors
- Corporate sponsors (telecom, banking, retail)
- Local businesses
- International organizations
- Target: 20% of total venues

### 5. NGOs
- Civil society organizations
- Election monitoring groups
- Community organizations
- Target: 10% of total venues

### 6. Security
- Venue security services
- Crowd management companies
- Emergency response teams
- Target: 5% of total venues

### 7. Transport
- Bus companies, shuttle services
- Vehicle rental agencies
- Parking management
- Target: 5% of total venues

### 8. Tech
- Internet service providers
- AV equipment suppliers
- IT support companies
- Target: 5% of total venues

### 9. Medical
- Emergency medical services
- First aid providers
- Mobile clinic operators
- Target: 5% of total venues

## Processing Logic

### Phase 1: Data Collection
1. Scan goldmine folders for existing venue data
2. Load venue CSV files if available
3. Generate mock venues to meet target count

### Phase 2: Data Enrichment
1. Assign unique IDs (evt_001, evt_002, etc.)
2. Distribute venues across 18 governorates
3. Categorize based on service type
4. Generate realistic contact information
5. Add capacity estimates
6. List available services

### Phase 3: Validation
1. Ensure minimum 1 venue per governorate
2. Verify category distribution matches targets
3. Check all required fields are populated
4. Validate phone number format
5. Ensure no duplicate IDs

### Phase 4: Output Generation
1. Structure data according to schema
2. Add metadata statistics
3. Include agent signature and timestamp
4. Write JSON to output file
5. Generate execution log

## Mock Data Generation Rules

### Governorate Distribution
- High-priority governorates (Baghdad, Basra, Nineveh, Erbil): 2-3 venues each
- Medium-priority governorates: 1-2 venues each
- Low-priority governorates: 1 venue each

### Naming Conventions
- Hotels: "Hotel [Name]", "[Name] Grand Hotel"
- Conference Centers: "[Name] Conference Center", "[City] Convention Hall"
- Services: "[Company Name] [Service Type]"

### Contact Format
- Phone: +964-[3-digit]-[3-digit]-[4-digit]
- Email: info@[venuename].iq
- Website: https://[venuename].iq

### Capacity Ranges
- Large venues (hotels, conference centers): 200-1000
- Medium venues (banquet halls, media centers): 50-200
- Small venues (offices, service providers): 10-50

## Success Criteria

- ✅ Generates exactly 20 venue/service entries
- ✅ Covers all 18 Iraqi governorates
- ✅ Uses all 9 event management categories
- ✅ All entries conform to event_schema.json
- ✅ Execution completes within 30 seconds
- ✅ Output file is valid JSON

## Error Handling

### Missing Goldmine Data
- Log warning
- Proceed with 100% mock generation
- Flag in outreach_log.json

### Invalid Data Format
- Skip malformed entries
- Log skipped records
- Continue processing

## Integration Points

### With Backend (Future)
- Venue data syncs to database
- Powers Event Management module
- Enables venue booking workflow

### With Other Agents
- Agent 1 analyzes venue distribution
- Agent 4 may create event promotion content
- Agent 6 validates data structure

## Execution Command (Conceptual)

```bash
npm run agent:events
# or
node dist/agents/agent_2_event_outreach/index.js
```

## Notes
- Focus on realistic Iraqi business names
- Ensure cultural and linguistic appropriateness
- Verified field starts as `false` (pending manual verification)
- This agent can be enhanced to scrape real business directories


