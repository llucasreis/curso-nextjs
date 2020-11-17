import SEO from '@/components/SEO';
import { GetServerSideProps } from 'next';
// import { useEffect, useState } from 'react';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // CLIENT SIDE FETCHING
  // const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  
  // useEffect(() => {
  //   fetch('http://localhost:3333/recommended').then(response => {
  //     response.json().then(data => {
  //       setRecommendedProducts(data);
  //     })
  //   })
  // }, []);

  async function handleSum() {
    // dynamic import
    const math = (await import('../lib/math')).default;
    alert(math.sum(3, 5));
  }

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="boost.png"
        shouldExcludeTitleSufix
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProducts => {
            return (
              <li key={recommendedProducts.id}>
                {recommendedProducts.title}
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

// SERVER SIDE RENDERING
// TTFB -> Time To First Byte
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}