import useStore from "@/hooks/useStore";
import {
  resetUserStore,
  setCurrentUser,
  setApiKey,
  cleanCurrentUser,
} from "@/store/user";

describe("UserStore", () => {
  afterEach(() => {
    resetUserStore();
  });

  it("should set current user", () => {
    const store = useStore();
    setCurrentUser({ name: "John Doe" });
    expect(store.User.currentUser.name).toBe("John Doe");
  });

  it("should set an api_key on current user", () => {
    const store = useStore();
    setApiKey("123.123");
    expect(store.User.currentUser.apiKey).toBe("123.123");
  });

  it("should clean current user", () => {
    const store = useStore();
    setCurrentUser({ name: "John Doe" });
    expect(store.User.currentUser.name).toBe("John Doe");
    cleanCurrentUser();
    expect(store.User.currentUser.name).toBeFalsy();
  });
});
