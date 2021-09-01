import React, {
  useEffect,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DpDraggable from '../DpDraggable';
import styles from './index.less';
import lang from '@/locales';
import { IFile, IDpUploadImageProps } from './index.d';
import { RcFile } from 'antd/lib/upload';

const getBase64 = (file: RcFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const DpUploadImage: React.FC<PropsWithChildren<
  IDpUploadImageProps
>> = props => {
  const {
    reqUrl,
    headers,
    reqParams,
    initialValues,
    explain,
    maxCount = 1,
    maxSize = 2,
    minSizeWidth,
    maxSizeWidth,
    minSizeHeight,
    maxSizeHeight,
    direction,
    isDragSort,
    listType,
    onChange,
    ...restProps
  } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [spinLoading, setSpinLoading] = useState(false);

  useEffect(() => {
    let _value;
    if (initialValues) {
      if (Array.isArray(initialValues)) {
        _value = initialValues.map((item: IFile, i) => {
          return {
            ...item,
            uid: item.uid || `-${i + 1}`,
            name: item.name,
            status: item.status || 'done',
            url: item.url,
            type: item.type,
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
      setFileList(_value);
      onChange && onChange(_value);
    }
  }, []);

  // 取消
  const handleCancel = () => setPreviewVisible(false);

  const isSizeImage = (nw: number, nh: number) => {
    if (!!minSizeWidth && minSizeWidth > nw) {
      Modal.warning({
        title: `${lang.widthNoLessThan}${minSizeWidth}${lang.pixel}（px）`,
      });
      return false;
    }
    if (!!maxSizeWidth && maxSizeWidth < nw) {
      Modal.warning({
        title: `${lang.widthNoMoreThan}${maxSizeWidth}${lang.pixel}（px）`,
      });
      return false;
    }
    if (!!minSizeHeight && minSizeHeight > nh) {
      Modal.warning({
        title: `${lang.heightNoLessThan}${minSizeHeight}${lang.pixel}（px）`,
      });
      return false;
    }
    if (!!maxSizeHeight && maxSizeHeight < nh) {
      Modal.warning({
        title: `${lang.heightNoMoreThan}${maxSizeHeight}${lang.pixel}（px）`,
      });
      return false;
    }

    let flag = true;
    if (!!direction && direction === 'vertical') {
      if (nw > nh) {
        flag = false;
        Modal.warning({ title: `${lang.vertical}` });
      }
      return flag;
    } else if (!!direction && direction === 'horizontal') {
      if (nw < nh) {
        flag = false;
        Modal.warning({ title: `${lang.horizontal}` });
      }
      return flag;
    }
    return flag;
  };

  // 上传前的判断
  const handleBeforeUpload = (
    file: RcFile,
    fileLists: RcFile[],
  ): Promise<any> => {
    const {
      isPictureCompress = false,
      compressThreshold = 1,
      pictureQuality = 0.1,
    } = props;
    const fileSize = file.size / 1024 / 1024;
    console.log(`压缩前：${fileSize}M`);
    return new Promise((resolve, reject) => {
      const isLtCount = fileLists.length + fileList.length > maxCount;
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error(`${lang.correctImage}`);
        reject(`${lang.correctImage}`);
      }
      if (isLtCount) {
        message.error(
          `${lang.maxCountLimit}${maxCount - fileList.length}${lang.zhang}`,
        );
        reject(
          `${lang.maxCountLimit}${maxCount - fileList.length}${lang.zhang}`,
        );
      }
      if (isPictureCompress && fileSize > compressThreshold) {
        // 图片压缩
        let reader = new FileReader(),
          img = new Image();
        reader.readAsDataURL(file);
        reader.onload = function(e: any) {
          img.src = e.target.result;
        };
        img.onload = function(e: Event) {
          const el = e.target as HTMLImageElement;
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d') as CanvasRenderingContext2D;

          const originWidth = el.width;
          const originHeight = el.height;

          if (!isSizeImage(originWidth, originHeight)) {
            reject(`上传格式错误`);
          }

          canvas.width = originWidth;
          canvas.height = originHeight;

          context.clearRect(0, 0, originWidth, originHeight);
          context.drawImage(img, 0, 0, originWidth, originHeight);
          canvas.toBlob(
            blob => {
              const imgFile = new File([blob as BlobPart], file.name, {
                type: file.type,
              }); // 将blob对象转化为图片文件
              const imgFileSize = imgFile.size / 1024 / 1024;
              console.log(`压缩后：${imgFileSize}M`);
              if (imgFileSize > maxSize) {
                message.error(`${lang.maxSizeLimit}${maxSize}M！`);
                reject(`${lang.maxSizeLimit}${maxSize}M！`);
              } else {
                resolve(imgFile);
              }
            },
            file.type,
            pictureQuality,
          );
        };
      } else {
        resolve(file);
      }
    });
  };

  // 预览图片
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const handleChange = (info: any) => {
    const { file, fileList, event } = info;
    console.log(file.status, fileList);
    if (file.status === 'done') {
      console.log('上传成功');
      console.log(fileList);
      onChange && onChange(fileList);
    } else {
      setFileList(fileList); // uploading removed
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
      onChange &&
        onChange(
          update(fileList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragRow],
            ],
          }),
        );
    },
    [fileList],
  );

  const uploadImageProps = {
    accept: 'image/*',
    action: reqUrl,
    headers,
    data: reqParams,
    fileList,
    listType,
    onPreview: handlePreview,
    onChange: handleChange,
    beforeUpload: handleBeforeUpload,
    ...restProps,
  };

  return (
    <div className={styles['dp-img-upload']}>
      <div className={styles['dp-img-upload--wapper']}>
        {isDragSort ? (
          <DndProvider backend={HTML5Backend}>
            <Upload
              itemRender={(originNode, file, currFileList) => (
                <DpDraggable
                  originNode={originNode}
                  file={file}
                  fileList={currFileList as any[]}
                  moveRow={moveRow}
                />
              )}
              {...uploadImageProps}
            >
              {fileList.length >= maxCount ? null : uploadButton}
            </Upload>
          </DndProvider>
        ) : (
          <Upload {...uploadImageProps}>
            {fileList.length >= maxCount ? null : uploadButton}
          </Upload>
        )}
      </div>
      {explain && (
        <div className={styles['dp-img-upload--explain']}>{explain}</div>
      )}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

DpUploadImage.defaultProps = {
  direction: 'horizontal',
  listType: 'picture-card',
  isDragSort: true,
};

export default DpUploadImage;
