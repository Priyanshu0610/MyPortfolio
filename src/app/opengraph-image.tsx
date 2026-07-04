import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Priyanshu Raj - Frontend Developer & Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#efebe2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(0, 0, 0, 0.05) 2%, transparent 0%), radial-gradient(circle at 80px 80px, rgba(0, 0, 0, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Mock Stamp in top left (Updated to match 'R' favicon) */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            width: '120px',
            height: '120px',
            border: '6px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-5deg)',
          }}
        >
          <div
            style={{
              width: '96px',
              height: '96px',
              border: '3px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
             <span style={{ fontSize: '60px', fontWeight: 900, color: 'black' }}>R</span>
          </div>
        </div>

        {/* Massive Center Name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontSize: 130,
              fontWeight: 900,
              margin: 0,
              color: '#242424',
              lineHeight: 1,
              letterSpacing: '-6px',
              textTransform: 'uppercase',
            }}
          >
            <span>PRIYANSHU</span>
            <span style={{ marginLeft: '30px' }}>RAJ</span>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#dc2626',
              marginTop: 20,
              letterSpacing: '12px',
              textTransform: 'uppercase',
            }}
          >
            Frontend Developer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
