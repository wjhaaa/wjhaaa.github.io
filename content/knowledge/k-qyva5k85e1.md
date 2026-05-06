---
title: "select下拉框数据增加分页请求"
slug: "k-qyva5k85e1"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# select下拉框数据增加分页请求

 
### 分页请求关键事件```onPopupScroll```，
### 数据去重```uniqBy```，解决数据可能是第二页的数据，反显的时候放在第一页中，加载更多的数据时进行数据去重。
### 分页请求hook
```TypeScript
/*
 * @@description：数据驾驶舱-产品碳足迹-排放清单menu下拉框数据
 */
import { useEffect, useState } from 'react';

import { getProductCarbonDataList } from '@/views/carbonFootPrint/ProductCarbonData/service';
import { ProductCarbonData } from '@/views/carbonFootPrint/ProductCarbonData/type';

import style from './index.module.less';

export const optionNode = (option: ProductCarbonData): React.ReactNode => {
  const { modelName, functionalUnit, productCode, productName } = option;
  return (
    <div className={style.option}>
      <div className={style.optionLabel}>{modelName}</div>
      <div className={style.subLeft}>{functionalUnit}</div>
      <div className={style.subRight}>
        {productName},{productCode}
      </div>
    </div>
  );
};

export const useModelEmissionsListOption = () => {
  const [options, setOptions] = useState<ProductCarbonData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // 设置初始每页条数
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getProductCarbonDataInfo = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const { data } = await getProductCarbonDataList({
      pageNum: currentPage,
      pageSize,
    });

    const newData = data?.data?.data as ProductCarbonData[];
    if (newData.length < pageSize) {
      setHasMore(false); // 如果加载的数据少于pageSize, 停止进一步加载
    }

    setOptions(options => [
      ...options,
      ...newData.map(row => ({
        ...row,
        label: optionNode(row),
      })),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    getProductCarbonDataInfo();
  }, [currentPage]);

  return { options, loading, hasMore, setCurrentPage, setPageSize, setOptions };
};

```
### DropDownSelect调用
```TypeScript
import { Dropdown, Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { uniqBy } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

import {
  optionNode,
  useModelEmissionsListOption,
} from '@/hooks/useModelEmissionsListOption/useModelEmissionsListOption';
import { EmptySelectModelProps } from '@/views/carbonFootPrint/CarbonFootprintCompare/type';
import { ProductCarbonData } from '@/views/carbonFootPrint/ProductCarbonData/type';

import style from './index.module.less';
import DownOutlined from '../Image/product/downQutlined.svg';
import { DetailBoardResponse } from '../type';

export const DropDownSelect = ({
  value,
  onChange,
  initSelectInfo,
  ...props
}: Pick<EmptySelectModelProps, 'value'> & {
  onChange: (v: ProductCarbonData) => void;
  initSelectInfo: DetailBoardResponse | ProductCarbonData;
} & SelectProps) => {
  const { options, hasMore, loading, setCurrentPage, setOptions } =
    useModelEmissionsListOption();
  const [open, setOpen] = useState(false);

  /** 下拉加载更多 */
  const handlePopupScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 15) {
        if (hasMore && !loading) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      }
    },
    [hasMore, loading, setCurrentPage],
  );
  /** 搜索区域过滤 */
  const filterOption = useCallback((input: string, option: any) => {
    return (
      option?.modelName?.includes(input) ||
      option?.productName?.includes(input) ||
      option?.productCode?.includes(input)
    );
  }, []);

  /** 选中菜单事件 */
  const handleSelectChange = useCallback(
    (selectId: number) => {
      const selectedOption = options.find(
        option => Number(option.id) === selectId,
      );
      if (selectedOption) {
        onChange(selectedOption);
        setOpen(false);
      }
    },
    [options, onChange],
  );

  /** 加载处理数据如果不是第一页的数据时，将数据拼接到第一页的数据上 */
  const renderInitOptions = () => {
    // 检查初始 ID 是否在当前页数据中
    const isInitSelectInfoPresent = options.some(
      item => item.id === initSelectInfo?.id,
    );
    // 如果初始选项信息不存在，并且已经定义了initSelectInfo
    if (!isInitSelectInfoPresent && initSelectInfo) {
      setOptions(optionsItem => [
        ...optionsItem,
        {
          ...initSelectInfo,
          label: optionNode(initSelectInfo as ProductCarbonData),
        } as ProductCarbonData,
      ]);
    }
  };

  useEffect(() => {
    if (initSelectInfo) renderInitOptions();
  }, [initSelectInfo]);

  /** 渲染下拉框组件 */
  const renderDropdown = useCallback(
    () => (
      <div
        className={style.dropdownRenderWrapper}
        onClick={ev => ev.stopPropagation()}
      >
        <Select
          showSearch
          open
          value={value}
          fieldNames={{ label: 'label', value: 'id' }}
          onChange={handleSelectChange}
          autoFocus
          placeholder='请输入产品信息，模型名称'
          getPopupContainer={a => a}
          options={uniqBy(options, 'id') as unknown as DefaultOptionType[]}
          filterOption={filterOption}
          onPopupScroll={handlePopupScroll}
          loading={loading}
          {...props}
        />
      </div>
    ),
    [value, handleSelectChange, options, filterOption, handlePopupScroll],
  );

  useEffect(() => {
    const closeListener = () => {
      setOpen(false);
    };

    document.addEventListener('click', closeListener);
    return () => {
      document.removeEventListener('click', closeListener);
    };
  }, []);

  return (
    <Dropdown open={open} trigger={['click']} dropdownRender={renderDropdown}>
      <div
        className={style.selectBtnWrap}
        onClick={e => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <span className={style.tip}>更换</span>
        <img className={style.icon} src={DownOutlined} alt='' />
      </div>
    </Dropdown>
  );
};

```
 

