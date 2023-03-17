import { useModel } from '@umijs/max';
import { useEffect, useMemo } from 'react';
import { Tag } from 'antd';

type DictProps = {
  type: string;
  value: number | number[] | string | string[];
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
  const { dict, get, register } = useModel('dict');

  useEffect(() => {
    register([type]);
  }, [type]);

  const data = useMemo(() => {
    return get(type, value);
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
