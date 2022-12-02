<script>
	let isFocus = false;
	export let label = '';
	export let value = '';
	export let error = '';
</script>

<div class="form-group {!!value && 'fill'}">
	<input 
		id="first" 
		class="form-input" 
		type="text" 
		value={value}
		on:change
	/>
	<label class="form-label" for="first">{label}</label>
	<span class="form-error">{error}</span>
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
	}

	.fill {
		.form-label {
			transform: translateY(-125%);
			font-size: .75em;	
			color: rgb(232, 0, 51);
		}
	}
</style>
