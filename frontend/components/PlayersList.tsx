import { useQuery } from '@apollo/client';

import { GET_PLAYERS } from '@/utils/queries/player';

const PlayersList = () => {
  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  if (error) {
    return (
      <h1 className='text-red-500'>{error.message}</h1>
    );
  }

  return data.players.map((player: { id: string, first_name: string, last_name: string, team: { name: string } }) => (
    <div key={player.id}>
      {player.first_name} {player.last_name}: {player.team.name}
    </div>
  ));
}

export {
  PlayersList
};