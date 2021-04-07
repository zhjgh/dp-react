import React, { forwardRef, useState, useEffect, ForwardedRef } from 'react';
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
import lang from '@/locales';
import axios from 'axios';
import { IRequestProps } from '@/global';
import styles from './index.less';

const { Dragger } = Upload;

export interface IDpUploadFileProps extends IRequestProps {
  maxSize?: number; // 文件大小限制
  maxCount?: number; // 文件最大上传数量
  isCanRemove?: boolean; // 是否可以删除
  pageSize?: number; // 分页大小
  initialValues?: Array<any>; // 初始化数据
  explain?: string; // 自定义文件大小限制说明
}

const DpUploadFile = forwardRef(
  (props: IDpUploadFileProps, ref: ForwardedRef<any>) => {
    const {
      initialValues,
      reqUrl,
      headers,
      reqParams,
      maxSize = 15,
      maxCount = 1,
      pageSize = 5,
      explain,
      onChange,
      ...restProps
    } = props;
    const [fileLists, setFileLists] = useState<any[]>([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [percent, setPercent] = useState([]);

    useEffect(() => {
      let _initialValues;
      if (initialValues) {
        if (Array.isArray(initialValues)) {
          _initialValues = initialValues.map((item, i) => {
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
              url: initialValues,
            },
          ];
        }
        setFileLists(_initialValues);
        onChange && onChange(_initialValues);
      }
    }, [initialValues]);

    // 上传前的处理
    const beforeUpload = (file: any): any => {
      return new Promise((resolve, reject) => {
        if (file.size / 1024 / 1024 > maxSize) {
          message.error(`${lang.fileSizeLimit}${maxSize}M!`);
          reject();
        } else {
          resolve(file);
        }
      });
    };

    // 删除
    const handleRemove = (file: any) => {
      const removeLists = [...fileLists];
      removeLists.forEach((item, index) => {
        if (file.uid === item.uid) {
          removeLists.splice(index, 1);
        }
      });
      const page = pageCurrent - 1;
      const list = removeLists.slice(
        page * pageSize + 0,
        page * pageSize + pageSize,
      );
      setPageCurrent(list.length > 0 ? pageCurrent : page);
      setFileLists(removeLists);
      onChange && onChange(removeLists);
    };

    // 展示加描述的图片页面
    const UploadFileView = (props: any) => {
      const { fileLists, isCanRemove, onAgainUpload } = props;
      const showList = [...fileLists];
      const page = pageCurrent < 1 ? 0 : pageCurrent - 1;
      const list = showList.slice(
        page * pageSize + 0,
        page * pageSize + pageSize,
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
      return (
        <>
          {(list || []).map((item, index) => {
            const arr = item?.name?.split('.');
            const type = arr[arr.length - 1];
            const _index = page * pageSize + index;
            const COM = obj[type];
            return (
              <div className={styles['upload-file-wrapper']} key={index}>
                <div
                  className={`${styles['upload-file-default']} ${
                    styles[`upload-file-default--${item.status}`]
                  }`}
                >
                  <div
                    className={
                      index === list.length - 1
                        ? `${styles['upload-file-body']} ${styles['upload-file-info--last']}`
                        : styles['upload-file-body']
                    }
                  >
                    <div
                      className={`${styles['upload-file-info']} ${
                        styles[`upload-file-info--${item.status}`]
                      }`}
                    >
                      {item.status === 'error' ? (
                        <WarningOutlined
                          className={styles['upload-file-icon']}
                        />
                      ) : (
                        COM && <COM className={styles['upload-file-icon']} />
                      )}
                      <div className={styles['upload-file-name']}>
                        {item.name}
                      </div>
                    </div>
                    <div className={styles['upload-file-operation']}>
                      {item.status === 'error' && (
                        <div>
                          <span
                            onClick={() => onAgainUpload(fileLists, _index)}
                          >
                            {lang.uploadAgain}
                          </span>
                          <Divider
                            key={`Divider${index}`}
                            className={styles['upload-file-divider']}
                            type="vertical"
                          />
                        </div>
                      )}
                      {isCanRemove && (
                        <span onClick={() => handleRemove(item)}>
                          {lang.delete}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.status === 'uploading' && (
                    <div className={styles['upload-file-uploading']}>
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
          })}
        </>
      );
    };

    // 上传文件
    const onFileChange = (info: any) => {
      const { file, fileList, event } = info;
      try {
        if (file.status === 'uploading') {
          setFileLists(fileList);
        } else if (file.status === 'done') {
          const img = file.response.result[0];
          const { uid } = file;
          const _fileList = fileList.map((v: any) => ({
            ...v,
            url: uid === v.uid ? img : v.url,
          }));
          onChange && onChange(_fileList);
          setFileLists(_fileList);
          message.success(`${file.name}${lang.uploadSuccess}`);
        } else if (file.status === 'error') {
          setFileLists(fileList);
          message.error(`${file.name}${lang.uploadFail}`);
        }
        const obj = { ...percent };
        if (event) {
          // 一定要加判断，不然会报错
          // @ts-ignore
          obj[file.uid] = Math.floor((event.loaded / event.total) * 100);
          setPercent(obj);
        }
      } catch (error) {
        const normalList = fileList.filter((item: { url: string }) => item.url);
        onChange && onChange(normalList);
        setFileLists(normalList);
      }
    };

    // 再次上传
    const onAgainUpload = async (list: any, index: number) => {
      const upList = [...list];
      const formData = new FormData();
      for (let key in reqParams) {
        formData.append(key, reqParams[key]);
      }
      formData.append('file', upList[index].originFileObj);
      try {
        // 改为上传状态
        upList[index].status = 'uploading';
        setFileLists(upList);
        const res: any = await new Promise((reslove, reject) => {
          axios({
            url: reqUrl,
            method: 'post',
            data: formData,
            headers: {
              ...headers,
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(res => {
              reslove(res);
            })
            .catch(err => {
              reject(err);
            });
        });
        if (res && res.state === '1') {
          upList[index].status = 'done';
          upList[index].url = res.result[0];
        } else {
          upList[index].status = 'error';
          message.error(`${lang.uploadAgainError}`);
        }
        setFileLists(upList);
        onChange && onChange(upList);
      } catch (error) {
        message.error(`${lang.uploadAgainError}`);
        upList[index].status = 'error';
        setFileLists(upList);
        onChange && onChange(upList);
      }
    };

    const uploadFileProps = {
      action: reqUrl, // 上传的地址
      data: reqParams, // 上传所需额外参数或返回上传额外参数的方法
      headers, // 设置上传的请求头部，IE10 以上有效
      fileList: fileLists,
      disabled: fileLists.length > maxCount - 1, // 是否禁用
      showUploadList: false, // 是否展示文件列表，默认false
      beforeUpload, // 上传文件之前的钩子
      onChange: onFileChange,
      ...restProps,
    };

    const uploadFileViewProps = {
      fileLists,
      percent,
      handleRemove,
      onAgainUpload,
    };

    // 按钮
    const uploadButton = (
      <div>
        <div className={styles['upload-btn-top']}>
          <span className={styles['upload-btn-text']}>
            {fileLists.length >= maxCount
              ? `${lang.fileReachLimit}`
              : `${lang.addFile}`}
          </span>
          <span className={styles['upload-btn-length']}>
            {fileLists.length}/{maxCount}
          </span>
        </div>
        <div className={styles['ant-upload-text']}>
          {explain || `${lang.singleFileNoMoreThan}${maxSize}M`}
        </div>
      </div>
    );

    return (
      <div className={styles['dp-upload']} ref={ref}>
        <div className={styles['dp-file-upload--wapper']}>
          <div className={styles['upload-file-html']}>
            {fileLists.length > 0 && (
              <UploadFileView {...uploadFileViewProps} />
            )}
            {fileLists.length > pageSize && (
              <div className={styles['upload-file-Pagination']}>
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
  },
);

DpUploadFile.defaultProps = {
  isCanRemove: true,
};

export default DpUploadFile;
