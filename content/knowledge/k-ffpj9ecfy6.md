---
title: "处理pdf和image文件流的预览功能"
slug: "k-ffpj9ecfy6"
date: "2026-04-30"
type: "note"
tags: []
summary: "微众银行"
---

# 处理pdf和image文件流的预览功能

 

### 预览功能
- 使用方法
```javascript
 // 提取项目除下载模块之外的下载功能：例如异常数据下载、报告下载、企业碳核算审核-支撑材料下载
export const commonRequestDownloadFile = async (
  url: string,
  fileName: string,
  // 是否开启预览
  isPreview = false,
) => {
  const response = await POSTb2fe928a332b204c76fb2eac119617a3(
    { recordId: url },
    { responseType: 'blob' },
  );
  downloadFileFactor(response?.data, response, fileName, isPreview);
};

```
- 预览和下载的方法
```javascript
// 下载文件方法
export const downloadBlob = (blobUrl: string, fileNameValue: string) => {
  // 原有的下载逻辑
  const link = document.createElement('a'); // 创建a标签
  link.href = blobUrl; // 设置a标签的href为创建的URL
  link.setAttribute('download', `${fileNameValue}`); // 设置a标签的download属性为文件名值或解析的文件名
  document.body.appendChild(link); // 将a标签添加到文档中
  link.click(); // 模拟点击a标签进行文件下载
  document.body.removeChild(link); // 移除a标签
  // 在适当的时机调用这个函数以释放创建的URL
  URL.revokeObjectURL(blobUrl); // 撤销对象URL，释放资源
};
// 预览文件方法
export const previewFile = (url: string, contentType: string) => {
  if (contentType?.includes('image/')) {
    // 如果是图片，使用<img>标签显示
    Modal.info({
      width: '500px',
      title: '图片预览',
      okText: '关闭预览',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src={url} width={300} alt='Image Preview' />,
        </div>
      ),
    });
  } else if (contentType?.includes('application/pdf')) {
    // 如果是PDF，使用<iframe>显示
    Modal.info({
      width: '80%',
      title: 'PDF预览',
      okText: '关闭预览',
      content: (
        <iframe
          src={url}
          style={{ width: '100%', height: '60vh', border: 'none' }}
          title='PDF Preview'
        />
      ),
    });
  }
};
/**
 * 下载文件
 * @param response 响应对象，假设为Blob类型
 * @param res AxiosResponse对象
 * @param fileNameValue 文件名值（可选）
 * @param preview 是否预览文件，默认为false
 */
export const downloadFileFactor = (
  response: unknown | Blob, // 假设response是一个Blob对象
  res: AxiosResponse,
  fileNameValue?: string,
  preview = false, // 控制是否预览文件
) => {
  try {
    const disposition = res.headers['content-disposition']; // 获取响应头中的content-disposition
    const contentType = res.headers['content-type'];
    const fileName = decodeURI(disposition?.split('filename=')?.[1] || ''); // 解码文件名并获取文件名
    const url = URL.createObjectURL(response as Blob); // 创建对象URL，将响应数据转为Blob并创建URL
    if (preview) {
      // 预览
      previewFile(url, `${contentType}`);
    } else {
      // 下载
      downloadBlob(url, fileNameValue || fileName);
    }
  } catch (error) {
    Toast('error', '文件处理失败');
  }
};
```
 

