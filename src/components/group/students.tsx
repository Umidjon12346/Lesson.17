import { Collapse, Card, Button, Space } from "antd";

const { Panel } = Collapse;

function GroupStudents({ students }: any) {
  console.log(students);

  const handleAddStudent = () => {
    console.log("Add Student clicked");
    // student qo‘shish logikasi
  };

  const handleAddTeacher = () => {
    console.log("Add Teacher clicked");
    // teacher qo‘shish logikasi
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <Space>
          <Button type="primary" onClick={handleAddStudent}>
            + Add Student
          </Button>
          <Button onClick={handleAddTeacher}>+ Add Teacher</Button>
        </Space>
      </div>
      <Collapse accordion>
        {students.map((item: any) => {
          const student = item.student;
          const fullName = `${student.first_name} ${student.last_name}`;
          return (
            <Panel header={fullName} key={student.id}>
              <Card>
                <p>
                  <strong>F.I.Sh:</strong> {fullName}
                </p>
                <p>
                  <strong>Phone:</strong> {student.phone}
                </p>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
              </Card>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default GroupStudents;
