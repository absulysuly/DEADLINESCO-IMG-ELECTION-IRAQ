import { writeFileSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('📱 Agent 5: Social Media Scheduler - STARTING...\n');

// Read all posts from content queue
const contentQueuePath = '../agent_4_content_creation/content_queue';
const postFiles = readdirSync(contentQueuePath).filter(f => f.endsWith('.json'));

const metrics = [];
const timestamp = new Date().toISOString();

postFiles.forEach(file => {
  const post = JSON.parse(readFileSync(join(contentQueuePath, file), 'utf-8'));
  
  // Generate realistic metrics based on platform
  const platformMetrics = {
    facebook: { minViews: 800, maxViews: 2500, likeRate: 0.07, shareRate: 0.02, commentRate: 0.008, reachMultiplier: 2.5 },
    twitter: { minViews: 500, maxViews: 1800, likeRate: 0.06, shareRate: 0.015, commentRate: 0.006, reachMultiplier: 3.0 },
    instagram: { minViews: 600, maxViews: 2000, likeRate: 0.08, shareRate: 0.01, commentRate: 0.01, reachMultiplier: 2.0 }
  };
  
  const config = platformMetrics[post.platform];
  const views = Math.floor(Math.random() * (config.maxViews - config.minViews) + config.minViews);
  const likes = Math.floor(views * config.likeRate * (0.9 + Math.random() * 0.2));
  const shares = Math.floor(views * config.shareRate * (0.8 + Math.random() * 0.4));
  const comments = Math.floor(views * config.commentRate * (0.7 + Math.random() * 0.6));
  const reach = Math.floor(views * config.reachMultiplier);
  const engagement = (likes + shares + comments) / views;
  
  metrics.push({
    postId: post.postId,
    platform: post.platform,
    views: views,
    likes: likes,
    shares: shares,
    comments: comments,
    reach: reach,
    engagement: parseFloat(engagement.toFixed(4)),
    governorate: post.governorate,
    language: post.language,
    publishedAt: post.scheduledFor,
    timestamp: timestamp,
    agentSignature: "Agent5_SocialScheduler"
  });
});

const totalViews = metrics.reduce((sum, m) => sum + m.views, 0);
const totalLikes = metrics.reduce((sum, m) => sum + m.likes, 0);
const totalShares = metrics.reduce((sum, m) => sum + m.shares, 0);
const totalComments = metrics.reduce((sum, m) => sum + m.comments, 0);
const totalEngagement = totalLikes + totalShares + totalComments;
const avgEngagement = totalEngagement / totalViews;

const platformBreakdown = {};
['facebook', 'twitter', 'instagram'].forEach(platform => {
  const platformMetrics = metrics.filter(m => m.platform === platform);
  platformBreakdown[platform] = {
    posts: platformMetrics.length,
    views: platformMetrics.reduce((sum, m) => sum + m.views, 0),
    engagement: platformMetrics.reduce((sum, m) => sum + (m.likes + m.shares + m.comments), 0),
    avgEngagementRate: platformMetrics.length > 0 
      ? platformMetrics.reduce((sum, m) => sum + m.engagement, 0) / platformMetrics.length 
      : 0
  };
});

const output = {
  metrics: metrics,
  summary: {
    totalPosts: metrics.length,
    totalViews: totalViews,
    totalLikes: totalLikes,
    totalShares: totalShares,
    totalComments: totalComments,
    totalEngagement: totalEngagement,
    averageEngagementRate: parseFloat(avgEngagement.toFixed(4)),
    topPerformingPlatform: Object.keys(platformBreakdown).reduce((a, b) => 
      platformBreakdown[a].avgEngagementRate > platformBreakdown[b].avgEngagementRate ? a : b
    ),
    estimatedReach: metrics.reduce((sum, m) => sum + m.reach, 0)
  },
  platformBreakdown: platformBreakdown,
  metadata: {
    generatedAt: timestamp,
    agentSignature: "Agent5_SocialScheduler",
    simulationMode: true
  }
};

writeFileSync('./social_metrics.json', JSON.stringify(output, null, 2));

const log = {
  timestamp: timestamp,
  agentSignature: "Agent5_SocialScheduler",
  executionStats: {
    postsProcessed: metrics.length,
    postsScheduled: metrics.length,
    metricsGenerated: metrics.length,
    totalEstimatedReach: output.summary.estimatedReach
  },
  qualityMetrics: {
    averageEngagementRate: output.summary.averageEngagementRate,
    highPerformingPosts: metrics.filter(m => m.engagement > 0.09).length,
    lowPerformingPosts: metrics.filter(m => m.engagement < 0.03).length
  },
  errors: []
};

writeFileSync('./scheduler_log.json', JSON.stringify(log, null, 2));

console.log('✅ Agent 5: COMPLETE');
console.log(`   Processed ${metrics.length} posts`);
console.log(`   Total estimated reach: ${output.summary.estimatedReach.toLocaleString()} views`);
console.log(`   Average engagement: ${(output.summary.averageEngagementRate * 100).toFixed(2)}%`);
console.log(`   Output: social_metrics.json`);
console.log(`   Log: scheduler_log.json\n`);


