import { Collapse, Card } from "antd";

const { Panel } = Collapse;

function GroupStudents({ students }: any) {
  console.log(students);
  
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Talabalar</h2>
      <Collapse accordion>
        {students.map((item: any) => {
          const student = item.student
          const fullName = `${student.first_name} ${student.last_name}`;
          return (
            <Panel header={fullName} key={student.id}>
              <Card>
                <p>
                  <strong>F.I.Sh:</strong> {fullName}
                </p>
                <p>
                  <strong>Telefon:</strong> {student.phone}
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
