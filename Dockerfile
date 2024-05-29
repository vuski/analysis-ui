# 1. 베이스 이미지 설정 (Node.js LTS 버전)
FROM node:12

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 빌드된 파일과 수정된 node_modules 복사
COPY . .

# 4. npm 패키지 설치
RUN npm install

# 5. 애플리케이션 빌드 (이미 빌드된 파일을 사용하지 않는다면 이 단계 생략 가능)
# RUN npm run build

# 6. 애플리케이션 포트 설정
EXPOSE 3000

# 7. 애플리케이션 시작
CMD ["npm", "start"]
