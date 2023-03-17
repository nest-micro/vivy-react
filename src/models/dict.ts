import { useMap } from 'ahooks';
import { isArray, isNull, isUndefined } from 'lodash-es';
import services from '@/services';

type DictKeys = number | number[] | string | string[];

const isNullOrUndef = (val: unknown): val is null | undefined => {
  return isNull(val) || isUndefined(val);
};

const convertKeys = (keys?: DictKeys) => {
  if (isNullOrUndef(keys)) return [];
  if (isArray(keys)) {
    return keys.map((k) => k.toString());
  } else {
    return [keys.toString()];
  }
};

const cache = new Set<string>();

export default () => {
  const [dict, actions] = useMap<string, Record<string, any>[]>();

  const register = async (types: string[]) => {
    for (const type of types) {
      if (cache.has(type)) continue;
      try {
        cache.add(type);
        const { data } = await services.SystemController.getDict(type);
        actions.set(type, data);
      } catch (error) {
        cache.delete(type);
      }
    }
  };

  const getDict = (type: string, keys?: DictKeys) => {
    const data = actions.get(type) || [];
    if (isNullOrUndef(keys)) return data;
    return data.filter((i) => convertKeys(keys).includes(i.dictValue));
  };

  const removeDict = (types: string[]) => {
    for (const type of types) {
      cache.delete(type);
      actions.remove(type);
    }
  };

  const reloadDict = (types: string[]) => {
    removeDict(types);
    register(types);
  };

  return {
    dict,
    get: getDict,
    set: actions.set,
    remove: removeDict,
    reload: reloadDict,
    register,
  };
};
