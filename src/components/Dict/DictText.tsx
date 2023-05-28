import { useModel } from '@umijs/max';
import { memo, useEffect, useMemo } from 'react';
import { DictKeys } from '@/models/dict';
import { isNullOrUndef } from '@/utils/is';

type DictProps = {
  type: DictType;
  value: DictKeys;
  separator?: string;
};

const DictText: React.FC<DictProps> = ({ type, value, separator = ',' }) => {
  const { getDict, registerDict } = useModel('dict');

  useEffect(() => {
    registerDict([type]);
  }, [type]);

  const data = useMemo(() => {
    return getDict(type, isNullOrUndef(value) ? [] : value);
  }, [type, value, getDict]);

  return <span>{data.map((d) => d.dictLabel).join(separator)}</span>;
};

export default memo(DictText);
