export default ({ route, navigation }) => {
    // 앱 시작시엔 변수들이 undefined 
    //  -> confirm에서 screen 이동시 변수들이 값을 가지는데 이때 변수들을 가져옴
    const updateRequired = route?.params?.updateRequired;
    const userName = route?.params?.userName;
    const password = route?.params?.password;
  
    const userNameInput = useInputV2("");
    // const userNameInput = useInputV2(userName || "");
    const passwordInput = useInputV2("");
  
    // 이미 존재하는 스크린으로 이동하면 렌더링이 한번 이상 일어나기 때문에 따로 조건문 줘서 처리
    // ! 훅의 초기값 설정하는 방법으로는 이미 렌더링된 컴포넌트를 가져올 수 없다(?)
    if(updateRequired === true) {
      userNameInput.setValue(userName);
      passwordInput.setValue(password);
      route.params.updateRequired = false;
    }
    
    return(...);
  }