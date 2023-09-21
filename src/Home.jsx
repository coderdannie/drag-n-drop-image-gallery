import { useState } from 'react';
import Nav from './components/Nav';
import { FaSearch } from 'react-icons/fa';

import Photos from './components/Photos';

const Home = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Nav />;
      <main className="wrapper">
        <section className=" mt-8">
          <form className=" max-w-[520px] flex  items-center">
            <input
              type="text"
              placeholder="search by tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="py-3 w-full  border-2 border-gray-600 placeholder:pl-6 pl-4"
            />

            <FaSearch />
          </form>
        </section>
        <Photos query={query} />
      </main>
    </>
  );
};
export default Home;
