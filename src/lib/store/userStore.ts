import { writable } from "svelte/store";

export interface UserStore{
    username?: string,
    nickName?: string,
    avatar?: string,
    email?: string,
    mobile?: string,
    summary?: string
}

const user: UserStore ={
    username: "",
    nickName: "",
    avatar: "",
    email: "",
    mobile: "",
    summary: "",
}
 export const userStore = writable({});

