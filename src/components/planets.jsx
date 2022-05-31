import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, status } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      staleTime: 1000,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>Planets</h2>
      {status === "error" && <div>Error fetching data.</div>}
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && (
        <>
          {page > 1 ? (
            <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
              Previous Page
            </button>
          ) : null}
          <span>{page}</span>
          {data.next && (
            <button
              onClick={() => setPage((old) => (data.next ? old + 1 : old))}
            >
              Next Page
            </button>
          )}
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
