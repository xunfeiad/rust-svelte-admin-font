<script lang="ts">
	import { onMount } from 'svelte';
	import Product from './Product.svelte';
	import Delete from './Delete.svelte';
	import type { ComponentType } from 'svelte';
	import { getRoles } from '$lib/api';
	import Table from '$lib/crud/Table.svelte';
	import { Drawer } from 'flowbite-svelte';

	let hidden: boolean = true; // modal control
	let pageForm = {
		page: 1,
		pageSize: 5
	};
	$: roleId = 0; // model controll
	$: total = 0; // total
	$: tableForm = {
		tableData: [],
		currentPage: 0,
		total,
		rowsPerPage: 5,
		tableHeader: ['roleId', 'roleName', 'nickName', 'createTime', 'updateTime']
	};
	const fetchRoles = async () => {
		const data = await getRoles(pageForm);
		if (data.code === 1) {
			tableForm.tableData = [...(data.data as never[])];
			tableForm.currentPage = data.page ? data.page - 1 : 0;
			tableForm.total = data.total ?? 0;
			tableForm.rowsPerPage = pageForm.pageSize;
		}
	};

	onMount(async () => {
		await fetchRoles();
	});

	const showData = async (event: any) => {
		pageForm.page = event.detail + 1;
		await fetchRoles();
	};
	const sizeChanged = async (event: any) => {
		pageForm.pageSize = event.detail;
		await fetchRoles();
	};

	let drawerComponent: ComponentType = Product; // drawer component
	const toggle = (component: ComponentType, id: number = 0) => {
		drawerComponent = component;
		hidden = !hidden;
		// 需重新赋值
		roleId = id;
	};

	const roleChanged = (event: any) => {
		const operation = event.detail;
		console.log(operation);
		if (operation.operation === 'delete') {
			toggle(Delete, operation.row);
			console.log(drawerComponent);
		} else {
			toggle(Product, operation.row);
		}
	};
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<Table
		{...tableForm}
		on:notify={showData}
		on:pageSizeChange={sizeChanged}
		on:roleChange={roleChanged}
	></Table>
</main>

<Drawer placement="right" transitionType="fly" bind:roleId bind:hidden>
	<svelte:component this={drawerComponent} bind:roleId bind:hidden />
</Drawer>

<style>
	/* Reset some of the demo app styles that interfere. */
	:global(body),
	:global(html) {
		height: auto;
		width: auto;
		position: static;
	}
	:global(#smui-app) {
		display: block;
		height: auto;
		overflow: auto;
	}
</style>
