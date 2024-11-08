import { Breadcrumb, Flex, Typography } from "antd";
import "./styled.scss";
interface IBreadCrumb {
  title: string;
  items: Array<{ href: string; title: any }>;
}
const BreadCrumb: React.FC<IBreadCrumb> = ({ title, items }) => {
  return (
    <div className="breadCrumb-section">
      <Flex className="title-breadCrumb" justify="space-between" align="center">
        <Typography.Title className="title" level={3}>
          {title}
        </Typography.Title>
        <Breadcrumb items={items} />
      </Flex>
    </div>
  );
};

export default BreadCrumb;
