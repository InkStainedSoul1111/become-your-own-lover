import { ProductPreview } from '@/components/ProductPreview'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',  // <- lowercase j
      padding: '2rem'
    }}>
      <h1>Welcome to Become Your Own Lover</h1>
      <ProductPreview />
      <a href="/sample">View Free Sample →</a>
    </div>
  )
}
