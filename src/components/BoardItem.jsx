
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const BoardItem = (props)=> {

  const {id, title, content, regDate, member} = props.board;
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          제목 :  {title} /
           작성자 : {props.board.member.name}
           {/* 이미지 1: <Card.Img variant="top" src={'http://localhost:9000/images?imageName='+props.board.imgName} alt='test' 
           style={{width:'50px', height:'50px'}}/> /  */}
          {/* 이미지 2:  <Card.Img variant="top" src={'https://myboot-img.s3.ap-northeast-2.amazonaws.com/'+props.board.imgName} alt='test' 
           style={{width:'50px', height:'50px'}}/> */}

        </Card.Title>
        
        <Link  className='btn btn-primary' to={"/board/"+id}>상세보기</Link>
        
      </Card.Body>
      </Card> 
  );
}

export default BoardItem;