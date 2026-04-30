---
title: "react 复制文本功能方法"
slug: "k-2b087xen0w"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# react 复制文本功能方法

### document.execCommand 已经废弃  
- 使用navigator.clipboard.writeText(value)代替;
- 相比以前更加简洁，采用promise实现；
- 该方法兼容性不强
``` javascript

   /** input输入框 */
  const copyRef = useRef<InputRef>(null);

   /** 复制文本 */
 const copyLink = async () => {
    const val = copyRef.current;
    if (val) {
      navigator.clipboard.writeText(val.input?.value || '').then(() => {
        Toast('success', '复制成功');
      });
    }
  };

 <Input disabled ref={copyRef}/>
 <Button type='default' onClick={copyLink}>复制链接</Button>

``` 

### 使用clipboard复制文本数据
- 安装 pnpm i clipboard
- 兼容性比方法一好
``` javascript

  /** input输入框 */
  const copyRef = useRef<InputRef>(null);

  /** 复制的文本信息   */
  const [copytext, setText] = useState<string>('');

  /** 复制文本 */
  new ClipboardJS('.copy_btn', {
    text: function () {
      return copytext;
    },
  });
  /** 复制操作 */
  const copyLink = async () => {
    const val = copyRef.current;
    if (val) {
      const content = val.input?.value || '';
      setText(content);
      Toast('success', '复制成功');
    }
  };
 
 <Input disabled ref={copyRef} />
 <Button type='default'  className='copy_btn'  onClick={copyLink}>复制链接</Button>

```