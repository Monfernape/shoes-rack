import { render, screen } from "@testing-library/react";
import { UserAvatar } from "./UserAvatar";
import "@testing-library/jest-dom/vitest"

describe("user avatar", () => {
    it('should return user avatar by Name Latter', () => {
        render(<UserAvatar userName="Nadir Hussain" />)

        const  avatarFallback = screen.getByTestId("avatarFallback");
        expect(avatarFallback).toBeInTheDocument();
        expect(avatarFallback).toHaveTextContent(/nh/i)
    })
});
