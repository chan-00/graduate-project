//import react bootstrap
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import Header css
import "../../css/MainPageCss/Header.css"
//import react router
import { useNavigate } from 'react-router-dom';
//import react hooks
import { useState } from 'react';

//페이지 Header 영역을 bootstrap의 Navbar 활용하여 표현
function Header() {
    const navigate = useNavigate();

    //팀 페이지 메뉴 클릭 시 Modal 창을 띄우게 하기 위한 State 상태 관리값
    const [secessionShow, setSecessionShow] = useState(false);

    //Modal 창 활성/비활성화를 위한 State 값의 변경 함수
    const handleSecessionShow = () => setSecessionShow(true);
    const handleSecessionClose = () => setSecessionShow(false);

    //각각 로그인/회원가입 버튼을 눌렀을 때 호출되는 이벤트 함수로, 로그인과 회원가입 창으로 넘어가게끔 한다.
    const handleLoginShow = () => {
        navigate("/signin");
    }
    const handleSignUpShow = () => {
        navigate("/signup");
    }

    //Navbar에서 팀 페이지 메뉴를 클릭했을 떄 로그인 여부를 따져 로그인을 하지 않았으면 로그인 페이지로, 로그인을 했으면 팀 페이지로 이동하게끔 한다.
    //로그인 여부는 session의 id 값이 존재하는지의 여부를 파악한다.
    const handleTeamPageClick = () => {
        if(window.sessionStorage.id) {
            navigate("/team");
        }
        else {
            handleSecessionShow();
        }
    }

    //팀 페이지 메뉴 클릭 시 로그인이 되어 있지 않을 때 나오는 Modal 창의 로그인 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleTeamLoginShow = () => {
        handleSecessionClose();
        handleLoginShow();
    }

    //유저 드롭다운 메뉴에서 로그아웃 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleLogout = () => {
        window.sessionStorage.clear();
        alert("로그아웃 되었습니다!");
        navigate("/");
    }

    //My Page 버튼 클릭 시 마이페이지로 가게 하는 이벤트 함수
    const handleMyPage = () => {
        navigate("/mypage");
    }

    //팀 구인 게시판으로 가게 하는 이벤트 함수
    const handleOfferBoard = () => {
        navigate("/offerboard");
    }
    //질문 게시판으로 가게 하는 이벤트 함수
    const handleQuestionBoard = () => {
        navigate("/questionboard");
    }
    //정보공유 게시판으로 가게 하는 이벤트 함수
    const handleShareBoard = () => {
        navigate("/shareboard");
    }

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark" id="navContainer">
                <Navbar.Brand href="/" id="navTitle">Graduat Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link onClick={handleTeamPageClick}>팀 페이지</Nav.Link>
                    <NavDropdown title="게시판" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleOfferBoard}>팀 구인 게시판</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleQuestionBoard}>질문 게시판</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleShareBoard}>정보공유 게시판</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav id="userContainer">
                    {window.sessionStorage.id
                    ? <NavDropdown title={window.sessionStorage.nickname} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleMyPage}>My Page</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    : <div>
                        <button className='signBtn' onClick={handleLoginShow}>Sign In</button>
                        <button className='signBtn' onClick={handleSignUpShow}>Sign Up</button>
                    </div>}
                </Nav>
            </Navbar>
            <Modal show={secessionShow} onHide={handleSecessionClose}>
                <Modal.Body>현재 로그인이 되어 있지 않습니다. 로그인 하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleSecessionClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={handleTeamLoginShow}>
                    로그인
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Header;