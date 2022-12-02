<script>
  import Navbar from '$lib/Navbar/index.svelte';
  import Panel from '$lib/Panel/index.svelte';
  import { onMount } from 'svelte';
  import {
    getDrivesInfo,
    createDriveAPI,
    getFolderInfo,
    getDriveKey,
    createFolderAPI,
    sendFilesToBackend,
    moveFilesToBackend,
  } from '../../api'

  let moveLoading = false;
  let pinShow = false;
  let didToken;  
  let personalDrives = [];
  let itemsList = [];
  let itemsListForMove = [];
  
  let selectedDrive = ''; // folderId
  let selectedDriveKey = '';
  let selectedDriveName = '';
  let selectedDriveType = 'public';

  let selectFileId = '';
  let selectedFolderId = '';
  let selectedFolderIdForMove = '';
  let folderHistories = [];
  let folderNameHistories = [];
  let folderHistoriesForMove = [];
  let folderNameHistoriesForMove = [];

  let driveOpen = false;
  let newDriveInfo = {};
  let newItemInfo = {};

  let isFileOpen = false;
  let disable = false;
  let panelLoading = false;
  let moveError = "";

  onMount(async () => {
    await getDrivesList();
  })

  async function getDrivesList() {
    personalDrives = [];  
    didToken = localStorage.getItem('didToken');
    personalDrives = await getDrivesInfo(didToken)
  }

  async function createDrive(driveInfo) {
    didToken = localStorage.getItem('didToken');
    const res = await createDriveAPI(didToken, driveInfo);
    if(res.status) {
      personalDrives = [...personalDrives, {
        name: res.data.created[0].entityName,
        drivePrivacy: driveInfo.type.toLowerCase(),
        driveId: res.data.created[0].entityId,
        rootFolderId: res.data.created[1].entityId,
      }]
    }
    newDriveInfo = res;
  }

  async function createFolder(folderInfo) {
    folderInfo = {
      ...folderInfo,
      parentFolderId: selectedFolderId,
      driveKey: selectedDriveKey,
      type: selectedDriveType,
    }
    didToken = localStorage.getItem('didToken');
    let folderRes = await createFolderAPI(didToken, folderInfo);
    let res = await getFolderInfo(didToken, folderInfo);
    if(res.status) 
      itemsList = res.data;
    newItemInfo = folderRes;
  }

  async function selectDrive({
    driveId,
    driveName,
    parentFolderId,
    type,
  }) {
    panelLoading = true;
    selectedDrive = parentFolderId;  
    selectedDriveName = driveName;
    selectedDriveType = type;

    selectedFolderId = parentFolderId;
    didToken = localStorage.getItem('didToken');
    if(type === 'private') {
      const res = await getDriveKey(didToken, driveId);
      if(res.status) {
        selectedDriveKey = res.data;
      }
    }
    const folderInfo = {
      parentFolderId,
      type,
      driveKey: type === 'private' && selectedDriveKey,
    }
    let res = await getFolderInfo(didToken, folderInfo);
    if(res.status) {
      itemsList = res.data;
    }
    folderHistories = [parentFolderId];
    folderNameHistories = [driveName];
    panelLoading = false;
  }

  function setPinStatus(value) {
    pinShow = value;
  }

  async function setFolderId(selectedInfo) {
    console.log('^^^', selectedInfo)
    panelLoading = true;
    const {
      selectFolderId,
      selectFolderName,
    } = selectedInfo;
    // get
    let folderInfo = {
      parentFolderId: selectFolderId,
      driveKey: selectedDriveKey,
      type: selectedDriveType,
    }
    didToken = localStorage.getItem('didToken');
    let res = await getFolderInfo(didToken, folderInfo);
    if(res.status) 
      itemsList = res.data;
    folderHistories = [...folderHistories, selectFolderId];
    folderNameHistories = [...folderNameHistories, selectFolderName];
    selectedFolderId = selectFolderId;
    //selectedFolderName = selectFolderName;
    panelLoading = false;
  }

  async function goFolder(_folderInfo) {
    panelLoading = true;
    let {
      id,
      name,
    } = _folderInfo;
    let folderId = id;
    if(id === 0) {
      folderHistoriesForMove.pop();
      folderNameHistoriesForMove.pop();
      folderId = folderHistoriesForMove[folderHistoriesForMove.length - 1];
    }
    let folderInfo = {
      parentFolderId: folderId,
      driveKey: selectedDriveKey,
      type: selectedDriveType,
    }
    didToken = localStorage.getItem('didToken');
    let res = await getFolderInfo(didToken, folderInfo);

    if(id !== 0) {
      folderHistoriesForMove = [...folderHistoriesForMove, id];
      folderNameHistoriesForMove = [...folderNameHistoriesForMove, name];
    }

    if(res.status) 
      itemsListForMove = res.data;
    selectedFolderIdForMove = folderId;
    panelLoading =false;
  }

  async function goUpFolder(folderId) {
    // get
    panelLoading = true;
    let folderInfo = {
      parentFolderId: folderId,
      driveKey: selectedDriveKey,
      type: selectedDriveType,
    }
    didToken = localStorage.getItem('didToken');
    let res = await getFolderInfo(didToken, folderInfo);
    if(res.status) 
      itemsList = res.data;
    selectedFolderId = folderId;
    panelLoading = false;
  }

  async function uploadFile(tempFolder) {
    console.log(tempFolder)
    let payload = {
      ...tempFolder,
      parentFolderId: selectedFolderId,
      driveKey: selectedDriveKey,
      type: selectedDriveType,
    }
    didToken = localStorage.getItem('didToken');
    let res = await sendFilesToBackend(didToken, payload);
    if(res.status) {
      let _res = await getFolderInfo(didToken, payload);
      if(_res.status) 
        itemsList = _res.data;
      isFileOpen = false;
      disable = false;
    }    
  }

  async function moveFiles() {
    moveLoading = true;
    let payload = {
      parentFolderId: selectedFolderIdForMove,
      fileId: selectFileId,
      driveKey: selectedDriveKey,
      type: selectedDriveType,
    }
    didToken = localStorage.getItem('didToken');
    moveError = "";
    let res = await moveFilesToBackend(didToken, payload);
    if(res.status) {
      moveLoading = false;
    } else {
      moveLoading = false;
      moveError = res.msg;
    }
  }

  async function prepareFiles(formData) {
    didToken = localStorage.getItem('didToken');
    let res = await prepareFiles(didToken, formData);
    if(res.status) {

    }
  }
</script>

<svelte:head>
	<title>TODOS</title>
</svelte:head>

<section>
  {#if panelLoading}
    <div class="loading">
      Loading...
    </div>
  {/if}
  
  <Navbar 
    personalDrives = {personalDrives}
    selectedDrive = {selectedDrive}
    selectedFolderId = {selectedFolderId}
    driveOpen = {driveOpen}
    bind:isFileOpen = {isFileOpen}
    bind:disable = {disable}
    bind:show = {pinShow}
    bind:newDriveInfo = {newDriveInfo}
    bind:newItemInfo = {newItemInfo}
    on:reload = {
      () => {
        getDrivesList();
      }
    }
    on:createDrive = {
      (e) => {
        createDrive(e.detail);
      }
    }
    on:selectDrive = {
      (e) => {
        selectDrive(e.detail);
      }
    }
    on:createFolder = {
      (e) => {
        createFolder(e.detail)
      }
    }
    on:uploadFile = {
      (e) => {
        uploadFile(e.detail)
      }
    }
  />
  <Panel
    moveLoading = {moveLoading}
    moveError = {moveError}
    selectFileId = {selectFileId}
    selectedDriveName = {selectedDriveName}
    selectedDrive = {selectedDrive}
    selectedDriveKey = {selectedDriveKey}
    itemsList = {itemsList}
    folderHistories = {folderHistories}
    folderNameHistories = {folderNameHistories}
    itemsListForMove = {itemsListForMove}
    folderHistoriesForMove = {folderHistoriesForMove}
    folderNameHistoriesForMove = {folderNameHistoriesForMove}
    on:clickPin = {() => {
        setPinStatus(true);
      }
    }
    on:selectItem = {(e) => {
      setFolderId(e.detail)
    }}
    on:selectFile = {(e) => {
      selectFileId = e.detail.selectFileId;
    }}
    on:goUpFolder = {(e) => {
      folderNameHistories.pop();
      folderHistories.pop();
      const upFolderId = folderHistories[folderHistories.length - 1];
      goUpFolder(upFolderId)
    }}
    on:move = {(e) => {
      itemsListForMove = itemsList;
      folderHistoriesForMove = folderHistories;
      folderNameHistoriesForMove = folderNameHistories;
    }}
    on:moveFile = {(e) => {
      moveFiles();
    }}
    on:goFolder = {(e) => {
      goFolder(e.detail);
    }}
  />
</section>

<style lang="scss">
  section {
    height: 100%;
    display: flex;

    .loading {
      cursor: wait;
      position: fixed;
      z-index: 10000;
      width: 100vw;
      height: 100vh;
      background: rgba($color: #000000, $alpha: .5);
    }
  }
</style>