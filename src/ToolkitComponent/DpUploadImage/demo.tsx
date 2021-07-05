import React from 'react';
import { Form, Button } from 'antd';
import DpUploadImage from './index';

const FormItem = Form.Item;

const Demo = () => {
  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then(values => {
      console.log(values);
    });
  };

  const handleChange = (v: any) => {
    console.log(v);
    // console.log(v[0].response && v[0].response.result[0]);
  };

  return (
    <Form form={form}>
      <FormItem name="image1">
        <DpUploadImage
          reqUrl="/core/mate/uploadMaterial"
          /* reqParams={{
            productType: 'LS',
            channel: 'platform',
            moduleId: 'equity',
          }} */
          onChange={handleChange}
          isPictureCompress={true}
          compressThreshold={1}
          pictureQuality={0.8}
        />
      </FormItem>
      {/* <FormItem name="image2">
        <DpUploadImage
          reqUrl="http://platform-gateway.platform.svc.dragon/boss/file/uploadImgs"
          headers={{
            Token: localStorage.getItem('token'),
          }}
          reqParams={{
            productType: 'LS',
            channel: 'platform',
            moduleId: 'equity',
          }}
          initialValues={[
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url:
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-2',
              name: 'image.png',
              status: 'done',
              url:
                'https://img.dragonpass.com.cn/resource/OfficialWebsiteImg/index/new_restaurant/R00937.jpg?w=659&h=647',
            },
            {
              uid: '-3',
              percent: 50,
              name: 'image.png',
              status: 'uploading',
              url:
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-4',
              name: 'image.png',
              status: 'error',
            },
          ]}
        />
      </FormItem> */}
      <Button type="primary" onClick={submit}>
        获取数据
      </Button>
    </Form>
  );
};

export default Demo;
