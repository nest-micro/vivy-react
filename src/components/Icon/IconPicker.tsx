import { Popover, Space, Button, Input } from 'antd';
import React, { useState, useMemo } from 'react';
import * as IconsOutlined from './data/icons.outlined';

const IconsOutlinedNames = Object.keys(IconsOutlined);

interface IconPickerProps {
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ children, onChange }) => {
  const [search, setSearch] = useState('');
  const icons = useMemo(() => {
    if (search) {
      return IconsOutlinedNames.filter((name) =>
        name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    }
    return IconsOutlinedNames;
  }, [search]);

  return (
    <Popover
      content={
        <div className="flex flex-col">
          <Input.Search
            className="mb-4"
            placeholder="搜索图标"
            enterButton="搜索"
            onSearch={setSearch}
          />

          <Space
            wrap
            align="start"
            style={{
              width: '400px',
              height: '200px',
              overflow: 'auto',
            }}
          >
            {icons.map((name) => (
              <Button
                key={name}
                icon={React.createElement((IconsOutlined as any)[name])}
                onClick={() => onChange?.(name)}
              />
            ))}
          </Space>
        </div>
      }
    >
      {children}
    </Popover>
  );
};

export default IconPicker;
