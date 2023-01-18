import axios from "axios";
import server_ip from "../../serverIP.js";

function functionGetTeamMemberList(currentClickTeam, setTeamMemberArray, setLoadingStatus) {
    //팀 상세 페이지 첫 렌더링 시 그 팀에 대한 정보와 해당 계정이 팀에 속해 있는지에 대한 여부 값을 받아오는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/detail_team_list2/", {
        teamname: currentClickTeam
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        console.log(res);
        setTeamMemberArray(res.data.user_datas);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetTeamMemberList;