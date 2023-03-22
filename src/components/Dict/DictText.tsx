import { useModel } from '@umijs/max';
import { useEffect, useMemo } from 'react';
import { DictType, DictKeys } from '@/models/dict';

type DictProps = {
  type: DictType;
  value: DictKeys;
  separator?: string;
};

const DictText: React.FC<DictProps> = ({ type, value, separator = ',' }) => {
  const { dict, getDict, registerDict } = useModel('dict');

  useEffect(() => {
    registerDict([type]);
  }, [type]);

  const data = useMemo(() => {
    return getDict(type, value);
  }, [dict, type, value]);

  return <span>{data.map((d) => d.dictLabel).join(separator)}</span>;
};

export default DictText;
