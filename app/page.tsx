export default function Preview() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/healing-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.9)',
        padding: '40px',
        borderRadius: '20px',
        maxWidth: '600px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{fontSize:'32px',marginBottom:'10px'}}>Become Your Own Lover</h1>
        <p style={{fontSize:'18px',marginBottom:'30px'}}>Your self-healing space</p>
        
        <div style={{background:'#fff',padding:'20px',borderRadius:'10px',margin:'20px 0'}}>
          <h3>✨ Today's Free Prompt</h3>
          <p>"What is one thing I can do to love myself today?"</p>
        </div>

        <div style={{background:'#fff',padding:'20px',borderRadius:'10px',margin:'20px 0'}}>
          <h3>💆 Free Tool: 60-Second Reset</h3>
          <p>Breathe in for 4... hold for 4... out for 4. Repeat 3x.</p>
        </div>

        <p style={{margin:'30px 0'}}>Want daily prompts, trackers, and full tools?</p>
        
        <a 
          href="https://buy.stripe.com/14A8wPd059gPgQz0057bW01"
          style={{background:'#000',color:'#fff',padding:'16px 32px',borderRadius:'10px',textDecoration:'none',fontWeight:'600',fontSize:'18px',display:'inline-block'}}
        >
          Get Full Access for $11.11
        </a>
      </div>
    </div>
  )
}
