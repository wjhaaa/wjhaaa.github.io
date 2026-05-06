---
title: "formily的一些方法"
slug: "k-l3eqh8rost"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# formily的一些方法

### 给range类型的字段增加必选项符号
- 使用```asterisk```属性
```javascript
  range: {
                type: 'void',
                title: '区间',
                'x-decorator': 'FormItem',
                'x-visible': `{{ $form.values.condition === ${CONDITION_TYPE.RANGE} }}`,
                'x-component': 'FormGrid',
                'x-reactions': [
                  {
                    fulfill: {
                      schema: {
                        'x-decorator-props': {
                          asterisk: `{{!$form.readPretty}}`,
                        },
                      },
                    },
                  },
                ],
                properties: {
                  start: {
                    type: 'number',
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      placeholder: '最小值',
                      min: -999999999.999999,
                      max: '{{ $form.values.end }}',
                    },
                    required: true,
                  },
                  end: {
                    type: 'number',
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      placeholder: '最大值',
                      min: '{{ $form.values.start }}',
                      max: 999999999.999999,
                    },
                    required: true,
                  },
                },
              },
```
 