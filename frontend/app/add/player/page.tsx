'use client'

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'sonner';

import { ADD_PLAYER } from '@/utils/queries/player';
import { GET_TEAMS } from '@/utils/queries/team';

import { Input } from '@/components/ui/Input';
import { PageWrapper } from '@/components/PageWrapper';
import { Form, FormActions, FormBody } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';

const AddPlayer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [addPlayer, { data: addPlayerData, loading: addPlayerLoading, error: addPlayerError }] = useMutation(ADD_PLAYER);
  const { loading: teamsLoading, error: teamsError, data: teamsData } = useQuery(GET_TEAMS);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addPlayer({
      variables: {
        first_name: firstName,
        last_name: lastName,
        team_id: teamId,
      }
    });

    toast.success("Player succesfully added!");
    clearForm();
  }

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setTeamId("");
  }

  return (
    <PageWrapper>
      <Form onSubmit={handleSubmit}>
        <FormBody>
          <Input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {teamsLoading ?
            <h1>
              Loading teams...
            </h1>
            :
            <select
              className='bg-slate-800 rounded-lg p-2'
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}>
              <option value="">Choose team</option>
              {teamsData.teams.map(({ id, name}: { id: string, name: string }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          }
        </FormBody>
        <FormActions>
          <Button
            variant='ghost'
            onClick={clearForm}>
            Clear
          </Button>
          <Button type="submit">
            Save Player!
          </Button>
        </FormActions>
        {addPlayerData &&
          <h1 className='flex justify-center'>
            Player succesfully added!
          </h1>
        }
        {addPlayerLoading &&
          <h1 className='flex justify-center'>
            Loading...
          </h1>
        }
        {addPlayerError &&
          <div className='flex items-center justify-center gap-2'>
            <p>
              Error saving player data:
            </p>
            <p className='text-red-500'>
              {addPlayerError.message}
            </p>
          </div>
        }
      </Form>
    </PageWrapper>
  );
};

export default AddPlayer;