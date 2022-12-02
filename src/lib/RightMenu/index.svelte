<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

	let clazz;
	export let data = []
	export {clazz as class};
</script>

<div class="right-menu {clazz}">
	{#each data as item}
		<div 
			class='right-menu-item'
			on:click = {
				() => {
					dispatch('click', {
						value: item
					})
				}
			}
		>
			{item}
		</div>
	{/each}
</div>

<style lang="scss">
	.right-menu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: white;
		color: black;

		width: 60%;
		margin: auto;

		&-item {
			padding: 16px;
			cursor: pointer;

			&:hover {
				background: rgba(gray, 0.3);
				transition: all 0.2s;
			}
		}
	}
</style>
