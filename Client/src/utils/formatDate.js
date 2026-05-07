
export const formatDistanceToNow = (value) => {
  if (!value) return '';
  const dateStr = String(value).trim();

  
  if (dateStr.includes('ago')) return dateStr;

  try {
    
    const isoMatch = dateStr.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    const cleanDate = isoMatch ? isoMatch[0] : dateStr;
    
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return dateStr;

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    
    if (seconds < 0) return 'just now';

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    for (const { label, seconds: s } of intervals) {
      const count = Math.floor(seconds / s);
      if (count >= 1) return `${count} ${label}${count !== 1 ? 's' : ''} ago`;
    }
    return 'just now';
  } catch (err) {
    return dateStr;
  }
};
