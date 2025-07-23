import { useEffect, useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import {
  LogoutOutlined,
  TeamOutlined,
  BookOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { clearStorage } from "../../helpers";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    label: "Groups",
    key: "/admin/groups",
    icon: <TeamOutlined />,
  },
  {
    label: "Students",
    key: "/admin/students",
    icon: <TeamOutlined />,
  },
  {
    label: "Course",
    key: "/admin/courses",
    icon: <BookOutlined />,
  },
  {
    label: "Teachers",
    key: "/admin/teacher",
    icon: <TeamOutlined />,
  },
  {
    label: "Branchs",
    key: "/admin/branch",
    icon: <HomeOutlined />,
  },
];

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    clearStorage();
    navigate("/");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/groups");
    }
  }, [location.pathname, navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={items}
          
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: 64,
          }}
        >
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={logout}
          ></Button>
        </Header>

        <Content style={{ padding: 24 }}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: 24,
              minHeight: "calc(100vh - 134px)",
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Admin ©{new Date().getFullYear()} Created by You
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Admin;
