<script>
  import { closeModal, Modals } from 'svelte-modals'
  import Input from '$lib/Input/index.svelte';
  import Button from '$lib/Button/index.svelte';
  import Select from '$lib/Select/index.svelte';
  import LoadingModal from '$lib/LoadingModal/index.svelte';
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  // provided by Modals
  export let isOpen = true;
  export let error = '';
  const options = [
    'Public',
    'Private'
  ];
  let name = '';  
  let value = options[0];
  export let loading = false;
</script>

{#if isOpen}
  {#if loading}
    <Modals>
      <LoadingModal 
        title = "Creating Drive..."
      />
    </Modals>
  {/if}
  <div class={`modal ${loading && 'loading'}`}>
    <div class="drive-modal">
      {#if loading}
      <div class='disable'>
      </div>
      {/if}
      <div class='drive-modal-header'>
        <span>CREATE DRIVE</span>
      </div>
      <div class='drive-modal-body'>
        <Input 
          label = "Name"
          value = {name}
          error = ""
          on:change = {(e) => {
            name = e.target.value;
          }}
        />
        {#if name === ''}
          <span class="error">Please input drive name</span>
        {/if}
        <Select
          label = "Privacy"
          options = {[
            'Public',
            'Private'
          ]}
          on:change = {(e) => {
            value = e.detail.value;
          }}
          value = {value}
        />
        {#if error !== ''}
          <span class="error">{error}</span>
        {/if}
      </div>
      <div class='drive-modal-footer'>
        <Button
          name='CANCEL'
          class='cancel'
          on:click={
            () => {
              dispatch('close')
            }
          }
        />
        <Button
          name='CREATE'
          class='create'
          on:click={
            () => {
              if(!name || !value) 
                return;
              dispatch('create', {
                driveName: name,
                type: value,
              })
            } 
          }
        />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .error {
    color: red;
    font-size: 0.7em;
  }
  .disable {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .2);
    z-index: 1000;
  }
  .loading {
    opacity: 0.3;
  }
  .modal {
    position: fixed;
    z-index: 1001;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .drive-modal {
    min-width: 400px;
    border-radius: 6px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    position: relative;
    &-header {
      background: black;
      color: white;
      padding: 16px;
    }

    &-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 16px;
    }

    &-footer {
      display: flex;
      justify-content: flex-end;
      padding: 16px;
      gap: 10px;
      :global(.button) {
        width: unset;
      }

      :global(.cancel) {
        background: white;
        color: gray;
      }

      :global(.create) {
        color: white;
      }
    }
  }
</style>

