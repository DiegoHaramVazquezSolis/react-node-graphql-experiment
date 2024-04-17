import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_TEAMS } from '@/utils/queries/team';

const TeamsList = () => {
  const { loading, error, data } = useQuery(GET_TEAMS);

  if (loading) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className='text-red-500'>
        Error loading Teams
      </h1>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {data.teams.map(({ id, name, image }: { id:string,  name: String, image: string }) => (
          <div key={id} className='flex items-center gap-2'>
            <img src={image} alt={`${name} image`} width={32} />
            <h1>
              {name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export {
  TeamsList
};