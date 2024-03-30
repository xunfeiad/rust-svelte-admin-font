<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Button } from 'flowbite-svelte';
	import { Label } from '@smui/common';
	import { createEventDispatcher } from 'svelte';
	export let tableData: any[];
	export let rowsPerPage = 5;
	export let currentPage = 0;
	export let tableHeader: string[] = [];
	export let total = 0;
	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, total);
	$: lastPage = Math.max(Math.ceil(total / rowsPerPage) - 1, 0);
	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}
	const dispatch = createEventDispatcher();
	const notify = (currentPage: number) => {
		dispatch('notify', currentPage, { cancelable: true });
	};

	// 监听 `rowsPerPage` 数据变化，并更新
	$: {
		console.log(rowsPerPage);
		dispatch('pageSizeChange', rowsPerPage);
	}
</script>

<DataTable table$aria-label="Todo list" style="width: 100%;">
	<Head>
		<Row>
			{#each tableHeader as header}
				<Cell>{header.toUpperCase()}</Cell>
			{/each}
			<Cell>Operation</Cell>
		</Row>
	</Head>
	<Body>
		{#each tableData as row}
			<Row>
				{#each tableHeader as cell}
					<Cell>{row[cell]}</Cell>
				{/each}
				<Cell
					><Button
						color="blue"
						on:click={() => {
							dispatch('roleChange', { operation: 'update', row: row.roleId });
						}}>Update</Button
					></Cell
				>
				<Cell
					><Button
						color="red"
						on:click={() => {
							dispatch('roleChange', { operation: 'delete', row: row.roleId });
						}}>Delete</Button
					></Cell
				>
			</Row>
		{/each}
	</Body>

	<Pagination slot="paginate">
		<svelte:fragment slot="rowsPerPage">
			<Label>Rows Per Page</Label>
			<Select variant="outlined" bind:value={rowsPerPage} noLabel>
				<Option value={5}>5</Option>
				<Option value={10}>10</Option>
				<Option value={20}>20</Option>
			</Select>
		</svelte:fragment>
		<svelte:fragment slot="total">
			{start + 1}-{end} of {total}
		</svelte:fragment>

		<IconButton
			class="material-icons"
			action="first-page"
			title="First page"
			on:click={() => (currentPage = 0)}
			on:click={() => notify(currentPage)}
			disabled={currentPage === 0}>first_page</IconButton
		>
		<IconButton
			class="material-icons"
			action="prev-page"
			title="Prev page"
			on:click={() => currentPage--}
			on:click={() => notify(currentPage)}
			disabled={currentPage === 0}>chevron_left</IconButton
		>
		<IconButton
			class="material-icons"
			action="next-page"
			title="Next page"
			on:click={() => currentPage++}
			on:click={() => notify(currentPage)}
			disabled={currentPage === lastPage}>chevron_right</IconButton
		>
		<IconButton
			class="material-icons"
			action="last-page"
			title="Last page"
			on:click={() => currentPage++}
			on:click={() => notify(currentPage)}
			disabled={currentPage === lastPage}>last_page</IconButton
		>
	</Pagination>
</DataTable>
