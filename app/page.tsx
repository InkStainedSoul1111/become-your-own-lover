export default function Home() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column',background:'#fafafa'}}>
      <h1 style={{fontSize:'32px',marginBottom:'20px'}}>Become Your Own Lover</h1>
      <p style={{marginBottom:'30px'}}>The self-healing app</p>
      <a 
        href="/preview" 
        style={{background:'#000',color:'#fff',padding:'14px 28px',borderRadius:'10px',textDecoration:'none',fontWeight:'600',fontSize:'16px'}}
      >
        Get Full Access for $11.11
      </a>
    </div>
  )
}
