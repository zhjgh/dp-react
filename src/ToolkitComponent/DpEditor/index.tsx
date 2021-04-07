import React, { useEffect, useRef } from 'react';
import BraftEditor, { BraftEditorProps } from 'braft-editor';
import 'braft-editor/dist/index.css';
import lang from '@/locales';

export interface IDpEditorProps {
  uploadUrl?: string;
  headers?: any[];
  channel?: string;
}

const validateResponseState = (res: {
  state: string;
  msg: string;
  result: string[];
}) =>
  res.state === '1' ? Promise.resolve(res.result[0]) : Promise.reject(res.msg);

const HTMLBoard = ({ HTML }: { HTML: string }) => {
  const container = useRef(document.createElement('div'));
  useEffect(() => {
    container.current.innerHTML = HTML;
  }, [HTML]);

  return <div ref={container} />;
};

// 注意：默认的props.media.uploadFn会读props.channel
const DpEditor = React.memo(
  class Editor extends React.Component<BraftEditorProps & IDpEditorProps> {
    static defaultProps: Partial<BraftEditorProps & IDpEditorProps> = {
      media: {
        accepts: {
          image: 'image/png,image/jpeg',
          video: false,
          audio: false,
        },
        externals: {
          image: true,
          audio: false,
          video: false,
          embed: false,
        },
        uploadFn(param) {
          const { uploadUrl, headers, channel } = (this as any).props;
          const data = new FormData();
          data.append('channel', channel);
          data.append('file', param.file);
          const onerror = () => void param.error({ msg: lang.uploadFail });
          const xhr = new XMLHttpRequest();
          xhr.open('post', uploadUrl);
          xhr.setRequestHeader('Accept-Language', 'zh-cn');
          xhr.setRequestHeader(headers[0], headers[1]);
          xhr.onerror = onerror;
          xhr.onabort = onerror;
          xhr.onprogress = e => param.progress((e.loaded / e.total) * 100);
          xhr.onload = () =>
            Promise.resolve(xhr.responseText)
              .then(JSON.parse)
              .then(validateResponseState)
              .then((url: string) =>
                param.success({
                  url,
                  meta: {
                    id: param.libraryId,
                    title: param.file.name,
                    alt: '图片',
                    loop: false,
                    autoPlay: false,
                    controls: true,
                    poster: '',
                  },
                }),
              )
              .catch(onerror);
          xhr.send(data);
        },
      },
    };

    render() {
      const props = {
        ...this.props,
        media: {
          ...this.props.media,
          uploadFn: this.props.media?.uploadFn?.bind(this),
        },
      };
      return (
        <div style={{ border: '1px solid #e5e5e5', borderRadius: 3 }}>
          <BraftEditor {...props} />
        </div>
      );
    }
  },
);

// @ts-ignore
DpEditor.HTMLBoard = HTMLBoard;

export default DpEditor;
