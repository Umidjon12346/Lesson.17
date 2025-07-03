import { useEffect } from "react";
import { GroupService } from "../../service/groups.service";

function Groups() {
  useEffect(() => {
    GroupService.getGroups();
  }, []);


  return <div>Groups
    {/* <button onClick={}>save</button> */}
  </div>;
}

export default Groups;
