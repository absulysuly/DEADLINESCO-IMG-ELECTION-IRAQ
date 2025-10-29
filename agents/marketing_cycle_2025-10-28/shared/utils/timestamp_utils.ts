/**
 * Timestamp Utilities
 * Provides ISO 8601 timestamp generation for all agents
 */

/**
 * Get current timestamp in ISO 8601 format
 * @returns ISO 8601 formatted timestamp string
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Get timestamp for a specific date
 * @param date - Date object or timestamp
 * @returns ISO 8601 formatted timestamp string
 */
export function getTimestamp(date: Date | number | string): string {
  return new Date(date).toISOString();
}

/**
 * Get timestamp N hours from now
 * @param hours - Number of hours to add
 * @returns ISO 8601 formatted timestamp string
 */
export function getTimestampFromNow(hours: number): string {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
}

/**
 * Validate ISO 8601 timestamp format
 * @param timestamp - Timestamp string to validate
 * @returns true if valid ISO 8601 format
 */
export function isValidTimestamp(timestamp: string): boolean {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  return iso8601Regex.test(timestamp) && !isNaN(Date.parse(timestamp));
}

/**
 * Format timestamp for display (Arabic-friendly)
 * @param timestamp - ISO 8601 timestamp
 * @returns Formatted date string
 */
export function formatTimestampForDisplay(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Get agent signature with timestamp
 * @param agentName - Name of the agent (e.g., "Agent3_CandidateIntelligence")
 * @returns Object with agent signature and timestamp
 */
export function getAgentSignature(agentName: string): { agentSignature: string; timestamp: string } {
  return {
    agentSignature: agentName,
    timestamp: getCurrentTimestamp()
  };
}


