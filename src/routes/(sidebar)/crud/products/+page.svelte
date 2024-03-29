<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Button, Checkbox, Drawer, Heading } from 'flowbite-svelte';
	import { Input, Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte';
	import { TableHeadCell, Toolbar, ToolbarButton,Pagination } from 'flowbite-svelte';
	import { CogSolid, DotsVerticalSolid, EditOutline } from 'flowbite-svelte-icons';
	import { ExclamationCircleSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import {onMount} from "svelte"
	import Products from '../../../data/product.json';
	import Product from './Product.svelte';
	import Delete from './Delete.svelte';
	import type { ComponentType } from 'svelte';
	import {getRoles} from "$lib/api"


	let roleData: Array<any> =[]
	$: tableData = roleData
	let hidden: boolean = true; // modal control
	$: roleId = 0; // model controll
	let drawerComponent: ComponentType = Product; // drawer component

	const toggle = (component: ComponentType, id:number=0) => {
		drawerComponent = component;
		hidden = !hidden;
		// 需重新赋值
		roleId = id;
	};
	
  import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
  let helper = { start: 1, end: 10, total: 100 };

  const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
  };
  const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
  };

	onMount(async ()=>{
		const data = await getRoles({"page":1, "page_size":5})
		if(data.code===1){
			roleData = [...data.data as object[]]
		}
		console.log(roleData)
	})
	const roles = [
		"Id",
		"Role Name",
		"Owner",
		"CreatedTime",
		"UpdatedTime"
	]

</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/crud/products">E-commerce</BreadcrumbItem>
			<BreadcrumbItem>Products</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			All user roles
		</Heading>

		<Toolbar embedded class="w-full py-4 text-gray-500 dark:text-gray-400">
			<Input placeholder="Search for products" class="me-6 w-80 border xl:w-96" />
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<CogSolid size="lg" />
			</ToolbarButton>
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<TrashBinSolid size="lg" />
			</ToolbarButton>
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<ExclamationCircleSolid size="lg" />
			</ToolbarButton>
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<DotsVerticalSolid size="lg" />
			</ToolbarButton>

			<div slot="end" class="space-x-2">
				<Button class="whitespace-nowrap" on:click={() => toggle(Product)}>Add new role</Button>
			</div>
		</Toolbar>
	</div>
	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
			{#each roles as role}
				<TableHeadCell class="ps-4 font-normal">{role}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each tableData as role}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
					<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								{role.roleId || ""}
							</div>
						</div>
					</TableBodyCell>
					<TableBodyCell class="p-4">{role.roleName || ""}</TableBodyCell>
					<TableBodyCell class="p-4">{role.nickName || ""}</TableBodyCell>
					<TableBodyCell
						class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
						>{role.updateTime}</TableBodyCell
					>
					<!-- <TableBodyCell class="p-4">#{role.id}</TableBodyCell>
					<TableBodyCell class="p-4">{role.price}</TableBodyCell>
					<TableBodyCell class="p-4">{role.discount}</TableBodyCell> -->
					<TableBodyCell class="space-x-2">
						<Button size="sm" class="gap-2 px-3" on:click={() => toggle(Product,role.roleId)}>
							<EditOutline size="sm" /> Update
						</Button>
						<Button color="red" size="sm" class="gap-2 px-3" on:click={() => toggle(Delete)}>
							<TrashBinSolid size="sm" /> Delete item
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>

	<div class="flex flex-col items-center justify-center gap-2">
		<div class="text-sm text-gray-700 dark:text-gray-400">
		  Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span>
		  to
		  <span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
		  of
		  <span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span>
		  Entries
		</div>
	  
		<Pagination table>
		  <div slot="prev" class="flex items-center gap-2 text-white bg-gray-800">
			<ArrowLeftOutline class="w-3.5 h-3.5 me-2" />
			Prev
		  </div>
		  <div slot="next" class="flex items-center gap-2 text-white bg-gray-800">
			Next
			<ArrowRightOutline class="w-3.5 h-3.5 ms-2" />
		  </div>
		</Pagination>
	  </div>
</main>

<Drawer placement="right" transitionType="fly" bind:roleId bind:hidden>
	<svelte:component this={drawerComponent}  bind:roleId bind:hidden/>
</Drawer>
