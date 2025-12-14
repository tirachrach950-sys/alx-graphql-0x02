import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "@/graphql/queries";
import { EpisodeProps } from "@/interfaces";
import EpisodeCard from "@/components/common/EpisodeCard";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: { page },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const results = data?.episodes.results;
  const info = data?.episodes.info;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4]">
      <header className="bg-[#4CA1AF] text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Rick and Morty Episodes</h1>
        <p className="italic">Explore the multiverse of adventures!</p>
      </header>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results?.map(
            ({ id, name, air_date, episode }: EpisodeProps, key: number) => (
              <EpisodeCard
                id={id}
                name={name}
                air_date={air_date}
                episode={episode}
                key={key}
              />
            )
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage((p) => (p > 1 ? p - 1 : 1))}
            className="bg-[#45B69C] text-white py-2 px-6 rounded-lg"
          >
            Previous
          </button>

          <button
            onClick={() => setPage((p) => (p < info.pages ? p + 1 : p))}
            className="bg-[#45B69C] text-white py-2 px-6 rounded-lg"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

