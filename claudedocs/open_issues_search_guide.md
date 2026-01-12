# Spring Boot Open Issues 검색 가이드

**작성일:** 2025년 12월 24일

---

## ⚠️ 중요: Closed 이슈 제외

**closed된 이슈는 작업할 수 없습니다!**  
이슈를 추천하기 전에 반드시 **open 상태**인지 확인해야 합니다.

---

## 올바른 검색 방법

### 1. GitHub에서 직접 검색

**검색 쿼리:**
```
is:open is:issue -label:blocked -label:"wait-for-triage" -label:"waiting-for-triage" no:assignee
```

**URL:**
```
https://github.com/spring-projects/spring-boot/issues?q=is%3Aopen+is%3Aissue+-label%3Ablocked+-label%3A%22wait-for-triage%22+-label%3A%22waiting-for-triage%22+no%3Aassignee
```

### 2. 이슈 상태 확인 체크리스트

이슈를 추천하기 전에 반드시 확인:

- [ ] **이슈가 `open` 상태인지 확인** (가장 중요!)
- [ ] `closed` 상태가 아닌지 확인
- [ ] `wait-for-triage` 또는 `waiting-for-triage` 라벨이 없는지 확인
- [ ] `blocked` 라벨이 없는지 확인
- [ ] PR이 생성되지 않았는지 확인
- [ ] assignee가 없는지 확인

### 3. 이슈 페이지에서 확인하는 방법

1. 이슈 페이지로 이동
2. 페이지 제목 확인:
   - ✅ `Issue #XXXX` → Open 상태
   - ❌ `Issue #XXXX (closed)` 또는 `Closed` 표시 → Closed 상태
3. 이슈 헤더에서 상태 확인:
   - Open/Closed 버튼 또는 배지 확인

---

## 검색 시 주의사항

1. **웹 검색 결과는 신뢰하지 말 것**
   - 웹 검색 결과는 최신 상태가 아닐 수 있음
   - 반드시 GitHub에서 직접 확인

2. **브라우저 스냅샷도 재확인 필요**
   - 스냅샷 시점과 현재 시점이 다를 수 있음
   - 최신 상태는 GitHub에서 직접 확인

3. **이슈 상태는 자주 변경됨**
   - 분석한 시점에 open이었어도 이후 closed될 수 있음
   - 작업 시작 전 반드시 재확인

---

## 추천 검색 전략

### 1단계: GitHub에서 최신 이슈 목록 확인
- 최근 생성된 이슈 우선 확인
- `good first issue` 라벨이 있는 이슈 확인

### 2단계: 각 이슈의 상태 확인
- Open/Closed 상태 확인
- 라벨 확인
- 코멘트 확인

### 3단계: 기준에 맞는지 평가
- 사용자가 제공한 기준에 부합하는지 확인
- 메인테이너의 확인 여부 확인

---

## 다음 검색 시 적용할 사항

1. **이슈 추천 전 반드시 상태 확인**
   - Open 상태인지 확인
   - Closed 상태면 제외

2. **검색 결과에 상태 명시**
   - 각 이슈의 상태를 명확히 표시
   - 확인 시점 기록

3. **사용자에게 재확인 요청**
   - 추천한 이슈의 상태를 사용자가 직접 확인하도록 안내

---

**참고:** 이슈 상태는 실시간으로 변경될 수 있으므로, 작업 시작 전 반드시 GitHub에서 직접 확인하시기 바랍니다.

