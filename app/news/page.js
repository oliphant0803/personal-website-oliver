'use client';

import Link from 'next/link';
import updatesData from '@/data/updates.json';

export default function News() {
  return (
    <div className="page-container">
      <h1 className="page-title">
        <span className="back-container">
          <Link href="/" className="back-button" aria-label="Back to home" title="Back">
            <span className="back-arrow">◀</span>
            <span className="back-text">Back</span>
          </Link>
        </span>
        <span className="title-text">News & Updates</span>
        <span className="spacer"></span>
      </h1>
      
      <div className="news-list">
        <div className="timeline-line"></div>
        {updatesData.map((item) => (
          <div key={item.id} className="news-item">
            <div className="timeline-dot"></div>
            <div className="news-date">{item.date}</div>
            <div className="news-content">
              <h3 className="news-title">{item.title || 'Update'}</h3>
              <div className="news-text">
                {item.hasPaper ? (
                  <>
                    {item.content}
                    <a href={item.paperLink} className="paper-link">
                      {item.paperTitle}
                    </a>
                    {item.contentAfter}
                    {item.hasSecondPaper && (
                      <>
                        <a href={item.secondPaperLink} className="paper-link">
                          {item.secondPaperTitle}
                        </a>
                        {item.hasThirdPaper ? (
                          <>
                            {item.contentAfterSecond}
                            <a href={item.thirdPaperLink} className="paper-link">
                              {item.thirdPaperTitle}
                            </a>
                          </>
                        ) : null}
                        {item.finalContent}
                      </>
                    )}
                  </>
                ) : (
                  item.content
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .news-list {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          padding-left: 20px;
        }

        .timeline-line {
          position: absolute;
          left: 6px;
          top: 10px;
          bottom: 10px;
          width: 2px;
          background-color: var(--border-warm);
        }

        .news-item {
          position: relative;
          margin-bottom: 40px;
          padding-left: 25px;
        }

        .timeline-dot {
          position: absolute;
          left: -20px; /* Adjust based on padding of news-list + item */
          top: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: var(--bg-parchment);
          border: 2px solid var(--accent-burgundy);
          z-index: 2;
        }

        .news-date {
          color: var(--text-warm-gray);
          font-family: var(--font-serif);
          font-size: 14px;
          font-style: italic;
          margin-bottom: 6px;
          display: inline-block;
          background: transparent;
        }

        .news-content {
          color: var(--text-ink);
        }

        .news-title {
          font-family: var(--font-handwritten);
          color: var(--text-ink);
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .news-text {
          color: var(--text-ink);
          font-family: var(--font-serif);
          font-size: 17px;
          line-height: 1.7; /* Narrative spacing */
          margin: 0;
        }

        .paper-link {
          color: var(--highlight-sepia);
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid var(--border-warm);
          transition: all 0.2s ease;
        }

        .paper-link:hover {
          color: var(--accent-burgundy);
          border-bottom-color: var(--accent-burgundy);
          background-color: transparent;
        }

        .page-container {
          padding: 20px;
        }

        .page-title {
          text-align: center;
          color: var(--text-ink);
          font-family: var(--font-handwritten);
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .back-container {
          flex: 1;
          display: flex;
          justify-content: flex-start;
        }

        .title-text {
          flex: 2;
          text-align: center;
        }

        .spacer {
          flex: 1;
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          color: var(--text-light);
          transition: transform 0.3s ease, color 0.3s ease;
          line-height: 1;
          text-decoration: none;
          font-family: var(--font-body);
        }
        
        .back-button:hover {
          transform: translateX(-4px);
          color: var(--accent-burgundy);
        }
        
        .back-arrow {
          font-size: 1.5rem;
          margin-bottom: 2px;
        }
        
        .back-text {
          font-size: 1.2rem;
          font-weight: 500;
          margin-left: 4px;
        }

        /* Specific adjustments for timeline positioning */
        .news-list {
           padding-left: 30px;
        }
        
        .timeline-line {
           left: 9px; 
        }

        .timeline-dot {
           left: -28px;
        }

        @media (max-width: 768px) {
          .news-item {
            margin-bottom: 30px;
          }
          
          .page-title {
            font-size: 28px;
            margin-bottom: 40px;
          }

          .news-title {
            font-size: 20px;
          }
          
          .news-text {
            font-size: 16px;
          }
        }
        
        @media (prefers-color-scheme: dark) {
           .news-date {
             color: var(--text-light);
           }
        }
      `}</style>
    </div>
  );
}
