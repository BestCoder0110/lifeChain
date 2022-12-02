<script>
  import { closeModal, Modals } from 'svelte-modals'
  import Input from '$lib/Input/index.svelte';
  import Button from '$lib/Button/index.svelte';
  import Select from '$lib/Select/index.svelte';
  import { Jumper } from 'svelte-loading-spinners';
  import LoadingModal from '$lib/LoadingModal/index.svelte';
  import { createEventDispatcher } from 'svelte'
  import {
    formatBytes
  } from '../../utils'
  const dispatch = createEventDispatcher()
  // provided by Modals
  export let isOpen;

  export let sendFiles = [];
  export let title = '';
  export let tempFolder = '';
  export let loading;
  export let cost;
  export let prepareLoading = false;
  let name = '';

  $: {
    title = 'Upload '+ (sendFiles.length ? sendFiles.length : '') +' File(s)';
  }
</script>

{#if isOpen}
{#if loading}
    <Modals>
      <LoadingModal 
        title = "Uploading file(s)..."
      />
    </Modals>
  {/if}
<div class={`modal ${loading && 'loading'}`}>
  <div class="upload-modal">
    <div class='upload-modal-header'>
      <span>{title}</span>
    </div>
    <div class='upload-modal-body'>
      {#if prepareLoading === true}
        <div class="loading">
          <Jumper size="60" color="#FF3E00" unit="px" duration="1s"></Jumper>
        </div>
      {:else}
        <div class="upload-files">
          {#each sendFiles as item}
            <div class="upload-file-item">
              <div class="upload-file-item-name">
                {item.filename}
              </div>
              <div class="upload-file-item-size">
                {formatBytes(item.size)}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
    <div class='upload-modal-footer'>
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
        name='UPLOAD'
        class='upload'
        disable={prepareLoading}
        on:click={
          () => {
            dispatch('create', {
              tempFolder: tempFolder
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

  .upload-modal {
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

      .loading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .upload-files {
        color: gray;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid gray;
        max-height: 500px;
        overflow: auto;
        // customize scroll bar
        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-track {
          background-color: darkgrey;
        }

        &::-webkit-scrollbar-thumb {
          box-shadow: inset 0 0 6px rgba(0, 0, 0);
        }

        // end
        .upload-file-item {
          padding: 8px 16px;
          cursor: pointer;
          &:hover {
            background: gray;
            color: white;
            transition: all 0.3s;
          }
          &-name {
            font-size: 14px;
          }
  
          &-size {
            margin-top: 4px;
            font-size: 12px;
          }
        }
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

      :global(.upload) {
        color: white;
      }
    }
  }
</style>

