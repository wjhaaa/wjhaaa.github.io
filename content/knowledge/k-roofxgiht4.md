---
title: "解决菜单切换，页面会跳来跳去bug"
slug: "k-roofxgiht4"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 解决菜单切换，页面会跳来跳去bug

- 解决办法 增加active，增加searchApi中的active的使用逻辑
```javascript
  const active = useRef(false);

 useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  const searchApi = async (args: { current: number; pageSize: number }) => {
    /** 更新搜索参数 */
    const updateSearchParams = (
      current: number,
      updatePageSizeValue: number,
    ) => {
      const formValues = form.getValues();
      setSearchParams({
        pageNum: String(current),
        pageSize: String(updatePageSizeValue),
        ...formValues,
      });
    };
    // 初始调用 API
    let result = await (searchProps?.api as SearchApi<RecordType>)?.({
      ...args,
      pageNum: args.current,
    });

    if (!active.current) {
      return {
        rows: [],
        total: 0,
      };
    }

    // 结果中包含 total 字段
    const { total } = result;

    // 计算新的总页数（仅在需要时计算）
    const newTotalPages = total ? Math.ceil(total / pageSize) : 0;

    // 检查请求的页数是否大于总页数
    if (args.current > 1 && args.current > newTotalPages) {
      // 更新搜索参数到最后一页
      updateSearchParams(newTotalPages, args.pageSize);
      // 使用更新后的参数重新发起请求
      result = await (searchProps?.api as SearchApi<RecordType>)?.({
        ...args,
        pageNum: newTotalPages,
      });
      // 更新 args.current 以反映正确的页数
      args.current = newTotalPages;
    } else if (autoSaveSearchInfo) {
      // 如果没有超过总页数但启用了 autoSaveSearchInfo，保存当前搜索信息
      updateSearchParams(args.current, args.pageSize);
    }

    // 返回 API 调用结果
    return result;
  };
```
 

