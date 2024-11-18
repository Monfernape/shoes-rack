import { useContext } from "react";
import SearchContext from "@/context/SearchContextProvider";

export const useSearchContext = () => {
    const context = useContext(SearchContext);
  
    if (!context) {
      throw new Error(
        "useMemberContext must be used within a MemberContextProvider"
      );
    }
  
    return context;
  };
  
 