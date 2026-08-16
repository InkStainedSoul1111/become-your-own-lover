'use client'
export default function SamplePage() {
  return (
    <div style={{padding: '40px', textAlign: 'center', minHeight: '100vh', fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: '32px', marginBottom: '20px'}}>Find Your Why</h2>
      <p style={{fontSize: '18px', marginBottom: '30px'}}>The right question can change everything. Sit with these and let them move you.</p>
      
      <h3 style={{fontStyle: 'italic', margin: '30px 0', fontSize: '22px', color: '#b03052'}}>
        "Who are you when no one is watching? That is your truest self."
      </h3>
      
      <button style={{padding: '12px 24px', margin: '10px', background: '#b03052', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px'}}>New Prompt</button>
      <button style={{padding: '12px 24px', margin: '10px', border: '2px solid #b03052', background: 'white', borderRadius: '8px', fontSize: '16px'}}>Write</button>
      
      <br/><br/>
      <a href="https://buy.stripe.com/14A8wPd059gPgQz0057bW01" target="_blank" style={{textDecoration: 'none'}}>
        <button style={{padding: '18px 36px', background: '#000', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold'}}>
          Unlock Full Access - $11.11
        </button>
      </a>
    </div>
  )
}
