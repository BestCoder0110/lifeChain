import {
  instance, 
  GET_DRIVES_LIST,
  CREATE_DRIVE,
  GET_FOLDER_INFO,
  GET_DRIVE_KEY,
  CREATE_FOLDER,
  UPLOAD_FILES,
  MOVE_FILES,
  REGISTER_USER,
  PREPARE_FILES,
} from './config'

const getDrivesInfo = async (didToken) => {
  const res = await instance.post(GET_DRIVES_LIST, {}, {
    headers: {
      'Authorization': didToken
    }
  });
  if(res.data.status) {
    return res.data.data;
  } else {
    return []
  }
}

const getFolderInfo = async (didToken, folderInfo) => {
  const {
    parentFolderId,
    type = 'public',
    driveKey,
  } = folderInfo;
  const res = await instance.post(GET_FOLDER_INFO, {
    parentFolderId,
    type: type.toLowerCase(),
    driveKey: driveKey,
  }, {
    headers: {
      'Authorization': didToken
    }
  });
  return res.data;
}

const createDriveAPI = async (didToken, driveInfo) => {
  const {
    driveName,
    type = 'public',
  } = driveInfo;
  const res = await instance.post(CREATE_DRIVE, {
    driveName,
    type: type.toLowerCase(),
  }, {
    headers: {
      'Authorization': didToken
    }
  });
  return res.data;
}

const getDriveKey = async (didToken, driveId) => {
  const res = await instance.post(GET_DRIVE_KEY, {
    driveId
  }, {
    headers: {
      'Authorization': didToken
    }
  });
  return res.data;
}

const createFolderAPI = async (didToken, folderInfo) => {
  const {
    folderName,
    parentFolderId,
    driveKey,
    type = 'public',
  } = folderInfo;
  const res = await instance.post(CREATE_FOLDER, {
    folderName,
    parentFolderId,
    driveKey,
    type: type.toLowerCase(),
  }, {
    headers: {
      'Authorization': didToken
    }
  });
  return res.data;
}

const sendFilesToBackend = async (didToken, payload) => {
  const res = await instance.post(UPLOAD_FILES, payload, {
    headers: {
      'Authorization': didToken
    }
  });
  return res.data;
}

const moveFilesToBackend = async (didToken, payload) => {
  const res = await instance.post(MOVE_FILES, payload, {
    headers: {
      'Authorization': didToken
    }
  });
  console.log('Error', res)
  return res.data;
}

const registerUser = async (token) => {
  const res = await instance.post(REGISTER_USER, {
    }, {
    headers: {
      'Authorization': token
    }
  });
  return res.data;
}

const prepareFilesToBackend = async (token, formData) => {
  const res = await instance.post(PREPARE_FILES, formData, {
    headers: {
      'Authorization': token
    }
  });
  return res.data;
}

export {
  getDrivesInfo,
  createDriveAPI,
  getFolderInfo,
  getDriveKey,
  createFolderAPI,
  sendFilesToBackend,
  moveFilesToBackend,
  registerUser,
  prepareFilesToBackend,
}