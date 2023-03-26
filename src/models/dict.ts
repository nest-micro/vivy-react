import { useMap } from 'ahooks';
import { useCallback } from 'react';
import { isArray } from 'lodash-es';
import { isNullOrUndef } from '@/utils/is';
import services from '@/services';

export type DictType = API.DictInfo['dictType'];

export type DictKeys = number | number[] | string | string[];

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
  const [dict, actions] = useMap<DictType, API.DictInfo[]>();

  const registerDict = async (types: DictType[]) => {
    for (const type of types) {
      if (cache.has(type)) continue;
      try {
        cache.add(type);
        const data = await services.SystemController.getDict(type).then(({ data }) => {
          return data.map((item: API.DictInfo) => {
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
    removeDict: useCallback(removeDict, []),
    reloadDict: useCallback(reloadDict, []),
    registerDict: useCallback(registerDict, []),
  };
};
