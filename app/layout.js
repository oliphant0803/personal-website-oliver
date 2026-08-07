import { IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css'; // Ensure Mapbox GL CSS is loaded
import LayoutShell from '../components/LayoutShell';

// IBM Plex Serif for academic content
const ibmPlexSerif = IBM_Plex_Serif({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic']
});

export const metadata = {
  title: 'Oliver (Haoze) Huang',
  description: 'Personal website of Oliver',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Patrick+Hand:wght@400&family=Shadows+Into+Light&family=Fredoka+One:wght@400&family=IBM+Plex+Serif:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Ma+Shan+Zheng&family=Zhi+Mang+Xing&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Oliver (Haoze) Huang",
              "description": "Doctoral student at ETH Zurich researching how human-AI techniques can support knowledge construction and mental-model formation while preserving users' agency and capacity for independent reasoning.",
              "url": "https://www.oliver-huang.com/",
              "image": "https://www.oliver-huang.com/static/uploads/profile.png",
              "email": "mailto:haohuang@ethz.ch",
              "jobTitle": "Doctoral Student",
              "knowsAbout": [
                "Human-Computer Interaction",
                "Human-AI Interaction",
                "Data Visualization",
                "CS Education"
              ],
              "affiliation": {
                "@type": "CollegeOrUniversity",
                "name": "ETH Zurich",
                "url": "https://ethz.ch/"
              },
              "alumniOf": [
                {
                  "@type": "CollegeOrUniversity",
                  "name": "University of Toronto",
                  "url": "https://www.utoronto.ca/"
                }
              ],
              "sameAs": [
                "https://scholar.google.com/citations?user=1upDPnEAAAAJ&hl=en",
                "https://orcid.org/0009-0007-1585-1229",
                "https://github.com/oliphant0803",
                "https://www.linkedin.com/in/oliver-huang-2398661aa/"
              ]
            })
          }}
        />
      </head>
      <body className={ibmPlexSerif.className} suppressHydrationWarning={true}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
