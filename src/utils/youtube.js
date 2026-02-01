
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Cache to prevent hitting rate limits (cached for 1 hour)
const CACHE_DURATION = 3600 * 1000;
const cache = {};

/**
 * Formats a large number with K/M suffixes.
 * @param {string|number} num - The number to format
 * @returns {string} Formatted string (e.g. "1.2M")
 */
const formatNumber = (num) => {
    if (!num) return '0';
    return Number(num).toLocaleString();
};

export const fetchMemberStats = async (channelId) => {
    // Check cache
    if (cache[channelId] && (Date.now() - cache[channelId].timestamp < CACHE_DURATION)) {
        return cache[channelId].data;
    }

    try {
        console.log(`[YouTube API] Fetching stats for channel: ${channelId}`);
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`
        );
        console.log(`[YouTube API] Success for ${channelId}:`, response.data);

        const stats = response.data.items[0].statistics;

        // Map to expected format (subscribers, views) for UI compatibility
        // But also include the user's requested keys (subCount, totalViews) just in case
        const result = {
            subscribers: formatNumber(stats.subscriberCount),
            views: formatNumber(stats.viewCount),
            // Raw values if needed
            subCount: stats.subscriberCount,
            totalViews: stats.viewCount,
            videoCount: stats.videoCount
        };

        // Save to cache
        cache[channelId] = {
            timestamp: Date.now(),
            data: result
        };

        return result;
    } catch (error) {
        console.error("Error fetching data for:", channelId, error);
        return null;
    }
};
