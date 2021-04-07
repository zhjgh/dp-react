/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-03-01 18:22:39
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-03-02 15:27:34
 */

// @ts-nocheck
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { Upload, Modal, Progress, message } from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  WarningFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import axios from 'axios';
import { IUploadImageProps } from './index.d';
import setting from '../../setting';
import './index.less';

const getItem = (item: any, index: number, props: any) => {
  const {
    handleRemove,
    handlePreview,
    onChangeError,
    percent = {},
    fileList,
    isCanRemove,
  } = props;

  // 错误的板块
  const errorBolck = (item: any, index: number) => {
    return (
      <div className="upload-photo-image">
        <div className="upload-photo-error">
          <div className="upload-photo-upload--error">
            <WarningFilled className="upload-photo-error--icon" />
            <div>{setting.uploadImage.uploadFail}</div>
          </div>
          <div
            className="upload-photo-upload--agin"
            onClick={() => {
              return onChangeError(fileList, 'errorUpload', index);
            }}
          >
            <div>
              <UploadOutlined className="upload-photo-error--icon" />
              <div>{setting.uploadImage.uploadAgain}</div>
            </div>
          </div>
          <CloseCircleFilled
            onClick={() => {
              return handleRemove && handleRemove(item);
            }}
            className="upload-photo-del"
          />
        </div>
      </div>
    );
  };

  // 上传中
  const uploadingBolck = (item: any) => {
    return (
      <div className="upload-photo-uploading--container">
        <div className="upload-photo-uploading">
          <Progress
            percent={percent[item.uid] || 40}
            showInfo={false}
            strokeWidth={4}
          />
        </div>
      </div>
    );
  };

  // 默认
  const defaultBolck = (item: any) => {
    return (
      <div className="upload-photo-image">
        {item.url ? (
          <img
            alt="图片"
            src={item.url}
            onClick={() => {
              return handlePreview && handlePreview(item);
            }}
          />
        ) : (
          <div className="upload-no-image">{setting.uploadImage.noData}</div>
        )}
        {isCanRemove && (
          <CloseCircleFilled
            onClick={() => {
              return handleRemove && handleRemove(item);
            }}
            className="upload-photo-del"
          />
        )}
      </div>
    );
  };

  const setStatusBolck = (item: any, index: number) => {
    if (item.status === 'error') {
      return errorBolck(item, index);
    } else if (item.status === 'uploading') {
      uploadingBolck(item);
    }
    return defaultBolck(item);
  };

  return (
    <div
      className="upload-photo-wrapper"
      key={`upload-photo-wrapper-${item.uid}`}
    >
      <div className="upload-photo-container">
        {setStatusBolck(item, index)}
      </div>
    </div>
  );
};

const UploadImageView = forwardRef((props, ref) => {
  const { fileList, isDragSort, onChange } = props;

  {
    /* <DpDraggable
  value={fileList}
  codeKey="uid"
  sortKey="orderNumber"
  onChange={function (item) {
    item.sort((a, b) => {
      return b.orderNumber - a.orderNumber
    })
    // 执行回调，返回图片信息到父级
    onChange && onChange(item, 'dragg')
  }}
  render={function (item, index) {
    return getItem(item, index, props)
  }}
  /> */
  }

  return isDragSort
    ? '可拖动排序'
    : fileList.map((item: any, index: number) => {
        return getItem(item, index, props);
      });
});

const UploadImage = forwardRef((props: IUploadImageProps, ref) => {
  console.log(props);
  const {
    headers,
    data,
    action,
    initialValues,
    minSizeWidth,
    maxSizeWidth,
    minSizeHeight,
    maxSizeHeight,
  } = props;
  const {
    isDragSort,
    lineSize,
    explain,
    multiple,
    maxCount,
    disabled,
    maxSize,
    onChange,
    isShowImg,
    placeholder,
    direction,
  } = props;

  const pre = useRef();
  const [previewImage, setPreviewImage] = useState('');
  const [percent, setPercent] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    let _value = [];
    if (isShowImg || !pre.current) {
      if (initialValues) {
        if (Array.isArray(initialValues)) {
          _value = initialValues.map((item: any, i) => {
            /* if (typeof item === 'string') {
              return {
                uid: item.uid || `-${i + 1}`,
                name: item.name,
                status: item.status || 'done',
                url: item,
              }
            } */
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
          _value = [
            {
              uid: '-1',
              name: '',
              status: 'done',
              url: initialValues,
            },
          ];
        }
        pre.current = true;
        setFileList(_value);
      } else {
        if (isShowImg) {
          setFileList([{ url: '' }]);
        }
      }
    }
  }, [initialValues]);

  // 上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      {isDragSort && (
        <div className="ant-upload-text">
          {placeholder || setting.uploadImage.canDragDrop}
        </div>
      )}
    </div>
  );

  // 上传前的判断
  const handleBeforeUpload = (file: any, fileLists: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(`${setting.uploadImage.correctImage}`);
    }
    if (maxCount < fileLists.length + fileList.length) {
      message.error(
        `${setting.uploadImage.maxCountLimit}${maxCount - fileList.length}${
          setting.uploadImage.zhang
        }`,
      );
      return new Promise((resolve, reject) => {
        reject();
      });
    } else if (file.size / 1024 / 1024 > maxSize) {
      message.error(`${setting.uploadImage.maxSizeLimit}${maxSize}M!`);
      return new Promise((resolve, reject) => {
        reject();
      });
    }
    return checkImageWH(file);
  };

  const isSizeImage = (nw: number, nh: number) => {
    if (!!minSizeWidth && minSizeWidth > nw) {
      Modal.warning({
        title: `${setting.uploadImage.widthNoLessThan}${minSizeWidth}${setting.uploadImage.pixel}（px）`,
      });
      return false;
    }
    if (!!maxSizeWidth && maxSizeWidth < nw) {
      Modal.warning({
        title: `${setting.uploadImage.widthNoMoreThan}${maxSizeWidth}${setting.uploadImage.pixel}（px）`,
      });
      return false;
    }
    if (!!minSizeHeight && minSizeHeight > nh) {
      Modal.warning({
        title: `${setting.uploadImage.heightNoLessThan}${minSizeHeight}${setting.uploadImage.pixel}（px）`,
      });
      return false;
    }
    if (!!maxSizeHeight && maxSizeHeight < nh) {
      Modal.warning({
        title: `${setting.uploadImage.heightNoMoreThan}${maxSizeHeight}${setting.uploadImage.pixel}（px）`,
      });
      return false;
    }
    let flag = true;
    if (!!direction && direction === 'vertical') {
      if (nw > nh) {
        flag = false;
        Modal.warning({ title: `${setting.uploadImage.vertical}` });
      }
      return flag;
    } else if (!!direction && direction === 'horizontal') {
      if (nw < nh) {
        flag = false;
        Modal.warning({ title: `${setting.uploadImage.horizontal}` });
      }
      return flag;
    }
    return flag;
  };

  // checkImageWH 返回一个promise 检测通过返回resolve 失败返回reject阻止图片上传
  const checkImageWH = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = e => {
        const src = e.target.result;
        const image = new Image();
        image.onload = function() {
          // 校验图片信息
          if (!isSizeImage(this.width, this.height)) {
            reject();
          } else {
            resolve();
          }
        };
        image.onerror = reject;
        image.src = src;
      };
      fileReader.readAsDataURL(file);
    });
  };

  // 查看图片
  const handlePreview = (file: any) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  // 移除图片
  const handleRemove = (file: any) => {
    const _fileLists = [...fileList];
    _fileLists.forEach((item, index) => {
      if (file.uid === item.uid) {
        _fileLists.splice(index, 1);
      }
    });
    setFileList(_fileLists);
    onChange && onChange(_fileLists);
  };

  // 上传图片
  const onFileChange = (info: any) => {
    const { file, fileList, event } = info;
    try {
      if (file.status === 'done') {
        const { uid, response } = file;
        const img = response.result ? response.result[0] : '';
        const _fileList = fileList.map(v => {
          let status = v.status;
          if (uid === v.uid) {
            status = response.result ? 'done' : 'error';
          }
          return {
            ...v,
            status,
            url: uid === v.uid ? img : v.url,
          };
        });
        setFileList(_fileList);
        onChange(
          [..._fileList].filter(_ => {
            return _.status === 'done';
          }),
        );
      } else if (file.status === 'uploading') {
        setFileList(fileList);
      }
      const obj = { ...percent };
      if (event) {
        // 一定要加判断，不然会报错
        obj[file.uid] = Math.floor((event.loaded / event.total) * 100);
        setPercent(obj);
      }
    } catch (error) {
      const normalList = fileList.filter(_ => {
        return _.url;
      });
      setFileList(normalList);
      onChange(normalList);
    }
  };

  // 再次上传
  const onAgainUpload = async (list: any, index: number) => {
    const upList = [...list];
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append('file', upList[index].originFileObj);
    try {
      // 改为上传状态
      upList[index].status = 'uploading';
      setFileList(upList);
      const res = await axios({
        url: action,
        method: 'post',
        data: formData,
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res && res.state === '1') {
        upList[index].status = 'done';
        upList[index].url = res.result[0];
      } else {
        upList[index].status = 'error';
      }
      setFileList(upList);
      onChange(upList);
    } catch (error) {
      message.error(`${lang['再次上传失败']}`);
      upList[index].status = 'error';
      setFileList(upList);
      onChange(upList);
    }
  };

  const uploadImageProps = {
    accept: '.jpg,.jpeg,.png',
    action,
    onBefore: true,
    listType: 'picture-card',
    fileList,
    multiple,
    headers,
    data,
    disabled,
    maxCount,
  };

  const uploadImageViewProps = {
    fileList,
    percent,
    handlePreview,
    handleRemove,
    // onChange,
    // isCanRemove,
    onChangeError: (a: any, b: any, c: any) => {
      onAgainUpload(a, c);
    },
    ...props,
  };

  return (
    <div
      ref={ref}
      className="dp-img-upload"
      style={{ maxWidth: `96*${lineSize}px` }}
    >
      <div className="dp-img-upload--wapper">
        {fileList.length > 0 && <UploadImageView {...uploadImageViewProps} />}
        {!isShowImg && (
          <Upload
            beforeUpload={handleBeforeUpload}
            onPreview={handlePreview}
            onRemove={handleRemove}
            onChange={onFileChange}
            showUploadList={false}
            {...uploadImageProps}
          >
            {fileList.length >= maxCount ? null : uploadButton}
          </Upload>
        )}
      </div>
      {explain && <div className="dp-img-upload--explain">{explain}</div>}
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => {
          return setPreviewVisible(false);
        }}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
});

UploadImage.defaultProps = {
  data: {},
  direction: 'horizontal',
  multiple: false,
  isDragSort: false,
  maxSize: 2,
  maxCount: 1,
  isCanRemove: true,
  isShowImg: false,
};

export default UploadImage;
