"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import NavigationButton from "@/common/NavigationButton";
import { Breadcrumbs, UserDetails } from "@/types";
import { Routes } from "@/lib/routes";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
import { usePathname, useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import useMediaQuery from "@/hooks/use-media-query";
import { Searchbox } from "@/common/SearchBox/SearchBox";
interface Props {
  breadcrumbs: Breadcrumbs[];
  user: UserDetails;
}

export const FundsHeader = ({ breadcrumbs }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const [isShowIconOnly, setIsShowIconOnly] = useState(false);
  const isMobileScreen = useMediaQuery("sm");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debounceValue) {
      router.push(`${Routes.Fund}?key=${debounceValue}`);
    } else {
      router.push(pathname);
    }
  }, [debounceValue, pathname, router]);

  const onFocused = () => {
    setIsShowIconOnly(true);
  };
  const onBlurred = () => {
    setIsShowIconOnly(false);
  };

  return (
    <HeaderWrapper isShowBreadCrumbs={!isMobileScreen || !isShowIconOnly} breadcrumbs={breadcrumbs}>
      {pathname === Routes.Fund && (
        <>
          <Searchbox
            isShowIconOnly={isShowIconOnly}
            fullWidthOnFocus={isMobileScreen}
            onFocused={onFocused}
            onBlurred={onBlurred}
            onChange={onChange}
          />
          <NavigationButton path={Routes.AddFund} buttonText="Add Fund" />
        </>
      )}
    </HeaderWrapper>
  );
};
