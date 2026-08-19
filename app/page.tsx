  return (
    <>
      <style>{`
        body{font-family:'Alegreya',serif;background:#fdf8f3;margin:0}
        .heading{font-family:'Playfair Display',serif}
        .btn{background:#b45309;color:white;padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-size:15px}
        .btn-gold{background:linear-gradient(135deg,#d4af37,#b45309);color:white;padding:12px 24px;border:none;border-radius:8px;cursor:pointer;font-weight:bold}
        .btn-small{background:#b45309;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-size:14px}
        .card{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.05);border:1px solid #e7e5e4;padding:24px;margin-bottom:16px}
        .tab{padding:16px 8px;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;color:#57534e;white-space:nowrap}
        .tab.active{border-bottom:3px solid #b45309;color:#b45309}
        .panel{display:none}.panel.active{display:block;animation:fade.4s}
        .paywall-glow{box-shadow:0 0 0 1px #f59e0b, 0 0 20px rgba(245,158,11,.2)}
        @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>

      {!started ? (
        <div style={{position: 'relative', height: '100vh'}}>
          <img 
            src="https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&w=1280" 
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} 
          />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))'}} />
          <div style={{position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px'}}>
            <h1 className="heading" style={{color: 'white', fontSize: '48px', textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>Become Your Own Lover</h1>
            <p style={{color: 'white', fontSize: '18px', margin: '12px 0 32px'}}>A sacred space for inner connection and self-love</p>
            <button className="btn" onClick={() => {setStarted(true); playSound()}}>Start Your Journey</button>
          </div>
        </div>
      ) : (
        <div style={{background:'linear-gradient(to bottom,#fafaf9,#fffbeb)',minHeight:'100vh'}}>
          <header className="card" style={{borderRadius:0,position:'sticky',top:0,zIndex:10}}>
            <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h1 className="heading">Become Your Own Lover</h1>
              <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
                {!hasFullAccess && (
                  <>
                    <span style={{fontSize:'14px',color:'#92400e',background:'#fef3c7',padding:'4px 12px',borderRadius:'20px',fontWeight:'bold'}}>PREVIEW MODE</span>
                    <button className="btn-gold" onClick={handlePurchase} style={{padding:'6px 16px',fontSize:'14px'}}>Buy Full Version $21.21</button>
                  </>
                )}
                {hasFullAccess && <span style={{fontSize:'14px',color:'#059669',background:'#d1fae5',padding:'4px 12px',borderRadius:'20px'}}>Full Access</span>}
                <button onClick={()=>setMusicPlaying(!musicPlaying)} style={{background:'none',border:'none',color:'#b45309',cursor:'pointer'}}>{musicPlaying?'🔊 On':'🔇 Off'}</button>
              </div>
            </div>
          </header>

          <nav style={{background:'white',borderBottom:'1px solid #e7e5e4'}}>
            <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',gap:'16px',overflowX:'auto',padding:'0 16px'}}>
              {tabs.map(t=><button key={t} className={`tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>
                {t==='manifest'?'Manifest':t==='motivate'?'Motivate':t==='Music/Dance'?'Music/Dance':t.charAt(0).toUpperCase()+t.slice(1).replace('selfcare','Self Care')}
              </button>)}
            </div>
          </nav>

          <main style={{maxWidth:'1024px',margin:'0 auto',padding:'24px 16px'}}>
            {['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals'].map(tab=>(
              <div key={tab} className={`panel ${activeTab===tab?'active':''}`}>
                <div className={`card ${isLocked && ['manifest','motivate','Music/Dance'].includes(tab) && activeTab===tab?'paywall-glow':''}`}>
                  <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>
                    {tab==='manifest'?'Reclaim Your Body':tab==='motivate'?'Reclaim Your Time':tab==='Music/Dance'?'Reclaim Your Voice':tab.charAt(0).toUpperCase()+tab.slice(1)}
                  </h2>

                  {isLocked && ['manifest','motivate','Music/Dance'].includes(tab) && activeTab===tab? (
                    <div style={{textAlign:'center',padding:'40px 20px'}}>
                      <h3 className="heading" style={{fontSize:'28px',marginBottom:'16px'}}>You’ve felt the shift.</h3>
                      <p style={{fontSize:'18px',marginBottom:'8px',color:'#57534e'}}>
                        You’ve viewed 3 prompts. That clarity after *“yo”*?
                      </p>
                      <p style={{fontSize:'18px',marginBottom:'24px',color:'#57534e'}}>
                        That strength to hang up? There are 81 more waiting.
                      </p>
                      <button className="btn-gold" onClick={handlePurchase}>
                        Unlock All 84 Prompts — $21.21
                      </button>
                      <p style={{fontSize:'14px',marginTop:'16px',color:'#78716c'}}>One-time payment. Yours forever. No more waiting.</p>
                      <button onClick={unlockNow} style={{marginTop:'24px',background:'none',border:'none',color:'#a8a29e',fontSize:'12px',cursor:'pointer',textDecoration:'underline'}}>
                        Already purchased? Click to restore access
                      </button>
                    </div>
                  ) : (
                    <>
                      {currentItem?.img && <img src={currentItem.img} style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'8px',marginBottom:'16px'}}/>}
                      <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{currentItem?.text || currentItem}"</p>
                      
                      <div style={{background:'#fef3c7',padding:'16px',borderRadius:'8px',marginBottom:'16px',border:'1px solid #fde68a'}}>
                        <textarea
                          value={responseText}
                          onChange={e=>setResponseText(e.target.value)}
                          style={{width:'100%',minHeight:'100px',background:'rgba(255,255,255,0.8)',border:'none',outline:'none',resize:'vertical',color:'#78350f',fontFamily:'Alegreya',fontSize:'15px',padding:'12px',borderRadius:'6px'}}
                          placeholder="Write your response here... What comes up for you?"
                        />
                        <button className="btn-small" onClick={()=>saveCardResponse(tab)} style={{marginTop:'12px'}}>
                          Save to My Writings
                        </button>
                      </div>

                      <button className="btn" onClick={()=>shuffle(tab)}>Next Prompt →</button>
                      {!hasFullAccess && ['manifest','motivate','Music/Dance'].includes(tab) && <p style={{fontSize:'14px',marginTop:'12px',color:'#78716c'}}>{3-promptsViewed} free views left</p>}
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className={`panel ${activeTab==='journal'?'active':''}`}>
              <div className="card" style={{
                backgroundImage: 'url(/journal-pastel.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 247, 237, 0.92)', 
                  borderRadius: '8px', 
                  padding: '24px'
                }}>
                  <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>Sacred Journal</h2>
                  <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{data.journal[index.journal]}"</p>
                  <form onSubmit={saveEntry}>
                    <div className="card" style={{ background:'#fff7ed', padding: '24px', borderRadius: '12px', marginBottom: '16px' }} >
                      <textarea value={journalText} onChange={e=>setJournalText(e.target.value)} style={{width:'100%',minHeight:'200px',background:'rgba(255,255,255,0.9)',border:'none',outline:'none',resize:'none',color:'#78350f',fontFamily:'Alegreya',fontSize:'16px',padding:'12px',borderRadius:'8px'}} placeholder="Dear Me, Today I choose to become my own lover by..." />
                    </div>
                    <button className="btn" type="submit">Save Entry</button>
                  </form>
                  <button onClick={()=>shuffle('journal')} style={{marginTop:'12px',background:'none',border:'none',color:'#b45309',cursor:'pointer'}}>New Prompt</button>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab==='writings'?'active':''}`}>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                  <h2 className="heading" style={{fontSize:'24px',margin:0}}>My Writings</h2>
                  {!hasFullAccess && (
                    <button className="btn-gold" onClick={handlePurchase} style={{padding:'8px 16px',fontSize:'14px'}}>
                      Unlock Full Version
                    </button>
                  )}
                </div>
                
                {!hasFullAccess && (
                  <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:'8px',padding:'12px',marginBottom:'16px',textAlign:'center'}}>
                    <p style={{margin:0,color:'#92400e',fontSize:'14px'}}>
                      <strong>Preview:</strong> You’re viewing saved responses from the 3 free prompts. 
                      <span onClick={handlePurchase} style={{textDecoration:'underline',cursor:'pointer',marginLeft:'4px'}}>Unlock all 84 prompts for $21.21</span>
                    </p>
                  </div>
                )}

                {allEntries.length===0?<p>No entries yet. Your responses to prompts will appear here.</p>:allEntries.map((e,i)=><div key={i} style={{borderBottom:'1px solid #e7e5e4',padding:'16px 0'}}>
                  <p style={{fontSize:'13px',color:'#b45309',marginBottom:'4px',fontWeight:'bold'}}>{e.tab==='manifest'?'Manifest':e.tab==='motivate'?'Motivate':e.tab==='Music/Dance'?'Music/Dance':e.tab.charAt(0).toUpperCase()+e.tab.slice(1)}</p>
                  <p style={{fontStyle:'italic',color:'#78716c',marginBottom:'8px'}}>{e.prompt}</p>
                  <p style={{color:'#44403c',lineHeight:'1.6'}}>{e.content}</p>
                  <p style={{fontSize:'12px',color:'#a8a29e',marginTop:'8px'}}>{e.date}</p>
                </div>)}
              </div>
            </div>
          </main>

          <footer style={{textAlign:'center',padding:'40px 20px',color:'#a8a29e',fontSize:'14px'}}>
            <p>Day 1520. *No more waiting.* You chose you.</p>
            {!hasFullAccess && <p style={{marginTop:'8px'}}>Unlock all 84 prompts for $21.21 — the cost of one dinner you never got.</p>}
          </footer>
        </div>
      )}
    </>
  )
}
  return (
    <>
      <style>{`
        body{font-family:'Alegreya',serif;background:#fdf8f3;margin:0}
        .heading{font-family:'Playfair Display',serif}
        .btn{background:#b45309;color:white;padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-size:15px}
        .btn-gold{background:linear-gradient(135deg,#d4af37,#b45309);color:white;padding:12px 24px;border:none;border-radius:8px;cursor:pointer;font-weight:bold}
        .btn-small{background:#b45309;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-size:14px}
        .card{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.05);border:1px solid #e7e5e4;padding:24px;margin-bottom:16px}
        .tab{padding:16px 8px;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;color:#57534e;white-space:nowrap}
        .tab.active{border-bottom:3px solid #b45309;color:#b45309}
        .panel{display:none}.panel.active{display:block;animation:fade.4s}
        .paywall-glow{box-shadow:0 0 0 1px #f59e0b, 0 0 20px rgba(245,158,11,.2)}
        @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>

      {!started ? (
        <div style={{position: 'relative', height: '100vh'}}>
          <img 
            src="https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&w=1280" 
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} 
          />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))'}} />
          <div style={{position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px'}}>
            <h1 className="heading" style={{color: 'white', fontSize: '48px', textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>Become Your Own Lover</h1>
            <p style={{color: 'white', fontSize: '18px', margin: '12px 0 32px'}}>A sacred space for inner connection and self-love</p>
            <button className="btn" onClick={() => {setStarted(true); playSound()}}>Start Your Journey</button>
          </div>
        </div>
      ) : (
        <div style={{background:'linear-gradient(to bottom,#fafaf9,#fffbeb)',minHeight:'100vh'}}>
          <header className="card" style={{borderRadius:0,position:'sticky',top:0,zIndex:10}}>
            <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h1 className="heading">Become Your Own Lover</h1>
              <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
                {!hasFullAccess && (
                  <>
                    <span style={{fontSize:'14px',color:'#92400e',background:'#fef3c7',padding:'4px 12px',borderRadius:'20px',fontWeight:'bold'}}>PREVIEW MODE</span>
                    <button className="btn-gold" onClick={handlePurchase} style={{padding:'6px 16px',fontSize:'14px'}}>Buy Full Version $21.21</button>
                  </>
                )}
                {hasFullAccess && <span style={{fontSize:'14px',color:'#059669',background:'#d1fae5',padding:'4px 12px',borderRadius:'20px'}}>Full Access</span>}
                <button onClick={()=>setMusicPlaying(!musicPlaying)} style={{background:'none',border:'none',color:'#b45309',cursor:'pointer'}}>{musicPlaying?'🔊 On':'🔇 Off'}</button>
              </div>
            </div>
          </header>

          <nav style={{background:'white',borderBottom:'1px solid #e7e5e4'}}>
            <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',gap:'16px',overflowX:'auto',padding:'0 16px'}}>
              {tabs.map(t=><button key={t} className={`tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>
                {t==='manifest'?'Manifest':t==='motivate'?'Motivate':t==='Music/Dance'?'Music/Dance':t.charAt(0).toUpperCase()+t.slice(1).replace('selfcare','Self Care')}
              </button>)}
            </div>
          </nav>

          <main style={{maxWidth:'1024px',margin:'0 auto',padding:'24px 16px'}}>
            {['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals'].map(tab=>(
              <div key={tab} className={`panel ${activeTab===tab?'active':''}`}>
                <div className={`card ${isLocked && ['manifest','motivate','Music/Dance'].includes(tab) && activeTab===tab?'paywall-glow':''}`}>
                  <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>
                    {tab==='manifest'?'Reclaim Your Body':tab==='motivate'?'Reclaim Your Time':tab==='Music/Dance'?'Reclaim Your Voice':tab.charAt(0).toUpperCase()+tab.slice(1)}
                  </h2>

                  {isLocked && ['manifest','motivate','Music/Dance'].includes(tab) && activeTab===tab? (
                    <div style={{textAlign:'center',padding:'40px 20px'}}>
                      <h3 className="heading" style={{fontSize:'28px',marginBottom:'16px'}}>You’ve felt the shift.</h3>
                      <p style={{fontSize:'18px',marginBottom:'8px',color:'#57534e'}}>
                        You’ve viewed 3 prompts. That clarity after *“yo”*?
                      </p>
                      <p style={{fontSize:'18px',marginBottom:'24px',color:'#57534e'}}>
                        That strength to hang up? There are 81 more waiting.
                      </p>
                      <button className="btn-gold" onClick={handlePurchase}>
                        Unlock All 84 Prompts — $21.21
                      </button>
                      <p style={{fontSize:'14px',marginTop:'16px',color:'#78716c'}}>One-time payment. Yours forever. No more waiting.</p>
                      <button onClick={unlockNow} style={{marginTop:'24px',background:'none',border:'none',color:'#a8a29e',fontSize:'12px',cursor:'pointer',textDecoration:'underline'}}>
                        Already purchased? Click to restore access
                      </button>
                    </div>
                  ) : (
                    <>
                      {currentItem?.img && <img src={currentItem.img} style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'8px',marginBottom:'16px'}}/>}
                      <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{currentItem?.text || currentItem}"</p>
                      
                      <div style={{background:'#fef3c7',padding:'16px',borderRadius:'8px',marginBottom:'16px',border:'1px solid #fde68a'}}>
                        <textarea
                          value={responseText}
                          onChange={e=>setResponseText(e.target.value)}
                          style={{width:'100%',minHeight:'100px',background:'rgba(255,255,255,0.8)',border:'none',outline:'none',resize:'vertical',color:'#78350f',fontFamily:'Alegreya',fontSize:'15px',padding:'12px',borderRadius:'6px'}}
                          placeholder="Write your response here... What comes up for you?"
                        />
                        <button className="btn-small" onClick={()=>saveCardResponse(tab)} style={{marginTop:'12px'}}>
                          Save to My Writings
                        </button>
                      </div>

                      <button className="btn" onClick={()=>shuffle(tab)}>Next Prompt →</button>
                      {!hasFullAccess && ['manifest','motivate','Music/Dance'].includes(tab) && <p style={{fontSize:'14px',marginTop:'12px',color:'#78716c'}}>{3-promptsViewed} free views left</p>}
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className={`panel ${activeTab==='journal'?'active':''}`}>
              <div className="card" style={{
                backgroundImage: 'url(/journal-pastel.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 247, 237, 0.92)', 
                  borderRadius: '8px', 
                  padding: '24px'
                }}>
                  <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>Sacred Journal</h2>
                  <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{data.journal[index.journal]}"</p>
                  <form onSubmit={saveEntry}>
                    <div className="card" style={{ background:'#fff7ed', padding: '24px', borderRadius: '12px', marginBottom: '16px' }} >
                      <textarea value={journalText} onChange={e=>setJournalText(e.target.value)} style={{width:'100%',minHeight:'200px',background:'rgba(255,255,255,0.9)',border:'none',outline:'none',resize:'none',color:'#78350f',fontFamily:'Alegreya',fontSize:'16px',padding:'12px',borderRadius:'8px'}} placeholder="Dear Me, Today I choose to become my own lover by..." />
                    </div>
                    <button className="btn" type="submit">Save Entry</button>
                  </form>
                  <button onClick={()=>shuffle('journal')} style={{marginTop:'12px',background:'none',border:'none',color:'#b45309',cursor:'pointer'}}>New Prompt</button>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab==='writings'?'active':''}`}>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                  <h2 className="heading" style={{fontSize:'24px',margin:0}}>My Writings</h2>
                  {!hasFullAccess && (
                    <button className="btn-gold" onClick={handlePurchase} style={{padding:'8px 16px',fontSize:'14px'}}>
                      Unlock Full Version
                    </button>
                  )}
                </div>
                
                {!hasFullAccess && (
                  <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:'8px',padding:'12px',marginBottom:'16px',textAlign:'center'}}>
                    <p style={{margin:0,color:'#92400e',fontSize:'14px'}}>
                      <strong>Preview:</strong> You’re viewing saved responses from the 3 free prompts. 
                      <span onClick={handlePurchase} style={{textDecoration:'underline',cursor:'pointer',marginLeft:'4px'}}>Unlock all 84 prompts for $21.21</span>
                    </p>
                  </div>
                )}

                {allEntries.length===0?<p>No entries yet. Your responses to prompts will appear here.</p>:allEntries.map((e,i)=><div key={i} style={{borderBottom:'1px solid #e7e5e4',padding:'16px 0'}}>
                  <p style={{fontSize:'13px',color:'#b45309',marginBottom:'4px',fontWeight:'bold'}}>{e.tab==='manifest'?'Manifest':e.tab==='motivate'?'Motivate':e.tab==='Music/Dance'?'Music/Dance':e.tab.charAt(0).toUpperCase()+e.tab.slice(1)}</p>
                  <p style={{fontStyle:'italic',color:'#78716c',marginBottom:'8px'}}>{e.prompt}</p>
                  <p style={{color:'#44403c',lineHeight:'1.6'}}>{e.content}</p>
                  <p style={{fontSize:'12px',color:'#a8a29e',marginTop:'8px'}}>{e.date}</p>
                </div>)}
              </div>
            </div>
          </main>

          <footer style={{textAlign:'center',padding:'40px 20px',color:'#a8a29e',fontSize:'14px'}}>
            <p>Day 1520. *No more waiting.* You chose you.</p>
            {!hasFullAccess && <p style={{marginTop:'8px'}}>Unlock all 84 prompts for $21.21 — the cost of one dinner you never got.</p>}
          </footer>
        </div>
      )}
    </>
  )
}
