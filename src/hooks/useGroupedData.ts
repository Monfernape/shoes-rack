import { useMemo } from "react";

function useGroupedData<T extends Record<string, unknown>>(
  data: T[],
  key: string
): Array<{ shift: string; row: T[] }> {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const groupedData = data?.reduce((acc: Record<string, T[]>, item: T) => {
      const groupKey = item[key];
      if (!acc[groupKey as string]) {
        acc[groupKey as string] = [];
      }
      acc[groupKey as string].push(item);
      return acc;
    }, {});
    return Object?.entries(groupedData)?.map(([shift, row]) => ({
      shift,
      row,
    }));
  }, [data, key]);
}

export default useGroupedData;
