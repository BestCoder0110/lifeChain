import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://128.199.5.199:5000/'
});

const GET_DRIVES_LIST = '/drives/listDrive';
const GET_FOLDER_INFO = '/folders/listFolder';
const CREATE_DRIVE = '/drives/createDrive';
const GET_DRIVE_KEY = '/drives/getDriveKey';
const CREATE_FOLDER = '/folders/createFolder';
const UPLOAD_FILES = '/files/uploadFile';
const MOVE_FILES = '/files/moveFile';
const REGISTER_USER = '/users/register';
const PREPARE_FILES = '/files/prepareFiles';

export {
  instance,
  GET_DRIVES_LIST,
  GET_FOLDER_INFO,
  CREATE_DRIVE,
  GET_DRIVE_KEY,
  CREATE_FOLDER,
  UPLOAD_FILES,
  MOVE_FILES,
  REGISTER_USER,
  PREPARE_FILES,
}