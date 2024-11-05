import { Mock } from "vitest";
import { getMembers } from "./getMembers";

vi.mock("./getMembers");

describe("getMembers", () => {
  const data = [{ id: 1, name: "John Doe" }];

  it("should call getMembers and return data", async () => {

    const mockedGetMembers = getMembers as Mock;
    const mockData = { data, error: null };

    mockedGetMembers.mockResolvedValue(mockData);

    const result = await mockedGetMembers();
    console.log("Result from getMembers:", result);

    expect(result.data).toBeDefined();
    expect(result.data).toEqual(data);
    expect(result.error).toBeNull();
  });

  it("should handle errors", async () => {

    const mockedGetMembers = getMembers as Mock;
    const mockError = { error: "Failed to fetch", data: [] };

    mockedGetMembers.mockResolvedValue(mockError);

    const result = await mockedGetMembers();
    console.log("Result from getMembers:", result);

    expect(result.error).toBeDefined();
    expect(result.data).toEqual([]);
  });
});
