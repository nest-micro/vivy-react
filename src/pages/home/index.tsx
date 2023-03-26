import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import services from '@/services';

const Home = () => {
  const { data } = useRequest(() => {
    return services.UserController.getInfo();
  });

  return (
    <PageContainer ghost>
      <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(data)}</div>
    </PageContainer>
  );
};

export default Home;
