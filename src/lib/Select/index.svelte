<script>
	import RightMenu from '$lib/RightMenu/index.svelte'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let options = [];
	let isFocus = false;
	export let value;
	export let label;
	let error;
	let rightMenuShow = false;	
</script>

<div
  class="form-group {!!value && 'fill'}"
>
	<input 
		id="first" 
		class="form-input" 
		type="text" 
		value={value}
		on:change
		on:click = {
			() => {
				rightMenuShow = true;
			}
		}
	/>
	<label class="form-label" for="first">{label}</label>
	<span class="form-down">
		<i class="fa fa-caret-down"></i>
	</span>
	{#if rightMenuShow}
		<RightMenu 
			class='private-menu'
			on:click = {
				(e) => {
					rightMenuShow = false;
					dispatch('change', {
						value: e.detail.value
					})
				}
			}
			data = {options}
		/>
	{/if}

</div>

<style lang="scss">
	.form-group {
		position:relative;  

		.form-label {
			position: absolute;
			left: 0;
			top: 10px;
			color: #999;
			background-color: #fff;
			z-index: 10;
			transition: transform 150ms ease-out, font-size 150ms ease-out;
		}

		.form-input {
			position: relative;
			padding: 12px 0px 5px 0;
			width: 100%;
			outline: 0;
			border: 0;
			box-shadow: 0 1px 0 0 #e5e5e5;
			transition: box-shadow 150ms ease-out;
			
			&:focus {
				box-shadow: 0 2px 0 0 rgb(232, 0, 51);

				& ~ .form-label {
					transform: translateY(-125%);
					font-size: .75em;	
					color: rgb(232, 0, 51);
				}
			}
		}

		.form-input.filled {
			box-shadow: 0 2px 0 0 lightgreen;
		}

		.form-down {
			position: absolute;
			top: 50%;
			right: 0%;
			transform: translate(0%, -50%);
		}

		:global(.private-menu) {
			box-shadow: -2px -2px 4px 4px gray;		
			width: 100%;
			position: absolute;
			bottom: 0px;
			z-index: 11;
		}
	}

	.fill {
		.form-label {
			transform: translateY(-125%);
			font-size: .75em;	
			color: rgb(232, 0, 51);
		}
	}
</style>
