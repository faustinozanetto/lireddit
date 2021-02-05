import { useRouter } from 'next/router';
import { usePostQuery } from '../generated/graphql';
import { useGetIntID } from './useGetIntID';

export const useGetPostFromUrl = () => {
  const intId = useGetIntID();
  return usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
