import React from "react";
import Loading from "./src/screens/Loading";
import AuthScreen from "./src/screens/AuthScreen";

export default class extends React.Component{
  state = {
    isLoading : true
  };
  componentDidMount = async() => {
    // 1000 = 1s
    setTimeout(() => {this.setState({isLoading : false})}, 3000);
  }

  render() {
    if(this.state.isLoading){
      return <Loading></Loading>
    }else{
      return <AuthScreen></AuthScreen>
    }
  }
}