'use client'
import { TeamsList } from '@/components/TeamsList';
import { PlayersList } from '@/components/PlayersList';
import { ApolloWrapper } from '@/components/ApolloWrapper';

export default function Home() {
  return (
    <ApolloWrapper>
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <PlayersList />
        <TeamsList />
      </main>
    </ApolloWrapper>
  );
}
