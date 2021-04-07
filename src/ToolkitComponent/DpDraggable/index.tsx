import React, { useRef, LegacyRef } from 'react';
import { Tooltip } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import './index.less';
import { UploadFile } from 'antd/lib/upload/interface';

const type = 'DragableUploadList';

export interface IDpDraggableProps {
  originNode?: any;
  moveRow?(dragIndex: any, hoverIndex: any): void;
  file?: any;
  fileList?: UploadFile<any>[];
}

const DpDraggable: React.FC<IDpDraggableProps> = props => {
  const { originNode, moveRow, file, fileList } = props;
  const ref: LegacyRef<any> = useRef();
  const index = fileList && fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop(
    () => ({
      accept: type,
      collect: monitor => {
        const { index: dragIndex } = monitor.getItem<{ index: number }>() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex < (index as number)
              ? ' drop-over-downward'
              : ' drop-over-upward',
        };
      },
      drop: (item: any) => {
        moveRow && moveRow(item.index, index);
      },
    }),
    [index],
  );
  const [, drag] = useDrag(
    () => ({
      type,
      item: { index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [fileList],
  );
  drop(drag(ref));

  const errorNode = (
    <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>
  );

  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${
        isOver ? dropClassName : ''
      }`}
      style={{ cursor: 'move' }}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

export default DpDraggable;
