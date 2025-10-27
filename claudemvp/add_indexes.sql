-- ============================================
-- Performance Indexes for Iraqi Election Platform
-- Created: 2025-01-26
-- Purpose: Optimize common queries for production
-- ============================================

-- Index for trending candidates (ORDER BY views DESC)
CREATE INDEX IF NOT EXISTS idx_candidate_views 
ON "Candidate"(views DESC);

-- Index for district filtering
CREATE INDEX IF NOT EXISTS idx_candidate_district 
ON "Candidate"(district);

-- Index for party filtering
CREATE INDEX IF NOT EXISTS idx_candidate_party 
ON "Candidate"(party);

-- Index for name searches
CREATE INDEX IF NOT EXISTS idx_candidate_name 
ON "Candidate"(name);

-- Composite index for district + party filtering
CREATE INDEX IF NOT EXISTS idx_candidate_district_party 
ON "Candidate"(district, party);

-- Full-text search index for Arabic candidate names
-- (PostgreSQL specific - for advanced search)
CREATE INDEX IF NOT EXISTS idx_candidate_name_fulltext 
ON "Candidate" USING gin(to_tsvector('arabic', name));

-- ============================================
-- Verification Query
-- Run this after migration to confirm indexes exist:
-- SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'Candidate';
-- ============================================
