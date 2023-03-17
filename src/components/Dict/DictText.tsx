import { useModel } from '@umijs/max';
import { useEffect, useMemo } from 'react';

type DictProps = {
  type: string;
  value: number | number[] | string | string[];
  separator?: string;
};

const DictText: React.FC<DictProps> = ({ type, value, separator = ',' }) => {
  const { dict, get, register } = useModel('dict');

  useEffect(() => {
    register([type]);
  }, [type]);

  const data = useMemo(() => {
    return get(type, value);
  }, [dict, type, value]);

  return <span>{data.map((d) => d.dictLabel).join(separator)}</span>;
};

export default DictText;
