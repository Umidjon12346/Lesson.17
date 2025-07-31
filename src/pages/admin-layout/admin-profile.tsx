import { Card, Descriptions, Avatar, Tag, Badge, Divider } from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useAdmin } from "../../hooks/useAdmin";
import dayjs from "dayjs";

function AdminProfile() {
  const { data } = useAdmin();
  const admin = data?.data;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          maxWidth: 800,
          width: "100%",
          borderRadius: 20,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "none",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* Header section with gradient background */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px 32px",
            color: "white",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(5px)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Badge
              dot={admin?.is_active}
              color={admin?.is_active ? "#52c41a" : "#ff4d4f"}
              offset={[-8, 50]}
            >
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontSize: "32px",
                }}
              />
            </Badge>

            <div style={{ flex: 1 }}>
              <h1
                style={{
                  marginBottom: 8,
                  color: "white",
                  fontSize: "28px",
                  fontWeight: "600",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {admin?.first_name} {admin?.last_name}
              </h1>

              <Tag
                color={admin?.is_active ? "success" : "error"}
                style={{
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {admin?.is_active ? (
                  <CheckCircleOutlined style={{ marginRight: 4 }} />
                ) : (
                  <CloseCircleOutlined style={{ marginRight: 4 }} />
                )}
                {admin?.is_active ? "Faol" : "Nofaol"}
              </Tag>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div style={{ padding: "32px" }}>
          <h3
            style={{
              marginBottom: 24,
              color: "#1f2937",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Shaxsiy Ma'lumotlar
          </h3>

          <Descriptions
            column={1}

            labelStyle={{
              color: "#6b7280",
              fontWeight: "500",
              fontSize: "15px",
              width: "200px",
            }}
            contentStyle={{
              color: "#1f2937",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <Descriptions.Item
              label={
                <span>
                  <MailOutlined style={{ marginRight: 8, color: "#667eea" }} />
                  Email
                </span>
              }
            >
              <span
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                }}
              >
                {admin?.email}
              </span>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <PhoneOutlined style={{ marginRight: 8, color: "#10b981" }} />
                  Telefon
                </span>
              }
            >
              <span style={{ color: "#1f2937" }}>{admin?.phone}</span>
            </Descriptions.Item>
          </Descriptions>

          <Divider style={{ margin: "32px 0" }} />

          <h3
            style={{
              marginBottom: 24,
              color: "#1f2937",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Hisob Ma'lumotlari
          </h3>

          <Descriptions
            column={1}
       
            labelStyle={{
              color: "#6b7280",
              fontWeight: "500",
              fontSize: "15px",
              width: "200px",
            }}
            contentStyle={{
              color: "#1f2937",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <Descriptions.Item
              label={
                <span>
                  <CalendarOutlined
                    style={{ marginRight: 8, color: "#f59e0b" }}
                  />
                  Ro'yxatdan o'tgan vaqt
                </span>
              }
            >
              <Tag
                color="orange"
                style={{
                  borderRadius: 6,
                  fontSize: "13px",
                  padding: "2px 8px",
                }}
              >
                {dayjs(admin?.created_at).format("DD.MM.YYYY, HH:mm")}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <EditOutlined style={{ marginRight: 8, color: "#8b5cf6" }} />
                  Oxirgi yangilangan
                </span>
              }
            >
              <Tag
                color="purple"
                style={{
                  borderRadius: 6,
                  fontSize: "13px",
                  padding: "2px 8px",
                }}
              >
                {dayjs(admin?.updated_at).format("DD.MM.YYYY, HH:mm")}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
}

export default AdminProfile;
