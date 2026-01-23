'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RiFilePaperFill } from "react-icons/ri";
import publicationsData from '@/data/publications.json';
import '@/styles/publications.css';

export default function AllPublications() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeYearFilter, setActiveYearFilter] = useState('All');

  // Compute available years and counts
  const yearCounts = publicationsData.publications.reduce((acc, pub) => {
    const year = pub.year || 'Unknown';
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const availableYears = Object.keys(yearCounts).sort((a, b) => b - a);

  // Helper to format authors
  const formatAuthors = (authors) => {
    return authors.map((author, index) => {
      const isLastAuthor = index === authors.length - 1;
      const isSecondLast = index === authors.length - 2;
      let separator = ', ';
      if (isLastAuthor) separator = '';
      if (isSecondLast) separator = ', and ';

      if (author === 'Oliver Huang') {
        return <span key={index}><strong className="my-name">{author}</strong>{separator}</span>;
      } else {
        return <span key={index}>{author}{separator}</span>;
      }
    });
  };

  // Reused PublicationItem component
  const PublicationItem = ({ pub }) => {
    const [showAbstract, setShowAbstract] = useState(false);

    return (
      <div className="paper-entry-container">
        <div className="paper-thumbnail-section">
          {pub.teaserImage ? (
            <img src={pub.teaserImage} alt={`${pub.title} preview`} className="paper-preview-image" /> 
          ) : (
            <div className="preview-placeholder"></div>
          )}
        </div>
        
        <div className="paper-details-section">
          <div className="paper-venue-info">{pub.venue}</div>
          <h3 className="paper-heading">
            {pub.titleShort && <span className="heading-prefix">{pub.titleShort}: </span>}
            {pub.title}
          </h3>
          <div className="paper-author-list">{formatAuthors(pub.authors)}</div>
          
          <div className="paper-action-links">
            <button 
              className="action-link-button" 
              onClick={() => setShowAbstract(!showAbstract)}
            >
              <span className="link-icon">✎</span> ABS
            </button>
            {pub.links?.arxiv && (
              <a 
                href={pub.links.arxiv} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-link-button"
              >
                <span className="link-icon">↗</span> ARXIV
              </a>
            )}
            {pub.links?.demo && (
              <a 
                href={pub.links.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-link-button"
              >
                <span className="link-icon">▶</span> DEMO
              </a>
            )}
            {pub.links?.poster && (
              <a 
                href={pub.links.poster} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-link-button"
              >
                <span className="link-icon"><RiFilePaperFill /></span> POSTER
              </a>
            )}
            {/* Fallback for general PDF if not arxiv */}
            {pub.links?.pdf && !pub.links.arxiv && (
               <a 
               href={pub.links.pdf} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="action-link-button"
             >
               <span className="link-icon">↓</span> PDF
             </a>
            )}
          </div>

          {showAbstract && pub.links?.abs && (
            <div className="paper-summary-text">
              {pub.links.abs}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Filter logic
  const filteredPapers = publicationsData.publications.filter(pub => {
    // Check topic filter
    const matchesTopic = activeFilter === 'All' || (pub.tags && pub.tags.includes(activeFilter));
    // Check year filter
    const matchesYear = activeYearFilter === 'All' || pub.year?.toString() === activeYearFilter.toString();
    
    return matchesTopic && matchesYear;
  });

  const fullPapers = filteredPapers.filter(pub => 
    !pub.type || pub.type.toLowerCase() === 'full paper'
  );

  const extendedAbstracts = filteredPapers.filter(pub => 
    pub.type && pub.type.toLowerCase() === 'extended abstract'
  );

  return (
    <div className="page-container">
      <div className="header-wrapper">
        <span className="back-btn-wrapper">
          <Link href="/" className="back-nav-link">
            <span className="back-arrow">◀</span> Back
          </Link>
        </span>
        <span className="page-title">All Publications</span>
      </div>
      
      <div className="filter-container">
        <span className="filter-label">Filter by topic:</span>
        <div className="filter-buttons">
          {['All', 'Human-AI Interaction', 'Education', 'Visualization Literacy', 'Data-driven Sensemaking', 'Long-form Text', 'Abstraction Navigation'].map(topic => (
            <button
              key={topic}
              className={`filter-btn ${activeFilter === topic ? 'active' : ''}`}
              onClick={() => setActiveFilter(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-container">
        <span className="filter-label">Filter by year:</span>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeYearFilter === 'All' ? 'active' : ''}`}
            onClick={() => setActiveYearFilter('All')}
          >
            All
          </button>
          {availableYears.map(year => (
            <button
              key={year}
              className={`filter-btn ${activeYearFilter === year ? 'active' : ''}`}
              onClick={() => setActiveYearFilter(year)}
            >
              {year} ({yearCounts[year]})
            </button>
          ))}
        </div>
      </div>

      <div className="publications-section-group">
        <h2 className="section-subtitle">Full Conference Papers</h2>
        <div className="publications-list-new">
          {fullPapers.length > 0 ? (
            fullPapers.map((pub) => (
              <div key={pub.id} id={pub.id} className="pub-item-wrapper">
                <PublicationItem pub={pub} />
              </div>
            ))
          ) : (
            <p className="no-papers-msg">No full papers found for this topic.</p>
          )}
        </div>
      </div>

      <div className="publications-section-group">
        <h2 className="section-subtitle">Extended Abstracts</h2>
        <div className="publications-list-new">
          {extendedAbstracts.length > 0 ? (
            extendedAbstracts.map((pub) => (
              <div key={pub.id} id={pub.id} className="pub-item-wrapper">
                <PublicationItem pub={pub} />
              </div>
            ))
          ) : (
             <p className="no-papers-msg">No extended abstracts found for this topic.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .page-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .header-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--border-warm);
          padding-bottom: 0.5rem;
        }

        .back-btn-wrapper {
          position: absolute;
          left: 0;
        }

        .back-nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 1.2rem;
          text-decoration: none;
          color: var(--text-warm-gray);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .back-nav-link:hover {
          color: var(--accent-burgundy);
          transform: translateX(-3px);
        }

        .back-arrow {
          font-size: 1.5rem;
          margin-bottom: 2px;
        }

        .page-title {
          font-family: 'Patrick Hand', 'Comic Sans MS', cursive;
          font-size: 2.5rem;
          margin-bottom: 0;
          color: var(--text-ink);
          font-weight: 700;
          line-height: 1.2;
        }

        .section-subtitle {
          font-family: 'Patrick Hand', 'Comic Sans MS', cursive;
          font-size: 1.8rem;
          margin: 1.5rem 0 1.5rem;
          padding-top: 0;
          color: var(--text-ink);
          position: relative;
          display: inline-block;
        }
        
        .section-subtitle::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: var(--accent-burgundy);
          border-radius: 2px;
        }

        .filter-container {
          margin-bottom: 1rem;
          padding-bottom: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-family: var(--font-body);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-ink);
        }

        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .filter-btn {
          font-family: var(--font-body);
          background-color: transparent;
          border: 2px solid var(--border-warm);
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          padding: 0.4rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          color: var(--text-warm-gray);
          transition: all 0.3s ease;
          position: relative;
        }

        .filter-btn:hover {
          border-color: var(--highlight-sepia);
          color: var(--text-ink);
          transform: rotate(-1deg) scale(1.05);
        }

        .filter-btn.active {
          background-color: rgba(139, 90, 60, 0.1);
          border-color: var(--accent-burgundy);
          color: var(--accent-burgundy);
          font-weight: 600;
          transform: rotate(1deg);
          box-shadow: 2px 2px 0px rgba(139, 90, 60, 0.1);
        }

        .no-papers-msg {
          font-style: italic;
          color: var(--text-warm-gray);
          padding: 1rem;
        }

        @media (max-width: 768px) {
          .filter-btn {
            font-size: 0.9rem;
            padding: 0.3rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
