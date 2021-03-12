/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-03-01 11:26:25
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-03-02 16:35:20
 */
// @ts-nocheck
import React, { forwardRef, useState, useEffect } from 'react';
import { Upload, Progress, message, Divider, Pagination } from 'antd';
import {
  FileImageOutlined,
  FileZipOutlined,
  WarningOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileWordOutlined,
  FileTextOutlined,
  FileJpgOutlined,
} from '@ant-design/icons';
import { IUploadFileProps } from './index.d';
import setting from '../../setting';
import axios from 'axios'
import './index.less';

const { Dragger } = Upload;

const UploadFile = forwardRef((props: IUploadFileProps, ref) => {
  const {
    initialValues,
    action,
    data,
    explain,
    maxSize,
    maxCount,
    accept,
    isCanRemove,
    pageSize,
    headers,
  } = props;
  const { onChange, fileTypeValidator } = props;
  const [fileLists, setFileLists] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [percent, setPercent] = useState([]);

  useEffect(() => {
    let _initialValues = '';
    if (initialValues) {
      if (Array.isArray(initialValues)) {
        _initialValues = initialValues.map((item, i) => {
          if (typeof item === 'string') {
            return {
              uid: item.uid || `-${i + 1}`,
              name: item.name,
              status: item.status || 'done',
              url: item,
            };
          }
          return {
            uid: item.uid || `-${i + 1}`,
            name: item.name,
            status: item.status || 'done',
            url: item.url,
            type: item.type,
            ...item,
          };
        });
      } else {
        _initialValues = [
          {
            uid: '-1',
            name: '',
            status: 'done',
            url: value,
          },
        ];
      }
      setFileLists(_initialValues);
    }
  }, [initialValues]);

  // 上传前的处理
  const beforeUpload = file => {
    if (
      typeof fileTypeValidator === 'function' &&
      !fileTypeValidator(file.name.match(/\.([\w\d]+)$/)?.[1] || '')
    ) {
      message.error(setting.uploadFile.fileTypeError);
      return Promise.reject();
    }
    if (file.size / 1024 / 1024 > maxSize) {
      message.error(`${setting.uploadFile.fileSizeLimit}${maxSize}M!`);
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  };

  // 删除
  const handleRemove = file => {
    const removeLists = [...fileLists];
    removeLists.forEach((item, index) => {
      if (file.uid === item.uid) {
        removeLists.splice(index, 1);
      }
    });
    const page = pageCurrent - 1;
    const list = removeLists.slice(
      page * pageSize + 0,
      page * pageSize + pageSize
    );
    setPageCurrent(list.length > 0 ? pageCurrent : page);
    setFileLists(removeLists);
    onChange(removeLists);
  };

  // 展示加描述的图片页面
  const OverwriteShowUploadView = (props: any) => {
    const { fileLists, isCanRemove, onAgainUpload } = props;
    const showList = [...fileLists];
    const page = pageCurrent < 1 ? 0 : pageCurrent - 1;
    const list = showList.slice(
      page * pageSize + 0,
      page * pageSize + pageSize
    );
    const obj: any = {
      xlsx: FileExcelOutlined,
      xls: FileExcelOutlined,
      pdf: FilePdfOutlined,
      ppt: FilePptOutlined,
      doc: FileWordOutlined,
      docx: FileWordOutlined,
      jpg: FileJpgOutlined,
      jpeg: FileImageOutlined,
      zip: FileZipOutlined,
      text: FileTextOutlined,
    };
    return list.map((item, index) => {
      const arr = item?.name?.split('.');
      const type = arr[arr.length - 1];
      const _index = page * pageSize + index;
      const COM = obj[type];
      return (
        <div className="upload-file-wrapper" key={index}>
          <div
            className={`upload-file-default upload-file-default--${item.status}`}
          >
            <div
              className={
                index === list.length - 1
                  ? `upload-file-body upload-file-info--last`
                  : `upload-file-body`
              }
            >
              <div
                className={`upload-file-info upload-file-info--${item.status}`}
              >
                {item.status === 'error' ? (
                  <WarningOutlined className="upload-file-icon" />
                ) : (
                  COM && <COM className="upload-file-icon" />
                )}
                <div className="upload-file-name">{item.name}</div>
              </div>
              <div className="upload-file-operation">
                {item.status === 'error' && (
                  <div>
                    <span onClick={() => onAgainUpload(fileLists, _index)}>
                      {setting.uploadFile.uploadAgain}
                    </span>
                    <Divider
                      key={`Divider${index}`}
                      className="upload-file-divider"
                      type="vertical"
                    />
                  </div>
                )}
                {isCanRemove && (
                  <span onClick={() => handleRemove(item)}>
                    {setting.uploadFile.delete}
                  </span>
                )}
              </div>
            </div>
            {item.status === 'uploading' && (
              <div className="upload-file-uploading">
                <Progress
                  percent={percent[item.uid] || 60}
                  showInfo={false}
                  strokeWidth={4}
                  strokeColor={'#155BD4'}
                />
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  // 上传图片
  const onFileChange = (info: any) => {
    const { file, fileList, event } = info;
    try {
      if (file.status === 'uploading') {
        setFileLists(fileList);
      } else if (file.status === 'done') {
        const img = file.response.result[0];
        const { uid } = file;
        const _fileList = fileList.map(v => ({
          ...v,
          url: uid === v.uid ? img : v.url,
        }));
        onChange(_fileList);
        setFileLists(_fileList);
        message.success(`${file.name}${setting.uploadFile.uploadSuccess}`);
      } else if (file.status === 'error') {
        setFileLists(fileList);
        message.error(`${file.name}${setting.uploadFile.uploadFail}`);
      }
      const obj = { ...percent };
      if (event) {
        // 一定要加判断，不然会报错
        obj[file.uid] = Math.floor((event.loaded / event.total) * 100);
        setPercent(obj);
      }
    } catch (error) {
      const normalList = fileList.filter(_ => _.url);
      onChange(normalList);
      setFileLists(normalList);
    }
  };

  // 再次上传
  const onAgainUpload = async (list: any, index: number) => {
    const upList = [...list];
    const formData = new FormData()
    for(let key in data){
      formData.append(key, data[key])
    }
    formData.append('file', upList[index].originFileObj)
    try {
      // 改为上传状态
      upList[index].status = 'uploading';
      setFileLists(upList);
      const res = await new Promise((reslove, reject) => {
        axios({
          url: action,
          method: 'post',
          data: formData,
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data'
          },
        }).then(res => {
          reslove(res)
        }).catch(err => {
          reject(err)
        })
      })
      if (res && res.state === '1') {
        upList[index].status = 'done';
        upList[index].url = res.result[0];
      } else {
        upList[index].status = 'error';
        message.error(`${setting.uploadFile.uploadAgainError}`);
      }
      setFileLists(upList);
      onChange(upList);
    } catch (error) {
      message.error(`${setting.uploadFile.uploadAgainError}`);
      upList[index].status = 'error';
      setFileLists(upList);
      onChange(upList);
    }
  };

  const uploadFileProps = {
    accept, // 接受上传的文件类型
    action, // 上传的地址
    beforeUpload, // 上传文件之前的钩子
    data, // 上传所需额外参数或返回上传额外参数的方法
    name: 'file', // 发到后台的文件参数名
    multiple: false, // 是否支持多选文件，默认false
    fileList: fileLists,
    headers, // 设置上传的请求头部，IE10 以上有效
    disabled: fileLists.length > maxCount - 1, // 是否禁用
    showUploadList: false, // 是否展示文件列表，默认false
    onChange: onFileChange,
  };

  const showProps = {
    fileLists,
    percent,
    handleRemove,
    onAgainUpload,
    ...props,
  };

  // 按钮
  const uploadButton = (
    <div>
      <div className="upload-btn-top">
        <span className="upload-btn-text">
          {fileLists.length >= maxCount
            ? `${setting.uploadFile.fileReachLimit}`
            : `${setting.uploadFile.addFile}`}
        </span>
        <span className="upload-btn-length">
          {fileLists.length}/{maxCount}
        </span>
      </div>
      <div className="ant-upload-text">
        {explain || `${setting.uploadFile.singleFileNoMoreThan}${maxSize}M`}
      </div>
    </div>
  );

  return (
    <div className="dp-upload" ref={ref}>
      <div className="dp-file-upload--wapper">
        <div className="upload-file-html">
          {fileLists.length > 0 && <OverwriteShowUploadView {...showProps} />}
          {fileLists.length > pageSize && (
            <div className="upload-file-Pagination">
              <Pagination
                simple
                defaultCurrent={pageCurrent}
                pageSize={pageSize}
                total={fileLists.length}
                onChange={e => setPageCurrent(e)}
              />
            </div>
          )}
        </div>
        <Dragger {...uploadFileProps}> {uploadButton} </Dragger>
      </div>
    </div>
  );
});

UploadFile.defaultProps = {
  data: {},
  maxSize: 15,
  maxCount: 1,
  accept: [],
  isCanRemove: true,
  pageSize: 5,
};

export default UploadFile;
