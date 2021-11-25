# 🕋 SSR (서버 사이드 렌더링)
> 서버 사이드 렌더링은 UI를 서버에서 렌더링하는 것을 의미한다.
> 서버 사이드 렌더링을 구현하면 사용자가 웹 서비스에 방문했을 때 서버 쪽에서 초기 렌더링을 대신해 준다.
___
### 🛠 Install
> react-router-dom@5 <br>
> webpack-node-externals <br>
> express <br>
> redux <br>
> react-redux <br>
> redux-thunk <br>
> axios <br>
> redux-saga
___
## 🔹 SSR의 장점
> + 검색 엔진이 페이지의 내용을 수집해 갈 수 있다.
> - 서버 사이드 렌더링을 통해 초기 렌더링 성능을 개선할 수 있다.
> * 대기시간이 최소화되고, 사용자 경험도 향상된다.

## 🔸 SSR의 단점
> + 브라우저가 해야 할 일을 서버가 대신 처리하는 것이므로 서버 리소스가 사용된다는 단점이 있다.
> - 서버에 과부하가 발생할 수 있고, 프로젝트의 구조가 좀 더 복잡해질 수 있다.
> * 데이터 미리 불러오기, 코드 스플리팅과의 호환 등 고려해야 할 사항이 더 많아져서 개발이 어려워질 수 있다.

## 서버 사이드 렌더링과 코드 스플리팅 충돌
> 별도의 호환 작업 없이 두 기술을 함께 적용하면, 다음과 같은 흐름으로 작동하면서 페이지에 깜박임이 발생한다.
1. 서버 사이드 렌더링된 결과물이 브라우저에 나타남
2. 자바스크립트 파일 로딩
3. 자바스크립트가 실행되면서 아직 불러오지 않은 컴포넌트를 null로 렌더링함
4. 페이지에서 코드 스플리팅된 컴포넌트들이 사라짐
5. 코드 스플리팅된 컴포넌트들이 로딩된 이후 제대로 나타남
<br>

> 이러한 이슈를 해결하려면 라우트 경로마다 코드 스플리팅 파일 중에서 <br> 필요한 모든 파일을 브라우저에서 렌더링하기 전에 불러와야 한다.

## entry
> + 엔트리(entry)는 웹팩에서 프로젝트를 불러올 때 가장 먼저 불러오는 파일이다.
> - 이 파일부터 시작하여 내부에 필요한 다른 컴포넌트와 모듈을 불러오고 있다.
> * 서버 사이드 렌더링을 할 때는 서버를 위한 엔트리 파일을 따로 생성해야 한다.
> + 작성한 엔트리 파일을 웹팩으로 불러와서 빌드하려면 서버 전용 환경 설정을 만들어 주어야 한다.

## SSR
> + 서버에서 리액트 컴포넌트를 렌더링할 때는 ReactDOMServer의 renderToString이라는 함수를 사용한다.
>   + 이 함수에 JSX를 넣어서 호출하면 렌더링 결과를 문자열로 반환한다.

## 웹팩 환경 설정
> + 빌드할 때 어떤 파일에서 시작해 파일들을 불러오는지, 또 어디에 결과물을 저장할지를 정해 준다.
>   + mode : 모드를 설정한다.
>   + entry : 엔트리 경로
>   + target : 어떤 환경에서 실행될 것인지 명시
>   + path : 빌드 경로
>   + filename : 파일 이름
>   + chunkFilename : 청크 파일 이름
>   + publicPath : 정적 파일이 제공될 경로

## 웹팩 로더 
> + 웹팩의 로더는 파일을 불러올 때 확장자에 맞게 필요한 처리를 해준다.
> - __✔ config/webpack.config.server.js__ 참고

## PreloadContext
> PreloadContext는 서버 사이드 렌더링을 하는 과정에서 처리해야 할 적업들을 실행하고, <br>
> 만약 기다려야 하는 프로미스가 있다면 프로미스를 수집한다.<br>
> 프로미스를 수집 후 수집된 프로미스가 끝난 후에 다시 렌더링하면 데이터가 채워진 상태로 컴포넌트가 나타난다.

