import { useMemo } from 'react';

function useGroupedData<T extends Record<string, any>>(data: T[], key: string): Record<string, T[]> {
  return useMemo(() => {
    return data.reduce((acc: Record<string, T[]>, item: T) => {
      const groupKey = item[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {});
  }, [data, key]);
}

export default useGroupedData;
