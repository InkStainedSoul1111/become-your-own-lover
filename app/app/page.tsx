'use client'
export default function FullApp() {
  return (
    <div style={{padding: '40px', fontFamily: 'system-ui', textAlign: 'center', minHeight: '100vh'}}>
      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Welcome to Full Access 💛</h1>
      <p style={{fontSize: '18px', marginBottom: '30px'}}>This is the paid members area. Only you can see this for now.</p>
      
      <h2>Full Prompt Library</h2>
      <div style={{textAlign: 'left', maxWidth: '600px', margin: '0 auto', fontSize: '18px', lineHeight: '2'}}>
        <p>1. "What would I do today if I truly loved myself?"</p>
        <p>2. "Where am I abandoning myself, and how can I come back?"</p>
        <p>3. "What boundary do I need to set with love?"</p>
        <p>4. "What is my body asking me for right now?"</p>
        <p>5. "What would love say to me in this moment?"</p>
      </div>
      
      <button style={{padding: '15px 30px', marginTop: '30px', background: '#b03052', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold'}}>
        Journal Now
      </button>
      
      <br/><br/>
      <a href="/" style={{textDecoration: 'none', color: '#b03052', fontSize: '16px'}}>← Back to Home</a>
    </div>
  )
}
