'use client';

import Link from 'next/link';
import styles from './UpdatesSidebar.module.css';
import updatesData from '../data/updates.json';
import conferenceTravelData from '../data/conference_travel.json';

const UpdatesSidebar = () => {
  // Get the top 3 latest updates
  const latestUpdates = updatesData.slice(0, 3);

  // Get upcoming travels (current year and beyond)
  // Include late 2025 as requested
  const upcomingTravels = conferenceTravelData.travels
    .filter(travel => travel.year >= 2025 && travel.dateString) // Only show ones we've formatted with dateString
    .sort((a, b) => {
      // Custom ordering based on dates - DESCENDING (latest to earliest)
      if (a.year !== b.year) return b.year - a.year; // Latest year first
      // For same year, later month first
      const getMonthOffset = (str) => {
        if (str.includes('Jan')) return 1;
        if (str.includes('Feb')) return 2;
        if (str.includes('Mar')) return 3;
        if (str.includes('Apr')) return 4;
        if (str.includes('May')) return 5;
        if (str.includes('Jun')) return 6;
        if (str.includes('Jul')) return 7;
        if (str.includes('Aug')) return 8;
        if (str.includes('Sep')) return 9;
        if (str.includes('Oct')) return 10;
        if (str.includes('Nov')) return 11;
        if (str.includes('Dec')) return 12;
        return 0;
      };
      return getMonthOffset(b.dateString) - getMonthOffset(a.dateString);
    });

  const isTravelPast = (travel) => {
    if (!travel.dateString || !travel.year) return false;
    
    // Parse "Mmm DD-DD 'YY"
    const parts = travel.dateString.split(' ');
    if (parts.length < 2) return false;
    
    const monthStr = parts[0];
    const rangeStr = parts[1];
    
    // Get last day number
    const days = rangeStr.split('-');
    const endDay = parseInt(days[days.length - 1], 10);
    
    if (isNaN(endDay)) return false;
    
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    const month = monthMap[monthStr];
    if (month === undefined) return false;
    
    // Create date for end of event (end of that day)
    const eventEnd = new Date(travel.year, month, endDay);
    eventEnd.setHours(23, 59, 59, 999);
    
    return new Date() > eventEnd;
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.latestUpdateSection}>
        <Link href="/news" aria-label="View all news">
          <h3 className={styles.sectionTitle}>
            <span className="brush-highlight brush-style-2">News</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.linkIcon}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </h3>
        </Link>
        {latestUpdates.map(update => {
          // Format date: Replace "2025" with "'25", "2024" with "'24", etc.
          const formattedDate = update.date.replace(/\b20(\d{2})\b/g, "'$1");
          
          return (
            <div className={styles.updateContent} key={update.id}>
              <p className={styles.updateText}>
                <span className={styles.updateDate}>{formattedDate}</span>
                {update.hasPaper ? (
                  <>
                    {update.content}
                    <a 
                      href={update.paperLink} 
                      className={styles.paperLink}
                    >
                      {update.paperTitle}
                    </a>
                    {update.contentAfter}
                    {update.hasSecondPaper && (
                      <>
                        <a 
                          href={update.secondPaperLink} 
                          className={styles.paperLink}
                        >
                          {update.secondPaperTitle}
                        </a>
                        {update.finalContent}
                      </>
                    )}
                  </>
                ) : (
                  update.content
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className={styles.travelSection}>
        <Link href="/travels" aria-label="View all travels">
          <h3 className={styles.sectionTitle}>
            <span className="brush-highlight brush-style-2">Travel</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.linkIcon}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </h3>
        </Link>
        
        {upcomingTravels.map((travel, index) => {
          const isPast = isTravelPast(travel);
          return (
            <div className={styles.travelContent} key={`travel-${index}`}>
              <div className={`${styles.updateText} ${isPast ? styles.pastTravel : ''}`}>
                <span className={`${styles.updateDate} ${isPast ? styles.strikethrough : ''}`}>
                  {travel.dateString}
                </span>
                <span className={isPast ? styles.strikethrough : ''}>
                  {travel.conference} {travel.year} in {travel.city}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpdatesSidebar;
