## 환경 설정
* node : 18 버전 이상
* packageManger : Yarn 3.6.4
* jdk(java) : 17 이상
* android studio :
  * API target 33이상
  * gradle : 8.6
* React-native : 7.4.1

### .env.local

```text
WEATHER_API_KEY: 날씨 api key
```

### 가상 디바이스 사용 시
안드로이드 스튜디오에서

![image](https://github.com/user-attachments/assets/406df0b8-a376-4bfd-af0d-750a7e54e213)

more action >> virtual device manager

![image](https://github.com/user-attachments/assets/0d102614-568b-49c9-9a74-27df6a9810a7)

재생 버튼 클릭
![image](https://github.com/user-attachments/assets/43a1f78a-0457-4029-a36b-2951ad2a877d)

### 실제 기기를 연결하여 사용 시

안드로이드 개발자 디버그 모드 진입이 필요합니다.

[디버그 모드 진입 참고 블로그 글](https://mainia.tistory.com/6197)

진입 후 사용 방법 따라 안드로이드 프로젝트 빌드 후 실행

### 사용 방법

안드로이드 기기가 연결(실행) 되어 있어야 합니다. (가상, 실제 기기 둘 중 하나)

```text
git clone https://github.com/wildflower-keeper/mobile.git

cd mobile

yarn install

yarn start || yarn run start:clean

in terminal : press a for lunch android project

```
으로 실행. 종종 캐시가 남아 번들링 과정에서 에러가 발생하기 때문에 이 방식으로 사용하는 것을 추천합니다.

구현되어 있는 기능.

- 회원가입
  - 이름, 센터, 핀번호, 방 번호, 약관 동의까지의 과정을 거친 후, api 호출을 하면 accessToken이 발급 되고 이를 스토리지에 영구저장하여 사용하는 방식.
- 로그인

  - 스토리지에 저장된 토큰을 기반으로 로그인 상태를 유지, 디바이스의 변경이나, 앱을 재설치하는 등의 특별한 이슈가 없다면 자동로그인 되는 것을 목표로 설계.
  - 자동로그인을 기본으로 설계하였기에 로그인 메서드를 작성해두지 않았고, 현재 api에서 요구하는 데이터와 프론트에서 전달해줄 수 있는 데이터가 다른 것으로 파악되고 있어 백엔드 api의 수정이 필요하다고 판단됩니다.

- 사전외박신청
  - 기간과 사유를 선택하여, 외박신청. useMutation에서 onSuccess 시 invalidateQuery메서드를 사용하여 신청 후 홈 화면에서 신청한 내역을 바로 볼 수 있도록 설계.
  - 기간을 선택하는 달력이 나오는 페이지와 사유를 선택하는 페이지를 분리하지 않고 작업을 해두어서, 분리 작업이 필요할 수도 있습니다.
  - 최종확인 페이지만 별도로 분리되어 있습니다.
- 사전외박신청 취소
  - 외박 신청 내용을 확인하고, 불필요한 일정이라면 삭제할 수 있도록 설계 되어있고, useMutation에서 onSuccess 시 invalidateQuery메서드를 통해 삭제된 내용이 즉각 반영 되도록 설계.
- 날씨
  - https://api.openweathermap.org 에서 날씨 정보를 받아오도록 설계. 현재 개인 아이디로 apiKey를 사용하고 있고, 이를 .env.local에 설정해두어서 사용 화면을 확인하시고자 한다면 해당사이트에서 apiKey를 발급받아 사용해야합니다. 현재 배포를 목적으로 하고 있기에 사업자에게 apiKey 발급 받을 것을 요청하시는 것이 좋을 듯 합니다.

# 안드로이드 apk 빌드
* 빌드 시 기존 라이브러리 파일들이 있어야 하므로 `yarn install` 을 진행해야 합니다.
* 빌드 할때 keystore 파일이 필요합니다. android/app 하위에 my-update-key.keystore 확인 없다면 다운로드 혹은 생성 필요
  * 팀 노션 `팀 들꽃지기 본부/ 문서/ 안드로이드 빌드에 필요한 keystore파일` 에서  keystore 다운로드
  * 만약 생성을 해야 한다면 https://reactnative.dev/docs/signed-apk-android 를 참조해서 keystore 파일을 생성하시기 바랍니다.

```
cd android

sudo ./gradlew clean build  # 관리자 권한이 필요할 수 있습니다. sudo 넣고 하는 것을 추천
# 완료 후

sudo ./gradlew assembleRelease
```
### 앱스토어 올리기 전 버전 증가
one store기준으로, 기존 버전보다 높아야 안드로이드 파일이 업로드 됩니다. 

`android/app/build.gradle` 파일을 수정 한 뒤 빌드를 진행하면 됩니다.
```
...
    defaultConfig {
        applicationId "com.wildflower"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 2 // 버전 코드 더 높게 설정
        versionName "1.1" // 버전 이름 변경
    }
...
```


### 빌드 파일 확인

빌드 후 `android/app/build` 경로확인, 빌드 폴더 아래 `outputs/release` 폴더 안에 app-release.apk 생성 확인
