<script lang="ts">
	import { imagesPath } from '$lib/variables';
	import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
	import Cookies from "js-cookie"
	import {goto} from "$app/navigation";
	import {userStore} from "$lib/store/userStore"
	import {onMount} from "svelte"
	// export let id: number = 0; // 1,
	export let name: string = ""; // "Neil Sims",
	export let avatar: string = ""; // "neil-sims.png",
	export let email: string = ""; // "neil.sims@flowbite.com",
	// export let biography: string = ''; // "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
	// export let position: string = ''; // "Front-end developer",
	// export let country: string = ''; // "United States",
	// export let status: string = ''; // "Active"

	const logout = () =>{
		Cookies.remove('access_token')
		goto("/authentication/sign-in")
	}
	onMount( ()=>{
		const localUser = localStorage.getItem("user")
		
	if (localUser){
		const user = JSON.parse(localUser ?? "{}")
		userStore.set({
		username: user.username ?? "",
		nickName: user.nick_name ?? "",
		avatar: user.avatar ?? "",
		email: user.email ?? "",
		mobile: user.moble ?? "",
		summary: user.summary ?? "",
	})
	}else{
		 logout()
	}
	})
	
	
</script>

<button class="ms-3 rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
	<Avatar size="sm" src={imagesPath(avatar, 'users')} tabindex="0" />
</button>
<Dropdown placement="bottom-end">
	<DropdownHeader>
		<span class="block text-sm">{$userStore.nickName}</span>
		<span class="block truncate text-sm font-medium">{$userStore.email}</span>
	</DropdownHeader>
	<DropdownItem>Dashboard</DropdownItem>
	<DropdownItem>Settings</DropdownItem>
	<DropdownItem>Earnings</DropdownItem>
	<DropdownDivider />
	<DropdownItem on:click="{logout}">Sign out</DropdownItem>
</Dropdown>

<!--
@component
[Go to docs](https://flowbite-svelte-admin-dashboard.vercel.app/)
## Props
@prop export let id: number = 0;
@prop export let name: string = '';
@prop export let avatar: string = '';
@prop export let email: string = '';
@prop export let biography: string = '';
@prop export let position: string = '';
@prop export let country: string = '';
@prop export let status: string = '';
-->
