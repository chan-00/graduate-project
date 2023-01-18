import axios from "axios";
import server_ip from "../../serverIP.js";

function functionBoardCommentDelete(currentClickBoardID, currentCommentID, setCommentInfo) {
    //댓글 작성 시 작성된 값을 백엔드로 전송하기 위한 코드이다.
    axios.post("http://" + server_ip + ":8000/back/comment_delete/", {
        commentID: currentCommentID,
        boardID: currentClickBoardID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        alert("댓글이 삭제되었습니다.");
        setCommentInfo(res.data.comment_data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardCommentDelete;