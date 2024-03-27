<script lang="ts">
	import { Label, Input } from 'flowbite-svelte';
	import { SignIn } from '$lib';
	import {login} from "$lib/api"
	import type{ResponseMessage} from "$lib/api/request";
	import Cookies from 'js-cookie';
	import {onMount} from "svelte"
	import { goto } from '$app/navigation';
	let title = 'Sign in to platform';
	let site = {
		name: 'Redog',
		img: '/images/flowbite-svelte-icon-logo.svg',
		link: '/',
		imgAlt: 'FlowBite Logo'
	};
	let rememberMe = true;
	let lostPassword = true;
	let createAccount = true;
	let lostPasswordLink = 'forgot-password';
	let loginTitle = 'Login to your account';
	let registerLink = 'sign-up';
	let createAccountTitle = 'Create account';

	const onSubmit = async(e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}

		const res:ResponseMessage = await login(data)
		if (res.code === 1){
			Cookies.set("access_token",res.access_token)
			localStorage.setItem("user",JSON.stringify(res.data))
		}
	};

	onMount(() => {
		const access_token = Cookies.get("access_token")
		if (access_token){
			goto("/")
		}
	})
</script>

<SignIn
	{title}
	{site}
	{rememberMe}
	{lostPassword}
	{createAccount}
	{lostPasswordLink}
	{loginTitle}
	{registerLink}
	{createAccountTitle}
	on:submit={onSubmit}
>
	<div>
		<Label for="email" class="mb-2 dark:text-white">Your username</Label>
		<Input
			name="username"
			id="email"
			placeholder="Username"
			required
			class="border outline-none dark:border-gray-600 dark:bg-gray-700"
		/>
	</div>
	<div>
		<Label for="password" class="mb-2 dark:text-white">Your password</Label>
		<Input
			type="password"
			name="password"
			id="password"
			placeholder="••••••••"
			required
			class="border outline-none dark:border-gray-600 dark:bg-gray-700"
		/>
	</div>
</SignIn>
