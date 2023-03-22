import { useModel } from '@umijs/max';
import { useEffect, useMemo } from 'react';
import { Tag } from 'antd';
import { DictType, DictKeys } from '@/models/dict';

type DictProps = {
  type: DictType;
  value: DictKeys;
};

const getColor = (color: string) => {
  if (color === 'info') return 'lime';
  if (color === 'danger') return 'red';
  if (color === 'primary') return 'blue';
  if (color === 'warning') return 'orange';
  if (color === 'success') return 'green';
  return color;
};

const DictTag: React.FC<DictProps> = ({ type, value }) => {
  const { dict, getDict, registerDict } = useModel('dict');

  useEffect(() => {
    registerDict([type]);
  }, [type]);

  const data = useMemo(() => {
    return getDict(type, value);
  }, [dict, type, value]);

  return (
    <span>
      {data.map((d) => (
        <Tag key={d.dictValue} color={getColor(d.listClass)}>
          {d.dictLabel}
        </Tag>
      ))}
    </span>
  );
};

export default DictTag;
