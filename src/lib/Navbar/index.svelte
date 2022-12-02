<script lang="ts">
	import Button from '$lib/Button/index.svelte';
	import RightMenu from '$lib/RightMenu/index.svelte';
	import Modal from '$lib/CreateDriveModal/index.svelte';
	import UploadModal from '$lib/UploadModal/index.svelte';
	import CreateFolderModal from '$lib/CreateFolderModal/index.svelte';
	import { openModal, Modals } from 'svelte-modals'
	import { createEventDispatcher } from 'svelte'
	import {
		prepareFilesToBackend
	} from '../../api'

	import {clickOutside} from '$lib/clickOutside.js';
	const dispatch = createEventDispatcher()

	export let personalDrives = [];
	export let selectedDrive = '';
	export let newDriveInfo = {};
	export let newItemInfo = {};
	export let selectedFolderId = '';

	let driveLoading = false;
	let driveError = '';

	let sendFiles = '';
	let tempFolder = '';
	$: {
		if(Object.keys(newDriveInfo).length) {
			if(newDriveInfo.status) {
				disable = false;
				isDriveOpen = false;
				driveError = '';
			}
			else {
				disable = true;
				isDriveOpen = true;
				driveLoading = false;
				driveError = newDriveInfo.msg;
			}
		}
		if(Object.keys(newItemInfo).length) {
			if(newItemInfo.status) {
				disable = false;
				isFolderOpen = false;
				driveError = '';
			}
			else {
				disable = true;
				isFolderOpen = true;
				driveLoading = false;
				driveError = newItemInfo.msg;
			}
		}
	}

	let rightMenuShow = false;
	let fileInput;
	let title, message, cost;
	let uploadLoading = false;
	let prepareLoading = false;

	let isDriveOpen = false;
	let isFolderOpen = false;

	export let isFileOpen = false;
	export let disable = false;

	export let show;

	$: {
		if(uploadLoading) {
			title = 'Preparing upload...',
			message = 'This may take a while';
		} else {
			title = 'Upload 1 file(s)';
			message = 'IMG_1369.jpeg';

			cost = '0.00043477924 AR (~0.02 USD)';
		}
	}

	function handleClickOutside(event) {
		show = false;
		rightMenuShow = false;
	}	

	function handleClick() {
    // openModal(Modal, { title: 'Alert', message: 'This is an alert' })
  }

	function openCreateFolderModal () {
		disable = true;
		isFolderOpen = true;
		driveLoading = false;
	}

	function openCreateDriveModal () {
		disable = true;
		isDriveOpen = true;
		driveLoading = false;
	}

	async function onSelect(e) {
		sendFiles = [];
		disable = true;
		isFileOpen = true;
		driveLoading = false;
		prepareLoading = true;
		const formData = new FormData();
		let files = e.target.files;
		for(let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}
		formData.append('parentFolderId', selectedFolderId);
		const didToken = localStorage.getItem('didToken');
		const res = await prepareFilesToBackend(didToken, formData);
		if(res.status) {
			prepareLoading = false;
			sendFiles = res.data.files;
			tempFolder = res.data.folder;
		} else {
			// failed
		}
	}
</script>

<div class="navbar {show && 'show'}">
	<input 
		type="file" 
		bind:this={fileInput} 
		on:change={onSelect}
		multiple
	/>
	<div class="navbar-caption">
		ardrive
	</div>
	<div 
		class='button-container'
		use:clickOutside on:click_outside={handleClickOutside}
	>
		<Button
			name='NEW'
			class='new'
			on:click={
				() => {
					rightMenuShow = true
				}
			}
		/>
		{#if rightMenuShow}
			<RightMenu 
				class='new-menu'
				on:click = {
					(e) => {
						rightMenuShow = false
						if(e.detail.value === 'Upload files(s)') {
							fileInput.click();
						}

						if(e.detail.value === 'New folder') {
							openCreateFolderModal();
						}
						
						if(e.detail.value === 'New drive') {
							openCreateDriveModal();
						}
					}
				}
				data = {[
					'New folder',
					'Upload files(s)',
					'New drive',
				]}
			/>
		{/if}
	</div>
	<div class='drives'>
		<div class='drives-action'>
			<span>PERSONAL DRIVES</span>
			<span 
				class='fa fa-undo reload'
				on:click = {
					() => {
						dispatch('reload')
					}
				}
			></span>
		</div>
		{#each personalDrives as item}
			<div 
				class={`drives-item ${selectedDrive === item.rootFolderId && 'selected'}`}
				on:click = {() => {
					dispatch('selectDrive', {
						driveId: item.driveId,
						parentFolderId: item.rootFolderId,
						type: item.drivePrivacy,
						driveName: item.name,
					})
				}}
			>
				<span>{item.name} drive</span>
				{#if item.drivePrivacy === 'private'}
					<span><i class='fa fa-lock' /></span>
				{/if}
			</div>
		{/each}
	</div>
	<div class='drives'>
		<span>SHARED DRIVES</span>
		<div class='drives-item'>
			
		</div>
	</div>
	<div class="navbar-footer">
		Version 1.0
	</div>
</div>
{#if disable}
	<div class="disable">

	</div>
{/if}


<Modals>
	<Modal 
		isOpen = {isDriveOpen}
		loading = {driveLoading}
		error = {driveError}
		on:close = {() => {
			disable = false;
			isDriveOpen = false;
		}}
		on:create = {(event) => {
			driveLoading = true;
			driveError = '';
			dispatch('createDrive', event.detail)
		}}
	/>
</Modals>

<Modals>
	<CreateFolderModal
		isOpen = {isFolderOpen}
		loading = {driveLoading}
		on:close = {() => {
			disable = false;
			isFolderOpen = false;
		}}
		on:create = {(event) => {
			driveLoading = true;
			driveError = '';
			dispatch('createFolder', event.detail)
		}}
	/>
</Modals>

<Modals>
	<UploadModal
		isOpen = {isFileOpen}
		loading = {driveLoading}
		prepareLoading = {prepareLoading}
		sendFiles = {sendFiles}
		tempFolder = {tempFolder}
		on:close = {() => {
			disable = false;
			isFileOpen = false;
		}}
		on:create = {(event) => {
			driveLoading = true;
			driveError = '';
			dispatch('uploadFile', event.detail);
		}}
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
	.navbar {
		width: 240px;
		height: 100%;
		background: black;
		color: white;
		padding: 12px;
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;

		input {
			display: none;
		}

		&-caption {
			font-weight: 800;
			font-size: 36px;
		}

		.button-container {
			align-self: stretch;
			text-align: center;
			position: relative;

			:global(.new) {
				width: 60%;
			}

			:global(.new-menu) {
				width: 70%;
				position: absolute;
				left: 50%;
				top: 0%;
				transform: translate(-50%)
			}
		}

		.drives {
			margin-top: 20px;
			align-self: stretch;
			font-size: 14px;
			cursor: pointer;

			&-action {
				display: flex;
				justify-content: space-between;
			}

			&-item {
				margin-left: 20px;
				margin-top: 8px;
				color: gray;

				display: flex;
				justify-content: space-between;

				span {
					color: gray;
				}
			}

			.selected {
				span {
					color: white;
				}
			}
		}

		&-footer {
			margin-top: auto;
		}

		:global(.add-drive-modal) {
			position: absolute;
			z-index: 10;
			width: 100%;
			color: black;
		}
	}

	@media (max-width: 860px) {
		.navbar {
			position: absolute;
			z-index: 1;
			left: -240px;
			transition: all 0.5s;

		}

		.show {
			left: 0px;
		}
	}
</style>
