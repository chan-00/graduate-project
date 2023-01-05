import axios from "axios";
import server_ip from "../../serverIP";

//로그인 이벤트 발생 시 호출되는 함수로, 로그인 창에 입력한 id와 pw 값을 갖고 DB에 select 문을 요청하는 로그인 함수이다.
function functionSignIn(idRef, pwRef, navigate) {
    if (idRef.current.value.includes("(") || idRef.current.value.includes(")") || idRef.current.value.includes(";")) {
        alert("id에 (, ), ; 값 중 하나 이상이 들어가 있습니다.!");
        idRef.current.focus();
        return false;
    }
    if (pwRef.current.value.includes("(") || pwRef.current.value.includes(")") || pwRef.current.value.includes(";")) {
        alert("비밀번호에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        pwRef.current.focus();
        return false;
    }
    //server 주소는 수정해야 함.
    axios.post("http://" + server_ip + ":8000/back/login/", {
        id: idRef.current.value,
        pw: pwRef.current.value,
    }).then((res) => {
        if(res.data.login_message === "아이디가 틀렸습니다.") {
            alert("아이디가 틀렸습니다.");
            idRef.current.focus();
        }
        else if(res.data.login_message === "비밀번호가 틀렸습니다.") {
            alert("비밀번호가 틀렸습니다.");
            pwRef.current.focus();
        }
        else if(res.data.login_message === "환영합니다!") {
            alert("로그인 성공!");
            window.sessionStorage.setItem("id", idRef.current.value);
            window.sessionStorage.setItem("nickname", res.data.return_name[0].user_name);
            navigate("/");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionSignIn;