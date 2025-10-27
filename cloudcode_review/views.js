/**
 * View Tracking Routes
 * Handles candidate page view counting with rate limiting and validation
 */

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Rate limiter: 5 views per minute per IP
const viewLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { success: false, error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ 
      success: false, 
      error: 'Rate limit exceeded. Please wait before tracking more views.' 
    });
  }
});

/**
 * POST /api/views/:id
 * Track a page view for a specific candidate
 */
router.post('/:id', viewLimiter, async (req, res) => {
  try {
    // Parse and validate candidate ID
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid candidate ID. Must be a positive integer.' 
      });
    }
    
    // Check if candidate exists (prevents fake IDs from inflating database)
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      select: { id: true, name: true }
    });
    
    if (!candidate) {
      return res.status(404).json({ 
        success: false, 
        error: 'Candidate not found' 
      });
    }
    
    // Increment view count atomically
    await prisma.candidate.update({
      where: { id },
      data: { views: { increment: 1 } }
    });
    
    // Success response
    res.json({ 
      success: true,
      candidateId: id,
      candidateName: candidate.name
    });
    
  } catch (error) {
    console.error('[View Tracking Error]', {
      candidateId: req.params.id,
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to track view. Please try again.' 
    });
  }
});

/**
 * GET /api/views/trending
 * Get most-viewed candidates (trending list)
 */
router.get('/trending', async (req, res) => {
  try {
    // Parse limit with bounds checking (min 1, max 50, default 10)
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      50
    );
    
    // Optional: filter by district
    const district = req.query.district;
    
    const whereClause = district ? { district } : {};
    
    const trending = await prisma.candidate.findMany({
      where: whereClause,
      orderBy: { views: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        views: true,
        party: true,
        district: true,
        photo: true
      }
    });
    
    res.json({
      success: true,
      count: trending.length,
      candidates: trending
    });
    
  } catch (error) {
    console.error('[Trending Fetch Error]', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch trending candidates' 
    });
  }
});

/**
 * GET /api/views/stats
 * Get view statistics summary
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await prisma.candidate.aggregate({
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true }
    });
    
    const totalCandidates = await prisma.candidate.count();
    
    res.json({
      success: true,
      stats: {
        totalViews: stats._sum.views || 0,
        averageViews: Math.round(stats._avg.views || 0),
        maxViews: stats._max.views || 0,
        totalCandidates: totalCandidates
      }
    });
    
  } catch (error) {
    console.error('[Stats Fetch Error]', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch statistics' 
    });
  }
});

module.exports = router;
