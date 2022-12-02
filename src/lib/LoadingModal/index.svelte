<script>
  import { closeModal } from 'svelte-modals'
  import { Jumper } from 'svelte-loading-spinners'
  // provided by Modals
  export let isOpen = false;
  export let title = '';
</script>

<div role="dialog" class="load-modal">
  <div class="loading-modal">
    <div class='loading-modal-header'>
      <span>{title}</span>
    </div>
    <div class='loading-modal-body'>
        <div class="loading">
          <Jumper size="60" color="#FF3E00" unit="px" duration="1s"></Jumper>
        </div>
    </div>
  </div>
</div>

<style lang="scss">
  .load-modal {
    position: fixed;
    z-index: 1002;
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

  .loading-modal {
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
  }
</style>

