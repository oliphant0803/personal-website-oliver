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
  title: 'Oliver Huang',
  description: 'Personal website of Oliver Huang',
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
      </head>
      <body className={ibmPlexSerif.className} suppressHydrationWarning={true}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
