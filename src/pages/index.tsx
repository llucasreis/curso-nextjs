import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
// import { useEffect, useState } from 'react';
import { Title } from '../styles/pages/Home';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
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
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

// SERVER SIDE RENDERING
// TTFB -> Time To First Byte
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.tyoe', 'product')
  ])
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);

  // const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}