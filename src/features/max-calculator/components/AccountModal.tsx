'use client';

import { Modal } from '@/components/elements/Modal';
import { useState } from 'react';
import { getEquipmentData } from '../actions/getAccountData';
import { cn } from '@/util/cn';

interface AccountModalProps {
  close: () => void;
}

export const AccountModal = ({ close }: AccountModalProps) => {
  return (
    <Modal close={close}>
      <div className='divide-y divide-primary'>
        <AccountModalHero />
        <AccountModalForm />
      </div>
    </Modal>
  );
};

const AccountModalHero = () => {
  return (
    <div className='flex flex-col gap-1 px-3 py-6 w-full sm:max-w-96'>
      <h1 className='text-center'>Load equipment data</h1>
      <p className='text-center text-primary-dark'>Enter your Clash of Clans account tag to load your equipment data.</p>
    </div>
  );
};

const AccountModalForm = () => {
  const [formState, setFormState] = useState({
    tag: '',
    error: '',
    isLoading: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true, error: '' }));

    const regex = /^[#PYLQGRJCUV0289]+$/; // Only allows the following characters: #, P, Y, L, Q, G, R, J, C, U, V, 0, 2, 8, 9
    if (!regex.test(formState.tag)) {
      setFormState((prev) => ({ ...prev, error: 'Invalid tag', isLoading: false }));
    }

    try {
      const data = await getEquipmentData(formState.tag);
    } catch {
      setFormState((prev) => ({ ...prev, error: 'Invalid tag', isLoading: false }));
    }
    //   setError('');

    //   const regex = /^[#PYLQGRJCUV0289]+$/;
    //   if

    //   if (regex.test(tag)) {
    //     setIsLoading(true);
    //     try {
    //       const data = await getEquipmentData(tag);
    //       console.log(data);

    //       // loadItems(data);
    //       close();
    //     } catch {
    //       setError('Invalid tag');
    //     } finally {
    //       setIsLoading(false);
    //     }
    //     setIsLoading;
    //   } else {
    //     setError('Invalid tag');
    //   }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, tag: e.target.value, error: '' }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex gap-2 p-3'>
        <input
          type='text'
          placeholder='Clash of Clans tag...'
          value={formState.tag}
          onChange={handleTagChange}
          className={cn(
            'flex-1 px-3 py-2 rounded-full border placeholder:text-primary-dark border-secondary text-secondary',
            formState.error && 'border-2 border-red-600'
          )}
        />
        <button className='grid place-items-center py-2 w-24 rounded-full border bg-accent border-accent'>
          {formState.isLoading ? <div className='icon-[svg-spinners--3-dots-move] text-2xl' /> : <div className='center-text'>Load</div>}
        </button>
      </form>
      {formState.error && <p className='py-3 text-sm text-center text-red-600'>{formState.error}</p>}
    </>
  );
};
