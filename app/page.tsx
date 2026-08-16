import { ProductPreview } from '@/components/productpreview'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/images/healing-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',  // <- lowercase j
      padding: '2rem'
    }}>
      <h1>Welcome to Manifestation Journal</h1>
      <ProductPreview />
    </div>
  )
}
