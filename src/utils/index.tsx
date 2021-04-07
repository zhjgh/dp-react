import createDicNodes from './createDicNodes';
import lang from '@/locales';

// 格式提示
export function formatHint(type: string) {
  const context = '请输入正确{type}格式';
  return context.replace('{type}', type);
}

// 常规校验规则
export function getRules(
  name: string,
  required = true,
  whitespace = true,
  otherRules?: any,
  type = 'input',
) {
  const args = [...arguments];

  let _required = required;
  let _whitespace = whitespace;
  let _otherRules = otherRules;
  if (Array.isArray(args[1])) {
    _required = true;
    _otherRules = args[1];
  }
  if (Array.isArray(args[2])) {
    _whitespace = true;
    _otherRules = args[2];
  }
  const typeObj: any = {
    input: lang.pleaseInput,
    select: lang.pleaseSelect,
  };
  const ws = _whitespace
    ? {
        whitespace: true,
      }
    : {};
  const rules = [
    {
      required: _required,
      message: typeObj[type] + name,
      ...ws,
    },
  ];
  for (const i in _otherRules) {
    if (_otherRules[i].max) {
      _otherRules[i].message = `不超过${_otherRules[i].max}字符`;
    } else if (_otherRules[i].min) {
      _otherRules[i].message = `不少于${_otherRules[i].max}字符`;
    } else if (_otherRules[i].type === 'number') {
      _otherRules[i].transform = (value: any) => {
        if (value) {
          return Number(value);
        }
      };
      _otherRules[i].message = formatHint('手机号');
    } else if (_otherRules[i].type === 'email') {
      _otherRules[i].message = formatHint('邮箱');
    }
  }

  const rets = {
    label: name,
    rules: Array.isArray(_otherRules) ? rules.concat(_otherRules) : rules,
  };
  return rets;
}

// layout
export function getLayout(size?: number | undefined, allSize: number = 24) {
  if (size && !isNaN(size)) {
    if (size === 24) {
      return {
        labelCol: {
          span: 24,
        },
        wrapperCol: {
          span: 24,
        },
      };
    }
    return {
      labelCol: {
        xs: {
          span: allSize,
        },
        sm: {
          span: size,
        },
      },
      wrapperCol: {
        xs: {
          span: allSize,
        },
        sm: {
          span: allSize - size,
        },
      },
    };
  }
  return {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };
}

export { createDicNodes };
