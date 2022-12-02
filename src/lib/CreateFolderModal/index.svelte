<script>
  import { closeModal, Modals } from 'svelte-modals'
  import Input from '$lib/Input/index.svelte';
  import Button from '$lib/Button/index.svelte';
  import Select from '$lib/Select/index.svelte';
  import { Jumper } from 'svelte-loading-spinners'
  import LoadingModal from '$lib/LoadingModal/index.svelte';
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  // provided by Modals
  export let isOpen;

  let title = 'CREATE FOLDER';
  let message;
  export let loading = false;
  let cost;
  let name = '';
</script>

{#if isOpen}
  {#if loading}
    <Modals>
      <LoadingModal 
        title = "Creating Folder..."
      />
    </Modals>
  {/if}
  <div class={`modal ${loading && 'loading'}`}>
    <div class="create-folder-modal">
      <div class='create-folder-modal-header'>
        <span>{title}</span>
      </div>
      <div class='create-folder-modal-body'>
        <Input 
          label = 'Folder name'
          value = {name}
          on:change = {(e) => {
            name = e.target.value;
          }}
        />
      </div>
      <div class='create-folder-modal-footer'>
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
              if(!name)
                return;
              dispatch('create', {
                folderName: name,
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

  .create-folder-modal {
    min-width: 400px;
    border-radius: 6px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;

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

      .loading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
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

