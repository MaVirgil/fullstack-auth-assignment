import { writable } from "svelte/store";
import authFetch from "../util/authFetch.js";

function authStore() {
  const { subscribe, set, update } = writable({ loading: true, user: null });

  return {
    subscribe,
    init: async () => {
      const result = await authFetch.fetchCurrentUser();
      console.log('fetchCurrentUser result:', result);

      if (result.error) {
        set(null);
        set({ loading: false, user: null })
        return result.error;
      }

      const user = result.data.user;
      set({ loading: false, user });
    },
    login: async (email, password) => {
      const result = await authFetch.login(email, password);

      if (result.error) {
        set(null);
        return result.error;
      }

      const user = result.data.user;
      set({ loading: false, user });

      return null;
    },
    clear: () => {

    }
  }
}

export const auth = authStore();

