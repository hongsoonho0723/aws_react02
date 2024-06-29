import React, { useContext, useEffect, useState } from 'react';
import BoardItem from '../../components/BoardItem';
import axios from 'axios';
import AWS from "aws-sdk";
import { LogingedContext } from '../../App';
const Home = () => {
    const {SERVER_IP} = useContext(LogingedContext);
    ///////////////////////////////////
    // const config = {
    //     aws_reg: "ap-northeast-2",	// aws 지역 ex ) ap-northeast-2
    //     aws_key: "",	// aws 키
    //     aws_sec: "",	// aws 시크릿 키
    //   };

    //   AWS.config.update({
    //     region: config.aws_reg,
    //     accessKeyId: config.aws_key,
    //     secretAccessKey: config.aws_sec,
    //   });
      
    //   const s3 = new AWS.S3();

    //   const getImg = async (company, store) => {
    //     async function download(filename) {
    //       const data = await s3
    //         .getObject({
    //           Key: filename,
    //           Bucket: "myboot-img",	// 버킷 이름
    //         })
    //         .promise();
      
    //       const blob = new Blob([data.Body], { type: "image/gif" });
    //       const urlCreator = window.URL || window.webkitURL;
    //       const imageUrl = urlCreator.createObjectURL(blob);
      
    //       return imageUrl;
    //     }
      
    //     let data;
      
    //     try {
    //       data = await download(`qr_img/${company}/${store}.jpg`);
    //     } catch {
    //       try {
    //         data = await download(`qr_img/${company}/${store}.jpeg`);
    //       } catch {
    //         try {
    //           data = await download(`qr_img/${company}/${store}.png`);
    //         } catch {
    //           data = "";
    //         }
    //       }
    //     }
      
    //     return data;
    //   };

    /////////////////////////////////////
    //DB 목록을 저장해서 관리 할 useState
   const [boards , setBoards] = useState([]);
   // console.log("SERVER_IP = ", SERVER_IP);

     //서버에서 데이터 조회   - axios
     useEffect(()=>{
        axios
        //.get("http://localhost:9000/boards", {
        .get(SERVER_IP+"/boards", {
        headers: {
        Authorization: localStorage.getItem("Authorization"),
        },})
        .then((res)=>{
            //console.log(res);

           setBoards(res.data);//state에서 관리되는 변수가 변경되어 update(re-rendering)

        })
        .catch((err)=>{
            
            let errMessage = err.response.data.type +"\n";
            errMessage += err.response.data.title +"\n";
            errMessage += err.response.data.detail +"\n";
            errMessage += err.response.data.status +"\n";
            errMessage += err.response.data.instance +"\n";
            errMessage += err.response.data.timestamp;
            alert(errMessage);          
       }); 
     }, []);


    return (
        <div>
            <h1 style={{padding:"20px"}}>전체 게시물</h1>
            {/* <img src='https://myboot-img.s3.ap-northeast-2.amazonaws.com/cat.gif' alt=""/> */}
            {
             boards.map( (board)=> <BoardItem key={board.id} board={board}/> )
            }
        </div>
    );
};

export default Home;