<script lang="ts">
	import Button from '$lib/Button/index.svelte';
	import { openModal, Modals } from 'svelte-modals'
	import MoveModal from '$lib/MoveModal/index.svelte';
	import { createEventDispatcher } from 'svelte'
	import {formatBytes} from '../../utils'
  const dispatch = createEventDispatcher()

	let select = -1;
	let title, message;
	let isMoveModalOpen = false;
	let disable = false;
	export let moveError = '';
	export let moveLoading = false;
	export let selectFileId = '';
	export let selectedDriveName = '';
	export let itemsList = [];
	export let folderHistories = [];
	export let folderNameHistories = [];
	export let itemsListForMove = [];
	export let folderHistoriesForMove = [];
	export let folderNameHistoriesForMove = [];
	export let selectedDrive = '';

	$: {
		console.log('###', folderHistories, '###', folderNameHistories)
	}

	function onClickMove() {
		if(selectFileId === '') 
			return;
		isMoveModalOpen = true;
		disable = true;
		dispatch('move')
	}

	function getDateFromTimeStamp(unix_timestamp) {
		let date = new Date(unix_timestamp * 1000);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();

		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', "Sep", 'Oct', 'Nov', 'Dec'];
		return `${months[month]} ${day}, ${year}`
	}
</script>

<div class="panel">
	<span 
		class='pin'
		on:click = {() => {
			dispatch('clickPin')
		}}
	>
		<i class='fa fa-reorder' />
	</span>
	<div class="profile">
		<span>
			<i class="fa fa-users" />
		</span>
		<span>
			<i class="fa fa-user-circle-o" />
		</span>
	</div>
	<div class="action">
		<span class='drive-name'>
			{#if selectedDriveName !== ''}
				{selectedDriveName} Drive
			{/if}
		</span>
		{#if selectFileId !== ""}
		<span>
			<i class='fa fa-download' />
			<span>Download</span>
		</span>
		{/if}
		<span>
			<i class='fa fa-pencil' />
			<span>Rename</span>
		</span>
		<!-- <span>
			<i class='fa fa-reorder' />
			<span>Rename</span>
		</span> -->
		{#if selectFileId !== ""}
		<span on:click={
			() => {
				onClickMove()
			}
		}>
			<i class='fa fa-exchange' />
			<span>Move</span>
		</span>
		{/if}
		<!-- <span class='border'>
		</span>
		<span>
			<i class='fa fa-gear' />
			<span>Rename Drive</span>
		</span>
		<span>
			<i class='fa fa-info-circle' />
			<span>Rename Drive</span>
		</span> -->
	</div>
	<div class="content">
			<div class='list'>
				<div class='list-header'>
					<div class='list-header-item'>
						Name <span><i class='fa fa-arrow-down'></i></span>
					</div>
					<div class='list-header-item'>
						File size
					</div>
					<div class='list-header-item'>
						Last updated
					</div>
				</div>
				<div class='list-content'>
					{#if folderHistories.length > 1}
						<div
							class="list-content-row"
							on:dblclick={() => {
									dispatch('goUpFolder');
							}}
						>
						...
						</div>
					{/if}
					{#if itemsList.length}
						{
							#each itemsList as item, i
						}
						<div 
							class='list-content-row {i === select && 'select'}'
							on:click={() => {
								if(select === i)
									select = -1
								else
									select = i;
									dispatch('selectFile', {
										selectFileId: (select !== -1 && item.entityType === 'file') ? item.entityId : '',
									})
							}}
							on:dblclick={() => {
								if(item.entityType === 'folder')
									dispatch('selectItem', {
										selectFolderName: item.name,
										selectFolderId: item.entityId,
										parentFolderId: item.parentFolderId,
									});
							}}
						>
							<div class='list-content-item'>
								<i class="fa fa-{item.entityType}-o" />
								{item.name}
							</div>
							<div class='list-content-item'>
								<span>
									{#if item.entityType!=='folder'}
										{formatBytes(item.size)}
									{/if}
								</span>
							</div>
							<div class='list-content-item'>
								<span>
									{getDateFromTimeStamp(item.unixTime)}
								</span>
							</div>
						</div>
						{/each}
					{:else}
						<div class='empty'>
							<i class='fa fa-folder-o' />
							<span>
								There's nothing to see here. Click "new" to add some files.
							</span>
						</div>
					{/if}
				</div>
			</div>
	</div>
	<div class="help">
		<span>
			<i class='fa fa-question-circle-o' />
		</span>
	</div>
</div>
{#if disable}
	<div class="disable">

	</div>
{/if}
<Modals>
	<MoveModal 
		isOpen={isMoveModalOpen}
		title={title}
		message={message}
		loading={moveLoading}
		error={moveError}
		itemsList = {itemsListForMove}
		folderHistories = {folderHistoriesForMove}
		folderNameHistories = {folderNameHistoriesForMove}
		on:close = {
			() => {
				disable = false;
				isMoveModalOpen = false;
			}
		}
		on:goFolder = {
			(e) => {
				dispatch('goFolder', e.detail)
			}
		}
		on:moveFile = {
			(e) => {
				dispatch('moveFile')
			}
		}
	/>
</Modals>

<style lang="scss">
	.disable {
		height: 100vh;
		width: 100vw;
		position: fixed;
		background: black;
		top: 0;
		z-index: 1000;
		opacity: 0.8;
	}
	.panel {
		box-sizing: border-box;
		width: calc(100% - 240px);
		background: white;
		padding: 10px;
		position: relative;

		.pin {
			display: none;
		}

		.profile {
			display: flex;
			justify-content: right;
			gap: 10px;
			span {
				font-size: 24px;
			}
		}

		.action {
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
			gap: 16px;

			.drive-name {
				margin-right: auto;
				font-size: 24px;
				color: rgb(232, 0, 51);
			}

			span {
				font-size: 20px;
				position: relative;
				cursor: pointer;
				span {
					position: absolute;
					top: 30px;
					right: 0px;
					font-size: 12px;
					width: max-content;
					background: gray;
					color: white;
					padding: 4px;
					display: none;
				}

				&:hover {
					span {
						display: inline-block;
					}
				}
			}

			.border {
				border: 1px solid rgba(gray, 0.4);
			}
		}

		.content {
			margin: 30px;
			.empty {
				margin-top: 10px;
			}
			.list {
				&-header {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					border-bottom: 1px solid rgba($color: gray, $alpha: 0.5);
					padding-bottom: 8px;
					&-item {
								
					}
				}

				&-content {
					&-row {
						display: grid;
						grid-template-columns: repeat(3, 1fr);
						grid-column-gap: 20px;
						padding: 8px;
						cursor: pointer;

						&:hover {
							background: rgba(230, 138, 138, 0.2);	
						}
					}
					&-item {
						overflow: hidden;
						display: flex;
						gap: 8px;
					}

					.select {
						background: rgb(230, 138, 138);
					}
				}
			}
		}

		.help {
			position: absolute;
			z-index: 1;
			background: rgb(232, 0, 51);
			border-radius: 50%;
			width: 50px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: 24px;
			color: white;
			right: 20px;
			bottom: 20px;
		}
	}

	@media (max-width: 860px) {
		.panel {
			width: 100%;
			.pin {
				position: absolute;
				z-index: 0;
				display: inline-block;
			}
		}
	}
</style>
