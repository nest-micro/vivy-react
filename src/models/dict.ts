import { useMap } from 'ahooks';
import { useCallback } from 'react';
import { isArray } from 'lodash-es';
import { isNullOrUndef } from '@/utils/is';
import { getDictDataList } from '@/apis/system/dict-data';
import { SysDictData } from '@/apis/types/system/dict-data';

export type DictKeys = number | number[] | string | string[];
export type DictData = SysDictData & {
  label: string;
  value: string;
};

const cache = new Set<DictType>();

const convertKeys = (keys?: DictKeys) => {
  if (isNullOrUndef(keys)) return [];
  if (isArray(keys)) {
    return keys.map((k) => k.toString());
  } else {
    return [keys.toString()];
  }
};

export default () => {
  const [dict, actions] = useMap<DictType, DictData[]>();

  const registerDict = async (types: DictType[]) => {
    for (const type of types) {
      if (cache.has(type)) continue;
      try {
        cache.add(type);
        const data = await getDictDataList(type).then((data) => {
          return (data as DictData[]).map((item) => {
            item.label = item.dictLabel;
            item.value = item.dictValue;
            return item;
          });
        });
        actions.set(type, data);
      } catch (error) {
        cache.delete(type);
      }
    }
  };

  const getDict = (type: DictType, keys?: DictKeys) => {
    const data = actions.get(type) || [];
    if (isNullOrUndef(keys)) return data;
    return data.filter((i) => convertKeys(keys).includes(i.dictValue));
  };

  const fetchDict = async (type: DictType) => {
    await registerDict([type]);
    const data = actions.get(type) || [];
    return data.filter((i) => i.status === '0');
  };

  const removeDict = (types: DictType[]) => {
    for (const type of types) {
      cache.delete(type);
      actions.remove(type);
    }
  };

  const reloadDict = (types: DictType[]) => {
    removeDict(types);
    registerDict(types);
  };

  return {
    dict,
    getDict: useCallback(getDict, [dict]),
    setDict: useCallback(actions.set, []),
    fetchDict: useCallback(fetchDict, []),
    removeDict: useCallback(removeDict, []),
    reloadDict: useCallback(reloadDict, []),
    registerDict: useCallback(registerDict, []),
  };
};
