## 프로젝트 개요

> 이름 : javascript-lotto-personal
>
> 기간 : 2022년 3월
>
> 인원 : 1인 (개인)
>
> 배포 : 데모로 대체함

<br/>

## ⌨️ 실행 방법

**Clone the project**

```bash
  git clone https://github.com/dltkdals224/javascript-lotto-personal.git
```

**Go to the project directory**

```bash
  cd javascript-lotto-personal
```

**Install dependencies**

```bash
  npm install
```

**Start the server**

```bash
  npm run start-be
```

```bash
  npm run start-fe
```

<br/>

## 🖥 데모

![1](https://user-images.githubusercontent.com/28257740/231659267-be0a236f-c298-4b79-bfb1-59c578de3ee2.gif)

<br/>

![2](https://user-images.githubusercontent.com/28257740/231660082-989d0444-dfe9-4135-84d9-9e96f14a6849.gif)

<br/>

![3](https://user-images.githubusercontent.com/28257740/231660112-19e1f93e-1ccb-48a7-9a86-19b9f0827068.gif)

<br/>

![4](https://user-images.githubusercontent.com/28257740/231660123-868e931b-d718-43ab-a476-c213b0ac5270.gif)

<br/>

## 🧚🏻‍♂️ 적용 기술 및 채택 근거

### MVC 디자인 패턴

소프트웨어 개발에서 사용자 인터페이스, 데이터 및 논리 제어를 구현하는데 널리 사용되는 아키텍처 디자
인 패턴 중 하나. <br/> 모델(Model), 뷰(View), 그리고 컨트롤러(Controller)로 구성되어, 분리되어 동작
함으로써 코드의 재사용성과 유지보수성을 높일 수 있다.

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/index.js#L1-L4

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/fe/js/app.js#L1-L15

<br/>

- Model

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/fe/js/components/Model/index.js#L2-L10

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/fe/js/components/Model/index.js#L12-L83

데이터와 데이터의 값이 바뀌는 이벤트에 대해 CustomEvent를 통한 발행을 처리.

커스텀 이벤트를 사용해 이벤트의 세부 정보를 자유롭게 정의하고 모델에서 발생하는 이벤트의 내용을 명확하게 전달. <br/>
이를 통해 모델과 뷰, 그리고 컨트롤러 간의 결합도를 낮출 수 있으며, 뷰와 컨트롤러가 모델의 상태 변화를 쉽게 감지하고 이에 따른 업데이트를 수행할 수 있다.

<br/>

- View

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/fe/js/components/View/index.js#L177-L337

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/fe/js/components/View/index.js#L10-L174

최초의 InitView HTML과 UI 관련 업데이트 함수를 작성. <br/>
DOM 조작과 관련한 모든 처리를 View 클래스에서 담당하게 하므로써, 코드를 구성 요소로 분리하여 추상화 수준을 유지할 수 있도록 함.


<br/>

- Controller

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/fe/js/components/Controller/index.js#L12-L53

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/fe/js/components/Controller/index.js#L56-L223
 
Controller의 생성자에서 이벤트 리스너를 등록하고 각 이벤트에 대해 콜백 함수를 정의. <br/> 
코드가 모듈화되어 의존성을 낮추고, 이벤트 처리 로직이 분리되어 가독성이 향상된다. <br/>
코드의 모듈화와 이벤트 리스너 등록의 분리로 코드의 가독성이 높아지도록 작성.

<br/>

### express내 scrapping

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/be/controllers/lottoNumberScrap.Controller.js#L1-L44

node.js 필드에서 axios와 cheerio를 통해 scrapping을 구현. <br/>
특정 회차들의 로또 당첨 번호를 html tag를 통해 가져올 수 있도록 함.

<br/>

### 함수형 프로그래밍

[함수형 프로그래밍](https://github.com/dltkdals224/dev-book_and_lecture/tree/main/%ED%95%A8%EC%88%98%ED%98%95%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EA%B3%BC%20JavaScript%20ES6%2B)기반 함수형 프로그래밍 적용 시도. <br/>
적용에 lodash 라이브러리를 사용.

적용 전
```javascript
const DATA_ARRAY = HTML_DATA_ARRAY.map((htmlData, idx) => {
    const $ = cheerio.load(htmlData.data);

    const DATA = {
      lottoRound: ROUND_ARRAY[idx],
      lottoNumber: $(
        '#main_pack > div.sc_new.cs_lotto._lotto > div > div.content_area > div > div > div:nth-child(2) > div.win_number_box > div'
      )
        .text()
        .split(' ')
        .filter(target => target),
    };

    return DATA;
  });
```

적용 후 
```javascript
const DATA_ARRAY = HTML_DATA_ARRAY.map((htmlData, idx) => {
    const $ = cheerio.load(htmlData.data);
    const NUMBER_LIST = $(
      '#main_pack > div.sc_new.cs_lotto._lotto > div > div.content_area > div > div > div:nth-child(2) > div.win_number_box > div'
    ).text();

    return {
      lottoRound: ROUND_ARRAY[idx],
      lottoNumber: flow(
        trim,
        split(' '),
        filter(target => target !== '')
      )(NUMBER_LIST),
    };
  });
```

<br/>

### 기타

- **util func**

https://github.com/dltkdals224/javascript-lotto-personal/blob/ef28caf4e50b31494486e4b06c7418c387cae7b7/src/be/util/calculate.util.js#L1-L28

Date 객체를 사용해 현재 날짜를 scrap하기 위한 최신 회차로 변환하는 util 함수.

<br/>

## 🛠 사용 기술

<img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26?&style=flat&logo=HTML5&logoColor=white"/>
<img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6?&style=flat&logo=CSS3&logoColor=white"/>
<img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E?&style=flat&logo=JavaScript&logoColor=white"/>
<img alt="nodedotjs" src ="https://img.shields.io/badge/Node.JS-339933?&style=flat&logo=nodedotjs&logoColor=white"/>
<img alt="Express" src ="https://img.shields.io/badge/Express-000000?&style=flat&logo=Express&logoColor=white"/>

<br/>

<img alt="axios" src ="https://img.shields.io/badge/axios-5A29E4?&style=flat&logo=axios&logoColor=white"/>
<img alt="NodeMon" src ="https://img.shields.io/badge/NodeMon-76D04B?&style=flat&logo=NodeMon&logoColor=white"/>
<img alt="Lodash" src ="https://img.shields.io/badge/Lodash-3492FF?&style=flat&logo=Lodash&logoColor=white"/>

<br/>
<br/>

## 📦 폴더 구조

```
📂 src
├─ 📂 fe
│  ├─ 📂 css
│  └─ 📂 js
│     ├─ 📂 api
│     │  ├─ client
│     │  └─ lotto
│     ├─ 📂 components
│     │  ├─ Model
│     │  ├─ View
│     │  └─ Controller
│     ├─ 📂 constant
│     ├─ 📂 util
│     │  ├─ checkValid
│     │  ├─ generateLottoNumber
│     │  └─ sessionStorage
│     └─ app.js
├─ 📂 be
│  ├─ 📂 bin
│  ├─ 📂 config
│  ├─ 📂 controllers
│  │  └─ lottoNumberScrap.Controller
│  ├─ 📂 routes
│  │  ├─ lottoNumber.route
│  │  └─ staticPage.route
│  ├─ 📂 util
│  │  └─ calculate.util
│  └─ app.js
└─ index.js
```

</br>

## 📐 최적화

### lodash

https://github.com/dltkdals224/javascript-lotto-personal/blob/main/webpack.config.js#L1-L46

https://github.com/dltkdals224/javascript-lotto-personal/blob/main/babel.config.js#L1-L14

lodash를 babel을 이용해 번들링하여 모듈 번들러의 크기를 줄임. <br/>
babel-loader 가 lodash 모듈에서 사용하지 않는 함수들을 제거 및 번들링할 때 필요한 기능들만을 포함.

이런 최적화 설정을 통해, 모듈 번들러가 최소한의 기능만을 번들링하도록 설정하여 성능이 약간 개선.

<br/>

## 🔖 참조

--

<br/>

## 🙏🏻 피드백

If you have any feedback, please reach out to us at 23mean23@gmail.com

<br/>
