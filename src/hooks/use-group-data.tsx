import { useMemo } from "react";

function useGroupedData<T extends Record<string, any>>(
  data: T[],
  key: string
): Array<{ shift: string; row: T[] }> {
  return useMemo(() => {
    const groupedData = data.reduce((acc: Record<string, T[]>, item: T) => {
      const groupKey = item[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {});
    return Object.entries(groupedData).map(([shift, row]) => ({
      shift,
      row,
    }));
  }, [data, key]);
}

export default useGroupedData;
