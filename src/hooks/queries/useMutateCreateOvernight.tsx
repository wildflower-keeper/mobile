import {createOvernightSchedule} from '@/utils/api/overnight';
import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from 'types/common';

const useMutateCreateOvernight = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createOvernightSchedule,
    ...mutationOptions,
  });
};

export {useMutateCreateOvernight};
