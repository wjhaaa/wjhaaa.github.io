---
title: "formily的更新dataSource的方法"
slug: "k-1frq4g13tzq"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---


### 
```javascript
/**
 * 用来循环处理表单字段数据源和禁用状态方法
 * @param {IForm} form - The Formily form instance.
 * @param {FieldConfig[]} fieldsConfig - An array of configurations for form fields.
 */
export const updateFormFieldStates = (
  form: Form,
  fieldsConfig: FieldConfig[],
) => {
  fieldsConfig.forEach(
    ({
      fieldName,
      dataList,
      dataSource,
      labelKey,
      valueKey,
      isDisabled = false,
    }) => {
      form.setFieldState(fieldName, state => {
        state.dataSource =
          dataSource ||
          dataList?.map?.(item => ({
            label: labelKey && item[labelKey],
            value: valueKey && item[valueKey],
          }));
        state.disabled = isDisabled;
      });
    },
  );
};
```
- 调用方法
```javascript
const fieldsConfig = [
        {
          /** 数据模型 */
          fieldName: 'data_model',
          dataList: formFieldsDataSource.dataModelList,
          labelKey: 'name',
          valueKey: 'id',
          isDisabled: disabledStatus,
        },
        {
          /** 数据负责人 */
          fieldName: 'data_person',
          dataList: formFieldsDataSource.dataPersonList,
          labelKey: 'realName',
          valueKey: 'id',
          isDisabled: acquisitionActionType === PageTypeInfo.show,
        },
        {
          /** 数据所属域 */
          fieldName: 'org_id',
          dataList: formFieldsDataSource.orgList,
          labelKey: 'orgName',
          valueKey: 'id',
          isDisabled: disabledStatus,
        },
      ];
      // 更新所属域、数据模型、数据负责人字段数据源
      updateFormFieldStates(form, fieldsConfig);
```
 