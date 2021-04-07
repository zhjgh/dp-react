import React, { useCallback, useState } from 'react';
import update from 'immutability-helper';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DpDraggable from './index';
import { Upload } from 'antd';

const Demo = () => {
  const data = [
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      size: undefined,
      type: undefined,
    },
    {
      uid: '-2',
      name: 'image2.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      size: undefined,
      type: undefined,
    },
    {
      uid: '-3',
      name: 'image3.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      size: undefined,
      type: undefined,
    },
  ];
  const [fileList, setFileList] = useState<any[]>(data);

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
    },
    [fileList],
  );
  return (
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
        fileList={fileList}
      />
    </DndProvider>
  );
};

export default Demo;
