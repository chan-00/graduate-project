import axios from "axios";
import server_ip from "../../serverIP.js";

function functionBoardList(category, setLoadingStatus, setTeamBoardList) {
    //게시판 첫 렌더링 시 해당 게시판의 게시글 리스트 값을 받아오기 위한 코드이다.
    axios.post("http://" + server_ip + ":8000/back/post_test/", {
        category: category,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setTeamBoardList(res.data.post_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardList;