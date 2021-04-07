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

  // 根据宽高判断
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

  // 检查图片宽高
  const checkImageWH = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const src = e.target?.result;
        const image = new Image();
        image.onload = function(e: Event) {
          const el = e.target as HTMLImageElement;
          // 校验图片信息
          if (!isSizeImage(el.width, el.height)) {
            reject();
          } else {
            resolve(el);
          }
        };
        image.onerror = reject;
        if (typeof src === 'string') image.src = src;
      };
      fileReader.readAsDataURL(file);
    });
  };

  // 上传前的判断
  const handleBeforeUpload = (file: RcFile, fileLists: RcFile[]): any => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(`${lang.correctImage}`);
    }
    if (maxCount < fileLists.length + fileList.length) {
      message.error(
        `${lang.maxCountLimit}${maxCount - fileList.length}${lang.zhang}`,
      );
      return new Promise((resolve, reject) => {
        reject();
      });
    } else if (file.size / 1024 / 1024 > maxSize) {
      message.error(`${lang.maxSizeLimit}${maxSize}M!`);
      return new Promise((resolve, reject) => {
        reject();
      });
    }
    return checkImageWH(file);
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
    setFileList(info.fileList);
    onChange && onChange(info.fileList);
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
