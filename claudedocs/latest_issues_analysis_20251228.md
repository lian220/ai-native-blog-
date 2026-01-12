# Spring Boot 최신 Open Issues 분석 (2025년 12월 28일)

**검색 일자:** 2025년 12월 28일  
**검색 조건:** 
- `is:open is:issue`
- `-label:blocked -label:"wait-for-triage" -label:"waiting-for-triage"`
- `no:assignee`

---

## 발견된 이슈 목록

### 1. 이슈 #48626: Micrometer test modules should have an api dependency on micrometer-observation-test
**URL:** https://github.com/spring-projects/spring-boot/issues/48626  
**제목:** Micrometer test modules should have an api dependency on micrometer-observation-test  
**라벨:** 
- `status: forward-port` - 포워드 포트 이슈
- `type: bug`
- `4.1.0-M1`
**메인테이너:** @snicoll (작성자)  
**상태:** Open  
**분석 필요**

### 2. 이슈 #48623: Polish
**URL:** https://github.com/spring-projects/spring-boot/issues/48623  
**제목:** Polish  
**라벨:** `status: forward-port`, `type: task`, `4.1.0-M1`  
**메인테이너:** @snicoll (작성자)  
**상태:** Open  
**⚠️ 제외 고려:** forward-port 이슈는 이미 다른 브랜치에서 해결된 것을 포워드하는 작업

### 3. 이슈 #48622: Polish
**URL:** https://github.com/spring-projects/spring-boot/issues/48622  
**제목:** Polish  
**라벨:** `status: forward-port`, `type: task`, `4.0.2`  
**메인테이너:** @snicoll (작성자)  
**상태:** Open  
**⚠️ 제외 고려:** forward-port 이슈는 이미 다른 브랜치에서 해결된 것을 포워드하는 작업

### ❌ 4. 이슈 #48621: springboot 4.0 welcome page not visible
**URL:** https://github.com/spring-projects/spring-boot/issues/48621  
**제목:** springboot 4.0 welcome page not visible  
**제외 이유:** `status: duplicate` 라벨 (중복 이슈, #48614와 중복)

### ❌ 5. 이슈 #48619: Upgrade to jOOQ 3.20.10
**URL:** https://github.com/spring-projects/spring-boot/issues/48619  
**제목:** Upgrade to jOOQ 3.20.10  
**제외 이유:** `status: invalid` 라벨 (무효한 이슈)

### ❌ 6. 이슈 #48618: welcome page: class path resource [static/index.html] is invisble
**URL:** https://github.com/spring-projects/spring-boot/issues/48618  
**제목:** welcome page: class path resource [static/index.html] is invisble  
**제외 이유:** `status: duplicate` 라벨 (중복 이슈, #48614와 중복)

---

## 제외된 이슈

### ❌ 이슈 #48625: EntityListeners causes "Wrong type of bean"
**제외 이유:** 
- `status: not planned` 라벨
- `for: external-project` 라벨 (외부 프로젝트 관련, Spring Boot에서 해결 불가)

---

## 다음 확인 사항

각 이슈에 대해 다음을 확인해야 합니다:

1. ✅ **이슈 상태** (Open/Closed) - 반드시 Open 확인
2. ✅ **라벨** (`blocked`, `wait-for-triage`, `good first issue` 등)
3. ✅ **담당자(assignee)** 없음 확인
4. ✅ **PR 존재 여부**
5. ✅ **이슈 본문 상세도**
6. ✅ **메인테이너 코멘트 및 방향 제시**
7. ✅ **에러 로그 및 재현 방법**
8. ✅ **의심되는 소스코드 위치**

---

## 기여하기 좋은 기준 대비 평가 예정

각 이슈를 다음 기준에 맞춰 평가합니다:

- [ ] 이슈 내용이 상세하게 잘 작성되어 있는 경우
- [ ] 버그나 에러의 로그와 재현 방법이 명시되어 있는 경우
- [ ] 의심되는 소스코드 위치가 특정된 경우
- [ ] 메인테이너가 확인하고 방향을 정해준 경우
- [ ] 메인테이너가 직접 작성한 이슈
- [ ] `good first issue` 라벨이 있고 `blocked`나 `wait-for-triage`가 없는 경우
- [ ] PR이 아직 생성되지 않은 경우

---

**업데이트 중...**

