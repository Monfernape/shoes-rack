import { useMemo } from "react";

function useGroupedData<T extends Record<string, unknown>>(
  data: T[],
  key: string
): Array<{ shift: string; row: T[] }> {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const groupedData = data.reduce((acc: Record<string, T[]>, item: T) => {
      const groupKey = item[key];
      if (!acc[groupKey as string]) {
        acc[groupKey as string] = [];
      }
      acc[groupKey as string].push(item);
      return acc;
    }, {});

    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
      const order = ["Shift A", "Shift B", "Shift C"];
      return order.indexOf(a) - order.indexOf(b);
    });

    return sortedKeys.map((shift) => {
      const sortedMembers = groupedData[shift].sort((a, b) => {
        const dateA = new Date(a.created_at as string).getTime();
        const dateB = new Date(b.created_at as string).getTime();
        return dateB - dateA;
      });

      return {
        shift,
        row: sortedMembers,
      };
    });
  }, [data, key]);
}

export default useGroupedData;

