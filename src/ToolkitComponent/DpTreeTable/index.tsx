import React, {
  useState,
  forwardRef,
  useEffect,
  ForwardedRef,
  ReactNode,
} from 'react';
import styles from './index.less';
import GlobalFooter from '@/UIComponent/GlobalFooter';
import DpTree from '@/ToolkitComponent/DpTree';
import logo from './logo.png';
import { FastBackwardFilled, FastForwardFilled } from '@ant-design/icons';
import { DpTreeProps } from '@/ToolkitComponent/DpTree';

export type TreeType = 'page' | 'modal';

export interface IDpTreeTableProps extends DpTreeProps {
  value?: any;
  children?: ReactNode;
  type?: TreeType;
  context?: any;
}

const DpTreeTable = forwardRef(
  (props: IDpTreeTableProps, ref: ForwardedRef<any>) => {
    const { type = 'page', value, children, context, ...resProps } = props;
    const [close, setClose] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const height =
      type === 'modal' ? window.innerHeight - 400 : window.innerHeight - 260;
    const leftHeight = height + 100;
    const COM = !close ? FastBackwardFilled : FastForwardFilled;
    const DpContext = context;

    useEffect(() => {
      if (value) {
        setSelectedKeys(value || []);
      }
    }, [value]);

    return (
      <DpContext.Provider
        value={{
          selectedKeys,
        }}
      >
        <div ref={ref} className={styles['dp-flex']}>
          {!close && (
            <DpTree
              onChange={e => setSelectedKeys(e)}
              value={selectedKeys}
              {...resProps}
            />
          )}
          <div className={styles[close ? 'dp-tree-close' : 'dp-tree-open']}>
            <COM
              className={styles['dp-tree-close--icon']}
              onClick={() => setClose(!close)}
            />
          </div>
          <div
            className={styles['dp-flex-auto']}
            style={{ height: leftHeight, overflowY: 'auto', paddingRight: 16 }}
          >
            <div style={{ minHeight: height + 30 }}>{children}</div>
            <GlobalFooter
              className={styles.footer}
              copyright={<img alt="龙腾出行" src={logo} />}
            />
          </div>
        </div>
      </DpContext.Provider>
    );
  },
);

export default DpTreeTable;
