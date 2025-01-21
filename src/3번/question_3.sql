-- 테이블 정의
CREATE TABLE USER(
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    CONSTRAINT USER_PK PRIMARY KEY(id)
);

CREATE TABLE APPROVAL(
    id BIGINT NOT NULL AUTO_INCREMENT,
    requester_id BIGINT NOT NULL,
    status VARCHAR(255),
    current_step BIGINT,
    total_step BIGINT,
    CONSTRAINT APPROVAL_PK PRIMARY KEY(id),
    CONSTRAINT APPROVAL_FK_REQUESTER FOREIGN KEY(requester_id) REFERENCES USER(id)
);

CREATE TABLE APPROVAL_STEP(
    id BIGINT NOT NULL AUTO_INCREMENT,
    approval_id BIGINT NOT NULL,
    manager_id BIGINT NOT NULL,
    step BIGINT,
    status VARCHAR(255),
    reason VARCHAR(255),
    CONSTRAINT APPROVAL_STEP_PK PRIMARY KEY(id),
    CONSTRAINT APPROVAL_STEP_FK_APPROVAL FOREIGN KEY(approval_id) REFERENCES APPROVAL(id),
    CONSTRAINT APPROVAL_STEP_FK_MANAGER FOREIGN KEY(manager_id) REFERENCES USER(id)
);

-- 유저 데이터 생성
INSERT INTO USER(name) VALUES ("결재요청자1"); -- ID 1
INSERT INTO USER(name) VALUES ("결재요청자2"); -- ID 2
INSERT INTO USER(name) VALUES ("결재처리자1"); -- ID 3
INSERT INTO USER(name) VALUES ("결재처리자2"); -- ID 4
INSERT INTO USER(name) VALUES ("결재처리자3"); -- ID 5

-- 결재 및 결재 단계 생성

-- 결재 데이터 1 : 결재 요청자1 이 결재처리자1,2,3 을 결재 처리자로 지정하여, 결재 요청.
INSERT INTO APPROVAL(requester_id, status, current_step, total_step)
VALUES (1, 'ONGOING', 1, 3);

INSERT INTO APPROVAL_STEP(approval_id, manager_id, step, status, reason)
VALUES (1, 3, 1, 'ONGOING', NULL);

INSERT INTO APPROVAL_STEP(approval_id, manager_id, step, status, reason)
VALUES (1, 4, 2, 'WAITING', NULL);

INSERT INTO APPROVAL_STEP(approval_id, manager_id, step, status, reason)
VALUES (1, 5, 3, 'WAITING', NULL);


-- 결재 데이터 2 : 결재 요청자2 가 결재처리자 2,3 을 결재 처리자로 지정하여, 결재 요청.
INSERT INTO APPROVAL(requester_id, status, current_step, total_step)
VALUES (2, 'ONGOING', 1, 2);

INSERT INTO APPROVAL_STEP(approval_id, manager_id, step, status, reason)
VALUES (2, 4, 1, 'ONGOING', NULL);

INSERT INTO APPROVAL_STEP(approval_id, manager_id, step, status, reason)
VALUES (2, 5, 2, 'WAITING', NULL);


-- 특정사용자가 처리해야할 문서 (방법1)
SELECT *
FROM APPROVAL AS A
JOIN (
    SELECT * FROM APPROVAL_STEP
    WHERE manager_id = ${user_id} AND status = 'ONGOING'
) AS S ON S.approval_id = A.id;


SELECT *
FROM APPROVAL AS A
JOIN APPROVAL_STEP AS S ON A.id = S.approval_id
WHERE S.status = 'ONGOING' AND S.manager_id = ${user_id};



