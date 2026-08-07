'use client';

import Link from 'next/link';
import { useState } from 'react';
import { RiFilePaperFill, RiFilePdfFill, RiSlideshowFill } from "react-icons/ri";
// Import data at the top level
import publicationsData from '@/data/publications.json';
import '@/styles/publications.css';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="home-container">
      <section className="bio-section">
        <h2 className="bio-heading">
          <Annotated text="Bio" styleOverride={2} />
          <img src="/icon.svg" alt="" aria-hidden="true" className="bio-icon" />
        </h2>
        <p>
          I am a 1st year PhD student at{' '}
          <a href="https://ethz.ch/" target="_blank" rel="noopener noreferrer" className="styled-link">
            ETH Zürich
          </a>
          , advised by{' '}
          <a href="https://www.aprilwang.me/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. April Wang
          </a>
          {' '}in the{' '}
          <a href="https://peachlab.inf.ethz.ch/" target="_blank" rel="noopener noreferrer" className="styled-link">
            PEACH Lab
          </a>
          , and closely collaborating with{' '}
          <a href="https://www.majeed.cc/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Majeed Kazemi
          </a>
          . My research asks how <Annotated text="human-AI interaction techniques" imageNumber={3} /> can support <Annotated text="knowledge construction" imageNumber={5} /> and <Annotated text="mental-model formation" imageNumber={4} /> while <Annotated text="preserving users' agency" imageNumber={6} /> and capacity for independent reasoning.
        </p>

        <p>
          Previously, I completed my MSc and BSc in Computer Science at the{' '}
          <a href="https://web.cs.toronto.edu/" target="_blank" rel="noopener noreferrer" className="styled-link">
            University of Toronto
          </a>
          . I was advised by{' '}
          <a href="https://carolinanobre.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Carolina Nobre
          </a>
          {' '}during my master's and worked with{' '}
          <a href="https://www.tovigrossman.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Tovi Grossman
          </a>
          {' '}during my undergraduate studies, both in the{' '}
          <a href="https://www.dgp.toronto.edu/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Dynamic Graphics Project (DGP) Lab
          </a>
          . My research focused on{' '}
          <Annotated text="externalizing reasoning" imageNumber={2} /> and supporting{' '}
          <Annotated text="critical thinking" imageNumber={6} /> through visualization and interaction in decision-making and computer science education.
        </p>

        <p>
          Please reach out if you think we can collaborate or share ideas! 💡
        </p>
      </section>

      <section className="publications-section">
        <Link href="/publications" className="section-title-link">
          <h2>
            <Annotated text="Selected Publications" styleOverride={2} />
            <svg viewBox="0 0 24 24" fill="currentColor" className="section-link-icon">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="section-link-label">all publications</span>
          </h2>
        </Link>
        
        <p className="publications-intro">
          My research has been published in leading human-computer interaction (CHI, IUI, VL/HCC) and top-tier visualization (VIS, EuroVis) conferences.
        </p>

        <div className="filter-container">
          <span className="filter-label">Filter by topic:</span>
          <div className="filter-buttons">
            {['All', 'Human-AI Interaction', 'Education', 'Visualization Literacy', 'Data-driven Sensemaking', 'Long-form Text'].map(topic => (
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

        <div className="featured-publications-container">
          <PublicationsList filter={activeFilter} />
        </div>
        <div className="section-link">
          <a href="/publications" className="styled-link view-all-link">
            View all publications →
          </a>
        </div>
      </section>

      <style jsx>{`
        .bio-heading {
          display: flex;
          align-items: flex-end;
          gap: 0.6rem;
        }

        .bio-icon {
          width: 3.4rem;
          height: 3.4rem;
          margin-bottom: 0.2rem;
        }

        .section-title-link {
          text-decoration: none;
          color: inherit;
          display: block;
          width: fit-content;
        }
        
        .section-title-link:hover .section-link-icon {
          transform: translateX(4px);
          color: var(--accent-burgundy);
        }

        .section-link-label {
          font-family: var(--font-handwritten);
          font-size: 0.85rem;
          color: var(--highlight-sepia);
          vertical-align: middle;
          margin-left: 0.1rem;
          white-space: nowrap;
          transition: color 0.3s ease;
        }

        .section-title-link:hover .section-link-label {
          color: var(--accent-burgundy);
        }

        .section-link-icon {
          display: inline-block;
          width: 1.8rem;
          height: 1.8rem;
          margin-left: 0.5rem;
          vertical-align: bottom;
          color: var(--highlight-sepia);
          transition: transform 0.3s ease, color 0.3s ease;
          margin-bottom: 0.5rem;
        }

        .publications-intro {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--text-warm-gray);
          margin-bottom: 1.5rem;
          max-width: 800px;
          line-height: 1.5;
        }

        .filter-container {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
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
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* Hand-drawn feel */
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
          transfouang: rotate(-1deg) scale(1.05);
        }

        .filter-btn.active {
          background-color: rgba(139, 90, 60, 0.1);
          border-color: var(--accent-burgundy);
          color: var(--accent-burgundy);
          font-weight: 600;
          transform: rotate(1deg);
          box-shadow: 2px 2px 0px rgba(139, 90, 60, 0.1);
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

// Annotated Text Component
function Annotated({ text, styleOverride }) {
  // Use styleOverride if provided, otherwise default to style 3 (Red/Coral) as requested
  const styleNumber = styleOverride || 3;
  
  return (
    <span className={`brush-highlight brush-style-${styleNumber}`}>
      {text}
    </span>
  );
}

// Component to render a limited list of publications with focus on conference papers
function PublicationsList({ maxCount, filter = 'All' }) {
  // Filter papers based on selected topic
  let filteredPapers = publicationsData.publications
    .filter(pub => {
      // Filter out non-selected publications
      if (pub.selected === 'no') return false;
      
      // Apply filters
      if (filter === 'All') return true;
      // Check if tags exist and match filter
      return pub.tags && pub.tags.includes(filter);
    });

  if (maxCount) {
    filteredPapers = filteredPapers.slice(0, maxCount); // Take top N if maxCount set
  }

  // Function to format author list with your name bolded
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
            {pub.links?.pdf && (
              <a
                href={pub.links.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link-button"
              >
                <span className="link-icon"><RiFilePdfFill /></span> PDF
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
            {pub.links?.presentation && (
              <a
                href={pub.links.presentation}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link-button"
              >
                <span className="link-icon"><RiSlideshowFill /></span> TALK
              </a>
            )}
            {/* Add other links if they exist */}
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

  return (
    <div className="publications-list-new">
      {filteredPapers.map((pub) => (
        <div key={pub.id} className="pub-item-wrapper">
           <PublicationItem pub={pub} />
        </div>
      ))}
    </div>
  );
}
