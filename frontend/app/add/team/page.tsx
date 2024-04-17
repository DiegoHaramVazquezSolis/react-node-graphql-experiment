'use client'

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';

import { ADD_TEAM } from '@/utils/queries/team';

import { PageWrapper } from '@/components/PageWrapper';
import { Form, FormActions, FormBody } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const AddTeam = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [addTeam, { data, loading, error }] = useMutation(ADD_TEAM);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTeam({
      variables: {
        name,
        image,
      }
    });

    toast.success("Team succesfully added!");
    clearForm();
  }

  const clearForm = () => {
    setImage("");
    setName("");
  }

  return (
    <PageWrapper>
      <Form onSubmit={handleSubmit}>
        <FormBody>
          <Input
            placeholder='Team name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder='Team image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormBody>
        <FormActions>
          <Button
            variant='ghost'
            onClick={clearForm}>
            Clear
          </Button>
          <Button type="submit">
            Save Team!
          </Button>
        </FormActions>
        {data &&
          <h1 className='flex justify-center'>
            Team succesfully added!
          </h1>
        }
        {loading &&
          <h1 className='flex justify-center'>
            Loading...
          </h1>
        }
        {error &&
          <div className='flex items-center justify-center gap-2'>
            <p>
              Error saving the team:
            </p>
            <p className='text-red-500'>
              {error.message}
            </p>
          </div>
        }
      </Form>
    </PageWrapper>
  );
};

export default AddTeam;