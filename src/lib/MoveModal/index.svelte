<script>
  import { closeModal } from 'svelte-modals'
  import Input from '$lib/Input/index.svelte';
  import Button from '$lib/Button/index.svelte';
  import Select from '$lib/Select/index.svelte';
  import { Jumper } from 'svelte-loading-spinners'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  // provided by Modals
  export let isOpen;
  export let error = '';
  export let itemsList = [];
  export let folderHistories = [];
  export let folderNameHistories = [];



  let data = [
    {
      name: 'Pro 2015',
      type: 'folder',
      category: '',
      disable: false
    },
    {
      name: 'IMG_1369.jpeg',
      type: 'file',
      category: 'image',
      disable: true
    },
  ]

  let title = 'MOVE FILE';
  let message = '';
  export let loading = false;
  let current = {
    root: true,
    top: {
      name: 'Pro 2015',
      address: ''
    }
  }
  let name = '';

  $: {
    title = loading ? 'Moving Files...' : 'Move File';
  }

  function goFolder(folderId) {
    dispatch('goFolder', folderId);
  }

  function onMove() {
    title = 'MOVING FILE...';

    dispatch('moveFile');
  }
</script>

{#if isOpen}
<div role="dialog" class="modal">
  <div class="move-modal">
    <div class='move-modal-header'>
      <span>{title}</span>
    </div>
    <div class='move-modal-body'>
      {#if loading}
        <div class="loading">
          <Jumper size="60" color="#FF3E00" unit="px" duration="1s"></Jumper>
          <span>{message}</span>
        </div>
      {:else}
        {#if folderHistories.length > 1}
          <div class="list-item-file" on:click={() => {
            goFolder({
              id: 0,
              name: folderNameHistories[folderNameHistories.length - 1]
            })
          }}>
            <i class="fa fa-arrow-left" />
            <span>{folderNameHistories[folderNameHistories.length - 1]}</span>
          </div>
        {/if}
        {#each itemsList as item}
          <div 
            class="list-item-{item.entityType} {false && 'disabled'}"
            on:dblclick={() => {
              if(item.entityType === 'folder')
                goFolder({
                  id: item.entityId,
                  name: item.name,
                })
            }}
          >
            <i class="fa fa-{item.entityType}" />
            <span>{item.name}</span>
            {#if item.entityType === 'folder'}
              <i class='fa fa-chevron-right' />
            {/if}
          </div>
        {/each}
      {/if}
    </div>
    {#if !loading}
    <div class='move-modal-footer'>
      <div class="create-folder">
        <!-- <i class="fa fa-plus-square" /> -->
        <!-- <span>
          CREATE FOLDER
        </span> -->
        {#if error !== ''}
        <span class='error'>
          {error}
        </span>
        {/if}
      </div>
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
        name='MOVE HERE'
        class='move'
        on:click={
          () => {
            onMove()
          }
        }
      />
    </div>
    {/if}
  </div>
</div>
{/if}


<style lang="scss">
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

  .move-modal {
    min-width: 500px;
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
      min-height: 200px;
      .loading {
        margin: auto;
      }

      .list-item-folder {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;


        cursor: pointer;
        i:last-child {
          margin-left: auto;
        }

      }

      .list-item-file {
        display: flex;
        align-items: center;
        gap: 30px;
        cursor: pointer;
      }

      .disabled {
        cursor: not-allowed;
        opacity: 0.3;
      }
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-top: 1px solid rgba(gray, 0.3);
      gap: 10px;
      .create-folder {
        margin-right: auto;
        .error {
          color: red;
        }
      }
      :global(.button) {
        width: unset;
      }
      :global(.cancel) {
        background: white;
        color: gray;
      }
      :global(.move) {
        color: white;
      }
    }
  }
</style>

