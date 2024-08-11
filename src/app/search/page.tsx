import React from 'react';
import Heading from '@/components/General/Heading';
import ProductCard from '@/components/Home/ProductCard';
import { Product } from '@prisma/client';

interface SearchProps {
  searchParams: {
    query: string;
  };
}


const Search = async ({ searchParams }: SearchProps) => {
    const query = searchParams.query || '';
  
    if (!query) {
      return <div>Lütfen bir kelime gir.</div>;
    }
  
    const host = process.env.MAIN_SITE_URL ? `https://${process.env.MAIN_SITE_URL}` : 'http://localhost:3000';
    const response = await fetch(`${host}/api/search?query=${query}`);
    const products:Product[] = await response.json();
  
    if (!products.length) {
      return <div className='text-white text-2xl mt-10'>{`"${query}" için sonuç bulunamadı`}</div>;
    }
  
    return (
      <div className="p-4">
        <Heading text={`"${query}" için sonuçlar:`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

export default Search;
