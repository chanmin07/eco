const express = require('express');
const nosqldb = require('../../../db/nosql_function');
const app = express.Router();
const jkh = require("../function/jkh_function")
//const { Q, pool } = require('../../../db/psqldb');

const test = (req, res) => {
    var ress = {
        context_id: 1,
        data: "hi 성덕 hangul sjdjxuejd dkdkdkd this is apple",
        title: "제서어덕  ㅇㅇ",
        user: "김동훈",
        count: 30,
        date: jkh.date_ymd(),
        date2: jkh.date_time()
    }
    return res.status(200).json(ress);
}/// 테스트 함수
const add_borad = (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    var parmas = {
        ...req.body,
        ...req.parmas,
        ...req.query,
    }
    if (isEmpty(
        params.name,
        params.id,        
        params.title,
        params.content,
    )) {
        response.state = 2;
        response.msg = 'parmas is empty';
        jkh.webhook('err', 'parmas is empty');
        return res.status(400).json(response)
    }
    else {
        let data = {
            name : params.name,
            id : params.id,
            create_d : jkh.date_time(),
            title : params.title,
            content : params.content,
        }
        nosqldb.qna.addboard(data);
        response.state = 1;
        response.msg = 'Successful';
        return res.status(200).json(response);
    }

}
const index = (req, res) => {
   
}
module.exports = (app) => {
    app.group([], (router) => {
        router.get('/test', test);//api/v1/user/context/test
        router.get('/board/list:id', [passport.authenticate('user.local', { session: false })], index),//가져오기
        router.post('/board/write', [passport.authenticate('user.local', { session: false })], add_borad),// 글쓰기
        router.get('/board/:id', [passport.authenticate('user.local', { session: false })], index),//게시판 글찿기
        router.post('/comment/write', del_log)//뎃글작성
        //router.get('/test', test)//글삭제
    });
}