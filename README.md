
## Installation

1. Clone repository

```shell
git clone https://github.com/abhitsahu/resume-analysis.git
```

2. Install dependencies via npm

```shell
cd backend
```

```shell
npm i
```
# Change .env file

```shell
PORT=3000
MONGO_URI=DB_URL
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY= GEMINI_API_KEY
ENCRYPTION_KEY= SECRET_key


```
3. Start Backend

```shell
npm run dev
```
4. Postman API 
LogedIn API
```shell
POST: http://localhost:3000/api/auth/login
```
Body
```shell
 {
       "username": "naval.ravikant",
       "password": "05111974"
}
```
Extracting raw text from a resume.
```shell
POST: http://localhost:3000/api/resume/enrich
```
Body
```shell
{
  "url": "https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf"
}
```
Headers
```shell
Key: Authorization
Value: Bearer <Token>
```

Resume search API
```shell
POST: http://localhost:3000/api/resume/search
```
Body
```shell
{
  "name": "PRABHAT BHARDWAJ"
}
```
Headers
```shell
Key: Authorization
Value: Bearer <Token>
```










