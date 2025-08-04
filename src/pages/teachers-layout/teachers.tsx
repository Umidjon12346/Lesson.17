import {  useEffect, useState } from "react";
import { Button, Dropdown, Layout, Menu, theme, Avatar } from "antd";
import {
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { clearStorage } from "../../helpers";
import type { MenuProps } from "antd/lib";

const { Header, Content, Footer, Sider } = Layout;

const Teachers = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = {
    name: "John Doe", 
  };

  const logout = () => {
    clearStorage();
    navigate("/");
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "profile":
        navigate("/teacher/profile");
        break;
      case "settings":
        navigate("/teacher/settings");
        break;
      case "logout":
        logout();
        break;
      default:
        break;
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const sidebarItems: MenuProps["items"] = [
    {
      label: "Groups",
      key: "/teacher/groups",
      icon: <TeamOutlined />,
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (location.pathname === "/teacher") {
      navigate("/teacher/groups");
    }
  }, [location.pathname, navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
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
          {collapsed ? "TP" : "Admin Panel"}
        </div>
        <Menu 
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            if (location.pathname !== key) {
              navigate(key);
            }
          }}
          items={sidebarItems}
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
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleMenuClick }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Avatar size="small" icon={<UserOutlined />} />
              <span>{user?.name || "Teacher"}</span>
              <DownOutlined />
            </Button>
          </Dropdown>
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
};

export default Teachers;
