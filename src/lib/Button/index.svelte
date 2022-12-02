<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	export let name;
	export let disable = false;
	let clazz;
	export {clazz as class};
</script>

<div 
	class={`button ${clazz} ${disable && 'disable'}`}
	on:click = {() => {
		if(!disable) {
			dispatch('click')
		}
	}}
>
	<span>{name}</span>
</div>

<style lang="scss">
	.button {
		display: inline-block;
		background: rgb(232, 0, 51);
		padding: 8px;
		border-radius: 8px;
		width: 60%;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	}

	.disable {
		background-color: gray;
		cursor: not-allowed;
		&:hover {
			opacity: 1;
		}
	}
</style>
