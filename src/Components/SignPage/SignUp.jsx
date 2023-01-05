//import sign css
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react hooks
import { useEffect, useRef, useState } from "react";
//import react router
import { useNavigate } from "react-router-dom"
//import functions
import functionSignUp from "../../Functions/FunctionSign/functionSignUp";
import functionIdCheck from "../../Functions/FunctionSign/functionIdCheck";

function SignUp() {
    //회원가입 시 입력되는 데이터의 ref 변수들 선언
    const idRef = useRef();
    const pwRef = useRef();
    const pwCheckRef = useRef();
    const nicknameRef = useRef();
    //아이디 중복 버튼으로 아이디 중복 여부를 검사해야 회원가입 버튼을 누를 수 있도록 회원가입 버튼에 연결할 useRef 변수
    const signupRef = useRef();

    //사용자가 입력한 아이디 값이 중복인지 아닌지를 표현하는 useState 변수
    const [ idCheckMessage, setIdCheckMessage ] = useState("");
    //회원가입 버튼의 활성화/비활성화 여부를 다루는 useState 변수
    const [ signBtnActivation, setSignBtnActivation ] = useState(true);

    //회원가입 성공 시 메인 페이지로 가게 하기 위한 useNavigate 변수 선언
    const navigate = useNavigate();

    //회원가입 버튼 활성화/비활성화를 위한 useEffect 함수(활성화/비활성화 여부를 담고 있는 signBtnActivation 값이 바뀔 때마다 버튼의 disabled 값을 바꾼다.)
    useEffect(() => {
        signupRef.current.disabled = signBtnActivation;
    }, [signBtnActivation]);

    //아이디 중복 버튼 클릭 시 백엔드와 통신하는 함수 호출
    const handleIdCheck = (e) => {
        e.preventDefault();
        functionIdCheck(idRef, setIdCheckMessage, setSignBtnActivation);
    }

    //회원가입 버튼 클릭 시 백엔드와 통신하는 함수 호출
    const handleSignUp = (e) => {
        e.preventDefault();
        functionSignUp(idRef, pwRef, pwCheckRef, nicknameRef, navigate);
    }

    return (
        <div className="signAllContainer">
            <form className="signContainer" onSubmit={handleSignUp}>
                <h2>서일대 계정을 생성하세요</h2>
                <hr></hr>
                <div>
                    <input
                        type="text"
                        placeholder="아이디 입력"
                        ref={idRef}
                        autoFocus
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div>
                    <Button variant="outline-primary" className="formElements" style={{width:"150px", marginRight:"10px", height:"35px", fontSize:"14px"}} onClick={handleIdCheck}>아이디 중복확인</Button>
                    <span style={{fontSize:"14px"}}>{idCheckMessage}</span>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 입력"
                        ref={pwRef}
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        ref={pwCheckRef}
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="닉네임 입력"
                        ref={nicknameRef}
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div className="signButtonContainer">
                    <Button type="submit" variant="primary" className="formElements" ref={signupRef}>회원가입</Button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;